import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Box,
  Divider,
  Text,
  Flex,
  Input,
  Stack,
  Checkbox,
  Icon,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { HiLockClosed } from "react-icons/hi";
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { firestore } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
type CreateCommunityProps = {
  open: boolean;
  handleClose: () => void;
};

const CreateCommunity: React.FC<CreateCommunityProps> = ({
  open,
  handleClose,
}) => {
  const [user] = useAuthState(auth);
  const [communityName, setCommunityName] = useState("");
  const [charCount, setcharCount] = useState(21);
  const [communityType, setcommunityType] = useState("public");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return;
    setCommunityName(event.target.value);
    setcharCount(21 - event.target.value.length);
  };

  const onCommunityTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setcommunityType(event.target.name);
  };

  const handleCreateCommunity = async () => {
    //validate community
    if (error) setError("");
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(communityName) || communityName.length < 3) {
      setError(
        "Community name must be at least 3 characters long and cannot contain special characters"
      );
      return;
    }

    setLoading(true);

    try {
      const communityDocRef = doc(firestore, "communities", communityName);
      await runTransaction(firestore, async (transaction) => {
        const communityDoc = await getDoc(communityDocRef);
        //check if community exists
        if (communityDoc.exists()) {
          throw new Error(`Community ${communityName} is already taken`);
        }
        //create the community
        await transaction.set(communityDocRef, {
          createId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: communityType,
        });
        //create the community snippet on user
        transaction.set(
          doc(firestore, `users/${user?.uid}/communitySnippets`, communityName),
          {
            communityId: communityName,
            isModerator: true,
          }
        );
      });
    } catch (error: any) {
      console.log("hanle community error", error);
      setError(error.message);
    }
    setLoading(false);
  };
  return (
    <Modal isOpen={open} onClose={handleClose} size={"lg"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          display={"flex"}
          flexDirection={"column"}
          fontSize={"15"}
          padding={"3"}
        >
          Create a community
        </ModalHeader>
        <Box pl={3} pr={3}>
          <Divider />
          <ModalCloseButton />
          <ModalBody
            display={"flex"}
            flexDirection={"column"}
            padding={"10px 0px"}
            // border={"1px solid"}
          >
            <Text fontWeight={600} fontSize={15}>
              Name
            </Text>
            <Text fontSize={11} color={"gray.500"}>
              Community names including capitalization cannot be changed
            </Text>
            <Text
              position={"relative"}
              top={"28px"}
              width={"20px"}
              left={"10px"}
              color={"gray.400"}
            >
              r/
            </Text>
            <Input
              position={"relative"}
              size={"sm"}
              pl={"22px"}
              value={communityName}
              onChange={handleChange}
            />
            <Text fontSize={"9pt"} color={charCount === 0 ? "red" : "black"}>
              {charCount} Characters remaining
            </Text>
            {error && (
              <Text fontSize={"9pt"} color={"red"} pt={1}>
                {error}
              </Text>
            )}
            <Box mt={4} mb={4}>
              <Text fontWeight={600} fontSize={15}>
                Community type
              </Text>
            </Box>
            <Stack spacing={2}>
              <Checkbox
                name="public"
                isChecked={communityType === "public"}
                onChange={onCommunityTypeChange}
              >
                <Flex align={"center"}>
                  <Icon color={"gray.500"} as={BsFillPersonFill} />
                  <Text fontSize={"10pt"} mr={1}>
                    Public
                  </Text>
                  <Text fontSize={"8pt"} color={"gray.500"} pt={1}>
                    Anyone can view, post and comment to this community
                  </Text>
                </Flex>
              </Checkbox>
              <Checkbox
                fontSize={"10pt"}
                mr={1}
                name="restricted"
                isChecked={communityType === "restricted"}
                onChange={onCommunityTypeChange}
              >
                <Flex align={"center"}>
                  <Icon color={"gray.500"} as={BsFillEyeFill} />
                  <Text fontSize={"10pt"} mr={1}>
                    Restricted
                  </Text>
                  <Text fontSize={"8pt"} color={"gray.500"} pt={1}>
                    Anyone can view, but only approved users can post and
                    comment
                  </Text>
                </Flex>
              </Checkbox>
              <Checkbox
                name="private"
                isChecked={communityType === "private"}
                onChange={onCommunityTypeChange}
              >
                <Flex align={"center"}>
                  <Icon color={"gray.500"} as={HiLockClosed} />
                  <Text fontSize={"10pt"} mr={1}>
                    Private
                  </Text>
                  <Text fontSize={"8pt"} color={"gray.500"} pt={1}>
                    only approved users can view, post and comment
                  </Text>
                </Flex>
              </Checkbox>
            </Stack>
          </ModalBody>
        </Box>

        <ModalFooter bg={"gray.100"} border={"0px 0px 10px 10px"}>
          <Button
            variant={"outline"}
            height={"30px"}
            mr={3}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            height={"30px"}
            onClick={handleCreateCommunity}
            isLoading={loading}
          >
            Create Community
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default CreateCommunity;
