import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Select,
    NumberInput,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    NumberInputField,
    Input,
    InputGroup,
    InputLeftElement,
    Stack,
    Textarea,
    VStack,
    useColorModeValue,
    useToast
} from '@chakra-ui/react';
  import Navbar from "./components/Navbar";
  import Header from "./Header";
  // Icon
  import { BsPerson } from 'react-icons/bs';
  // Data
  import countriesJSON from '../data/countries.json';
  import cryptocurrenciesJSON from '../data/cryptocurrencies.json';
  // Helper
  import getRandomImage from "../helpers/getRandomImage";
  // Wagmi 
  import { useContract, useSigner } from 'wagmi';
  // Address + ABI 
  import { contractAddress } from '../utils/contractAddress.js';
  import contractABI from '../contracts/ABI/HelloWorld.json';

  export default function Form() {
    // Chakura-UI Toast Messages
    const toast = useToast();

    // Toast For Every Page Render
    useEffect(() => {
        toast({
          title: "Connect Wallet",
          description: "Connect to Polygon Mumbai",
          status: "info",
          duration: 4000,
          isClosable: false,
          position: "bottom-right",
        });
      }, []);

    // Transaction States
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(null);
    // Form States
    const [personName, setName] = useState("");
    const [personAge, setAge] = useState("");
    const [personCountry, setCountry] = useState("");
    const [faveCrypto, setCrypto] = useState("");
    const [message, setMessage] = useState("");

    // Connect To Contract
    const signer = useSigner();
    const contractOnMumbai = useContract({
      addressOrName: contractAddress,
      contractInterface: contractABI,
      signerOrProvider: signer.data,
    });

  // Toasts for Transaction States
  useEffect(() => {
    if(success) {
      toast({
        title: "Success!",
        status: "success",
        duration: 4000,
        isClosable: false,
        position: "bottom-right",
      });
    }
    if(loading) {
      toast({
        title: "Waiting...",
        status: "loading",
        duration: 4000,
        isClosable: false,
        position: "bottom-right",
      });
    }
  }, [success, loading]);

    // Handle Submit
    async function handleSubmit(e) {
      e.preventDefault();

      const body = {
        name: personName,
        age: personAge,
        country: personCountry,
        crypto: faveCrypto,
        formMessage: message,
        image: getRandomImage()
      };

      console.log("BODY: ", body);

      try {
        // Save Form Details In IPFS
        const response = await fetch("/api/StoreData", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (response.status !== 200) {
          alert("Oops! Something went wrong. Please refresh & try again.");
        } else {
          let responseJSON = await response.json();
          await createGreeting(responseJSON.cid);
          console.log("Saved in IPFS: ", responseJSON.cid);
        }
      } catch (error) {
        alert("Oops! Something went wrong. Please refresh & try again.", error);
      }
    }

    // Create Greeting
    const createGreeting = async (cid) => {
      try {
        // Reset
        setSuccess(false)
        setLoading(false)
        if (contractOnMumbai) {
          // Calling smart contract function: createNewGreeting
          const txn = await contractOnMumbai.createNewGreeting(cid,{ gasLimit: 900000 });
          setLoading(true);
          await txn.wait();
          setLoading(false);
          setSuccess(true);
        } else {
          setSuccess(false)
          setLoading(false)
          alert("Oops! Something went wrong. Please refresh & try again.");
        }
      } catch (error) {
        setSuccess(false)
        setLoading(false)
        alert("Oops! Something went wrong. Please refresh & try again.");
      }
    };

    // UI
    return (
    <div>
    <Header/>
    <Navbar/>
      <Flex
        align="center"
        justify="center"
        id="intro">
        <Box
          borderRadius="lg"
          m={{ base: 5, md: 16, lg: 10 }}
          p={{ base: 5, lg: 16 }}>
          <Box>
            <VStack spacing={{ base: 2, md: 4, lg: 8 }}>
              {/* TITLE */}
              <Heading
                className={"text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"}
                fontSize={{
                  base: '3xl',
                  md: '5xl',
                }}>
                Saluda al Mundo 👋
              </Heading>
              {/* FORM */}
              <Stack
                spacing={{ base: 4, md: 7, lg: 10 }}
                direction={{ base: 'column', md: 'row' }}>
                <Box
                  borderWidth='1px'
                  bg={useColorModeValue('white', 'gray.700')}
                  borderRadius="lg"
                  p={8}
                  color={useColorModeValue('gray.700', 'whiteAlpha.900')}
                  shadow="base">
                  {/* FIELD: NOMBRE */}
                  <VStack spacing={5}>][]
                    <FormControl isRequired>
                      <FormLabel>Nombre</FormLabel>
                      <InputGroup>
                        <InputLeftElement>
                            <BsPerson />
                        </InputLeftElement>
                        <Input 
                          type="text" 
                          name="name" 
                          placeholder="Su Nombre"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </InputGroup>
                    </FormControl>
                    {/* FIELD: EDAD / AGE */}
                    <FormControl isRequired>
                      <FormLabel>Edad</FormLabel>
                      <NumberInput 
                        allowMouseWheel="true" 
                        max={110} min={1} 
                        defaultValue="1">
                        <NumberInputField onChange={(e) => setAge(e.target.value)}/>
                        <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    </FormControl>
                    {/* FIELD: PAÍS / COUNTRY */}
                    <FormControl isRequired>
                      <FormLabel>País</FormLabel>
                        <Select
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder='Selecciona País'>
                            {countriesJSON.map((country) => {
                                return (<option key={country.code}>{country.name}</option>);
                            })}
                        </Select>
                    </FormControl>
                    {/* FIELD: CRIPTO / CRYPTO */}
                    <FormControl isRequired>
                      <FormLabel>¿Cuál Es Tu Criptomoneda Favorita?</FormLabel>
                      <Select 
                      onChange={(e) => setCrypto(e.target.value)}
                      placeholder='Selecciona Criptomoneda'>
                            {cryptocurrenciesJSON.map((crypto) => {
                                return (<option key={crypto.code}>{crypto.name}</option>);
                            })}
                        </Select>
                    </FormControl>
                    {/* FIELD: MENSAJE / MESSAGE */}
                    <FormControl isRequired>
                      <FormLabel>Mensaje</FormLabel>
                      <Textarea
                        onChange={(e) => setMessage(e.target.value)}
                        name="Message"
                        placeholder="Tu Mensaje"
                        rows={6}
                        resize="none"
                      />
                    </FormControl>
                    {/* SUBMIT */}
                    <Button
                      colorScheme="blue"
                      bg="blue.400"
                      color="white"
                      _hover={{
                        bg: 'blue.500',
                      }}
                      onClick={(e)=> handleSubmit(e)}>
                      Crear Saludo
                    </Button>
                  </VStack>
                </Box>
              </Stack>
            </VStack>
          </Box>
        </Box>
      </Flex>
    </div>
    );
  }