import { useState } from 'react';
import {
  Card,
  Table,
  Tag,
  Button,
  Space,
  Input,
  Typography,
  Avatar,
  Modal,
  Descriptions,
  Row,
  Col,
  Statistic,
} from 'antd';
import {
  SearchOutlined,
  EyeOutlined,
  UserOutlined,
  TeamOutlined,
  UserAddOutlined,
  StopOutlined,
} from '@ant-design/icons';
import { users as initialUsers, formatPrice } from '../data/mockData';

const { Title, Text } = Typography;

export default function UsersPage() {
  const [data] = useState(initialUsers);
  const [search, setSearch] = useState('');
  const [detailModal, setDetailModal] = useState(null);

  const filtered = data.filter((u) => {
    const fullName = `${u.firstName} ${u.lastName}`.toLowerCase();
    return (
      fullName.includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    );
  });

  const activeCount = data.filter((u) => u.status === 'active').length;
  const totalSpent = data.reduce((sum, u) => sum + u.totalSpent, 0);

  const columns = [
    {
      title: 'ผู้ใช้',
      key: 'user',
      render: (_, record) => (
        <Space>
          <Avatar style={{ backgroundColor: '#1677ff' }} icon={<UserOutlined />} />
          <div>
            <Text strong>{record.firstName} {record.lastName}</Text>
            <div><Text type="secondary" style={{ fontSize: 12 }}>{record.email}</Text></div>
          </div>
        </Space>
      ),
    },
    {
      title: 'เบอร์โทร',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'คำสั่งซื้อ',
      dataIndex: 'orders',
      key: 'orders',
      sorter: (a, b) => a.orders - b.orders,
      render: (count) => `${count} รายการ`,
    },
    {
      title: 'ยอดใช้จ่าย',
      dataIndex: 'totalSpent',
      key: 'totalSpent',
      sorter: (a, b) => a.totalSpent - b.totalSpent,
      render: (amount) => <Text strong style={{ color: '#1677ff' }}>{formatPrice(amount)}</Text>,
    },
    {
      title: 'สมัครเมื่อ',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      render: (date) =>
        new Date(date).toLocaleDateString('th-TH', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'success' : 'default'}>
          {status === 'active' ? 'ใช้งาน' : 'ไม่ใช้งาน'}
        </Tag>
      ),
    },
    {
      title: 'จัดการ',
      key: 'actions',
      width: 80,
      render: (_, record) => (
        <Button size="small" icon={<EyeOutlined />} onClick={() => setDetailModal(record)}>
          ดู
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Title level={4} style={{ marginBottom: 16 }}>จัดการผู้ใช้งาน</Title>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={8}>
          <Card size="small" style={{ borderRadius: 12 }}>
            <Statistic title="ผู้ใช้ทั้งหมด" value={data.length} prefix={<TeamOutlined />} />
          </Card>
        </Col>
        <Col xs={8}>
          <Card size="small" style={{ borderRadius: 12 }}>
            <Statistic
              title="ใช้งานอยู่"
              value={activeCount}
              prefix={<UserAddOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={8}>
          <Card size="small" style={{ borderRadius: 12 }}>
            <Statistic
              title="ยอดใช้จ่ายรวม"
              value={totalSpent}
              formatter={(val) => formatPrice(val)}
            />
          </Card>
        </Col>
      </Row>

      <Card style={{ borderRadius: 12 }}>
        <Row gutter={[12, 12]} style={{ marginBottom: 16 }}>
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder="ค้นหาชื่อ/อีเมล..."
              prefix={<SearchOutlined />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              allowClear
            />
          </Col>
          <Col flex="auto" style={{ textAlign: 'right' }}>
            <Text type="secondary">{filtered.length} คน</Text>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={filtered.map((u) => ({ ...u, key: u.id }))}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 800 }}
          size="middle"
        />
      </Card>

      {/* User Detail Modal */}
      <Modal
        title="ข้อมูลผู้ใช้งาน"
        open={!!detailModal}
        onCancel={() => setDetailModal(null)}
        footer={null}
        width={500}
      >
        {detailModal && (
          <div style={{ marginTop: 16 }}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <Avatar
                size={72}
                icon={<UserOutlined />}
                style={{ backgroundColor: '#1677ff', marginBottom: 12 }}
              />
              <div>
                <Title level={4} style={{ margin: 0 }}>
                  {detailModal.firstName} {detailModal.lastName}
                </Title>
                <Text type="secondary">{detailModal.email}</Text>
              </div>
            </div>

            <Descriptions column={1} bordered size="small">
              <Descriptions.Item label="เบอร์โทร">{detailModal.phone}</Descriptions.Item>
              <Descriptions.Item label="จำนวนคำสั่งซื้อ">{detailModal.orders} รายการ</Descriptions.Item>
              <Descriptions.Item label="ยอดใช้จ่ายรวม">
                <Text strong style={{ color: '#1677ff' }}>{formatPrice(detailModal.totalSpent)}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="สมาชิกตั้งแต่">
                {new Date(detailModal.createdAt).toLocaleDateString('th-TH', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Descriptions.Item>
              <Descriptions.Item label="สถานะ">
                <Tag color={detailModal.status === 'active' ? 'success' : 'default'}>
                  {detailModal.status === 'active' ? 'ใช้งาน' : 'ไม่ใช้งาน'}
                </Tag>
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>
    </div>
  );
}
