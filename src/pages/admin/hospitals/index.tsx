import { Button, Table } from 'antd';
import { get } from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'urql';
import { GetHospitals } from '~/gql/admin/queries';

const HospitalList = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [hospitals, setHospitals] = useState([]);

  const [{ data }] = useQuery({
    query: GetHospitals,
    requestPolicy: 'network-only',
  });

  useEffect(() => {
    if (data) {
      setHospitals(get(data, 'users'));
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
      dataIndex: 'hospitals',
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
          router.push(`/admin/hospitals/new`);
        }}
      >
        Add
      </Button>
      <Table
        bordered
        rowKey={(record) => record?.id}
        dataSource={hospitals}
        columns={columns}
        pagination={{
          onChange(current) {
            setPage(current);
          },
        }}
        // onRow={(record) => {
        //   return {
        //     onClick: () => {
        //       router.push(`/admin/hospitals/${record?.id}/edit`);
        //     },
        //   };
        // }}
      />
    </>
  );
};

export default HospitalList;
