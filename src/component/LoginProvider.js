import React, {createContext, useEffect, useState} from 'react';
import axios from "axios";
export const LoginContext = createContext(null);

function LoginProvider({children}) {

  const [login, setLogin] = useState("");

  useEffect(() => {
    fetchLogin();
  }, []);

  console.log(login);

  function fetchLogin() {
    axios.get("/api/member/login").then((response) => setLogin(response.data));
  }

  function isAuthenticated() {
    return login !== "";
  }
  function isAdmin() {
    if (login.auth) {
      return login.auth.some((elem) => elem.name === "admin")
    }
    return false;
  }
  // function isManager() {
  //   return login.auth.some((elem) => elem.name === "manager");
  // }
  //
  // function hasAuth(auth) {
  //   return login.auth.some((elem) => elem.name === auth);
  // }

  function hasAccess(useId){
    return login.id === useId;
  }
  return (
    <LoginContext.Provider
      value={{ login, fetchLogin, isAuthenticated ,hasAccess, isAdmin}}
    >
      {children}
      </LoginContext.Provider>

      );
}

export default LoginProvider;