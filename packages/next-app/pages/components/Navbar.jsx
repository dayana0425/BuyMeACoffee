import React from "react";
import { Flex } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function Navbar() {
  return (
    <>
      <Flex px={"1em"} py={"1em"} justifyContent={"flex-end"}>
        <ConnectButton />
      </Flex>
    </>
  );
}

export default Navbar;
