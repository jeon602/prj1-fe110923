import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import React from "react";
import { NavBar } from "../component/NavBar";

export function HomeLayout() {
  return (
    <Box
      color="palevioletred"
      w="900px"
      h="100px"
      margin="flex"
      position="center"
    >
      <NavBar />
      <Outlet />
    </Box>
  );
}
