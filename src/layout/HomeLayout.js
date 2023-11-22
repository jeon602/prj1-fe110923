import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import React from "react";
import { NavBar } from "../component/NavBar";

export function HomeLayout() {
  return (
    <Box mx={{base:0, md:10,lg:30}}>
      <NavBar />
      <Outlet />
    </Box>
  );
}
//mxㅣ 좌우 margin
//responsive styles CHAKRA>UI검색해서..)_
// 화면 크기에 따라 크기 조정이 가능하다 .
// base는 -0 부터
// ,