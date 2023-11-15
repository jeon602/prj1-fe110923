import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  StackDivider,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import { DeleteIcon } from "@chakra-ui/icons";

function CommentForm({ boardId, isSubmitting, onSubmit }) {
  const [comment, setComment] = useState("");

  function handleSubmit() {
    onSubmit({ boardId, comment });
  }

  return (
    <Box>
      <Textarea value={comment} onChange={(e) => setComment(e.target.value)} />
      <Button isDisabled={isSubmitting} onClick={handleSubmit}>
        쓰기
      </Button>
    </Box>
  );
}

function CommentList({ commentList, onDeleteModalOpen, isSubmitting }) {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">댓글 리스트</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          {commentList.map((comment) => (
            <Box key={comment.id}>
              <Flex justifyContent="space-between">
                <Heading size="xs">{comment.memberId}</Heading>
                <Text fontSize="xs">{comment.inserted}</Text>
              </Flex>
              <Flex justifyContent="space-between" alignItems="center">
                <Text sx={{ whiteSpace: "pre-wrap" }} pt="2" fontSize="sm">
                  {comment.comment}
                </Text>
                <Button
                  isDisabled={isSubmitting}
                  onClick={() => onDeleteModalOpen(comment.id)}
                  size="xs"
                  colorScheme="red"
                >
                  <DeleteIcon />
                </Button>
              </Flex>
            </Box>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
}

export function CommentContainer({ boardId }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const { isOpen, onClose, onOpen } = useDisclosure()
  const commemt  = useRef();
  useEffect(() => {
    if (!isSubmitting) {
      const params = new URLSearchParams();
      params.set("id", boardId);

      axios
        .get("/api/comment/list?" + params)
        .then((response) => setCommentList(response.data));
    }
  }, [isSubmitting]);

  function handleSubmit(comment) {
    setIsSubmitting(true);

    axios
      .post("/api/comment/add", comment)
      .finally(() => setIsSubmitting(false));
  }

  function handleDelete() {
    // console.log(id + "번 댓글 삭제");
    // TODO: 모달, then, catch, finally

    setIsSubmitting(true);
    axios.delete("/api/comment/" + commemtId).finally(() => {
      onClose();
      setIsSubmitting(false);
    });
  }

  function handleDeleteModalOpen(id) {
    // id 를 어딘가 저장
    // setId(id);
    // 모달 열기
    commemtIdRef.current=id;
    onOpen();
  }
  return (
    <Box>
      <CommentForm
        boardId={boardId}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />
      <CommentList
        boardId={boardId}
        isSubmitting={isSubmitting}
        commentList={commentList}
        onDeleteModalOpen={handleDeleteModalOpen}
      />

      {/* 삭제 모달 */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>삭제 확인</ModalHeader>
          <ModalCloseButton />
          <ModalBody>삭제 하시겠습니까?</ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>닫기</Button>
            <Button
              isDisabled={isSubmitting}
              onClick={handleDelete}
              colorScheme="red"
            >
              삭제
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
//my code understage
// import {
//   Box,
//   Button,
//   Card,
//   CardBody,
//   CardHeader,
//   Flex,
//   Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
//   Stack,
//   StackDivider,
//   Text,
//   Textarea, useDisclosure,
// } from "@chakra-ui/react";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
//
// function CommentForm({ boardId, isSubmitting, onSubmit }) {
//   const [comment, setComment] = useState("");
//
//   function handleSubmit() {
//     onSubmit({ boardId, comment });
//   }
//
//   return (
//     <Box>
//       <Textarea value={comment} onChange={(e) => setComment(e.target.value)} />
//       <Button isDisabled={isSubmitting} onClick={handleSubmit}>
//         쓰기
//       </Button>
//     </Box>
//   );
// }
//
// function CommentList({ CommentList, onDelete, isSubmitting }) {
//   const [CommentList, setCommentList] = useState(false);
//
//   useEffect(() => {
//     const params = new URLSearchParams();
//     params.set("id", boardId);
//
//     axios
//       .get("/api/comment/list?" + params)
//       .then((response) => setCommentList(response.data));
//   }, [isSubmitting]);
//
//   return (
//     <Card>
//       <CardHeader>
//         <Heading size="md">댓글 리스트</Heading>
//       </CardHeader>
//       <CardBody>
//         <Stack divider={<StackDivider />} spacing="4">
//           {/* TODO: 댓글 작성 후 re render */}
//           {commentList.map((comment) => (
//             <Box>
//               <Flex justifyContent="space-between">
//                 <Heading size="xs">{comment.memberId}</Heading>
//                 <Text fontSize="xs">{comment.inserted}</Text>
//               </Flex>
//               <Text sx={{ whiteSpace: "pre-wrap" }} pt="2" fontSize="sm">
//                 {comment.comment}
//               </Text>
//             </Box>
//           ))}
//         </Stack>
//       </CardBody>
//     </Card>
//   );
// }
//
// export function CommentContainer({ boardId }) {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [CommentList, setCommentList]=useState();
//   const {isOpen,onClose,onOpen }=useDisclosure();
//
//   function handleSubmit(comment) {
//     setIsSubmitting(true);
//     axios.delete()
//
//     axios
//       .post("/api/comment/add", comment)
//       .finally(() => setIsSubmitting(false));
//
//   }
//
//   function handleDelete() {
//
//   }
//
//   function handleDeleteModalOpen(id) {
//     setId(id);
//     // 아이디를 어딘가에 저장하고 , 모달을 열고 onOpen
//     onOpen();
//   }
//
//   return (
//     <Box>
//       <CommentForm
//         boardId={boardId}
//         isSubmitting={isSubmitting}
//         onSubmit={handleSubmit}
//         onDeleteModalOpen={handleDeleteModalOpen}
//       />
//       <CommentList boardId={boardId} ComentList={CommentList}/>
//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>삭제 확인</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>삭제 하시겠습니까?</ModalBody>
//
//           <ModalFooter>
//             <Button onClick={onClose}>닫기</Button>
//             <Button onClick={handleDelete} colorScheme="red">
//               삭제
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </Box>
//   );
// }
// useRef : component에서 use를 임시로 저장하는 용도로 사용
// state로 해도 되지만 렌더링을 유도하며 (별차이가 없다)
// useRef에서 어떤일을 해야 하는 상태라면 usestate를 사용해도 큰 문제가 없다
// 예외적으로 언제 사용하면 안되느냐ㅣ 렌더링 하는 동안 (순서대로 실행되는 동안) current값에 변동사항을 주거나
//언제 쓰느냐 이벤트 핸들러 메소드 안에서 변경되는 것이 있거나 할 때
// useState 와 useRef ,,,,
// commit message useRef로 댓글 id 임시 저장
//next finally /////