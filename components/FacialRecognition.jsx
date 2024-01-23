import React, { useEffect, useRef, useState } from 'react';
import AuthService from '../services/AuthService'; // Import your AuthService

const FacialRecognition = ({ onRecognized }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    // Start video stream
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
        videoRef.current.srcObject = stream;
        setStream(stream);
      } catch (error) {
        console.error('Error accessing the camera:', error);
      }
    };

    startVideo();
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  const captureImage = async () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(
      videoRef.current,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    return canvasRef.current.toDataURL('image/png');
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      const imageData = await captureImage();

      try {
        const response = await AuthService.verify(imageData);
        if (response.recognized) {
          clearInterval(interval);
          onRecognized();
          if (stream) {
            stream.getTracks().forEach((track) => track.stop());
          }
        }
      } catch (error) {
        console.error('Error during verification:', error);
        // Handle error appropriately
      }
    }, 2000); // captures every 2 seconds

    return () => clearInterval(interval);
  }, [stream, onRecognized]);

  return (
    <>
      <video ref={videoRef} autoPlay hidden />
      <canvas ref={canvasRef} width="720" height="560" hidden />
    </>
  );
};

export default FacialRecognition;
