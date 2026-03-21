import { useState } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Input,
  Select,
  Typography,
  Modal,
  Form,
  InputNumber,
  Switch,
  Popconfirm,
  message,
  Row,
  Col,
  Badge,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  ExportOutlined,
} from '@ant-design/icons';
import { products as initialProducts, categories, formatPrice } from '../data/mockData';

const { Title, Text } = Typography;

export default function ProductsPage() {
  const [data, setData] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form] = Form.useForm();

  const filtered = data.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === 'all' || p.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  const handleDelete = (id) => {
    setData(data.filter((p) => p.id !== id));
    message.success('ลบสินค้าแล้ว');
  };

  const handleSave = (values) => {
    if (editingProduct) {
      setData(data.map((p) => (p.id === editingProduct.id ? { ...p, ...values } : p)));
      message.success('อัพเดทสินค้าแล้ว');
    } else {
      const newProduct = {
        ...values,
        id: Math.max(...data.map((p) => p.id)) + 1,
        rating: 0,
        reviewCount: 0,
        categoryName: categories.find((c) => c.slug === values.category)?.name || '',
      };
      setData([newProduct, ...data]);
      message.success('เพิ่มสินค้าแล้ว');
    }
    setModalOpen(false);
    setEditingProduct(null);
    form.resetFields();
  };

  const openEdit = (product) => {
    setEditingProduct(product);
    form.setFieldsValue(product);
    setModalOpen(true);
  };

  const openAdd = () => {
    setEditingProduct(null);
    form.resetFields();
    form.setFieldsValue({ status: 'active', isFeatured: false, isNew: false });
    setModalOpen(true);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 60,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'ชื่อสินค้า',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      render: (name, record) => (
        <Space>
          <Text strong style={{ maxWidth: 250 }} ellipsis>{name}</Text>
          {record.isNew && <Tag color="green">ใหม่</Tag>}
          {record.isFeatured && <Tag color="blue">แนะนำ</Tag>}
        </Space>
      ),
    },
    {
      title: 'หมวดหมู่',
      dataIndex: 'categoryName',
      key: 'categoryName',
      width: 140,
      filters: categories.map((c) => ({ text: c.name, value: c.name })),
      onFilter: (value, record) => record.categoryName === value,
    },
    {
      title: 'ราคา',
      dataIndex: 'price',
      key: 'price',
      width: 110,
      sorter: (a, b) => a.price - b.price,
      render: (price, record) => (
        <div>
          <Text strong style={{ color: '#1677ff' }}>{formatPrice(price)}</Text>
          {record.originalPrice > price && (
            <div>
              <Text delete type="secondary" style={{ fontSize: 12 }}>
                {formatPrice(record.originalPrice)}
              </Text>
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'สต็อก',
      dataIndex: 'stock',
      key: 'stock',
      width: 90,
      sorter: (a, b) => a.stock - b.stock,
      render: (stock) => (
        <Badge
          status={stock > 100 ? 'success' : stock > 30 ? 'warning' : 'error'}
          text={stock.toLocaleString()}
        />
      ),
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => (
        <Tag color={status === 'active' ? 'success' : 'default'}>
          {status === 'active' ? 'เปิดขาย' : 'ปิดขาย'}
        </Tag>
      ),
    },
    {
      title: 'จัดการ',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => openEdit(record)} />
          <Popconfirm
            title="ลบสินค้านี้?"
            onConfirm={() => handleDelete(record.id)}
            okText="ลบ"
            cancelText="ยกเลิก"
          >
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Title level={4} style={{ margin: 0 }}>จัดการสินค้า</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>
          เพิ่มสินค้า
        </Button>
      </div>

      <Card style={{ borderRadius: 12 }}>
        <Row gutter={[12, 12]} style={{ marginBottom: 16 }}>
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder="ค้นหาสินค้า..."
              prefix={<SearchOutlined />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Select
              value={categoryFilter}
              onChange={setCategoryFilter}
              style={{ width: '100%' }}
              options={[
                { value: 'all', label: 'ทุกหมวดหมู่' },
                ...categories.map((c) => ({ value: c.slug, label: c.name })),
              ]}
            />
          </Col>
          <Col flex="auto" style={{ textAlign: 'right' }}>
            <Text type="secondary">{filtered.length} รายการ</Text>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={filtered.map((p) => ({ ...p, key: p.id }))}
          pagination={{ pageSize: 10, showSizeChanger: true }}
          scroll={{ x: 800 }}
          size="middle"
        />
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        title={editingProduct ? 'แก้ไขสินค้า' : 'เพิ่มสินค้าใหม่'}
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          setEditingProduct(null);
        }}
        onOk={() => form.submit()}
        okText="บันทึก"
        cancelText="ยกเลิก"
        width={640}
      >
        <Form form={form} layout="vertical" onFinish={handleSave} style={{ marginTop: 16 }}>
          <Form.Item name="name" label="ชื่อสินค้า" rules={[{ required: true, message: 'กรุณากรอกชื่อสินค้า' }]}>
            <Input placeholder="ชื่อสินค้า" />
          </Form.Item>
          <Row gutter={12}>
            <Col span={8}>
              <Form.Item name="price" label="ราคาขาย" rules={[{ required: true, message: 'กรุณากรอกราคา' }]}>
                <InputNumber min={0} style={{ width: '100%' }} prefix="฿" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="originalPrice" label="ราคาเดิม">
                <InputNumber min={0} style={{ width: '100%' }} prefix="฿" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="stock" label="สต็อก" rules={[{ required: true, message: 'กรุณากรอกสต็อก' }]}>
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item name="category" label="หมวดหมู่" rules={[{ required: true, message: 'เลือกหมวดหมู่' }]}>
                <Select
                  placeholder="เลือกหมวดหมู่"
                  options={categories.map((c) => ({ value: c.slug, label: c.name }))}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="status" label="สถานะ">
                <Select
                  options={[
                    { value: 'active', label: 'เปิดขาย' },
                    { value: 'inactive', label: 'ปิดขาย' },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item name="isFeatured" label="สินค้าแนะนำ" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="isNew" label="สินค้าใหม่" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}
