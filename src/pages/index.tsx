import { Inter } from "next/font/google";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setImgSrc(imageSrc || null);
  }, []);
  return (
    <>
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      <button onClick={capture}>Capture photo</button>
      {imgSrc && <img src={imgSrc} alt="Captured" />}
    </>
  );
}
