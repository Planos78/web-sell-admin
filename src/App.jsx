import { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, ConfigProvider, Typography, Avatar, Dropdown, theme } from 'antd';
import thTH from 'antd/locale/th_TH';
import {
  DashboardOutlined,
  ShoppingOutlined,
  OrderedListOutlined,
  UserOutlined,
  AppstoreOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import OrdersPage from './pages/OrdersPage';
import UsersPage from './pages/UsersPage';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const menuItems = [
  { key: '/', icon: <DashboardOutlined />, label: 'แดชบอร์ด' },
  { key: '/products', icon: <ShoppingOutlined />, label: 'สินค้า' },
  { key: '/orders', icon: <OrderedListOutlined />, label: 'คำสั่งซื้อ' },
  { key: '/users', icon: <UserOutlined />, label: 'ผู้ใช้งาน' },
];

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const currentKey = '/' + (location.pathname.split('/')[1] || '');

  return (
    <ConfigProvider
      locale={thTH}
      theme={{
        token: {
          fontFamily: "'Prompt', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          colorPrimary: '#1677ff',
          borderRadius: 8,
        },
        components: {
          Layout: {
            siderBg: '#001529',
            headerBg: '#fff',
          },
        },
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          breakpoint="lg"
          onBreakpoint={(broken) => setCollapsed(broken)}
          className="admin-sider"
          style={{ position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 100 }}
        >
          <div
            style={{
              height: 64,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <ShopOutlined style={{ fontSize: 24, color: '#1677ff' }} />
            {!collapsed && (
              <span style={{ color: '#fff', fontSize: 18, fontWeight: 700, marginLeft: 10 }}>
                ShopMall Admin
              </span>
            )}
          </div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[currentKey]}
            items={menuItems.map((item) => ({
              ...item,
              label: <Link to={item.key}>{item.label}</Link>,
            }))}
            style={{ marginTop: 8 }}
          />
        </Sider>

        <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'margin-left 0.2s' }}>
          <Header
            style={{
              background: '#fff',
              padding: '0 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              position: 'sticky',
              top: 0,
              zIndex: 99,
            }}
          >
            <div
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: 18, cursor: 'pointer', color: '#333' }}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
            <Dropdown
              menu={{
                items: [
                  { key: 'logout', icon: <LogoutOutlined />, label: 'ออกจากระบบ', danger: true },
                ],
              }}
              trigger={['click']}
            >
              <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Avatar size={32} icon={<UserOutlined />} style={{ backgroundColor: '#1677ff' }} />
                <Text strong>Admin</Text>
              </div>
            </Dropdown>
          </Header>

          <Content
            style={{
              margin: 24,
              minHeight: 'calc(100vh - 64px - 48px)',
            }}
          >
            <div className="fade-in">
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/users" element={<UsersPage />} />
              </Routes>
            </div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
