import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Avatar } from '@material-tailwind/react';

const WebcamCapture = ({ onboarding }) => {
  const webcamRef = useRef(null);
  const [intervalId, setIntervalId] = useState(null);
  const [imageSr, setImageSr] = useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();

    setImageSr(imageSrc);
    // Send this to the backend for facial recognition
    // Add logic to handle the response from the backend

    console.log('img');
    console.log(imageSrc);
  }, [webcamRef]);

  useEffect(() => {
    if (onboarding) {
      const id = setInterval(capture, 1000); // capture every second
      setIntervalId(id);
    } else {
      if (intervalId) clearInterval(intervalId);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [onboarding, intervalId, capture]);

  return (
    <div>
      <Avatar
        src="https://docs.material-tailwind.com/img/face-2.jpg"
        alt="avatar"
      />
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      <button onClick={capture}>Capture photo</button>;
      {onboarding && <p>Onboarding in progress...</p>}
      {imageSr && <img src={imageSr} />}
    </div>
  );
};

export default WebcamCapture;
