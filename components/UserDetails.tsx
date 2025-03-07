import { FC } from "react";
import renderCertificate, {
  data,
  templateParams,
} from "utils/render-certificate";
import {
  Container,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
  Button,
  IconButton,
  Flex,
  HStack,
  Spacer,
  Heading,
} from "@chakra-ui/react";
import UserCard from "./UserCard";
import { BsDownload } from "react-icons/bs";
const UserDetails: FC<UserDetailsType> = (props) => {
  const handleClick = async (eventName: string) => {
    const data: data = {
      user: {
        name: String(props.user?.name),
        email: String(props.user?.email),
      },
      event: {
        name: eventName,
      },
    };
    const templateParams: templateParams = {};
    renderCertificate(data, templateParams);
  };

  return (
    <Container>
      <UserCard name={props.user?.name} email={props.user?.email} />
      <Accordion color="white" defaultIndex={[0]} allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Heading as="h4" size="md">
                  Workshops
                </Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {props.user?.workshops?.map((workshop, idx) => (
              <HStack key={idx} dir={"row"} spacing={1}>
                <Text>{workshop.name}</Text>
                <Spacer />
                <IconButton
                  aria-label="Download certificate"
                  icon={<BsDownload color="black" />}
                  onClick={() => handleClick(workshop.name)}
                />
              </HStack>
            ))}
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Heading as="h4" size="md">
                  Events
                </Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {props.user?.events?.map((event, idx) => (
              <HStack dir={"row"} key={idx} spacing={1}>
                <Text>{event.name}</Text>
                <Spacer />
                <IconButton
                  aria-label="Download certificate"
                  icon={<BsDownload color="black" />}
                  onClick={() => handleClick(event.name)}
                />
              </HStack>
            ))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Container>
  );
};

export default UserDetails;

type eventType = {
  name: string;
  verified: boolean;
}[];
export interface UserDetailsType {
  user: {
    email?: string;
    name?: string;
    college?: string;
    workshops?: eventType;
    lectures?: eventType;
    competitions?: eventType;
    events?: eventType;
  } | null;
}
