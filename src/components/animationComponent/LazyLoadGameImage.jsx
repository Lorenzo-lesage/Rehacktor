import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function LazyLoadGameImage({ image }) {
  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */

  return (
    <LazyLoadImage
      alt="game image"
      effect="blur"
      wrapperProps={{
        style: { transitionDelay: "0.5s" },
      }}
      className="h-[20rem] w-full object-cover hoverImage"
      src={image}
    />
  );
}

export default LazyLoadGameImage;
