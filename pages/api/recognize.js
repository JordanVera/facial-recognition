// pages/api/recognize.js
import colors from 'colors';
import * as faceapi from '@vladmandic/face-api';
import prisma from '../../lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import * as tf from '@tensorflow/tfjs-node';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const user = session.user;

  if (!session) {
    return res
      .status(401)
      .json({ error: 'You must be signed in to access this API route' });
  }

  if (req.method === 'POST') {
    const { images } = req.body;

    // Load the face-api models
    await faceapi.nets.ssdMobilenetv1.loadFromDisk('./models');
    await faceapi.nets.faceLandmark68Net.loadFromDisk('./models');
    await faceapi.nets.faceRecognitionNet.loadFromDisk('./models');

    let facialDescriptors = [];

    for (const [index, imgBase64] of images.entries()) {
      const imgTensor = tf.node.decodeImage(
        Buffer.from(imgBase64.split(',')[1], 'base64'),
        3,
        'int32',
        false
      );

      const detections = await faceapi
        .detectAllFaces(imgTensor)
        .withFaceLandmarks()
        .withFaceDescriptors();

      if (detections.length > 0) {
        console.log('Detections for image', index);
        facialDescriptors.push(...detections);
      }

      tf.dispose(imgTensor);
    }

    console.log('Facial Features: ', facialDescriptors);

    // Store in database
    const descriptorsString = JSON.stringify(facialDescriptors);
    await prisma.knownFaces.upsert({
      where: { userId: user.id },
      update: { descriptors: descriptorsString },
      create: { userId: user.id, descriptors: descriptorsString },
    });

    res.status(200).json({ recognized: true, features: facialDescriptors });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
