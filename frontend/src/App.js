import { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [loader, setLoader] = useState(false);
  const [useImage, setUseImage] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  const submitBtn = async () => {
    setLoader(true);
    const url = "https://codechef-profile-downloader.vercel.app/codechef/";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const imageBase64 = `data:image/png;base64,${data.image}`;
        setImageSrc(imageBase64);
        setUseImage(true);
      } else {
        setUseImage(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setUseImage(false);
    }
    setLoader(false);
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = "example.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="app">
      <div className="search-container">
        <input
          type="search"
          value={username}
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={submitBtn}>Search</button>
      </div>
      {loader && <div className="loader"></div>}
      {useImage ? (
        <div className="image-container">
          <button className="download-btn" onClick={downloadImage}>
            Download
          </button>
          <img src={imageSrc} alt="Example" />
        </div>
      ) : (
        <h3>Enter you Codechef username to download your profile page</h3>
      )}
    </div>
  );
}

export default App;
