import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Select, Upload } from 'antd';
import { RcFile } from 'antd/lib/upload';
import { omit } from 'lodash';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { beforeUpload, getBase64 } from '~/helpers/file-uploader';
import { useAuth } from '~/hooks/useAuth';
import { THospital } from '~/shared/types';

export const HospitalForm = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { setLoading, register } = useAuth();
  const [file, setFile] = useState<RcFile>();

  const onFinish = async (values: THospital) => {
    setLoading(true);
    const newData = omit(values, ['confirm']);
    const formData = {
      ...newData,
      availability: values?.availability as boolean,
      role: 'HOSPITAL',
      profile_picture: await getBase64(file as RcFile),
    };
    try {
      await register(formData);
    } catch (e) {
      console.log(e);
    }
    form.resetFields();
    setLoading(false);
    router.push('/admin/hospitals');
  };

  return (
    <Form
      className="text-left"
      form={form}
      name="register"
      onFinish={onFinish}
      layout="vertical"
      scrollToFirstError
    >
      <div className="row">
        <div className="col-6">
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: 'Please input your Name!',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!'
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              {
                type: 'number',
                required: true,
              },
            ]}
          >
            <InputNumber className="w-full" />
          </Form.Item>
          <Form.Item
            name="website"
            label="Website"
            rules={[
              {
                required: true,
                message: 'Please input your Website!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="location"
            label="Location"
            rules={[
              {
                required: true,
                message: 'Please input your Location!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="locality"
            label="Locality"
            rules={[
              {
                required: true,
                message: 'Please input your Location!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="availability"
            label="Availability"
            rules={[
              {
                required: true,
                message: 'Please select availability option!',
              },
            ]}
          >
            <Select defaultValue="true" placeholder="Select">
              <Select.Option value="true">Available</Select.Option>
              <Select.Option value="false">UnAvailable</Select.Option>
            </Select>
          </Form.Item>
        </div>
      </div>

      <Form.Item label="Profile Picture" valuePropName="fileList">
        <Upload
          beforeUpload={(file) => {
            beforeUpload(file, setFile);
          }}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};
