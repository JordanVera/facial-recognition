// pages/api/recognize.js
import colors from 'colors';
import * as faceapi from '@vladmandic/face-api';

export default async function handler(req, res) {
  // Load TensorFlow.js model
  // const model = await faceLandmarksDetection.load(
  //   faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
  // );

  if (req.method === 'POST') {
    const { images } = req.body;

    const tf = await import('@tensorflow/tfjs-node');

    // console.log('______________IMAGES______________'.rainbow.bold);
    // console.log(images);
    console.log('______________IMAGES.length______________'.rainbow.bold);
    console.log(images.length);

    // Load the face-api models

    await faceapi.nets.ssdMobilenetv1.loadFromDisk('./models');
    await faceapi.nets.faceLandmark68Net.loadFromDisk('./models');
    await faceapi.nets.faceRecognitionNet.loadFromDisk('./models');

    let facialFeatures = [];

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
      facialFeatures.push(detections);

      // Dispose the tensor to free memory
      // imgTensor.dispose();
    }

    const filteredFacialFeatures = facialFeatures.filter((f) => f.length > 0);

    console.log('FACIAL FEATURES'.rainbow.bold);
    console.log(filteredFacialFeatures);
    console.log(filteredFacialFeatures.map((f) => f[0].descriptor));
    // console.log(facialFeatures.map((f) => f[0].landmarks));

    // Implement your recognition logic here using facialFeatures
    // ...

    res.status(200).json({ recognized: true, features: facialFeatures });
  }
}
