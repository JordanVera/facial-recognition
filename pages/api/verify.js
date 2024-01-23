// pages/api/verify.js
import * as faceapi from '@vladmandic/face-api';
import prisma from '../../lib/prisma';
import * as tf from '@tensorflow/tfjs-node';
import colors from 'colors';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { image } = req.body;

    // Load face-api models
    await faceapi.nets.ssdMobilenetv1.loadFromDisk('./models');
    await faceapi.nets.faceLandmark68Net.loadFromDisk('./models');
    await faceapi.nets.faceRecognitionNet.loadFromDisk('./models');

    // Decode the received image
    const imgTensor = tf.node.decodeImage(
      Buffer.from(image.split(',')[1], 'base64'),
      3,
      'int32',
      false
    );

    // Detect and compute facial feature data for the image
    const detection = await faceapi
      .detectSingleFace(imgTensor)
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (detection) {
      // Fetch stored descriptors from the database
      const knownFaces = await prisma.knownFaces.findMany();
      let recognized = false;

      for (const face of knownFaces) {
        const storedDescriptors = JSON.parse(face.descriptors);
        // Compare the descriptors using face-api
        recognized = storedDescriptors.some(
          (sd) => faceapi.euclideanDistance(sd, detection.descriptor) < 0.6
        ); // 0.6 is a threshold, can be adjusted

        if (recognized) {
          console.log('FACE RECOGNIZED'.rainbow.bold);

          break;
        }
      }

      res.status(200).json({ recognized });
    } else {
      res.status(200).json({ recognized: false });
    }

    tf.dispose(imgTensor);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
