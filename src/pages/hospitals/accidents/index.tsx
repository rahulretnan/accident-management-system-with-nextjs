/* eslint-disable react/display-name */
import { Button, Image, Table } from 'antd';
import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'urql';
import { UpdateAccidentHospital } from '~/gql/hospital/mutations';
import { GetAccidentList } from '~/gql/hospital/queries';
import { useAuth } from '~/hooks/useAuth';

const AccidentList = () => {
  const [page, setPage] = useState(1);
  const [accidents, setAccidents] = useState([]);
  const { current_hospital_id } = useAuth();
  const [{ data }, refetech] = useQuery({
    query: GetAccidentList,
    requestPolicy: 'network-only',
  });

  const [, updateStatus] = useMutation(UpdateAccidentHospital);

  useEffect(() => {
    if (data) {
      setAccidents(get(data, 'accidents'));
    }
  }, [data]);

  const columns = [
    {
      title: 'Sl No.',
      key: 'index',
      render: (value, item, index) => (page - 1) * 10 + index + 1,
    },
    {
      title: 'Location',
      dataIndex: 'location',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Photo',
      dataIndex: 'photo',
      render: (record) => (
        <Image width={50} src={record} alt="Accident_photo" />
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'status',
      render: (record, obj) => {
        return (
          <>
            <Button
              onClick={async () => {
                await updateStatus({
                  id: obj?.id,
                  status: !record,
                  hospital_id: !record ? current_hospital_id : null,
                });
                refetech();
              }}
              className={`${
                !record ? 'bg-green-600' : 'bg-red-600'
              } text-white`}
            >{`${record ? 'Reject' : 'Accept'}`}</Button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Table
        bordered
        rowKey={(record) => record?.id}
        dataSource={accidents}
        columns={columns}
        pagination={{
          onChange(current) {
            setPage(current);
          },
        }}
        // onRow={(record) => {
        //   return {
        //     onClick: () => {
        //       router.push(`/admin/accidents/${record?.id}/edit`);
        //     },
        //   };
        // }}
      />
    </>
  );
};

export default AccidentList;
