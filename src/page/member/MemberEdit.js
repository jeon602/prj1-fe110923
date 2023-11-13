//기존 이메일과 같은지?
//기존 이메일과 같거나 중복확인을 했거나
//*email을 변경하면(작성시작하면. )중복 확인 다시 할 수 있도록 함
//기존 이메일과 같으면, 중복 확인 안해되 됨. ---의도*//
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";

export function MemberEdit() {
  const [member, setMember] = useState(null);
  const [email, setEmail] = useState("");
  const [emailAvailable, setEmailAvailable] = useState(false);
  const [password, setPassword] = useState();

  const toast = useToast();
  const [params] = useSearchParams();

  useEffect(() => {
    axios.get("/api/member?" + params.toString()).then((response) => {
      setMember(response.data);
      setEmail(response.data.email);
    });
  }, []);

  const id = params.get("id");

  // 기존 이메일과 같은지?
  let sameOriginEmail = false;

  if (member !== null) {
    sameOriginEmail = member.email === email;
  }

  let emailChecked = sameOriginEmail || emailAvailable;
  // 암호가 없으면 기존 암호
  //암호 작성하면 새암호 암호 확인 체크

  let passwordChecked = true;


  if (member === null) {
    return <Spinner />;
  }

  function handleEmailCheck() {
    const params = new URLSearchParams();
    params.set("email", email);

    axios
      .get("/api/member/check?" + params)
      .then(() => {
        setEmailAvailable(false);
        toast({
          description: "이미 사용 중인 email입니다.",
          status: "warning",
        });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setEmailAvailable(true);
          toast({
            description: "사용 가능한 email입니다.",
            status: "success",
          });
        }
      });
  }

  return (
    <Box>
      <h1>{id}님 정보 수정</h1>
      <FormControl>
        <FormLabel>password</FormLabel>
        <Input type="text" />
      </FormControl>
      password가 null이 아니고, length가 0보다 크면 &&
      {(password/length>0 && (
        <FormControl>
          <FormLabel>password 확인</FormLabel>
          <Input type="text" />
        </FormControl>
      )}

      {/*  email을 변경하면(작성시작) 중복확인 다시 하도록  */}
      {/*  기존 email과 같으면 중복확인 안해도됨 */}
      <FormControl>
        <FormLabel>email</FormLabel>
        <Flex>
          <Input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailAvailable(false);
            }}
          />
          <Button isDisabled={emailChecked} onClick={handleEmailCheck}>
            중복확인
          </Button>
        </Flex>
      </FormControl>
      <Button isDisabled={! emailChecked || !passwordChecked}>수정</Button>
    </Box>
  );
}
