import { Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function NavBar() {
  const navigate = useNavigate();

  return (
    <Flex>
      <Button onClick={() => navigate("/")}>Home</Button>
      <Button onClick={() => navigate("/write")}>Write</Button>
      <Button onClick={() => navigate("/signup")}>signup</Button>
      <Button onClick={() => navigate("/member/list")}>MemertList</Button>
    </Flex>
  );
}
//    <Button onClick={() => navigate("/")}>Home</Button> 여기서 홈 버튼 클릭하면 원래 사이트 .
//<Button onClick={() => navigate("/write")}>Write</Button>write 클릭하면
