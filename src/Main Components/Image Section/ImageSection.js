import WeatherImage from "./WeatherImage";
import classes from "./ImageSection.module.css";

const ImageSection = (props) => {
  return (
    <div className={classes["image-section-wrapper"]}>
      <WeatherImage />
      <h4>{props.description}</h4>
    </div>
  );
};

export default ImageSection;
