import React, { useState } from "react";

function SearchPage({ onImageSelect }) {
    const [query, setQuery] = useState("");
    const [images, setImages] = useState([]);

    const fetchImages = async () => {
        if (!query.trim()) {
            alert("Please enter a search term!");
            return;
        }
        try {
            const API_KEY = '-c1sRXm4PDELcsNQMI3WS3H0x6TJ8cCs_jXpbX2QlNQ';

            const response = await fetch(
                ` https://api.unsplash.com/search/photos?query=${query}&client_id=${API_KEY}`
            );
            const data = await response.json();
            setImages(data.results);
        } catch (error) {
            alert("Error fetching images. Please try again later.");
        }
    };

    return (
        <div className="search-page">
            <input
                type="text"
                placeholder="Search images..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={fetchImages}>Search</button>
            <div className="results">
                {images.map((image) => (
                    <div key={image.id} className="image-card">
                        <img src={image.urls.small} alt={image.alt_description} />
                        <button onClick={() => onImageSelect(image.urls.full)}>
                            Add Captions
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchPage;