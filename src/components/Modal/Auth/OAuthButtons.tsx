import { Button, Flex, Image } from "@chakra-ui/react";
import React from "react";

type OAuthButtonsProps = {};

const OAuthButtons: React.FC<OAuthButtonsProps> = () => {
  return (
    <Flex direction={"column"} width={"100%"} mb={4}>
      <Button variant={"oauth"} mb={2}>
        <Image src="/images/googlelogo.png" h={"20px"} mr={4} />
        Continue with Google
      </Button>
      <Button variant={"oauth"}>...rest of provider here </Button>
    </Flex>
  );
};
export default OAuthButtons;
