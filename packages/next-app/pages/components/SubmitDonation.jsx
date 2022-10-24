import React, { useState, useEffect } from "react";
import { 
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader, 
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    useToast, 
    useDisclosure,
    FormControl,
    FormLabel,
    Input
} from "@chakra-ui/react";
// Wagmi 
import { useContract, useSigner } from 'wagmi';
// Address + ABI 
import { contractAddress } from '../../utils/contractAddress.js';
import contractABI from '../../contracts/ABI/BuyMeCoffee.json';
// Ethers
import { ethers } from "ethers";

export default function SubmitDonation() {
  const toast = useToast();
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(null);
  const [name, setName] = useState(null);
  const [memo, setMemo] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  const signer = useSigner();
  const contractOnMumbai = useContract({
    addressOrName: contractAddress,
    contractInterface: contractABI,
    signerOrProvider: signer.data,
  });

  const buyACoffee = async (coffee) => {
    try {
      setSuccess(false)
      setLoading(false)
      if (contractOnMumbai) {
        let deposit;
        if(coffee) { // true
          deposit = ethers.utils.parseEther("0.001");
        }
        else { // false
          deposit = ethers.utils.parseEther("0.01");
        }
        const txn = await contractOnMumbai.buyCoffee(name, memo, { value: deposit, gasLimit: 900000 });
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
  }

  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme={'pink'}
        bg={'pink.300'}
        rounded={'full'}
        px={6}
        _hover={{
          bg: 'pink.500',
        }}>
          Send Coffee
      </Button>
      {/* Modal Form */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Send Coffee ☕️</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <p>
              Coffee = 0.001 MATIC
              <br></br>
              Large Coffee = 0.01 MATIC
              <br></br>
              <br></br>
            </p>
            {/* Q1 */}
            <FormControl>
              <FormLabel><b>From</b></FormLabel>
              <Input onChange={(e)=>setName(e.target.value)} placeholder='Your Name' />
            </FormControl>
            {/* Q2 */}
            <FormControl mt={4}>
              <FormLabel><b>Memo</b></FormLabel>
              <Input onChange={(e)=>setMemo(e.target.value)} placeholder='Type a Short Message' />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            {/* Donate Coffee */}
            <Button 
              colorScheme={'pink'}
              bg={'pink.300'} 
              mr={3}
              onClick={()=>buyACoffee(true)}
              _hover={{
                bg: 'pink.500',
            }}>
              Send Coffee
            </Button>
            {/* Donate Large Coffee*/}
            <Button 
              colorScheme={'pink'}
              bg={'pink.300'} 
              mr={3}
              onClick={()=>buyACoffee(false)}
              _hover={{
                bg: 'pink.500',
            }}>
              Send Large Coffee
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}