import { Button, Flex, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { LoginContext } from "./LogInProvider";

export function NavBar() {
  const { fetchLogin, login, isAuthenticated, isAdmin } =
    useContext(LoginContext);
  const toast = useToast();

  const navigate = useNavigate();

  const urlParams = new URLSearchParams();

  if (login !== "") {
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
      <Button onClick={() => navigate("/")}>HOME</Button>
      {isAuthenticated() && (
        <Button onClick={() => navigate("/write")}>Write</Button>
      )}
      {isAuthenticated() || (
        <Button onClick={() => navigate("/signup")}>Join</Button>
      )}
      {isAdmin() && (
        <Button onClick={() => navigate("/member/list")}>MemberList</Button>
      )}
      {isAuthenticated() && (
        <Button onClick={() => navigate("/member?" + urlParams.toString())}>
          Member_Info
        </Button>
      )}
      {isAuthenticated() || (
        <Button onClick={() => navigate("/login")}>LogIn</Button>
      )}
      {isAuthenticated() && <Button onClick={handleLogout}>LogOut</Button>}
    </Flex>
  );
}