import { logDOM } from "@testing-library/react";
import { useEffect, useState } from "react";
import {
  Box,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function MemberList() {
  const [list, setList] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/member/list").then((response) => setList(response.data));
  }, []);
  if (list === null) {
    return <Spinner />;
  }

  function handleTableRowClick(id) {
    const params = new URLSearchParams();
    params.set("id" + id);
    //member?id=id
    navigate("/member?_+" + params.toString());
  }

  return (
    <Box>
      <Table>
        <Thead>
          <Tr>
            <Th>id</Th>
            <Th>pw</Th>
            <Th>email</Th>
            <Th>가입 일시</Th>
          </Tr>
        </Thead>
        <Tbody>
          {list.map((member) => (
            <Tr onClick={() => handleTableRowClick(member.id)} key={member.id}>
              <Td>{member.id}</Td>
              <Td>{member.password}</Td>
              <Td>{member.email}</Td>
              <Td>{member.inserted}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
