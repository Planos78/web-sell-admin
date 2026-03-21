import { Row, Col, Card, Typography, Table, Tag, Space, List, Avatar } from 'antd';
import {
  ShoppingCartOutlined,
  DollarOutlined,
  UserOutlined,
  ShoppingOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  RiseOutlined,
} from '@ant-design/icons';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { orders, products, dailySales, categories, formatPrice } from '../data/mockData';

const { Title, Text } = Typography;

const stats = [
  {
    title: 'รายได้วันนี้',
    value: '฿25,400',
    change: '+12.5%',
    up: true,
    icon: <DollarOutlined />,
    color: '#52c41a',
    bg: '#f6ffed',
  },
  {
    title: 'คำสั่งซื้อวันนี้',
    value: '18',
    change: '+8.3%',
    up: true,
    icon: <ShoppingCartOutlined />,
    color: '#1677ff',
    bg: '#e6f4ff',
  },
  {
    title: 'สินค้าทั้งหมด',
    value: '22',
    change: '+2',
    up: true,
    icon: <ShoppingOutlined />,
    color: '#722ed1',
    bg: '#f9f0ff',
  },
  {
    title: 'สมาชิกทั้งหมด',
    value: '156',
    change: '+5.2%',
    up: true,
    icon: <UserOutlined />,
    color: '#fa8c16',
    bg: '#fff7e6',
  },
];

const categoryData = categories.map((c) => ({
  name: c.name,
  value: c.productCount,
  color: c.color,
}));

const recentOrderColumns = [
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
  },
  {
    title: 'ยอด',
    dataIndex: 'totalPrice',
    key: 'totalPrice',
    render: (price) => <Text strong style={{ color: '#1677ff' }}>{formatPrice(price)}</Text>,
  },
  {
    title: 'สถานะ',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      const colorMap = {
        'กำลังดำเนินการ': 'processing',
        'จัดส่งแล้ว': 'blue',
        'สำเร็จ': 'success',
        'ยกเลิก': 'error',
      };
      return <Tag color={colorMap[status]}>{status}</Tag>;
    },
  },
];

const topProducts = products
  .sort((a, b) => b.reviewCount - a.reviewCount)
  .slice(0, 5);

export default function DashboardPage() {
  return (
    <div>
      <Title level={4} style={{ marginBottom: 24 }}>แดชบอร์ด</Title>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {stats.map((stat, i) => (
          <Col xs={24} sm={12} lg={6} key={i}>
            <Card className="stat-card" styles={{ body: { padding: 20 } }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <Text type="secondary" style={{ fontSize: 13 }}>{stat.title}</Text>
                  <Title level={3} style={{ margin: '4px 0' }}>{stat.value}</Title>
                  <Space size={4}>
                    {stat.up ? (
                      <ArrowUpOutlined style={{ color: '#52c41a', fontSize: 12 }} />
                    ) : (
                      <ArrowDownOutlined style={{ color: '#ff4d4f', fontSize: 12 }} />
                    )}
                    <Text style={{ color: stat.up ? '#52c41a' : '#ff4d4f', fontSize: 13 }}>
                      {stat.change}
                    </Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>จากเมื่อวาน</Text>
                  </Space>
                </div>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: stat.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 22,
                    color: stat.color,
                  }}
                >
                  {stat.icon}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Charts */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={16}>
          <Card title="รายได้ 7 วันล่าสุด" style={{ borderRadius: 12 }}>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dailySales}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1677ff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#1677ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `฿${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(value) => [`฿${value.toLocaleString()}`, 'รายได้']} />
                <Area type="monotone" dataKey="revenue" stroke="#1677ff" fill="url(#colorRevenue)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="สินค้าตามหมวดหมู่" style={{ borderRadius: 12 }}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Recent Orders & Top Products */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={14}>
          <Card title="คำสั่งซื้อล่าสุด" style={{ borderRadius: 12 }}>
            <Table
              columns={recentOrderColumns}
              dataSource={orders.slice(0, 5).map((o) => ({ ...o, key: o.id }))}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card title="สินค้ายอดนิยม" style={{ borderRadius: 12 }}>
            <List
              itemLayout="horizontal"
              dataSource={topProducts}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        style={{
                          backgroundColor: index < 3 ? '#1677ff' : '#d9d9d9',
                          fontWeight: 700,
                        }}
                      >
                        {index + 1}
                      </Avatar>
                    }
                    title={<Text ellipsis style={{ maxWidth: 200 }}>{item.name}</Text>}
                    description={`${item.reviewCount.toLocaleString()} รีวิว`}
                  />
                  <Text strong style={{ color: '#1677ff' }}>{formatPrice(item.price)}</Text>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
