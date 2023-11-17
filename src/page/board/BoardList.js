import React, {useEffect, useState} from "react";
import {
  Badge,
  Box, list,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import {useNavigate, useSearchParams} from "react-router-dom";
import {ChatIcon} from "@chakra-ui/icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import {setSelectionRange} from "@testing-library/user-event/dist/utils";

export function BoardList() {
  const [boardList, setBoardList] = useState(null);
  const [params] = useSearchParams(); //분해 할당해서 보면 /p=2 . 로~~~
  const navigate = useNavigate();
  const Pagenation = ({totalPage, limit, page, setPage})=>{
    const [currentPageArray,setCurrentPageArray ]=useState([]);
    const [totalPageArray,setTotalPageArray ]=useState([]);
    useEffect(() => {
      if (page % limit ===1){
        setCurrentPageArray(totalPageArray[Math.floor(page/limit)]);
      }else  if (page % limit ===0){
        setCurrentPageArray(totalPageArray[Math.floor(page/limit)-1]);
      }
    }, [page ]);
  }
  useEffect(() => {
    axios
      .get("/api/board/list" + params)
      .then((response) => setBoardList(response.data));
  }, []);

  if (boardList === null) {
    return <Spinner/>;
  }

  return (
    <Box>
      <h1>게시물 목록</h1>
      <Box>
        <Table>
          <Thead>
            <Tr>
              <Th>id</Th>
              <Th>
                <FontAwesomeIcon icon={faHeart}/>
              </Th>
              <Th>title</Th>
              <Th>by</Th>
              <Th>at</Th>
            </Tr>
          </Thead>
          <Tbody>
            {boardList.map((board) => (
              <Tr
                _hover={{
                  cursor: "pointer",
                }}
                key={board.id}
                onClick={() => navigate("/board/" + board.id)}
              >
                <Td>{board.id}</Td>
                <Td>{board.countLike != 0 && board.countLike}</Td>
                <Td>
                  {board.title}
                  {board.countComment > 0 && (
                    <Badge>
                      <ChatIcon/>
                      {board.countComment}
                    </Badge>
                  )}
                </Td>
                <Td>{board.nickName}</Td>
                <Td>{board.ago}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}