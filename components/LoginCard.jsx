import { useState } from 'react';
import { Input, Button, Avatar } from '@material-tailwind/react';
import GithubSignupButton from './buttons/GithubSignupButton';
import FacebookSignupButton from './buttons/FacebookSignupButton';
import GoogleSignupButton from './buttons/GoogleSignupButton';

const LoginCard = ({
  onBoarding,
  setOnboarding,
  recognizing,
  setIsRecognizing,
  startRecognition,
}) => {
  return (
    <div className="w-96 h-96 rounded-xl p-5 border-2 border-gray-800">
      <div className="flex flex-col space-y-5 h-full justify-center">
        <Avatar
          src="/media/selfie2.png"
          alt="avatar"
          size="xl"
          className="mx-auto bg-gray-700"
        />

        <GoogleSignupButton />
        <FacebookSignupButton />
        <GithubSignupButton />

        <Button
          size="sm"
          className="bg-gradient-to-b from-red-500 to-red-700 group relative flex items-center gap-3 overflow-hidden px-3 py-3 capitalize"
          onClick={startRecognition}
        >
          Sign in with face
          <span className="absolute right-0 grid h-full w-12 place-items-center bg-gray transition-colors ">
            <img
              src="/icons/face-id.png"
              alt="github icon"
              className="h-6 w-6"
            />
          </span>
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
          Store facial data
        </Button>
      </div>
    </div>
  );
};
export default LoginCard;
