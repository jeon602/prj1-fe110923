import React from "react";
import { useParams } from "react-router-dom";
import { useImmer } from "use-immer";
import axios from "axios";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Textarea,
} from "@chakra-ui/react";

export function BoardEdit() {
  const [board, updateBoard] = useImmer();
  const { id } = useParams();
  useParams(() => {
    axios
      .get("/api/board/id" + id)
      .then((response) => updateBoard(response.data));
  }, []);
  if (board == null) {
    return <Spinner />;
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
    </Box>
  );
}
