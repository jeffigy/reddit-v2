import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <p>root page</p>
      <label>Take a picture of your face:</label>

      <input type="file" name="picture" accept="image/*" capture="user" />

      <label>Record a sample of your voice:</label>

      <input type="file" name="voice" accept="audio/*" capture />
    </>
  );
}
