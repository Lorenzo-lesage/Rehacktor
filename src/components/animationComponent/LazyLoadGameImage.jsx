import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function LazyLoadGameImage({ image }) {
  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */

  return (
    <div className="relative h-[15rem] w-full">
      <LazyLoadImage
        alt="game image"
        effect="blur"
        wrapperProps={{
          style: { transitionDelay: "0.5s" },
          opacity: 0.4,
        }}
        className="h-full w-full object-cover hoverImage"
        src={image}
      />
      <div
        className="absolute top-0 left-0 h-full w-full pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.8) 100%)",
        }}
      />
    </div>
  );
}

export default LazyLoadGameImage;
