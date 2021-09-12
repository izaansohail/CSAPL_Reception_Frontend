import React from "react";
import Webcam from "react-webcam";

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };


  const WebcamCapture = ({picture,setPicture}) => {

    const webcamRef = React.useRef(null);


    const captureEnglish = React.useCallback(
      () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setPicture(imageSrc)
      },
      [webcamRef]
    );
  
    return (<>
    <button style={{padding: "0 0 0 0"}} onClick={captureEnglish}>
        <Webcam
          audio={false}
          height={160}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={260}
          videoConstraints={videoConstraints}
        />
        </button>
      </>
    );
  };

  export default WebcamCapture;