import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useImmer } from "use-immer";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Textarea,
} from "@chakra-ui/react";

export function BoardEdit() {
  const [board, updateBoard] = useImmer(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useParams(() => {
    axios
      .get("/api/board/id" + id)
      .then((response) => updateBoard(response.data));
  }, []);
  if (board == null) {
    return <Spinner />;
  }
  function hadleSubmit() {
    // 저장 버튼 클릭시
    // put방식으로 /api/board/edit

    axios
      .put("/api/board/edit", board)
      .then(() => console.log("good"))
      .catch(() => console.log("Nope"))
      .finally(() => console.log("End"));
  }

  // 이컴포넌트가보일때바뀔페이지
  return (
    <Box>
      <h2>{id}번 글 수정</h2>
      {/*/edit/:id*/}
      <FormControl>
        <FormLabel>제목</FormLabel>
        <Input
          value={board.title}
          onChange={(e) =>
            updateBoard((draft) => {
              draft.title = e.target.value;
            })
          }
        />
      </FormControl>

      <FormControl>
        <FormLabel>본문</FormLabel>
        <Textarea
          value={board.content}
          onChange={(e) =>
            updateBoard((draft) => {
              draft.content = e.target.value;
            })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>작성자</FormLabel>
        <Input
          value={board.writer}
          onChange={(e) =>
            updateBoard((draft) => {
              draft.writer = e.target.value;
            })
          }
        />
      </FormControl>
      <Button colorScheme={"tomato"}>Save</Button>
      <Button onClick={() => navigate(-1)}>Cancle</Button>
    </Box>
  );
}
//-1이전 경로 -2 이전이전 경로
