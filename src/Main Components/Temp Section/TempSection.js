import TempSwitch from "./TempSwitch";
import TempText from "./TempText";

const TempSection = (props) => {
  return (
    <div>
      <TempText temperature={props.temperature} />
      <TempSwitch />
    </div>
  );
};

export default TempSection;
