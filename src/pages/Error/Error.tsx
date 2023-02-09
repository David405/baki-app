import error from "../../assets/error.png";
import "./Error.css";
const Error = () => {
  return (
    <div className="error">
      <img src={error} alt="" />
      <p className="heading">Baki is not yet deployed to this network</p>
      <p className="subheading">Please switch to Avalanche Fuji Test Net</p>
    </div>
  );
};

export default Error;
