import { Input, Button, Avatar } from '@material-tailwind/react';

const SignupCard = ({ onBoarding, setOnboarding }) => {
  return (
    <div className="rounded-xl p-5 border-2 border-gray-800">
      <div className="flex flex-col space-y-5 h-full justify-center">
        <Avatar
          src="/media/selfie2.png"
          alt="avatar"
          size="xl"
          className="mx-auto bg-gray-700"
        />

        <div className="flex flex-row space-x-5">
          <Input label="First Name" color="white" />
          <Input label="Last Name" color="white" />
        </div>

        <Input label="Username" color="white" />
        <Input label="Password" color="white" type="password" />
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
export default SignupCard;
