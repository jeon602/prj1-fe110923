import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button, Center,
  Flex,
  FormControl,
  FormLabel,
  Heading, Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner, Table,
  Textarea,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {LoginContext} from "../../component/LogInProvider";
import {CommentContainer} from "../../component/CommentContainer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as emptyHeart} from "@fortawesome/free-regular-svg-icons";
import {faHeart as fullHeart} from "@fortawesome/free-solid-svg-icons";

function LikeContainer({like, onClick}) {
  const {isAuthenticated} = useContext(LoginContext);

  if (like === null) {
    return <center Spinner/>;
  }

  return (
    <Flex gap={2} ml={500}>
      <Tooltip isDisabled={isAuthenticated()} hasArrow label={"로그인 하세요."}>
        <Button variant="ghost" size="xl" onClick={onClick}>
          {like.like && <FontAwesomeIcon icon={fullHeart} style={{color: "tomato", }} size="xl" />}
          {like.like || <FontAwesomeIcon icon={emptyHeart} style={{color: "tomato",}} size="xl"/>}
          <Heading size="lg">{like.countLike}</Heading>
        </Button>
      </Tooltip>
    </Flex>
  );
}

export function BoardView() {
  const [board, setBoard] = useState(null);
  const [like, setLike] = useState(null);

  const {isOpen, onOpen, onClose} = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();

  const {id} = useParams();

  const {hasAccess, isAdmin} = useContext(LoginContext);

  useEffect(() => {
    axios
      .get("/api/board/id/" + id)
      .then((response) => setBoard(response.data));
  }, []);

  useEffect(() => {
    axios
      .get("/api/like/board/" + id)
      .then((response) => setLike(response.data));
  }, []);

  if (board === null) {
    return <Spinner/>;
  }

  function handleDelete() {
    axios
      .delete("/api/board/remove/" + id)
      .then((response) => {
        toast({
          description: id + "번 게시물이 삭제되었습니다.",
          status: "success",
        });
        navigate("/");
      })
      .catch((error) => {
        toast({
          description: "삭제 중 문제가 발생하였습니다.",
          status: "error",
        });
      })
      .finally(() => onClose());
  }

  function handleLike() {
    axios
      .post("/api/like", {boardId: board.id})
      .then((response) => setLike(response.data))
      .catch(() => console.log("bad"))
      .finally(() => console.log("done"));
  }

  return (
    <Table >
    <Box >
      <Flex >
        <Heading size="xl" bg="tomato" w="auto">Number.{board.id}</Heading>
        <LikeContainer like={like} onClick={handleLike} justifyContent=""/>
      </Flex>
      <FormControl >
        <FormLabel>Title</FormLabel>
        <Input value={board.title} readOnly/>
      </FormControl>
      <FormControl>
        <FormLabel>내용</FormLabel>
        <Textarea value={board.content} readOnly/>
      </FormControl>


      {/*이미지 출력*/}
      {board.files.map((file) => (
        <Box key={file.id} my= "5px" boarder="3px solid navy">
          <Image width="400px" src={file.url} alt={file.name} justifyContent="center"/>
      </Box>
      ))}
      <FormControl>
        <FormLabel>작성자</FormLabel>
        <Input value={board.nickName} readOnly/>
      </FormControl>
      <FormControl>
        <FormLabel>작성일시</FormLabel>
        <Input value={board.inserted} readOnly/>
      </FormControl>

      {(hasAccess(board.writer) || isAdmin()) && (
        <Box>
          <Button colorScheme="orange" onClick={() => navigate("/edit/" + id)}>
            수정
          </Button>
          <Button colorScheme="pink" onClick={onOpen}>
            삭제
          </Button>
        </Box>
      )}

      {/* 삭제 모달 */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>삭제 확인</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>삭제 하시겠습니까?</ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>닫기</Button>
            <Button onClick={handleDelete} colorScheme="yellow">
              삭제
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <CommentContainer boardId={id}/>
    </Box>
    </Table>
  );
}
