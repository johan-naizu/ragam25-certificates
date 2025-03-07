import { NextRouter, useRouter } from "next/router";
import { FC, RefObject, useRef } from "react";

import { Input, Button, Center, Heading, Stack, Image } from "@chakra-ui/react";
import { validateEmail } from "pages/user";
import { toast } from "react-toastify";
import axios from "axios";

const updateUserDetails = async (
  email: string,
  details: Record<string, any>,
) => {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  const token = process.env.NEXT_PUBLIC_TOKEN;

  try {
    const response = await axios.get(
      `${strapiUrl}/api/users?filters[email][$eq]=${email}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const users = response.data;
    if (!users.length) {
      return null;
    }

    let user = users[0];
    user.branch = details.branch;
    user.year = details.year;

    const updated = await axios.put(
      `${strapiUrl}/api/users/${user.id}`,
      user,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return updated.data;
  } catch (error) {
    return null;
  }
};
const Form: FC = () => {
  const emailRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const branchRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const yearRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  const router: NextRouter = useRouter();

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredEmail = emailRef.current?.value;
    const enteredBranch = branchRef.current?.value;
    const enteredYear = yearRef.current?.value;

    if (!enteredEmail || !validateEmail(enteredEmail)) {
      toast.error("Email is required", { theme: "dark" });
      return;
    }
    if (!enteredBranch) {
      toast.error("Branch is required", { theme: "dark" });
      return;
    }
    if (!enteredYear) {
      toast.error("Year is required", { theme: "dark" });
      return;
    }
    try {
      updateUserDetails(enteredEmail, {
        branch: enteredBranch,
        year: enteredYear,
      });
    } catch (error) {}
    router.push(`/user?email=${enteredEmail}`);
  };

  return (
    <form
      onSubmit={submitHandler}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <Stack spacing={3}>
        <Center>
          <Heading color="#fff">Ragam 25</Heading>
        </Center>
        <Center>
          <Image src={"/logo.svg"} alt="sffd" />
        </Center>
        <Input
          ref={emailRef}
          color="white"
          size="lg"
          placeholder="Email"
          type="email"
        />
        <Input
          ref={branchRef}
          color="white"
          size="lg"
          placeholder="Branch"
          type="text"
        />
        <Input
          ref={yearRef}
          color="white"
          size="lg"
          placeholder="Year"
          type="text"
        />

        <Button type="submit" color={"#121212"}>
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default Form;
