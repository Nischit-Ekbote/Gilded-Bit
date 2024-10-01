import { useEffect, useRef, useState } from "react";
import './Home.css'

function HomePage() {

  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState<string | null>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const playPromise = videoElement.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Autoplay started successfully");
          })
          .catch(error => {
            console.error("Autoplay was prevented:", error);
          });
      }
    }
  }, []);

  return (
    <>
      <div className='main__video__div'>
        <h1>GildedBit</h1>
        <p> Revolutionizing wealth <span className="gold">preservation</span> in the <span className="gold">digital</span> age.</p>
          <video className='main__video'
            ref={videoRef}
            muted
            loop
            playsInline
            onError={(e: React.SyntheticEvent<HTMLVideoElement, Event>) => 
              setVideoError(`Video error: ${(e.target as HTMLVideoElement).error?.message || 'Unknown error'}`)}
          >
            <source src='/better-metallic-bubble2-gradientBackground-opacity-20.mp4'/>
            Your browser does not support the video tag.
        </video>
        
        {videoError && <p>Error: {videoError}</p>}
      </div>
    </>
  )
}

export default HomePage