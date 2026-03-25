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
  Tabs,
  Statistic,
  Badge,
  Progress,
  Tooltip,
  DatePicker,
  Descriptions,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  EyeOutlined,
  FacebookOutlined,
  RiseOutlined,
  FallOutlined,
  DollarOutlined,
  TeamOutlined,
  BarChartOutlined,
  ThunderboltOutlined,
  LineChartOutlined,
} from '@ant-design/icons';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  fbAdsCampaigns as initialCampaigns,
  fbAdsAdSets as initialAdSets,
  fbAdsAds as initialAds,
  fbAdsDailyStats,
  formatPrice,
} from '../data/mockData';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const statusConfig = {
  active: { color: 'success', label: 'กำลังทำงาน' },
  paused: { color: 'warning', label: 'หยุดชั่วคราว' },
  completed: { color: 'default', label: 'เสร็จสิ้น' },
  draft: { color: 'processing', label: 'แบบร่าง' },
};

const objectiveLabels = {
  CONVERSIONS: { label: 'Conversions', color: '#52c41a' },
  BRAND_AWARENESS: { label: 'Brand Awareness', color: '#1677ff' },
  TRAFFIC: { label: 'Traffic', color: '#fa8c16' },
  PAGE_LIKES: { label: 'Page Likes', color: '#eb2f96' },
  VIDEO_VIEWS: { label: 'Video Views', color: '#722ed1' },
};

const adTypeLabels = {
  image: { label: 'รูปภาพ', color: 'blue' },
  carousel: { label: 'Carousel', color: 'purple' },
  video: { label: 'วิดีโอ', color: 'magenta' },
};

