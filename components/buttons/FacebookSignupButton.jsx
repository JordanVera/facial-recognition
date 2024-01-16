import { signIn } from 'next-auth/react';

const FacebookSignupButton = () => {
  return (
    <button onClick={() => signIn('facebook')}>Sign in with Facebook</button>
  );
};
export default FacebookSignupButton;
