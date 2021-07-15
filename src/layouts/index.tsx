import { useRouter } from 'next/router';
import React, { PropsWithChildren } from 'react';
import { Spinner } from '~/components';
import { useAuth } from '~/hooks/useAuth';
import AdminLayout from './Admin';
import ClientLayout from './Client';
import DriverLayout from './Driver';
import HospitalLayout from './Hospital';
import PublicLayout from './Public';
const Layouts: any = {
  admin: AdminLayout,
  driver: DriverLayout,
  hospital: HospitalLayout,
  client: ClientLayout,
  public: PublicLayout,
};

const AppLayout = ({ children }: PropsWithChildren<any>) => {
  const { role, isAuthenticated, loading } = useAuth();
  if (loading) <Spinner />;
  const { pathname } = useRouter();
  const getLayout = () => {
    if (role === 'ADMIN' && pathname.includes('admin') && isAuthenticated) {
      return 'admin';
    }
    if (role === 'DRIVER' && pathname.includes('driver') && isAuthenticated) {
      return 'driver';
    }
    if (
      role === 'HOSPITAL' &&
      pathname.includes('hospital') &&
      isAuthenticated
    ) {
      return 'hospital';
    }
    return 'public';
  };
  const Container = Layouts[getLayout()];
  return <Container>{children}</Container>;
};

export default AppLayout;
