import { useState } from 'react';
import { Inter } from 'next/font/google';
import WebcamCapture from '@/components/WebcamCapture';
import LoginCard from '@/components/LoginCard';
import SignupCard from '@/components/SignupCard';
import FacialRecognition from '@/components/FacialRecognition';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [onboarding, setOnboarding] = useState(false);
  const [loginOrSignup, setLoginOrSignup] = useState('login');

  const [isRecognizing, setIsRecognizing] = useState(false);

  const handleRecognitionSuccess = () => {
    console.log('User recognized');
    setIsRecognizing(false); // Stop recognition process
    // Additional actions on success (e.g., redirect, change UI state)
  };

  const startRecognition = () => {
    setIsRecognizing(true);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-24 ${inter.className} bg-[#121212]`}
    >
      {loginOrSignup === 'login' && (
        <LoginCard
          setOnboarding={setOnboarding}
          isRecognizing={isRecognizing}
          setIsRecognizing={setIsRecognizing}
          startRecognition={startRecognition}
        />
      )}
      {loginOrSignup === 'signup' && (
        <SignupCard setOnboarding={setOnboarding} />
      )}

      <WebcamCapture onboarding={onboarding} setOnboarding={setOnboarding} />

      {isRecognizing && <FacialRecognition />}
    </main>
  );
}
