import {
  Box,
  Button,
  FormControl, FormHelperText,
  FormLabel, Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useImmer} from "use-immer";
import axios from "axios";
import {logDOM} from "@testing-library/react";

export function BoardEdit() {
  const [board, updateBoard] = useImmer(null);
  // 이미지 파트
  const [imageBoard, setImageBoard] = useState(null);
  const [againFiles, setAgainFiles] = useState()
  // /edit/:id
  const [inBoard, setInBoard] = useState(null);

  const {id} = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const {isOpen, onClose, onOpen} = useDisclosure();

  useEffect(() => {
    axios
      .get("/api/board/id/" + id)
      .then((response) => updateBoard(response.data));
  }, []);

  if (board === null) {
    return <Spinner/>;
  }

  function handleSubmit() {
    // 저장 버튼 클릭 시
    // PUT /api/board/edit

    axios
      .put("/api/board/edit", board)
      .then(() => {
        toast({
          description: board.id + "번 게시글이 수정되었습니다.",
          status: "success",
        });

        navigate("/board/" + id);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          toast({
            description: "요청이 잘못되었습니다.",
            status: "error",
          });
        } else {
          toast({
            description: "수정 중에 문제가 발생하였습니다.",
            status: "error",
          });
        }
      })
      .finally(() => onClose());
  }

  function handleDelete() {
    axios.post("api/board/edit/")
  }

  return (
    <Box>
      <h1>{id}번 글 수정</h1>
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
        <FormLabel>Image</FormLabel>

        {/*{board.files.map((file)=> (*/}
        {/*  <Box m="5px" border="3px soild black">*/}
        {/*  </Box>*/}

        {/*))}*/}

        {/*------------------------파일 올리기 기능-------------------------------------*/}
        <Button onClick={handleDelete}>기존 파일 제거</Button>
        <Input type="file"
               accept="image/*"
               multiple
               onChange={(e) => setAgainFiles(e.target.files)}
        />
        <FormHelperText textColor="red" marginLeft="10px">
          하나의 파일 크기는 1MB, 파일의 총 크기는 10MB로 제한됩니다.
        </FormHelperText>
      </FormControl>

      <Button colorScheme="pink" onClick={onOpen}>
        저장
      </Button>
      {/* navigate(-1) : 이전 경로로 이동 */}
      <Button onClick={() => navigate(-1)} border="2px dotted pink">취소</Button>


      {/* 수정 모달 */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>저장 확인</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>수정 내용을 저장 하시겠습니까?</ModalBody>

          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme="pink">
              저장
            </Button>
            <Button onClick={onClose}>닫기</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
