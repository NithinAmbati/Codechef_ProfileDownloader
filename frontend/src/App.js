import { useState } from "react";
import "./App.css";
import exampleImage from "./example.png";

function App() {
  const [username, setUsername] = useState("");
  const [loader, setLoader] = useState(false);
  const [useImage, setUseImage] = useState(false);

  const submitBtn = async () => {
    setLoader(true);
    const url = "http://localhost:8000/codechef/";
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
    link.href = exampleImage;
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
          <img src={exampleImage} alt="Example" />
        </div>
      ) : (
        !loader && (
          <h3>
            Enter your username and download your profile page of Codechef
          </h3>
        )
      )}
    </div>
  );
}

export default App;
