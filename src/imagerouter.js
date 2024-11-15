// client/src/components/ImageRotator.js
import React, { useState, useEffect } from 'react';

const ImageRotator = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // rotates every 3 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="image-rotator">
      <img src={images[currentIndex]} alt="Product" />
    </div>
  );
};

export default ImageRotator;
