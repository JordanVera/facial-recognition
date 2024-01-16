import { Input, Button, Avatar } from '@material-tailwind/react';
import GithubSignupButton from './buttons/GithubSignupButton';

const LoginCard = ({ onBoarding, setOnboarding, setLoginOrSignup }) => {
  return (
    <div className="w-96 h-96 rounded-xl p-5 border-2 border-gray-800">
      <div className="flex flex-col space-y-5 h-full justify-center">
        <Avatar
          src="/media/selfie2.png"
          alt="avatar"
          size="xl"
          className="mx-auto bg-gray-700"
        />
        <Input label="Username" color="white" />
        <Input label="Password" color="white" type="password" />
        <GithubSignupButton />
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
          color="orange"
          size="sm"
          className="w-full capitalize"
          onClick={() => {
            setLoginOrSignup('signup');
          }}
        >
          Signup
        </Button>

        {/* <Button
          variant="gradient"
          color="black"
          size="sm"
          className="w-full capitalize"
          onClick={() => {
            setOnboarding(true);
          }}
        >
          Begin facial recognition
        </Button> */}
      </div>
    </div>
  );
};
export default LoginCard;