// ==================== Overview Tab ====================
function OverviewTab({ campaigns, dailyStats }) {
  const activeCampaigns = campaigns.filter((c) => c.status === 'active');
  const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0);
  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
  const totalReach = campaigns.reduce((sum, c) => sum + c.reach, 0);
  const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);
  const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);
  const totalImpressions = campaigns.reduce((sum, c) => sum + c.impressions, 0);
  const avgCTR = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : 0;

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card" style={{ borderRadius: 12 }}>
            <Statistic
              title="ค่าโฆษณาทั้งหมด"
              value={totalSpent}
              prefix={<DollarOutlined style={{ color: '#f5222d' }} />}
              formatter={(val) => formatPrice(val)}
              valueStyle={{ color: '#f5222d' }}
            />
            <Progress
              percent={Math.round((totalSpent / totalBudget) * 100)}
              size="small"
              strokeColor="#f5222d"
              style={{ marginTop: 8 }}
            />
            <Text type="secondary" style={{ fontSize: 12 }}>
              จากงบทั้งหมด {formatPrice(totalBudget)}
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card" style={{ borderRadius: 12 }}>
            <Statistic
              title="การเข้าถึง (Reach)"
              value={totalReach}
              prefix={<TeamOutlined style={{ color: '#1677ff' }} />}
              formatter={(val) => val.toLocaleString()}
              valueStyle={{ color: '#1677ff' }}
            />
            <Text type="secondary" style={{ fontSize: 12, marginTop: 8, display: 'block' }}>
              <RiseOutlined style={{ color: '#52c41a' }} /> เพิ่มขึ้น 12.5% จากสัปดาห์ก่อน
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card" style={{ borderRadius: 12 }}>
            <Statistic
              title="คลิกทั้งหมด"
              value={totalClicks}
              prefix={<BarChartOutlined style={{ color: '#fa8c16' }} />}
              formatter={(val) => val.toLocaleString()}
              valueStyle={{ color: '#fa8c16' }}
            />
            <Text type="secondary" style={{ fontSize: 12, marginTop: 8, display: 'block' }}>
              CTR เฉลี่ย {avgCTR}%
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card" style={{ borderRadius: 12 }}>
            <Statistic
              title="Conversions"
              value={totalConversions}
              prefix={<ThunderboltOutlined style={{ color: '#52c41a' }} />}
              formatter={(val) => val.toLocaleString()}
              valueStyle={{ color: '#52c41a' }}
            />
            <Text type="secondary" style={{ fontSize: 12, marginTop: 8, display: 'block' }}>
              จาก {activeCampaigns.length} แคมเปญที่ทำงานอยู่
            </Text>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={14}>
          <Card title="ค่าโฆษณาและคลิก (7 วันล่าสุด)" style={{ borderRadius: 12 }}>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dailyStats}>
                <defs>
                  <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f5222d" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f5222d" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1677ff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#1677ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <RechartsTooltip />
                <Legend />
                <Area yAxisId="left" type="monotone" dataKey="spent" stroke="#f5222d" fill="url(#colorSpent)" name="ค่าโฆษณา (฿)" />
                <Area yAxisId="right" type="monotone" dataKey="clicks" stroke="#1677ff" fill="url(#colorClicks)" name="คลิก" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card title="Conversions รายวัน" style={{ borderRadius: 12 }}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" />
                <YAxis />
                <RechartsTooltip />
                <Bar dataKey="conversions" fill="#52c41a" radius={[4, 4, 0, 0]} name="Conversions" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Card title="แคมเปญที่กำลังทำงาน" style={{ borderRadius: 12, marginTop: 16 }}>
        <Table
          dataSource={activeCampaigns.map((c) => ({ ...c, key: c.id }))}
          pagination={false}
          size="middle"
          scroll={{ x: 800 }}
          columns={[
            { title: 'แคมเปญ', dataIndex: 'name', key: 'name', ellipsis: true, render: (name) => <Text strong>{name}</Text> },
            {
              title: 'วัตถุประสงค์',
              dataIndex: 'objective',
              key: 'objective',
              width: 150,
              render: (obj) => <Tag color={objectiveLabels[obj]?.color}>{objectiveLabels[obj]?.label}</Tag>,
            },
            {
              title: 'งบ/ใช้ไป',
              key: 'budget',
              width: 180,
              render: (_, r) => (
                <div>
                  <Text>{formatPrice(r.spent)} / {formatPrice(r.budget)}</Text>
                  <Progress percent={Math.round((r.spent / r.budget) * 100)} size="small" style={{ marginTop: 4 }} />
                </div>
              ),
            },
            { title: 'Reach', dataIndex: 'reach', key: 'reach', width: 100, render: (v) => v.toLocaleString() },
            { title: 'Clicks', dataIndex: 'clicks', key: 'clicks', width: 80, render: (v) => v.toLocaleString() },
            { title: 'CTR', dataIndex: 'ctr', key: 'ctr', width: 80, render: (v) => `${v}%` },
            {
              title: 'ROAS',
              dataIndex: 'roas',
              key: 'roas',
              width: 80,
              render: (v) => (
                <Text style={{ color: v >= 3 ? '#52c41a' : v >= 1 ? '#fa8c16' : '#f5222d' }}>
                  {v > 0 ? `${v}x` : '-'}
                </Text>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
}

// ==================== Campaigns Tab ====================
function CampaignsTab({ campaigns, setCampaigns }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [detailModal, setDetailModal] = useState(null);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [form] = Form.useForm();

  const filtered = campaigns.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const toggleStatus = (id) => {
    setCampaigns(
      campaigns.map((c) => {
        if (c.id !== id) return c;
        const newStatus = c.status === 'active' ? 'paused' : 'active';
        message.success(newStatus === 'active' ? 'เปิดแคมเปญแล้ว' : 'หยุดแคมเปญชั่วคราว');
        return { ...c, status: newStatus };
      })
    );
  };

  const handleDelete = (id) => {
    setCampaigns(campaigns.filter((c) => c.id !== id));
    message.success('ลบแคมเปญแล้ว');
  };

  const handleSave = (values) => {
    if (editingCampaign) {
      setCampaigns(campaigns.map((c) => (c.id === editingCampaign.id ? { ...c, ...values } : c)));
      message.success('อัพเดทแคมเปญแล้ว');
    } else {
      const newCampaign = {
        ...values,
        id: `C-${String(campaigns.length + 1).padStart(3, '0')}`,
        spent: 0, reach: 0, impressions: 0, clicks: 0, conversions: 0,
        ctr: 0, cpc: 0, cpm: 0, roas: 0, status: 'draft',
      };
      setCampaigns([newCampaign, ...campaigns]);
      message.success('สร้างแคมเปญใหม่แล้ว');
    }
    setModalOpen(false);
    setEditingCampaign(null);
    form.resetFields();
  };

  const openEdit = (campaign) => {
    setEditingCampaign(campaign);
    form.setFieldsValue(campaign);
    setModalOpen(true);
  };

  const openAdd = () => {
    setEditingCampaign(null);
    form.resetFields();
    setModalOpen(true);
  };

  const columns = [
    {
      title: 'แคมเปญ',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      render: (name, record) => (
        <div>
          <Text strong>{name}</Text>
          <div><Tag color={objectiveLabels[record.objective]?.color} style={{ marginTop: 4 }}>{objectiveLabels[record.objective]?.label}</Tag></div>
        </div>
      ),
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      key: 'status',
      width: 130,
      render: (status) => <Tag color={statusConfig[status]?.color}>{statusConfig[status]?.label}</Tag>,
    },
    {
      title: 'งบประมาณ',
      key: 'budget',
      width: 180,
      sorter: (a, b) => a.budget - b.budget,
      render: (_, r) => (
        <div>
          <Text>{formatPrice(r.spent)} / {formatPrice(r.budget)}</Text>
          <Progress percent={r.budget > 0 ? Math.round((r.spent / r.budget) * 100) : 0} size="small" style={{ marginTop: 4 }} />
        </div>
      ),
    },
    { title: 'Reach', dataIndex: 'reach', key: 'reach', width: 100, sorter: (a, b) => a.reach - b.reach, render: (v) => v.toLocaleString() },
    { title: 'Clicks', dataIndex: 'clicks', key: 'clicks', width: 80, sorter: (a, b) => a.clicks - b.clicks, render: (v) => v.toLocaleString() },
    { title: 'CTR', dataIndex: 'ctr', key: 'ctr', width: 80, sorter: (a, b) => a.ctr - b.ctr, render: (v) => `${v}%` },
    {
      title: 'ROAS',
      dataIndex: 'roas',
      key: 'roas',
      width: 80,
      sorter: (a, b) => a.roas - b.roas,
      render: (v) => (
        <Text strong style={{ color: v >= 3 ? '#52c41a' : v >= 1 ? '#fa8c16' : v > 0 ? '#f5222d' : '#999' }}>
          {v > 0 ? `${v}x` : '-'}
        </Text>
      ),
    },
    {
      title: 'จัดการ',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space>
          <Tooltip title="ดูรายละเอียด">
            <Button size="small" icon={<EyeOutlined />} onClick={() => setDetailModal(record)} />
          </Tooltip>
          {(record.status === 'active' || record.status === 'paused') && (
            <Tooltip title={record.status === 'active' ? 'หยุดชั่วคราว' : 'เปิดใช้งาน'}>
              <Button
                size="small"
                icon={record.status === 'active' ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                onClick={() => toggleStatus(record.id)}
              />
            </Tooltip>
          )}
          <Button size="small" icon={<EditOutlined />} onClick={() => openEdit(record)} />
          <Popconfirm title="ลบแคมเปญนี้?" onConfirm={() => handleDelete(record.id)} okText="ลบ" cancelText="ยกเลิก">
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card style={{ borderRadius: 12 }}>
        <Row gutter={[12, 12]} style={{ marginBottom: 16 }}>
          <Col xs={24} sm={10} md={8}>
            <Input placeholder="ค้นหาแคมเปญ..." prefix={<SearchOutlined />} value={search} onChange={(e) => setSearch(e.target.value)} allowClear />
          </Col>
          <Col xs={24} sm={8} md={6}>
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: '100%' }}
              options={[
                { value: 'all', label: 'ทุกสถานะ' },
                { value: 'active', label: 'กำลังทำงาน' },
                { value: 'paused', label: 'หยุดชั่วคราว' },
                { value: 'completed', label: 'เสร็จสิ้น' },
                { value: 'draft', label: 'แบบร่าง' },
              ]}
            />
          </Col>
          <Col flex="auto" style={{ textAlign: 'right' }}>
            <Text type="secondary">{filtered.length} แคมเปญ</Text>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={filtered.map((c) => ({ ...c, key: c.id }))}
          pagination={{ pageSize: 10, showSizeChanger: true }}
          scroll={{ x: 900 }}
          size="middle"
        />
      </Card>

      {/* Campaign Detail Modal */}
      <Modal
        title="รายละเอียดแคมเปญ"
        open={!!detailModal}
        onCancel={() => setDetailModal(null)}
        footer={null}
        width={700}
      >
        {detailModal && (
          <div>
            <Title level={5}>{detailModal.name}</Title>
            <Descriptions column={{ xs: 1, sm: 2 }} bordered size="small" style={{ marginTop: 16 }}>
              <Descriptions.Item label="วัตถุประสงค์">
                <Tag color={objectiveLabels[detailModal.objective]?.color}>{objectiveLabels[detailModal.objective]?.label}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="สถานะ">
                <Tag color={statusConfig[detailModal.status]?.color}>{statusConfig[detailModal.status]?.label}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="งบประมาณ">{formatPrice(detailModal.budget)}</Descriptions.Item>
              <Descriptions.Item label="ใช้ไปแล้ว">{formatPrice(detailModal.spent)}</Descriptions.Item>
              <Descriptions.Item label="ระยะเวลา">{detailModal.startDate} ถึง {detailModal.endDate}</Descriptions.Item>
              <Descriptions.Item label="Reach">{detailModal.reach.toLocaleString()}</Descriptions.Item>
              <Descriptions.Item label="Impressions">{detailModal.impressions.toLocaleString()}</Descriptions.Item>
              <Descriptions.Item label="Clicks">{detailModal.clicks.toLocaleString()}</Descriptions.Item>
              <Descriptions.Item label="CTR">{detailModal.ctr}%</Descriptions.Item>
              <Descriptions.Item label="CPC">{formatPrice(detailModal.cpc)}</Descriptions.Item>
              <Descriptions.Item label="CPM">{formatPrice(detailModal.cpm)}</Descriptions.Item>
              <Descriptions.Item label="ROAS">{detailModal.roas > 0 ? `${detailModal.roas}x` : '-'}</Descriptions.Item>
              <Descriptions.Item label="Conversions">{detailModal.conversions > 0 ? detailModal.conversions.toLocaleString() : '-'}</Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>

      {/* Add/Edit Campaign Modal */}
      <Modal
        title={editingCampaign ? 'แก้ไขแคมเปญ' : 'สร้างแคมเปญใหม่'}
        open={modalOpen}
        onCancel={() => { setModalOpen(false); setEditingCampaign(null); }}
        onOk={() => form.submit()}
        okText="บันทึก"
        cancelText="ยกเลิก"
        width={640}
      >
        <Form form={form} layout="vertical" onFinish={handleSave} style={{ marginTop: 16 }}>
          <Form.Item name="name" label="ชื่อแคมเปญ" rules={[{ required: true, message: 'กรุณากรอกชื่อแคมเปญ' }]}>
            <Input placeholder="ชื่อแคมเปญ" />
          </Form.Item>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item name="objective" label="วัตถุประสงค์" rules={[{ required: true, message: 'เลือกวัตถุประสงค์' }]}>
                <Select
                  placeholder="เลือกวัตถุประสงค์"
                  options={Object.entries(objectiveLabels).map(([value, { label }]) => ({ value, label }))}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="budget" label="งบประมาณ (฿)" rules={[{ required: true, message: 'กรุณากรอกงบประมาณ' }]}>
                <InputNumber min={0} style={{ width: '100%' }} prefix="฿" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item name="startDate" label="วันเริ่มต้น" rules={[{ required: true, message: 'กรุณาระบุวันเริ่มต้น' }]}>
                <Input type="date" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="endDate" label="วันสิ้นสุด" rules={[{ required: true, message: 'กรุณาระบุวันสิ้นสุด' }]}>
                <Input type="date" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}

// ==================== Ad Sets Tab ====================
function AdSetsTab({ adSets, setAdSets, campaigns }) {
  const [search, setSearch] = useState('');
  const [campaignFilter, setCampaignFilter] = useState('all');
  const [detailModal, setDetailModal] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAdSet, setEditingAdSet] = useState(null);
  const [form] = Form.useForm();

  const filtered = adSets.filter((a) => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase());
    const matchCampaign = campaignFilter === 'all' || a.campaignId === campaignFilter;
    return matchSearch && matchCampaign;
  });

  const handleDelete = (id) => {
    setAdSets(adSets.filter((a) => a.id !== id));
    message.success('ลบชุดโฆษณาแล้ว');
  };

  const handleSave = (values) => {
    const campaign = campaigns.find((c) => c.id === values.campaignId);
    if (editingAdSet) {
      setAdSets(adSets.map((a) => (a.id === editingAdSet.id ? { ...a, ...values, campaignName: campaign?.name || '' } : a)));
      message.success('อัพเดทชุดโฆษณาแล้ว');
    } else {
      const newAdSet = {
        ...values,
        id: `AS-${String(adSets.length + 1).padStart(3, '0')}`,
        campaignName: campaign?.name || '',
        spent: 0, reach: 0, impressions: 0, clicks: 0, status: 'active',
      };
      setAdSets([newAdSet, ...adSets]);
      message.success('สร้างชุดโฆษณาใหม่แล้ว');
    }
    setModalOpen(false);
    setEditingAdSet(null);
    form.resetFields();
  };

  const openEdit = (adSet) => {
    setEditingAdSet(adSet);
    form.setFieldsValue(adSet);
    setModalOpen(true);
  };

  const openAdd = () => {
    setEditingAdSet(null);
    form.resetFields();
    setModalOpen(true);
  };

  const columns = [
    {
      title: 'ชุดโฆษณา',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      render: (name, record) => (
        <div>
          <Text strong>{name}</Text>
          <div><Text type="secondary" style={{ fontSize: 12 }}>{record.campaignName}</Text></div>
        </div>
      ),
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      key: 'status',
      width: 130,
      render: (status) => <Tag color={statusConfig[status]?.color}>{statusConfig[status]?.label}</Tag>,
    },
    {
      title: 'กลุ่มเป้าหมาย',
      dataIndex: 'audience',
      key: 'audience',
      ellipsis: true,
      width: 200,
    },
    {
      title: 'งบประมาณ',
      key: 'budget',
      width: 160,
      render: (_, r) => (
        <div>
          <Text>{formatPrice(r.spent)} / {formatPrice(r.budget)}</Text>
          <Progress percent={r.budget > 0 ? Math.round((r.spent / r.budget) * 100) : 0} size="small" style={{ marginTop: 4 }} />
        </div>
      ),
    },
    { title: 'Reach', dataIndex: 'reach', key: 'reach', width: 100, render: (v) => v.toLocaleString() },
    { title: 'Clicks', dataIndex: 'clicks', key: 'clicks', width: 80, render: (v) => v.toLocaleString() },
    {
      title: 'จัดการ',
      key: 'actions',
      width: 130,
      render: (_, record) => (
        <Space>
          <Button size="small" icon={<EyeOutlined />} onClick={() => setDetailModal(record)} />
          <Button size="small" icon={<EditOutlined />} onClick={() => openEdit(record)} />
          <Popconfirm title="ลบชุดโฆษณานี้?" onConfirm={() => handleDelete(record.id)} okText="ลบ" cancelText="ยกเลิก">
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card style={{ borderRadius: 12 }}>
        <Row gutter={[12, 12]} style={{ marginBottom: 16 }}>
          <Col xs={24} sm={10} md={8}>
            <Input placeholder="ค้นหาชุดโฆษณา..." prefix={<SearchOutlined />} value={search} onChange={(e) => setSearch(e.target.value)} allowClear />
          </Col>
          <Col xs={24} sm={8} md={6}>
            <Select
              value={campaignFilter}
              onChange={setCampaignFilter}
              style={{ width: '100%' }}
              options={[
                { value: 'all', label: 'ทุกแคมเปญ' },
                ...campaigns.map((c) => ({ value: c.id, label: c.name })),
              ]}
            />
          </Col>
          <Col flex="auto" style={{ textAlign: 'right' }}>
            <Text type="secondary">{filtered.length} ชุดโฆษณา</Text>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={filtered.map((a) => ({ ...a, key: a.id }))}
          pagination={{ pageSize: 10, showSizeChanger: true }}
          scroll={{ x: 900 }}
          size="middle"
        />
      </Card>

      {/* Detail Modal */}
      <Modal title="รายละเอียดชุดโฆษณา" open={!!detailModal} onCancel={() => setDetailModal(null)} footer={null} width={600}>
        {detailModal && (
          <Descriptions column={{ xs: 1, sm: 2 }} bordered size="small" style={{ marginTop: 16 }}>
            <Descriptions.Item label="ชื่อ" span={2}>{detailModal.name}</Descriptions.Item>
            <Descriptions.Item label="แคมเปญ" span={2}>{detailModal.campaignName}</Descriptions.Item>
            <Descriptions.Item label="สถานะ"><Tag color={statusConfig[detailModal.status]?.color}>{statusConfig[detailModal.status]?.label}</Tag></Descriptions.Item>
            <Descriptions.Item label="งบประมาณ">{formatPrice(detailModal.budget)}</Descriptions.Item>
            <Descriptions.Item label="กลุ่มเป้าหมาย" span={2}>{detailModal.audience}</Descriptions.Item>
            <Descriptions.Item label="ตำแหน่งแสดง" span={2}>{detailModal.placements}</Descriptions.Item>
            <Descriptions.Item label="Reach">{detailModal.reach.toLocaleString()}</Descriptions.Item>
            <Descriptions.Item label="Impressions">{detailModal.impressions.toLocaleString()}</Descriptions.Item>
            <Descriptions.Item label="Clicks">{detailModal.clicks.toLocaleString()}</Descriptions.Item>
            <Descriptions.Item label="ใช้ไปแล้ว">{formatPrice(detailModal.spent)}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      {/* Add/Edit Ad Set Modal */}
      <Modal
        title={editingAdSet ? 'แก้ไขชุดโฆษณา' : 'สร้างชุดโฆษณาใหม่'}
        open={modalOpen}
        onCancel={() => { setModalOpen(false); setEditingAdSet(null); }}
        onOk={() => form.submit()}
        okText="บันทึก"
        cancelText="ยกเลิก"
        width={640}
      >
        <Form form={form} layout="vertical" onFinish={handleSave} style={{ marginTop: 16 }}>
          <Form.Item name="campaignId" label="แคมเปญ" rules={[{ required: true, message: 'เลือกแคมเปญ' }]}>
            <Select placeholder="เลือกแคมเปญ" options={campaigns.map((c) => ({ value: c.id, label: c.name }))} />
          </Form.Item>
          <Form.Item name="name" label="ชื่อชุดโฆษณา" rules={[{ required: true, message: 'กรุณากรอกชื่อ' }]}>
            <Input placeholder="ชื่อชุดโฆษณา" />
          </Form.Item>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item name="budget" label="งบประมาณ (฿)" rules={[{ required: true, message: 'กรุณากรอกงบประมาณ' }]}>
                <InputNumber min={0} style={{ width: '100%' }} prefix="฿" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="placements" label="ตำแหน่งแสดง">
                <Select
                  mode="multiple"
                  placeholder="เลือกตำแหน่ง"
                  options={[
                    { value: 'Feed', label: 'Feed' },
                    { value: 'Stories', label: 'Stories' },
                    { value: 'Reels', label: 'Reels' },
                    { value: 'Marketplace', label: 'Marketplace' },
                    { value: 'In-stream Video', label: 'In-stream Video' },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="audience" label="กลุ่มเป้าหมาย" rules={[{ required: true, message: 'กรุณาระบุกลุ่มเป้าหมาย' }]}>
            <Input placeholder="เช่น ผู้หญิง 25-34 ปี กรุงเทพ" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

// ==================== Ads Tab ====================
function AdsTab({ ads, setAds, adSets }) {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [detailModal, setDetailModal] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAd, setEditingAd] = useState(null);
  const [form] = Form.useForm();

  const filtered = ads.filter((a) => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.headline.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'all' || a.type === typeFilter;
    return matchSearch && matchType;
  });

  const handleDelete = (id) => {
    setAds(ads.filter((a) => a.id !== id));
    message.success('ลบโฆษณาแล้ว');
  };

  const handleSave = (values) => {
    const adSet = adSets.find((a) => a.id === values.adSetId);
    if (editingAd) {
      setAds(ads.map((a) => (a.id === editingAd.id ? { ...a, ...values, adSetName: adSet?.name || '', campaignName: adSet?.campaignName || '' } : a)));
      message.success('อัพเดทโฆษณาแล้ว');
    } else {
      const newAd = {
        ...values,
        id: `AD-${String(ads.length + 1).padStart(3, '0')}`,
        adSetName: adSet?.name || '',
        campaignName: adSet?.campaignName || '',
        status: 'active',
        reach: 0, impressions: 0, clicks: 0, ctr: 0, spent: 0,
      };
      setAds([newAd, ...ads]);
      message.success('สร้างโฆษณาใหม่แล้ว');
    }
    setModalOpen(false);
    setEditingAd(null);
    form.resetFields();
  };

  const openEdit = (ad) => {
    setEditingAd(ad);
    form.setFieldsValue(ad);
    setModalOpen(true);
  };

  const openAdd = () => {
    setEditingAd(null);
    form.resetFields();
    setModalOpen(true);
  };

  const columns = [
    {
      title: 'โฆษณา',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      render: (name, record) => (
        <div>
          <Space>
            <Text strong>{name}</Text>
            <Tag color={adTypeLabels[record.type]?.color}>{adTypeLabels[record.type]?.label}</Tag>
          </Space>
          <div><Text type="secondary" style={{ fontSize: 12 }}>{record.adSetName}</Text></div>
        </div>
      ),
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      key: 'status',
      width: 130,
      render: (status) => <Tag color={statusConfig[status]?.color}>{statusConfig[status]?.label}</Tag>,
    },
    {
      title: 'Headline',
      dataIndex: 'headline',
      key: 'headline',
      ellipsis: true,
      width: 250,
    },
    { title: 'Reach', dataIndex: 'reach', key: 'reach', width: 90, sorter: (a, b) => a.reach - b.reach, render: (v) => v.toLocaleString() },
    { title: 'Clicks', dataIndex: 'clicks', key: 'clicks', width: 80, sorter: (a, b) => a.clicks - b.clicks, render: (v) => v.toLocaleString() },
    { title: 'CTR', dataIndex: 'ctr', key: 'ctr', width: 80, sorter: (a, b) => a.ctr - b.ctr, render: (v) => `${v}%` },
    {
      title: 'ค่าโฆษณา',
      dataIndex: 'spent',
      key: 'spent',
      width: 110,
      sorter: (a, b) => a.spent - b.spent,
      render: (v) => formatPrice(v),
    },
    {
      title: 'จัดการ',
      key: 'actions',
      width: 130,
      render: (_, record) => (
        <Space>
          <Button size="small" icon={<EyeOutlined />} onClick={() => setDetailModal(record)} />
          <Button size="small" icon={<EditOutlined />} onClick={() => openEdit(record)} />
          <Popconfirm title="ลบโฆษณานี้?" onConfirm={() => handleDelete(record.id)} okText="ลบ" cancelText="ยกเลิก">
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card style={{ borderRadius: 12 }}>
        <Row gutter={[12, 12]} style={{ marginBottom: 16 }}>
          <Col xs={24} sm={10} md={8}>
            <Input placeholder="ค้นหาโฆษณา..." prefix={<SearchOutlined />} value={search} onChange={(e) => setSearch(e.target.value)} allowClear />
          </Col>
          <Col xs={24} sm={8} md={6}>
            <Select
              value={typeFilter}
              onChange={setTypeFilter}
              style={{ width: '100%' }}
              options={[
                { value: 'all', label: 'ทุกประเภท' },
                { value: 'image', label: 'รูปภาพ' },
                { value: 'carousel', label: 'Carousel' },
                { value: 'video', label: 'วิดีโอ' },
              ]}
            />
          </Col>
          <Col flex="auto" style={{ textAlign: 'right' }}>
            <Text type="secondary">{filtered.length} โฆษณา</Text>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={filtered.map((a) => ({ ...a, key: a.id }))}
          pagination={{ pageSize: 10, showSizeChanger: true }}
          scroll={{ x: 900 }}
          size="middle"
        />
      </Card>

      {/* Detail Modal */}
      <Modal title="รายละเอียดโฆษณา" open={!!detailModal} onCancel={() => setDetailModal(null)} footer={null} width={650}>
        {detailModal && (
          <div>
            <Card
              style={{ borderRadius: 12, marginBottom: 16, background: '#fafafa' }}
              size="small"
            >
              <Text type="secondary" style={{ fontSize: 12 }}>PREVIEW</Text>
              <div style={{ marginTop: 8 }}>
                <div style={{ background: '#e6e6e6', borderRadius: 8, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                  <Tag color={adTypeLabels[detailModal.type]?.color} style={{ fontSize: 14 }}>{adTypeLabels[detailModal.type]?.label}</Tag>
                </div>
                <Title level={5} style={{ margin: 0 }}>{detailModal.headline}</Title>
                <Text type="secondary">{detailModal.description}</Text>
                <div style={{ marginTop: 8 }}>
                  <Button type="primary" size="small">{detailModal.cta}</Button>
                </div>
              </div>
            </Card>
            <Descriptions column={{ xs: 1, sm: 2 }} bordered size="small">
              <Descriptions.Item label="แคมเปญ" span={2}>{detailModal.campaignName}</Descriptions.Item>
              <Descriptions.Item label="ชุดโฆษณา" span={2}>{detailModal.adSetName}</Descriptions.Item>
              <Descriptions.Item label="สถานะ"><Tag color={statusConfig[detailModal.status]?.color}>{statusConfig[detailModal.status]?.label}</Tag></Descriptions.Item>
              <Descriptions.Item label="ประเภท"><Tag color={adTypeLabels[detailModal.type]?.color}>{adTypeLabels[detailModal.type]?.label}</Tag></Descriptions.Item>
              <Descriptions.Item label="Reach">{detailModal.reach.toLocaleString()}</Descriptions.Item>
              <Descriptions.Item label="Impressions">{detailModal.impressions.toLocaleString()}</Descriptions.Item>
              <Descriptions.Item label="Clicks">{detailModal.clicks.toLocaleString()}</Descriptions.Item>
              <Descriptions.Item label="CTR">{detailModal.ctr}%</Descriptions.Item>
              <Descriptions.Item label="ค่าโฆษณา" span={2}>{formatPrice(detailModal.spent)}</Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>

      {/* Add/Edit Ad Modal */}
      <Modal
        title={editingAd ? 'แก้ไขโฆษณา' : 'สร้างโฆษณาใหม่'}
        open={modalOpen}
        onCancel={() => { setModalOpen(false); setEditingAd(null); }}
        onOk={() => form.submit()}
        okText="บันทึก"
        cancelText="ยกเลิก"
        width={640}
      >
        <Form form={form} layout="vertical" onFinish={handleSave} style={{ marginTop: 16 }}>
          <Form.Item name="adSetId" label="ชุดโฆษณา" rules={[{ required: true, message: 'เลือกชุดโฆษณา' }]}>
            <Select
              placeholder="เลือกชุดโฆษณา"
              options={adSets.map((a) => ({ value: a.id, label: `${a.name} (${a.campaignName})` }))}
            />
          </Form.Item>
          <Form.Item name="name" label="ชื่อโฆษณา" rules={[{ required: true, message: 'กรุณากรอกชื่อ' }]}>
            <Input placeholder="ชื่อโฆษณา" />
          </Form.Item>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item name="type" label="ประเภท" rules={[{ required: true, message: 'เลือกประเภท' }]}>
                <Select
                  placeholder="เลือกประเภท"
                  options={Object.entries(adTypeLabels).map(([value, { label }]) => ({ value, label }))}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="cta" label="Call to Action" rules={[{ required: true, message: 'เลือก CTA' }]}>
                <Select
                  placeholder="เลือก CTA"
                  options={[
                    { value: 'ซื้อเลย', label: 'ซื้อเลย' },
                    { value: 'ดูเพิ่มเติม', label: 'ดูเพิ่มเติม' },
                    { value: 'สมัครเลย', label: 'สมัครเลย' },
                    { value: 'ติดต่อเรา', label: 'ติดต่อเรา' },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="headline" label="Headline" rules={[{ required: true, message: 'กรุณากรอก Headline' }]}>
            <Input placeholder="ข้อความหลัก" />
          </Form.Item>
          <Form.Item name="description" label="รายละเอียด">
            <Input.TextArea rows={3} placeholder="รายละเอียดเพิ่มเติม" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

// ==================== Main FB Ads Page ====================
export default function FBAdsPage() {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [adSets, setAdSets] = useState(initialAdSets);
  const [ads, setAds] = useState(initialAds);
  const [activeTab, setActiveTab] = useState('overview');

  const tabItems = [
    {
      key: 'overview',
      label: (
        <span><LineChartOutlined /> ภาพรวม</span>
      ),
      children: <OverviewTab campaigns={campaigns} dailyStats={fbAdsDailyStats} />,
    },
    {
      key: 'campaigns',
      label: (
        <span><BarChartOutlined /> แคมเปญ ({campaigns.length})</span>
      ),
      children: <CampaignsTab campaigns={campaigns} setCampaigns={setCampaigns} />,
    },
    {
      key: 'adsets',
      label: (
        <span><TeamOutlined /> ชุดโฆษณา ({adSets.length})</span>
      ),
      children: <AdSetsTab adSets={adSets} setAdSets={setAdSets} campaigns={campaigns} />,
    },
    {
      key: 'ads',
      label: (
        <span><FacebookOutlined /> โฆษณา ({ads.length})</span>
      ),
      children: <AdsTab ads={ads} setAds={setAds} adSets={adSets} />,
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Title level={4} style={{ margin: 0 }}>
          <FacebookOutlined style={{ color: '#1877f2', marginRight: 8 }} />
          จัดการ Facebook Ads
        </Title>
        {activeTab !== 'overview' && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              const tabEl = document.querySelector('.ant-tabs-content-holder');
              if (tabEl) {
                const addBtn = tabEl.querySelector('.ant-btn-primary');
              }
            }}
          >
            {activeTab === 'campaigns' ? 'สร้างแคมเปญ' : activeTab === 'adsets' ? 'สร้างชุดโฆษณา' : 'สร้างโฆษณา'}
          </Button>
        )}
      </div>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        type="card"
        size="large"
      />
    </div>
  );
}
