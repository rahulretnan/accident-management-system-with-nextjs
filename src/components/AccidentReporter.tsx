import { CameraOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography } from 'antd';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { useMutation } from 'urql';
import { AddAccident } from '~/gql/client/mutations';
import { useAuth } from '~/hooks/useAuth';
const CameraAppDynamic = dynamic(() => import('./CameraApp'), {
  ssr: false,
});

const AccidentReporter = () => {
  const [form] = Form.useForm();
  const { current_client_id } = useAuth();
  const [visible, setVisible] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  console.log(current_client_id, 'log');

  const [, addAccident] = useMutation(AddAccident);
  const onFinish = async (values) => {
    await addAccident({
      ...values,
      photo: image,
      created_by: current_client_id,
    });
    setImage(null);
    form.resetFields();
  };
  return visible ? (
    <CameraAppDynamic
      setVisible={setVisible}
      setImage={setImage}
      image={image}
    />
  ) : (
    <div className="flex flex-col justify-center items-center">
      <Typography.Title level={5} className="mb-5">
        {' '}
        Report an Accident{' '}
      </Typography.Title>
      <Form
        className="text-center flex flex-col justify-center items-center"
        form={form}
        name="register"
        onFinish={onFinish}
        layout="vertical"
        scrollToFirstError
      >
        <Form.Item
          name="location"
          className="w-full"
          label="Location"
          rules={[
            {
              required: true,
              message: 'Please input your location!',
            },
          ]}
        >
          <Input className="w-full" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          className="w-full"
          rules={[
            {
              type: 'string',
              message: 'Please provide some description',
            },
          ]}
        >
          <Input.TextArea
            className="w-full"
            placeholder="Please provide some description"
          />
        </Form.Item>
        <div
          className="bg-red-500 rounded-full w-12 h-12 flex justify-center items-center mb-6"
          onClick={() => setVisible(true)}
        >
          <CameraOutlined style={{ fontSize: 30, color: '#fff' }} />
        </div>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AccidentReporter;
