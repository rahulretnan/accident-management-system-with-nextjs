import {
  LogoutOutlined,
  MenuOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Avatar, Button, Drawer, Layout, Menu } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Spinner } from '~/components';
import { useAuth } from '~/hooks/useAuth';
import { TProps } from '~/shared/types';

const DriverLayout = ({ children }: TProps<any>) => {
  const router = useRouter();
  const { name, logout, loading } = useAuth();
  const { Content, Footer, Sider } = Layout;
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  if (loading) return <Spinner />;
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Button
        type="primary"
        className="fixed z-50 m-2"
        onClick={showDrawer}
        icon={<MenuOutlined />}
      />
      <Drawer
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <Sider theme="light">
          <div className="flex justify-center py-4">
            <Avatar
              size={64}
              style={{ lineHeight: '58px' }}
              icon={<UserOutlined style={{ verticalAlign: 'middle' }} />}
            />
          </div>
          <div className="text-black text-center mb-2">
            <strong>{name}</strong>
          </div>
          <Menu defaultActiveFirst theme="light" mode="inline">
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
                router.push('/drivers/accidents');
              }}
            >
              Accidents List
            </Menu.Item>
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
      </Drawer>
      <Layout className="site-layout">
        <Content>
          <div
            className="site-layout-background"
            style={{ padding: 0, minHeight: '100vh' }}
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
