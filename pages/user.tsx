import UserDetails, { UserDetailsType } from "components/UserDetails";
import { NextPage } from "next";
import { NextRouter, useRouter } from "next/router";
import { MD5 } from "crypto-js";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Box, useToast } from "@chakra-ui/react";

export const validateEmail = (email: string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
};

const UserPage: NextPage = () => {
  const router: NextRouter = useRouter();
  const toast = useToast();

  const [userDetails, setUserDetails] = useState<
    UserDetailsType["user"] | null
  >(null);

  useEffect(() => {
    if (router.query.email) {
      const email = String(router.query.email);
      if (!email || !validateEmail(email)) return;
      const emailMD5 = MD5(email).toString();
      try {
        import(`../ragam25-users/${emailMD5}.json`)
          .then((res) => {
            setUserDetails(res.default);
          })
          .catch((res) => {
            setUserDetails(null);
            toast({
              position: "top-right",
              status: "error",
              isClosable: true,
              title: "User not found",
            });
          });
      } catch (error) {
        console.error(error);
        alert("User not found");
      }
    }
  }, [router.isReady, router.query.email]);

  return <UserDetails user={userDetails} />;
};

export default UserPage;
