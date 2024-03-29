import React from "react";
import { Box, Button, Flex, Image, Spacer } from "@chakra-ui/react";
import facebook from "./assets/social-media-icons/facebook_32x32.png";
import twitter from "./assets/social-media-icons/twitter_32x32.png";
import Email from "./assets/social-media-icons/email_32x32.png";

const NavBar = ({ accounts, setAccounts }) => {
  const isConnected = Boolean(accounts[0]);

  async function connectAccount() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
    }
  }

  return (
    <Flex justify="space-between" align="center" padding="30px">
      {/* left side of navbar */}
      <div>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <Image src={facebook} alt="Facebook" />
        </a>
      </div>
      <div>
        <a href="https://twitter.com/Kavypat18" target="_blank" rel="noopener noreferrer">
          <Image src={twitter} alt="Twitter" />
        </a>
      </div>
      <div>
        <a href="mailto:kavypatel255@gmail.com">
          <Image src={Email} alt="Email" />
        </a>
      </div>

      {/* right side of navbar */}
      <Flex justify="space-around" align="center" width="40%" padding="30px">
        <Box margin="0 15px">About</Box>
        <Spacer />
        <Box margin="0 15px">Mint</Box>
        <Spacer />
        <Box margin="0 15px">Team</Box>
        <Spacer />
      </Flex>

      {/* connect */}
      {isConnected ? (
        <Box margin="0 15px">Connected</Box>
      ) : (
        <Button
          backgroundColor="#D6517D"
          borderRadius="5px"
          boxShadow="0px 2px 5px 1px #D6517D"
          color="white"
          cursor="pointer"
          fontFamily="inherit"
          padding="15px"
          margin="0 15px"
          onClick={connectAccount}
        >
          Connect
        </Button>
      )}
    </Flex>
  );
};

export default NavBar;
