import { LogoutOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Layout, Menu } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { Spinner } from '~/components';
import { useAuth } from '~/hooks/useAuth';
import { TProps } from '~/shared/types';

const DriverLayout = ({ children }: TProps<any>) => {
  const router = useRouter();
  const { name, logout, loading } = useAuth();
  const { Content, Footer, Sider } = Layout;
  if (loading) return <Spinner />;
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div className="flex justify-center py-4">
          <Avatar
            size={64}
            style={{ lineHeight: '58px' }}
            icon={<UserOutlined style={{ verticalAlign: 'middle' }} />}
          />
        </div>
        <div className="text-white text-center mb-2">
          <strong>{name}</strong>
        </div>
        <Menu defaultActiveFirst theme="dark" mode="inline">
          <Menu.Item
            key="d1"
            icon={<TeamOutlined />}
            onClick={() => {
              router.push('/admin');
            }}
          >
            Dashboard
          </Menu.Item>

          <Menu.Item
            key="dd1"
            icon={<TeamOutlined />}
            onClick={() => {
              router.push('/hospitals/accidents');
            }}
          >
            Accidents List
          </Menu.Item>
          {/* <Menu.Item
            key="cc1"
            icon={<TeamOutlined />}
            onClick={() => {
              router.push('/admin/drivers');
            }}
          >
            Drivers
          </Menu.Item>
          <Menu.Item
            key="ss1"
            icon={<TeamOutlined />}
            onClick={() => {
              router.push('/admin/clients');
            }}
          >
            Clients
          </Menu.Item> */}

          <Menu.Item
            key="signout"
            icon={<LogoutOutlined />}
            onClick={async () => {
              await logout();
              router.push('/signin');
            }}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: '100vh' }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>ACCMA © 2021</Footer>
      </Layout>
    </Layout>
  );
};

export default DriverLayout;
