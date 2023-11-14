import { Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function NavBar() {
  const navigate = useNavigate();


  function handleLogout() {
    // TODo로그아웃 후 할 일 추가
    axios.post("/api/member/logout").then(()=> console.log("로그아웃 성공"));

  }

  return (
    <Flex>
      <Button onClick={() => navigate("/")}>Home</Button>
      <Button onClick={() => navigate("/write")}>Write</Button>
      <Button onClick={() => navigate("/signup")}>signup</Button>
      <Button onClick={() => navigate("/member/list")}>MemertList</Button>
      <Button onClick={() => navigate("/login")}>로그인</Button>
      <Button onClick={handleLogout}>로그아웃</Button>

    </Flex>
  );
}
//    <Button onClick={() => navigate("/")}>Home</Button> 여기서 홈 버튼 클릭하면 원래 사이트 .
//<Button onClick={() => navigate("/write")}>Write</Button>write 클릭하면
