import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Switch,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useImmer} from "use-immer";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-regular-svg-icons";
export function BoardEdit() {
  const [board, updateBoard] = useImmer(null);
  const [removeFileIds, setRemoveFileIds] = useState([]);
  const [uploadFiles, setUploadFiles] = useState(null);
  // /edit/:id
  const {id} = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const {isOpen, onClose, onOpen} = useDisclosure();

  useEffect(() => {
    axios
      .get("/api/board/id/" + id)
      .then((response) => updateBoard(response.data));
    // eslint-disable-next-line
  }, []);

  if (board === null) {
    return <Spinner/>;
  }

  function handleSubmit() {
    // 저장 버튼 클릭 시
    // PUT /api/board/edit

    axios
      .putForm("/api/board/edit", {
        id: board.id,
        title: board.title,
        content: board.content,
        removeFileIds,
        uploadFiles,
      })
      .then(() => {
        toast({
          description: board.id + "번 게시글이 수정되었습니다.",
          status: "success",
        });
//json으로 할 수 없음.
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

  function handleRemoveFileSwitch(e) { //이벤트 객체를 받아야 한다!
    if (e.target.checked) {
      //removeFileIds 에 추가
      // 객체일 때는 복사해서 붙여애 함
      setRemoveFileIds([...removeFileIds, e.target.value]);
    } else {
      //removeFileIds에서 삭제
      setRemoveFileIds(removeFileIds.filter((item) => item !== e.target.value));

    }
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

      {board.files.length > 0 &&
        board.files.map((file)=>(
        <Box key={file.id} my="5px" border="3px solid black">
          <FormControl display="flex" alignItems="center">
            <FormLabel>
              <FontAwesomeIcon color="blue" icon={faTrashCan}></FontAwesomeIcon>
            </FormLabel>
            <Switch value={file.id} colorScheme="blue" onChange={handleRemoveFileSwitch}/>
          </FormControl>
          <Box>
            <Image src={file.url} alt={file.name} width="100%"></Image>
          </Box>
        </Box>
      ))}
      {/*추가 할 파일 선택 기능 */}
      <FormControl>
        <FormLabel>이미지</FormLabel>
        <Input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setUploadFiles(e.target.files)}
        />
        <FormHelperText>한 개의 파일은 1MB, 총 용량은 10 MB 크기 이내..</FormHelperText>
      </FormControl>
      <Button colorScheme="blue" onClick={onOpen}>
        저장
      </Button>
      {/* navigate(-1) : 이전 경로로 이동 */}
      <Button onClick={() => navigate(-1)}>취소</Button>

      {/* 수정 모달 */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>저장 확인</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>저장 하시겠습니까?</ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>닫기</Button>
            <Button onClick={handleSubmit} colorScheme="blue">
              저장
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
