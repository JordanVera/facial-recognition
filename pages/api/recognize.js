// pages/api/recognize.js
// import * as tf from '@tensorflow/tfjs-node';
// import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';

export default async function handler(req, res) {
  // Load TensorFlow.js model
  // const model = await faceLandmarksDetection.load(
  //   faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
  // );

  // res.status(200).json({ recognized: true });

  if (req.method === 'POST') {
    const { images } = req.body;

    console.log('IMAGES');
    console.log(images);
  }
}
