import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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
          <div className="flex gap-6 m-8 translate-y-[30px]">
              <Link to='/buy/gold' className="bg-[--primary--] text-[--secondary--] rounded-full px-[80px] py-3 hover:bg-inherit border border-[--primary--] hover:border-[--pimary--] hover:text-[white] duration-300 font-semibold">Buy Gold</Link>
              <Link to='/sell/gold' className="border border-[--primary--] rounded-full px-[80px] py-3 hover:bg-[white] hover:text-[--secondary--] duration-300">Sell Gold</Link>
            </div>
          <video className='main__video h-full w-full object-cover'
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