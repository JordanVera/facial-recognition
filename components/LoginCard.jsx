import { Input, Button } from '@material-tailwind/react';

const LoginCard = () => {
  return (
    <div className="bg-gray-700 w-96 h-96 rounded-xl">
      LoginCard
      <div className="flex flex-col space-y-5">
        <Input label="Username" color="white" />
        <Input label="Password" color="white" type="password" />
        <Button variant="gradient" color="orange" size="sm" className="w-full">
          Submit
        </Button>
      </div>
    </div>
  );
};
export default LoginCard;
