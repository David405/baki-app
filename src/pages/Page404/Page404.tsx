import error from "../../assets/404.png";
import { Link } from "react-router-dom";
import "./Page404.css";
const Page404 = () => {
  return (
    <div className="error-404">
      <img src={error} alt="" />
      <p className="heading-404">Page Not Found</p>
      <p className="subheading">
        Please go back to
        <Link
          to="/"
          style={{
            textDecoration: "underline",
            marginLeft: 5,
            color: "#f9603d",
          }}
        >
          Baki
        </Link>
      </p>
    </div>
  );
};

export default Page404;
