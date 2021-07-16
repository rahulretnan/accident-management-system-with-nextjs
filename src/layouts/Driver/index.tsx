import {
  LogoutOutlined,
  MenuOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Drawer, Layout, Menu } from 'antd';
import { get } from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'urql';
import { Spinner } from '~/components';
import { GetUserProfile } from '~/gql/user/quries';
import { useAuth } from '~/hooks/useAuth';
import { TProps } from '~/shared/types';

const DriverLayout = ({ children }: TProps<any>) => {
  const router = useRouter();
  const { name, logout, loading, user_id, dispatch } = useAuth();

  const { Content, Footer, Sider } = Layout;
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const [profile, setProfile] = useState();

  const [{ data }] = useQuery({
    query: GetUserProfile,
    requestPolicy: 'network-only',
    variables: { user_id: user_id },
    pause: !user_id,
  });

  useEffect(() => {
    if (data) {
      setProfile(get(data, 'users.0.drivers.0.profile_picture'));
      dispatch({
        type: 'SET_USER',
        payload: { current_driver_id: get(data, 'users.0.drivers.0.id') },
      });
    }
  }, [data]);

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
              icon={
                !profile && <UserOutlined style={{ verticalAlign: 'middle' }} />
              }
              src={profile}
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
                router.push('/drivers');
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
