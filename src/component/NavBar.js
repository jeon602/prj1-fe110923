import {Box, Button, Flex, useToast} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {useContext, useEffect} from "react";
import { LoginContext } from "./LogInProvider";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope} from "@fortawesome/free-regular-svg-icons";
import {
  faPen,
  faRightFromBracket,
  faRightToBracket,
  faUser,
  faUserPlus,
  faUsers
} from "@fortawesome/free-solid-svg-icons";

export function NavBar() {
  const { fetchLogin, login, isAuthenticated, isAdmin } =
    useContext(LoginContext);
  const toast = useToast();
  const navigate = useNavigate();
  let location = useLocation();
//uselocation이 적당
  const urlParams = new URLSearchParams();
  useEffect(() => {
    fetchLogin();
  }, [location]);

  if (login !== "") {
    urlParams.set("id", login.id);
  }

  function handleLogout() {
    axios.post("/api/member/logout").then(() => {
        toast({
          description: "로그아웃 되었습니다.",
          status: "info",
        });
        navigate("/");
      });
  }
  return (
    <Flex>
      <Button onClick={() => navigate("/")}>
        <FontAwesomeIcon icon={faEnvelope} />HOME</Button>
      {isAuthenticated() && (
        <Button onClick={() => navigate("/write")}>
          <FontAwesomeIcon icon={faPen}/>
          Write</Button>
      )}
      {isAuthenticated() || (
        <Button onClick={() => navigate("/signup")}>
          <FontAwesomeIcon icon={faUserPlus}/>
          Join</Button>
      )}
      {isAdmin() && (
        <Button onClick={() => navigate("/member/list")}>
          <FontAwesomeIcon icon={faUsers}/>
          MemberList
        </Button>
      )}
      {isAuthenticated() && (
        <Button onClick={() => navigate("/member?" + urlParams.toString())}>
          <FontAwesomeIcon icon={faUser}/>
          Member_Info
        </Button>
      )}
      {isAuthenticated() || (
        <Button onClick={() => navigate("/login")}>
          <FontAwesomeIcon icon={faRightToBracket} />
            LogIn
          </Button>
      )}
      {isAuthenticated() && (
        <Button onClick={handleLogout}>
          <FontAwesomeIcon icon={faRightFromBracket}/>
          LogOut
        </Button>
      )}

      {isAuthenticated() && <Box>{login.nickName}님</Box>}
    </Flex>
  );
}