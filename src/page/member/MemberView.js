import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, FormControl, FormLabel, Input, Spinner } from "@chakra-ui/react";
import axios from "axios";

export function MemberView() {
  const [member, setMember] = useState(null);
  // /member ?id = userid 로 경로 이동하도록
  const [params] = useSearchParams();
  useEffect(() => {
    axios
      .get("/api/member?" + params.toString())
      .then((response) => setMember(response.data));
  }, []);

  if (member === null) {
    return <Spinner />;
  }

  return (
    <Box>
      <h1>{member.id}님의 정보</h1>
      <FormControl>
        <FormLabel>password</FormLabel>
        <Input type="text" value={member.password} readOnly />
      </FormControl>

      <FormControl>
        <FormLabel>email</FormLabel>
        <Input type="text" value={member.email} readOnly />
      </FormControl>
    </Box>
  );
}
