import classes from "./TempText.module.css";

const TempText = (props) => {
  const temp = Math.round(props.temperature);
  return <h1 className={classes["temp-text"]}>{temp}°F</h1>;
};

export default TempText;
