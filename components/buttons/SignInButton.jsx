import { signIn } from 'next-auth/react';

function SignInButton() {
  return <button onClick={() => signIn('github')}>Sign in with GitHub</button>;
}

export default SignInButton;
