import {Box, Button, Flex, Spacer, useToast} from "@chakra-ui/react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {useContext, useEffect} from "react";
import {LoginContext} from "./LogInProvider";
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
  const {fetchLogin, login, isAuthenticated, isAdmin} =
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
    <Flex marginTop={10} marginBottom={10}>

      <Button
        borderRadious={0}
        varient="ghost"
        onClick={() => navigate("/")}>
        <FontAwesomeIcon icon={faEnvelope}/>HOME</Button>

      {isAuthenticated() && (
        <Button borderRadious={0}
                varient="ghost"
                onClick={() => navigate("/write")}>
          <FontAwesomeIcon icon={faPen}/>
          Write</Button>
      )}
      <Spacer />

      {isAuthenticated() || (
        <Button
          borderRadious={0}
          varient="ghost"
          onClick={() => navigate("/signup")}>
          <FontAwesomeIcon icon={faUserPlus}/>
          Join</Button>
      )}

      {isAdmin() && (
        <Button
          borderRadious={0}
          varient="ghost"
          leftIcon={<FontAwesomeIcon icon={faUsers}/>} onClick={() => navigate("/member/list")}>
          MemberList
        </Button>
      )}

      {isAuthenticated() && (
        <Button
          borderRadious={0}
          varient="ghost"
          onClick={() => navigate("/member?" + urlParams.toString())}>
          <FontAwesomeIcon icon={faUser}/>
          Member_Info
        </Button>
      )}

      {isAuthenticated() || (
        <Button
          borderRadious={0}
          varient="ghost"
          onClick={() => navigate("/login")}>
          <FontAwesomeIcon icon={faRightToBracket}/>
          LogIn
        </Button>
      )}

      {isAuthenticated() && (
        <Button
          borderRadious={0}
          varient="ghost"
          onClick={handleLogout}>
          <FontAwesomeIcon icon={faRightFromBracket}/>
          LogOut
        </Button>
      )}

      {isAuthenticated() && (
        <Button
          borderRadious={0}
          varient="ghost"
          fontFamily="segoeprint" colorScheme="orange">
          {login.nickName}님
        </Button>)}

    </Flex>
  );
}