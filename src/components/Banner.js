import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Banner = () => {
  return (
    <div className="relative">
      <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20"></div>
      <Carousel
        autoPlay
        infiniteLoop
        interval={5000}
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
      >
        <div>
          <img
            src="https://hackerman-links.vercel.app/hsj6"
            alt="Banner"
            loading="lazy"
          />
        </div>

        <div>
          <img
            src="https://hackerman-links.vercel.app/dh2s"
            alt="Banner"
            loading="lazy"
          />
        </div>

        <div>
          <img
            src="https://hackerman-links.vercel.app/fh3g"
            alt="Banner"
            loading="lazy"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
