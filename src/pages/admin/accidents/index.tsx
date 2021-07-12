import { Button, Form, Input, Modal, Table } from 'antd';
import { get } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery } from 'urql';
import {
  AddDepartment,
  DeleteDepartment,
  UpdateDepartment,
} from '~/gql/admin/mutations';
import { GetDepartments } from '~/gql/admin/queries';

const Department = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [action, setAction] = useState<string>('Add');
  const [initialValues, setInitialValues] =
    useState<{ id: string; department: string }>();

  const [departments, setDepartments] = useState([]);

  const [{ data }, refetch] = useQuery({
    query: GetDepartments,
    requestPolicy: 'network-only',
  });

  const [, addDepartment] = useMutation(AddDepartment);
  const [, updateDepartment] = useMutation(UpdateDepartment);
  const [, deleteDepartment] = useMutation(DeleteDepartment);

  useEffect(() => {
    if (data) {
      setDepartments(get(data, 'departments'));
    }
  }, [data]);

  const [form] = Form.useForm();
  useEffect(() => {
    form.resetFields();
  }, [isModalVisible]);

  const showAddModal = () => {
    setAction('Add');
    setIsModalVisible(true);
    setInitialValues({ department: '', id: '' });
  };

  const showEditModal = useCallback(
    (data) => {
      setAction('Edit');
      setIsModalVisible(true);
      setInitialValues({
        id: data.id,
        department: data.department,
      });
    },
    [initialValues, action, departments]
  );

  const reset = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const onFinish = async (values) => {
    if (action === 'Add') {
      await addDepartment({ department: values?.department });
    } else {
      await updateDepartment({
        id: initialValues?.id,
        department: values?.department,
      });
    }
    refetch({ requestPolicy: 'network-only' });
    reset();
  };
  const columns = [
    {
      title: 'Sl No.',
      key: 'index',
      render: (value, item, index) => (page - 1) * 10 + index + 1,
      width: 50,
    },
    {
      title: 'Client',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Driver',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Photo',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Description',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Hospital',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Location',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Status',
      dataIndex: 'department',
      key: 'department',
    },

  ];

  return (
        <Table
        bordered
        dataSource={departments}
        columns={columns}
        pagination={{
          onChange(current) {
            setPage(current);
          },
        }}
        onRow={(record) => {
          return {
            onClick: () => showEditModal(record),
          };
        }}
      />
  
  );
};

export default Department;
