import { Button, Card, Form, Input } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuth } from '~/hooks/useAuth';
const { Item, useForm } = Form;
const SignIn = () => {
  const [form] = useForm();
  const router = useRouter();
  const { login, loading, setLoading } = useAuth();
  const onSubmit = async (value: { email: string; password: string }) => {
    setLoading(true);
    const res = await login(value.email, value.password);
    if (res) {
      if (res?.role === 'ADMIN') router.push('/admin');
      if (res?.role === 'HOSPITAL') router.push('/hospitals');
      if (res?.role === 'DRIVER') router.push('/drivers');
      if (res?.role === 'USER') router.push('/clients');
    }
  };
  if (loading) return <div>Loading</div>;
  return (
    <Card title="ACCMA Login" className="w-96 rounded">
      <Form form={form} onFinish={onSubmit} layout="vertical">
        <Item label="Email" name="email" required>
          <Input />
        </Item>
        <Item label="Password" name="password" required>
          <Input.Password />
        </Item>
        <Item>
          <Button htmlType="submit" className="w-full" type="primary">
            Login
          </Button>
        </Item>
      </Form>
    </Card>
  );
};

export default SignIn;
