import { Button } from 'antd';
import { useRouter } from 'next/router';
import AccidentReporter from '~/components/AccidentReporter';

const Index = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center">
      <AccidentReporter />
      <Button onClick={() => router.push('/signin')} type="link">
        SignIn
      </Button>
    </div>
  );
};

export default Index;
