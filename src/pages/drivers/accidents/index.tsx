import { Button, Card, Image, Skeleton } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { get, isNull } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'urql';
import { UpdateDriverStatus } from '~/gql/driver/mutations';
import { GetAccidentDetails } from '~/gql/driver/queries';
import { useAuth } from '~/hooks/useAuth';

const AccidentList = () => {
  const { Meta } = Card;
  const { current_driver_id } = useAuth();
  const [accidents, setAccidents] = useState([]);

  const [{ data }, refetchAccident] = useQuery({
    query: GetAccidentDetails,
    requestPolicy: 'network-only',
  });

  const [, updateStatus] = useMutation(UpdateDriverStatus);

  useEffect(() => {
    if (data) {
      setAccidents(get(data, 'accidents'));
    }
  }, [data]);

  //   setInterval(refetchAccident, 20000);

  const AccidentCard = ({ accident }) => {
    return (
      <Card
        style={{ width: 300, marginTop: 20 }}
        cover={<Image alt="accident" src={get(accident, 'photo')} />}
        hoverable
        actions={[
          <Button
            disabled={isNull(get(accident, 'accepted_by'))}
            className="text-white bg-green-600 rounded-md"
            key="accept"
            size="large"
            onClick={async () => {
              await updateStatus({
                id: accident?.id,
                created_by: current_driver_id,
              });
              refetchAccident();
            }}
          >
            Accept
          </Button>,
          <Button
            disabled={isNull(get(accident, 'accepted_by'))}
            className="bg-red-700 rounded-md text-white"
            size="large"
            key="reject"
            onClick={async () => {
              await updateStatus({ id: accident?.id, created_by: null });
              refetchAccident();
            }}
          >
            Reject
          </Button>,
        ]}
      >
        <Skeleton loading={false} avatar active>
          <Meta
            avatar={<Avatar src={get(accident, 'client.profile_picture')} />}
            title={get(accident, 'location')}
            description={get(accident, 'description')}
          />
        </Skeleton>
      </Card>
    );
  };

  return (
    <div className="flex justify-center">
      {accidents?.map((accident: any) => (
        <AccidentCard key={accident?.id} accident={accident} />
      )) || <div>No reports</div>}
    </div>
  );
};

export default AccidentList;
