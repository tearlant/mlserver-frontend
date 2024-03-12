import React from "react";

export const appDescriptionVerbiage: string[] = [
    "Welcome to the live demonstration of PLUG and PL-AI.",
    "Our app is designed to provide live predictions using a Tensorflow model, packaged with ML.NET. Once the user uploads a model to the API, the user can start making predictions with one click. (For security purposes, the live demo does not accept model uploads and only mocks an upload of a model saved server-side, but feel free to explore the source code on my GitHub if you're interested in diving deeper or cloning the app to experiment.)",
    "PLUG and PL-AI aims for simplicity – the server just needs the necessary schema, and it will handle the rest. Any TensorFlow model can be uploaded, and it'll be up and running, making predictions in a matter of seconds. This demo uses the schema of image classification models trained with Tensorflow Inception.",
    "Ready to see it in action? Click on the sidebar to try out our pre-trained models. Upload an image, and watch as the server generates predictions along with class scores in real-time."
]
