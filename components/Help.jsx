import { Badge, Box, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function Helper() {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" color="grey">
      <Box p="6">
        <Box mt="1" fontWeight="semibold" as="h4" display={"flex"}>
          I&apos;m facing issues
          <Box ml={1}>
            <Link href={"https://forms.gle/xv6fzSfBouNze5zS9"}>
              <button>
                <Badge colorScheme="red">Help me</Badge>
              </button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
