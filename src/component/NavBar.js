import {Button, Flex, useToast} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useContext} from "react";
import {LoginContext} from "./LoginProvider";
import * as url from "url";

export function NavBar() {
  const {fetchLogin, login, isAuthenticated, isAdmin} = useContext(LoginContext);

  const toast = useToast();

  const navigate = useNavigate();
  const urlParams = new URLSearchParams();
  if (login !== ""){
    urlParams.set("id", login.id);
  }

  function handleLogout() {
    axios
      .post("/api/member/logout")
      .then(() => {
        toast({
          description: "로그아웃 되었습니다.",
          status: "info",
        });
        navigate("/");
      })
      .finally(() => fetchLogin());
  }

  return (
    <Flex>
      <Button onClick={() => navigate("/")}>Home</Button>

      {isAuthenticated() && (<Button onClick={() => navigate("/write")}>Write</Button>)}
      {isAuthenticated() || (<Button onClick={() => navigate("/signup")}>Join</Button>)}
      {isAdmin() && (<Button onClick={() => navigate("/member/list")}>Memeber List</Button>)}
      {isAuthenticated() && (<Button onClick={()=> navigate("/member?" + urlParams.toString())}>Memeber Info</Button>)}
      {isAuthenticated() || (<Button onClick={() => navigate("/login")}>Login</Button>)}
      {isAuthenticated() && (<Button onClick={handleLogout}>Logout</Button>)}
    </Flex>
  );
}