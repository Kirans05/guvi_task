import {
  Box,
  Button,
  Container,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import axios from "axios"

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectBox, setSelectBox] = useState("Add schema to segments");
  const [selectOptions, setselectOptions] = useState([
    ["First Name", { 0: "first_name", 1: "First Name" }],
    ["Last Name", { 0: "last_name", 1: "Last Name" }],
    ["Gender", { 0: "gender", 1: "Gender" }],
    ["Age", { 0: "age", 1: "Age" }],
    ["Account Name", { 0: "account_name", 1: "Account Name" }],
    ["City", { 0: "city", 1: "City" }],
    ["State", { 0: "state", 1: "State" }],
  ]);
  const [dupliacte, setDuplicate] = useState(selectOptions);
  const [blueBox, setBlueBox] = useState([]);
  const [clickedOption, setClickedOptions] = useState("");
  const ref = useRef();
  const [segmentName, setSegmentName] = useState("")

  const changeAddToSegmentDropDown = (e) => {
    setClickedOptions(e.target.value);
  };

  const addNewSegment = () => {
    let value = clickedOption;
    let label;
    for (let i of dupliacte) {
      if (value == i[1][0]) {
        label = i[0];
      }
    }
    let remainingElements = dupliacte.filter((item) => item[0] != label);
    let filteredElements = dupliacte.filter((item) => item[0] == label);
    setDuplicate(remainingElements);
    if (label == undefined) {
    } else {
      setBlueBox([...blueBox, ...filteredElements]);
    }
    ref.current.value = "Add schema to segment";
  };


const removeItem = (list) => {
  let remainingElements = blueBox.filter(item => item[0] != list[0])
  setBlueBox(remainingElements)
  setDuplicate([...dupliacte, list])
}


const submitHandler = async () => {
  let data = []
  for(let i of blueBox){
    let key = i[1][0]
    let value = i[1][1]
    let obj = {
      [key] : value
    }
    data.push(obj)
  }
  let options = {
    url:"https://webhook.site/14aa2e9e-cc61-47d2-bdfe-b1f1e0df9f7f",
    headers:{
      "content-type":"appilcation/json",
      "Access-Control-Allow-Origin":"*"
    },
    data:{
      segment_name:segmentName,
      schema:data
    },
    method:"POST"
  }
  
  let result = await axios(options)
  console.log(result)

}

  return (
    <Container 
     margin={0} padding={0} width={"100vw"}>
      <Button onClick={onOpen}>Save Segment</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display={"flex"} flexDir={"row"} alignItems={"center"}>
            <ChevronLeftIcon onClick={onClose} />
            <Text>Saving Segment</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody fontSize={12}>
            {/* // adding segments */}
            <Text>Enter Name Of The Segement</Text>
            <Input placeholder="Name Of The Segment" size="md" onChange={(e) => setSegmentName(e.target.value)}
            value={segmentName}
            />

            {/* text od suggestion */}
            <Text>
              To Save Your Segment, you need to add the Schemas to build the
              query.
            </Text>

            {/* colors and traits  */}
            <Box
              className="traits"
              display={"flex"}
              flexDir={"row"}
              justifyContent={"flex-end"}
              fontSize={10}
            >
              <Box
                className="user-Traits"
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
                mr={2}
              >
                <Box
                  borderRadius={"50%"}
                  backgroundColor="green"
                  width={2}
                  height={2}
                ></Box>
                <Text>-User Traits</Text>
              </Box>
              <Box
                className="Group-Traits"
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
              >
                <Box
                  borderRadius={"50%"}
                  backgroundColor="red"
                  width={2}
                  height={2}
                ></Box>
                <Text>-Group Traits</Text>
              </Box>
            </Box>

            <Box>
              {blueBox.map((item, index) => {
                return (
                  <Box
                  display={"flex"}
                  alignItems={"center"}
                  key={index}
                  >
                     <Box
                  borderRadius={"50%"}
                  backgroundColor="green"
                  width={2}
                  height={2}
                ></Box>
                  <Select  placeholder={item[0]}>
                    {blueBox.map((item, index) => {
                      return (
                        <option
                          key={index}
                          value={item[1][0]}
                          title={item[0]}
                          name="kiran"
                        >
                          {item[0]}
                        </option>
                      );
                    })}
                  </Select>
                  <Text onClick={()=>removeItem(item)}
                  _hover={{
                    cursor:"pointer"
                  }}
                  >X</Text>
                  </Box>
                );
              })}
            </Box>

            {/* drop down of schemas */}
            <Box className="Add schemas to the segment">
              <Select
                placeholder="Add schema to segment"
                onChange={changeAddToSegmentDropDown}
                ref={ref}
              >
                {dupliacte.map((item, index) => {
                  return (
                    <option
                      key={index}
                      value={item[1][0]}
                      title={item[0]}
                      name="kiran"
                    >
                      {item[0]}
                    </option>
                  );
                })}
              </Select>
              <br />
              <Text
                textDecoration={"underline"}
                color="blue"
                _hover={{
                  cursor: "pointer",
                }}
                onClick={addNewSegment}
              >
                +Add new schema
              </Text>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost"
            onClick={submitHandler}
            >Save Segment</Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default App;
