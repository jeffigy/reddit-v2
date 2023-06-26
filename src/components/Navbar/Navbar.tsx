import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import SearchInput from "./SearchInput";
import RightContent from "./RightContent/RightContent";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
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
      <RightContent user={user} />
    </Flex>
  );
};
export default Navbar;
