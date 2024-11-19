import React, { useEffect, useState } from "react";
import CanvasEditor from "./Components/CanvasEditor";
import './App.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const searchImages = async () => {
    const API_KEY = '-c1sRXm4PDELcsNQMI3WS3H0x6TJ8cCs_jXpbX2QlNQ';
    const response = await fetch(

      `https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=28&page=1&client_id=${API_KEY}`
    );
    const data = await response.json();
    console.log(data);
    setImages(data.results);
  };

  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // useEffect

  return (
    <>
      <div className="app">
        <div className="content-wrapper">
          <div className="left-panel">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search for images"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={searchImages}>Search</button>
            </div>
            <div className="image-results">
              {images.map((image) => (
                <img
                  key={image.id}
                  src={image.urls.small}
                  alt={image.alt_description}
                  onClick={() => setSelectedImage(image.urls.full)}
                />
              ))}
            </div>
          </div>
          <div className="right-panel">
            {selectedImage && <CanvasEditor selectedImage={selectedImage} />}
          </div>
        </div>
      </div>

      <div>
        {isOffline && (
          <div style={{ backgroundColor: 'yellow', padding: '10px', textAlign: 'center' }}>
            <strong>You are offline. Some features may not be available.</strong>
          </div>
        )}
        <h1>Welcome to the App</h1>
        <p>This app works offline!</p>
      </div>
    </>
  );
};

export default App;