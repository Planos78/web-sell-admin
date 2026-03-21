import { useState } from 'react';
import {
  Card,
  Table,
  Tag,
  Button,
  Space,
  Input,
  Select,
  Typography,
  Modal,
  Descriptions,
  Timeline,
  message,
  Row,
  Col,
  Statistic,
} from 'antd';
import {
  SearchOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CarOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { orders as initialOrders, formatPrice } from '../data/mockData';

const { Title, Text } = Typography;

const statusOptions = [
  { value: 'all', label: 'ทั้งหมด' },
  { value: 'กำลังดำเนินการ', label: 'กำลังดำเนินการ' },
  { value: 'จัดส่งแล้ว', label: 'จัดส่งแล้ว' },
  { value: 'สำเร็จ', label: 'สำเร็จ' },
  { value: 'ยกเลิก', label: 'ยกเลิก' },
];

const statusColorMap = {
  'กำลังดำเนินการ': 'processing',
  'จัดส่งแล้ว': 'blue',
  'สำเร็จ': 'success',
  'ยกเลิก': 'error',
};

export default function OrdersPage() {
  const [data, setData] = useState(initialOrders);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [detailModal, setDetailModal] = useState(null);

  const filtered = data.filter((o) => {
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const updateStatus = (id, newStatus) => {
    setData(data.map((o) => (o.id === id ? { ...o, status: newStatus } : o)));
    message.success(`อัพเดทสถานะเป็น "${newStatus}" แล้ว`);
    if (detailModal?.id === id) {
      setDetailModal({ ...detailModal, status: newStatus });
    }
  };

  const orderStats = {
    pending: data.filter((o) => o.status === 'กำลังดำเนินการ').length,
    shipped: data.filter((o) => o.status === 'จัดส่งแล้ว').length,
    completed: data.filter((o) => o.status === 'สำเร็จ').length,
    cancelled: data.filter((o) => o.status === 'ยกเลิก').length,
  };

  const columns = [
    {
      title: 'หมายเลข',
      dataIndex: 'id',
      key: 'id',
      render: (id) => <Text strong>{id}</Text>,
    },
    {
      title: 'ลูกค้า',
      dataIndex: 'customer',
      key: 'customer',
      render: (name, record) => (
        <div>
          <Text strong>{name}</Text>
          <div><Text type="secondary" style={{ fontSize: 12 }}>{record.email}</Text></div>
        </div>
      ),
    },
    {
      title: 'สินค้า',
      dataIndex: 'items',
      key: 'items',
      width: 80,
      render: (items) => `${items} ชิ้น`,
    },
    {
      title: 'ยอดรวม',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      sorter: (a, b) => a.totalPrice - b.totalPrice,
      render: (price) => <Text strong style={{ color: '#1677ff' }}>{formatPrice(price)}</Text>,
    },
    {
      title: 'ชำระเงิน',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      width: 120,
    },
    {
      title: 'วันที่',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      render: (date) =>
        new Date(date).toLocaleDateString('th-TH', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag color={statusColorMap[status]}>{status}</Tag>,
    },
    {
      title: 'จัดการ',
      key: 'actions',
      width: 160,
      render: (_, record) => (
        <Space>
          <Button size="small" icon={<EyeOutlined />} onClick={() => setDetailModal(record)}>
            ดู
          </Button>
          {record.status === 'กำลังดำเนินการ' && (
            <Button
              size="small"
              type="primary"
              icon={<CarOutlined />}
              onClick={() => updateStatus(record.id, 'จัดส่งแล้ว')}
            >
              จัดส่ง
            </Button>
          )}
          {record.status === 'จัดส่งแล้ว' && (
            <Button
              size="small"
              style={{ background: '#52c41a', color: '#fff', border: 'none' }}
              icon={<CheckCircleOutlined />}
              onClick={() => updateStatus(record.id, 'สำเร็จ')}
            >
              สำเร็จ
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title level={4} style={{ marginBottom: 16 }}>จัดการคำสั่งซื้อ</Title>

      {/* Order Stats */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={12} sm={6}>
          <Card size="small" style={{ borderRadius: 12, borderLeft: '4px solid #faad14' }}>
            <Statistic
              title="รอดำเนินการ"
              value={orderStats.pending}
              prefix={<ClockCircleOutlined style={{ color: '#faad14' }} />}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small" style={{ borderRadius: 12, borderLeft: '4px solid #1677ff' }}>
            <Statistic
              title="จัดส่งแล้ว"
              value={orderStats.shipped}
              prefix={<CarOutlined style={{ color: '#1677ff' }} />}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small" style={{ borderRadius: 12, borderLeft: '4px solid #52c41a' }}>
            <Statistic
              title="สำเร็จ"
              value={orderStats.completed}
              prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small" style={{ borderRadius: 12, borderLeft: '4px solid #ff4d4f' }}>
            <Statistic
              title="ยกเลิก"
              value={orderStats.cancelled}
              prefix={<CloseCircleOutlined style={{ color: '#ff4d4f' }} />}
            />
          </Card>
        </Col>
      </Row>

      <Card style={{ borderRadius: 12 }}>
        <Row gutter={[12, 12]} style={{ marginBottom: 16 }}>
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder="ค้นหาหมายเลข/ชื่อลูกค้า..."
              prefix={<SearchOutlined />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: '100%' }}
              options={statusOptions}
            />
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={filtered.map((o) => ({ ...o, key: o.id }))}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 900 }}
          size="middle"
        />
      </Card>

      {/* Order Detail Modal */}
      <Modal
        title={`รายละเอียดคำสั่งซื้อ ${detailModal?.id || ''}`}
        open={!!detailModal}
        onCancel={() => setDetailModal(null)}
        footer={null}
        width={600}
      >
        {detailModal && (
          <div style={{ marginTop: 16 }}>
            <Descriptions column={2} bordered size="small">
              <Descriptions.Item label="ลูกค้า">{detailModal.customer}</Descriptions.Item>
              <Descriptions.Item label="อีเมล">{detailModal.email}</Descriptions.Item>
              <Descriptions.Item label="ที่อยู่จัดส่ง" span={2}>{detailModal.address}</Descriptions.Item>
              <Descriptions.Item label="จำนวนสินค้า">{detailModal.items} ชิ้น</Descriptions.Item>
              <Descriptions.Item label="ยอดรวม">
                <Text strong style={{ color: '#1677ff' }}>{formatPrice(detailModal.totalPrice)}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="ชำระเงิน">{detailModal.paymentMethod}</Descriptions.Item>
              <Descriptions.Item label="สถานะ">
                <Tag color={statusColorMap[detailModal.status]}>{detailModal.status}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="วันที่สั่ง" span={2}>
                {new Date(detailModal.date).toLocaleDateString('th-TH', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Descriptions.Item>
            </Descriptions>

            {detailModal.status !== 'ยกเลิก' && detailModal.status !== 'สำเร็จ' && (
              <div style={{ marginTop: 16, textAlign: 'right' }}>
                <Space>
                  {detailModal.status === 'กำลังดำเนินการ' && (
                    <>
                      <Button
                        danger
                        onClick={() => updateStatus(detailModal.id, 'ยกเลิก')}
                      >
                        ยกเลิก
                      </Button>
                      <Button
                        type="primary"
                        icon={<CarOutlined />}
                        onClick={() => updateStatus(detailModal.id, 'จัดส่งแล้ว')}
                      >
                        จัดส่ง
                      </Button>
                    </>
                  )}
                  {detailModal.status === 'จัดส่งแล้ว' && (
                    <Button
                      type="primary"
                      icon={<CheckCircleOutlined />}
                      style={{ background: '#52c41a', border: 'none' }}
                      onClick={() => updateStatus(detailModal.id, 'สำเร็จ')}
                    >
                      ยืนยันสำเร็จ
                    </Button>
                  )}
                </Space>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
