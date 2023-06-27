import { ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, Icon, Menu, MenuButton, MenuList, Text } from "@chakra-ui/react";
import { TiHome } from "react-icons/ti";
import React from "react";
import Communities from "./Communities";

const Directory: React.FC = () => {
  return (
    <Menu>
      <MenuButton
        mr={2}
        ml={{ base: 0, md: 2 }}
        cursor={"ponter"}
        padding={"0px 6px"}
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: "gray.300" }}
      >
        <Flex
          align={"center"}
          justify={"space-between"}
          width={{ base: "auto", lg: "200px" }}
        >
          <Flex align={"center"}>
            <Icon as={TiHome} fontSize={24} mr={{ base: 1, md: 3 }} />
            <Flex display={{ base: "none", md: "flex" }}>
              <Text fontWeight={600} fontSize={"10pt"}>
                Home
              </Text>
            </Flex>
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        <Communities />
      </MenuList>
    </Menu>
  );
};
export default Directory;
