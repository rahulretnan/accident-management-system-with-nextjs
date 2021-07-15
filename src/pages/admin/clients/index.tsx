import { Button, Table } from 'antd';
import { get } from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'urql';
import { GetClients } from '~/gql/admin/queries';

const ClientList = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [clients, setClients] = useState([]);

  const [{ data }] = useQuery({
    query: GetClients,
    requestPolicy: 'network-only',
  });

  useEffect(() => {
    if (data) {
      setClients(get(data, 'users'));
    }
  }, [data]);

  const columns = [
    {
      title: 'Sl No.',
      key: 'index',
      render: (value, item, index) => (page - 1) * 10 + index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: '25%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'clients',
      render: (record) => get(record, '0.phone'),
    },
  ];

  return (
    <>
      <Button
        htmlType="button"
        className="float-right"
        type="primary"
        onClick={() => {
          router.push(`/admin/clients/new`);
        }}
      >
        Add
      </Button>
      <Table
        bordered
        rowKey={(record) => record?.id}
        dataSource={clients}
        columns={columns}
        pagination={{
          onChange(current) {
            setPage(current);
          },
        }}
        // onRow={(record) => {
        //   return {
        //     onClick: () => {
        //       router.push(`/admin/clients/${record?.id}/edit`);
        //     },
        //   };
        // }}
      />
    </>
  );
};

export default ClientList;
