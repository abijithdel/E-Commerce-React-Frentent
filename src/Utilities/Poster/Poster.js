import React, { useEffect, useState } from 'react';
import { DOMAIN } from '../../config/domain';
import './poster.css';

function Poster({ slides = [] }) { 
  const [index, setIndex] = useState(0);
  const SliderLength = slides?.length || 0;

  useEffect(() => {
    if (SliderLength === 0) return; 

    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex === SliderLength - 1 ? 0 : prevIndex + 1));
    }, 8000);

    return () => clearInterval(interval);
  }, [SliderLength]);

  const changeImg = (key) => {
    setIndex(key);
  };

  if (SliderLength === 0) {
    return <div className="poster">No slides available.</div>;
  }

  return (
    <div className="poster">
      <div className="imgs" style={{ backgroundImage: `url(http://${DOMAIN}/poster-img/${slides[index].img})` }}>
        <h2 className="title">{slides[index].title}</h2>
        <div className="dot-container">
          {slides.map((_, key) => (
            <div key={key} className={`posterdonts`} onClick={() => changeImg(key)}>•</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Poster;
