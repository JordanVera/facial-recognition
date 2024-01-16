import { signIn } from 'next-auth/react';

function GithubSignupButton() {
  return (
    <button onClick={() => signIn('github', { callbackUrl: '/dashboard' })}>
      Sign in with GitHub
    </button>
  );
}

export default GithubSignupButton;
