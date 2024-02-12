import React, { useEffect } from "react";
import { Container, Box, Text ,Tab, TabList,TabPanel,TabPanels,Tabs } from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { useHistory } from "react-router-dom";
const Home = () => {
  const history = useHistory();
  useEffect(()=>{
          const userInfo = JSON.parse(localStorage.getItem("userInfo"));
          if(userInfo){
              history.push('/chats');
          }
  },[history])

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifycontent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text
          fontSize="4xl"
          fontFamily="Work sans"
          color={"black"}
          textAlign="Center"
        >
          Talk-A-Tive
        </Text>
      </Box>

      <Box 
      bg={'white'}
      w={"100%"}
      p={4}
      borderRadius={"lg"}
      borderWidth={"1px"}
      >

<Tabs variant='soft-rounded'>
  <TabList>
    <Tab w={"50%"}>Login</Tab>
    <Tab w={"50%"}>Sign Up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
     {<Login/>}
    </TabPanel>
    <TabPanel>
     {<Signup/>}
    </TabPanel>
  </TabPanels>
</Tabs>
      </Box>
    </Container>
  );
};

export default Home;
