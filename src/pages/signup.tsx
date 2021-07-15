import { Button, Card } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { ClientForm } from '~/components';
import { useAuth } from '~/hooks/useAuth';

const SignUp = () => {
  const router = useRouter();
  const { loading } = useAuth();

  if (loading) return <div>Loading</div>;
  return (
    <Card title="ACCMA SignUp" className="w-96 rounded m-4 text-center">
      <ClientForm />
      <Button onClick={() => router.push('/signin')} type="link">
        Already have account
      </Button>
    </Card>
  );
};

export default SignUp;
