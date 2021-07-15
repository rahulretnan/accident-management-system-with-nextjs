import { Button, Table } from 'antd';
import { get } from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'urql';
import { GetDrivers } from '~/gql/admin/queries';

const DriverList = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [drivers, setDrivers] = useState([]);

  const [{ data }] = useQuery({
    query: GetDrivers,
    requestPolicy: 'network-only',
  });

  useEffect(() => {
    if (data) {
      setDrivers(get(data, 'users'));
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
      dataIndex: 'drivers',
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
          router.push(`/admin/drivers/new`);
        }}
      >
        Add
      </Button>
      <Table
        bordered
        rowKey={(record) => record?.id}
        dataSource={drivers}
        columns={columns}
        pagination={{
          onChange(current) {
            setPage(current);
          },
        }}
        // onRow={(record) => {
        //   return {
        //     onClick: () => {
        //       router.push(`/admin/drivers/${record?.id}/edit`);
        //     },
        //   };
        // }}
      />
    </>
  );
};

export default DriverList;
