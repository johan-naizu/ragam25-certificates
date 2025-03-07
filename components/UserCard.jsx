import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import {generateAvatar} from "utils/generateAvatar"

export default function SocialProfileWithImage(props) {
  return (
    <Center py={6}>
      <Box
        maxW={"300px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Image
          h={"120px"}
          w={"full"}
          src={
            "https://media.istockphoto.com/photos/binary-code-picture-id122204403?b=1&k=20&m=122204403&s=170667a&w=0&h=tYKiboZF8lNrgAk3tD11J_5y63qcopVQ3Sw6jwcdlgs="
          }
          objectFit={"cover"}
        />
        <Flex justify={"center"} mt={-12}>
          <Avatar
            size={"xl"}
            src={generateAvatar(props.email)}
            css={{
              border: "2px solid white",
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
              {props.name}
            </Heading>
            <Text color={"gray.500"}>{props.email}</Text>
          </Stack>
        </Box>
      </Box>
    </Center>
  );
}
