import React, { useEffect } from "react";
import auth from "../services/authService";
import Loading from "./common/Loading";

function Logout(props) {
  useEffect(() => {
    async function logout() {
      await auth.logout();
    }

    window.location = "/";
    logout();
  }, []);

  return <Loading />;
}

export default Logout;
