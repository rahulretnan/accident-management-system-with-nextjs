import { Card } from 'antd';
import { get } from 'lodash';
import React, { CSSProperties, useEffect, useState } from 'react';
import { useQuery } from 'urql';
import { HospitalDashboardDetails } from '~/gql/hospital/queries';

const gridStyle: CSSProperties = {
  width: '25%',
  textAlign: 'center',
  color: '#fff',
  borderRadius: 10,
  margin: 10,
};

const Hospital = () => {
  const [details, setDetails] = useState<{ accidents: string }>();
  const [{ data }] = useQuery({
    query: HospitalDashboardDetails,
    requestPolicy: 'network-only',
  });

  useEffect(() => {
    if (data) {
      setDetails({
        accidents: get(data, 'accidents.aggregate.count'),
        // clients: get(data, 'clients.aggregate.count'),
        // drivers: get(data, 'drivers.aggregate.count'),
      });
    }
  }, [data]);

  return (
    <Card bordered={false} style={{ background: '#f9f9f9' }}>
      <div className="flex justify-center">
        {/* <Card.Grid style={{ ...gridStyle, background: '#d81159' }}>
          <h5 style={{ color: '#fff' }}>Clients</h5>
          <div style={{ fontSize: 50, fontWeight: 'bolder' }}>
            {details?.clients}
          </div>
        </Card.Grid>
        <Card.Grid style={{ ...gridStyle, background: '#8f2d56' }}>
          <h5 style={{ color: '#fff' }}>Hospitals</h5>
          <div style={{ fontSize: 50, fontWeight: 'bolder' }}>
            {details?.hospitals}
          </div>
        </Card.Grid> */}
        <Card.Grid style={{ ...gridStyle, background: '#218380' }}>
          <h5 style={{ color: '#fff' }}>Accidents</h5>
          <div style={{ fontSize: 50, fontWeight: 'bolder' }}>
            {details?.accidents}
          </div>
        </Card.Grid>
      </div>
    </Card>
  );
};

export default Hospital;
