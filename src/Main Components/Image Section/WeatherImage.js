import classes from "./WeatherImage.module.css";

const WeatherImage = () => {
  return (
    <img
      className={classes.image}
      src={require("../../assets/partly-cloudy.jpg")}
      alt={"Today's Weather"}
    />
  );
};

export default WeatherImage;
