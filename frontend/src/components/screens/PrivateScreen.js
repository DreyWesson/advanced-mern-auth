import { useState, useEffect } from "react";
import axios from "axios";

export const PrivateScreen = ({ history }) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      history.push("/login");
    }
    const fetchPrivateDate = async () => {
      const authToken = localStorage.getItem("authToken");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      };
      console.log(authToken);
      try {
        const { data } = await axios.get("/api/private", config);
        console.log(data);
        setPrivateData(data?.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized, please login");
      }
    };
    fetchPrivateDate();
  }, [history]);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    history.push("/login");
  };

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <>
      <div style={{ background: "rgb(87, 207, 87)", color: "white" }}>
        {privateData}
      </div>
      <button onClick={logoutHandler}>Logout</button>
    </>
  );
};
