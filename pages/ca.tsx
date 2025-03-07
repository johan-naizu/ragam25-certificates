import { FC, RefObject, useEffect, useRef, useState } from "react";
import { Input, Button, Center, Heading, Stack, Box } from "@chakra-ui/react";
import renderCertificate, {
  data,
  templateParams,
} from "utils/render-certificate";

const AdminPage: FC = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const nameRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const collegeRef: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  const eventRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  const validateLogin = async (email: string, password: string) => {
    let res = await fetch("https://api.npoint.io/11bdee245eeb63a2fdd2");
    const data = await res.json();
    const admins = data.users;

    let flag = false;

    admins.forEach((admin: { email: string; password: string }) => {
      if (admin.email === email && admin.password === password) {
        flag = true;
        return;
      }
    });
    return flag;
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("admin2022") || "{}");
    if (user.email && user.password) {
      validateLogin(user.email, user.password).then((res) => {
        setIsAdmin(res);
      });
    }
  }, []);

  const handleClick = async () => {
    if (!nameRef.current?.value || !collegeRef.current?.value)
      return alert("Please fill all the fields");
    const data: data = {
      user: {
        name: nameRef.current?.value,
      },
      event: {
        name: eventRef.current?.value || "",
      },
    };
    const templateParams: templateParams = {};
    renderCertificate(data, templateParams, "/CA Cert Template-1.png", true);
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    // @ts-ignore
    const email = e.target.email.value;
    const password = "ADMIN";

    validateLogin(email, password).then((res) => {
      setIsAdmin(res);
      localStorage.setItem(
        "admin2022",
        JSON.stringify({
          email,
          password,
        }),
      );
    });
  };
  return (
    <div>
      <h1>Admin Page</h1>
      {!isAdmin && (
        <Stack spacing={3}>
          <Center>
            <Heading color="#fff">Ragam 25 - CA</Heading>
          </Center>
          {/* @ts-ignore */}
          <form onSubmit={handleSubmit}>
            <Input
              color="white"
              size="lg"
              placeholder="email"
              type="text"
              name="email"
              id="email"
            />
            <Box h={3}></Box>
            <Input
              color="white"
              size="lg"
              placeholder="password"
              type="password"
              name="password"
              id="password"
            />
            <Box h={3}></Box>
            <Center>
              <Button type="submit" color={"#121212"}>
                Login
              </Button>
            </Center>
          </form>
        </Stack>
      )}
      {isAdmin && (
        <Stack spacing={3}>
          <Center>
            <Heading color="#fff">Ragam 25</Heading>
          </Center>
          <Input
            ref={nameRef}
            color="white"
            size="lg"
            placeholder="Name"
            type="text"
          />
          <Input
            ref={collegeRef}
            color="white"
            size="lg"
            placeholder="College"
            type="text"
          />
          <Input
            ref={eventRef}
            color="white"
            size="lg"
            placeholder="Event/Workshop/Lecture"
            type="text"
          />
          <Button type="submit" color={"#121212"} onClick={handleClick}>
            Generate Certificate
          </Button>
        </Stack>
      )}
    </div>
  );
};

export default AdminPage;
