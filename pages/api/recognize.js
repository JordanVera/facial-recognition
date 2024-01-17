// pages/api/recognize.js
import colors from 'colors';
import * as faceapi from '@vladmandic/face-api';
import prisma from '../../lib/prisma';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    // Not signed in
    return res
      .status(401)
      .json({ error: 'You must be signed in to access this API route' });
  }

  if (req.method === 'POST') {
    const { images, user } = req.body;

    const tf = await import('@tensorflow/tfjs-node');

    // console.log('______________IMAGES______________'.rainbow.bold);
    // console.log(images);

    // You can access user's email, name, image, etc., if they are included in the session
    console.log('USER FROM SERVER'.rainbow.bold);
    console.log(user);
    console.log(user.email, user.name);

    console.log('______________IMAGES.length______________'.rainbow.bold);
    console.log(images.length);

    // Load the face-api models

    await faceapi.nets.ssdMobilenetv1.loadFromDisk('./models');
    await faceapi.nets.faceLandmark68Net.loadFromDisk('./models');
    await faceapi.nets.faceRecognitionNet.loadFromDisk('./models');

    let facialDescriptors = [];

    for (const imgBase64 of images) {
      // Decode each base64 image to a tensor
      const imgTensor = tf.node.decodeImage(
        Buffer.from(imgBase64.split(',')[1], 'base64'),
        3, // 3 color channels (RGB)
        'int32', // Output type
        false // flip the image vertically
      );

      // Detect and compute facial feature data for the image
      const detections = await faceapi
        .detectAllFaces(imgTensor)
        .withFaceLandmarks()
        .withFaceDescriptors();

      // Add processed data to facialFeatures array
      if (detections) {
        facialDescriptors.push(detections.descriptor);
      }

      // Dispose the tensor to free memory
      tf.dispose(imgTensor);
    }

    const descriptorsString = JSON.stringify(facialDescriptors);

    // Store in database
    await prisma.knownFaces.upsert({
      where: { userId: userId },
      update: { descriptors: descriptorsString },
      create: { userId: userId, descriptors: descriptorsString },
    });

    res.status(200).json({ message: 'Facial data stored successfully' });
    console.log('FACIAL FEATURES'.rainbow.bold);
    console.log(facialDescriptors);
    console.log(facialDescriptors.map((f) => f[0].descriptor));

    res.status(200).json({ recognized: true, features: facialDescriptors });
  }
}
