import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import SearchInput from "./SearchInput";
import RightContent from "./RightContent/RightContent";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import Directory from "./Directory/Directory";

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <Flex
      bg="white"
      height="44px"
      padding="6px 12px"
      justifyContent={{ md: "space-between" }}
    >
      <Flex
        align={"center"}
        mr={{ base: 0, md: 2 }}
        width={{ base: "40px", md: "auto" }}
      >
        <Image src="/images/redditFace.svg" alt="logo" h={"30px"} />
        <Image
          display={{ base: "none", md: "unset" }}
          src="/images/redditText.svg"
          alt="logo"
          h={"46px"}
        />
      </Flex>
      {user && <Directory />}
      <SearchInput user={user} />
      <RightContent user={user} />
    </Flex>
  );
};
export default Navbar;
