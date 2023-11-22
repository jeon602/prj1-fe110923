import React, {useState} from "react";
import {
  Box,
  Button, Card, CardBody, CardFooter, CardHeader, Center,
  FormControl, FormHelperText,
  FormLabel, Heading,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export function BoardWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [uploadFiles, setUploadFiles] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  function handleSubmit() {
    setIsSubmitting(true);
    axios
      .postForm("/api/board/add", {
        title,
        content,
        uploadFiles,
      })
      .then(() => {
        toast({
          description: "새 글이 저장되었습니다.",
          status: "success",
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status === 400) {
          toast({
            description: "작성한 내용을 확인해주세요.",
            status: "error",
          });
        } else {
          toast({
            description: "저장 중에 문제가 발생하였습니다.",
            status: "error",
          });
        }
      })
      .finally(() => setIsSubmitting(false));
  }

  return (
    <Center>
      <Card w={"lg"}>
        <CardHeader>
          <Heading>글 작성</Heading>
        </CardHeader>

        <CardBody>
            <FormControl>
              <FormLabel>제목</FormLabel>
              <Input value={title} onChange={(e) => setTitle(e.target.value)}/>
            </FormControl>
            <FormControl>
              <FormLabel>본문</FormLabel>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></Textarea>
            </FormControl>
            <FormControl>
              <FormLabel>이미지</FormLabel>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setUploadFiles(e.target.files)}
              />
              <FormHelperText>등록 가능한 파일 개당 용량은 1MB, 총 파일의 용량은 10MB입니다.
              </FormHelperText>
            </FormControl>
        </CardBody>

        <CardFooter>
          <Button
            isDisabled={isSubmitting}
            onClick={handleSubmit}
            colorScheme="pink"
          >
            저장
          </Button>
        </CardFooter>
      </Card>
    </Center>
  );
}