import { Input, Button, Avatar } from '@material-tailwind/react';

const LoginCard = ({ onBoarding, setOnboarding }) => {
  return (
    <div className="neu-container w-96 h-96 rounded-xl p-5">
      <div className="flex flex-col space-y-5 h-full justify-center">
        <Avatar
          src="/media/selfie2.png"
          alt="avatar"
          size="xl"
          className="mx-auto bg-gray-700"
        />
        <Input label="Username" />
        <Input label="Password" type="password" />
        <Button
          variant="gradient"
          color="black"
          size="sm"
          className="w-full capitalize"
        >
          Submit
        </Button>
        <Button
          variant="gradient"
          color="black"
          size="sm"
          className="w-full capitalize"
          onClick={() => {
            setOnboarding(true);
          }}
        >
          Begin facial recognition
        </Button>
      </div>
    </div>
  );
};
export default LoginCard;
