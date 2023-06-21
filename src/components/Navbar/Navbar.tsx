import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import SearchInput from "./SearchInput";
import RightContent from "./RightContent/RightContent";

const Navbar: React.FC = () => {
  return (
    <Flex bg={"white"} h={"44px"} p={"6px 12px"}>
      <Flex align={"center"}>
        <Image src="/images/redditFace.svg" h={"30px"} />
        <Image
          src="/images/redditText.svg"
          h={"45px"}
          display={{ base: "none", md: "unset" }}
        />
      </Flex>
      {/* <Directory />*/}
      <SearchInput user={""} />
      <RightContent user={undefined} />
    </Flex>
  );
};
export default Navbar;
