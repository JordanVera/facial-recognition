import { useState } from 'react';
import { Inter } from 'next/font/google';
import WebcamCapture from '@/components/WebcamCapture';
import LoginCard from '@/components/LoginCard';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [onboarding, setOnboarding] = useState(false);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className} bg-[#55b9f3]`}
    >
      <LoginCard setOnboarding={setOnboarding} />

      <WebcamCapture onboarding={onboarding} setOnBoarding={setOnboarding} />
    </main>
  );
}
