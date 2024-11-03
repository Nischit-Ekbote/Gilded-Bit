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
      <div className='main__video__div lg:w-[calc(100%-250px)] w-full px-10 my-5'>
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal italic translate-y-8">GildedBit</h1>
        <p className=" text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-extralight text-center lg:w-[700px] leading-none translate-y-8 mt-2"> Revolutionizing wealth <span className="gold">preservation</span> in the <span className="gold">digital</span> age.</p>
          <div className="flex sm:flex-row flex-col gap-2 md:gap-6 m-4 md:m-8 translate-y-[30px]">
              <Link to='/buy/gold' className="bg-[--primary--] text-[--secondary--] rounded-full flex justify-center px-[30px] md:px-[80px] py-3 hover:bg-inherit border border-[--primary--] hover:border-[--pimary--] hover:text-[white] duration-300 font-semibold">Buy Gold</Link>
              <Link to='/sell/gold' className="border border-[--primary--] rounded-full flex justify-center px-[30px] md:px-[80px] py-3 hover:bg-[white] hover:text-[--secondary--] duration-300">Sell Gold</Link>
            </div>
          <video className='main__video h-full w-full object-cover'
            ref={videoRef}
            muted
            loop
            playsInline
            onError={(e: React.SyntheticEvent<HTMLVideoElement, Event>) => 
              setVideoError(`Video error: ${(e.target as HTMLVideoElement).error?.message || 'Unknown error'}`)}
          >
            
            <source src='https://pub-d75c4476cafd4ecca54e6cdc5e180150.r2.dev/bg.mp4'/>
            Your browser does not support the video tag.
        </video>
        
        {videoError && <p>Error: {videoError}</p>}
      </div>
    </>
  )
}

export default HomePage