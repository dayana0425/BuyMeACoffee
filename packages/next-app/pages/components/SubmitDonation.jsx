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


export default function SubmitDonation() {
  const toast = useToast();
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(null);
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

  async function handleSubmit(e) {
    try {
      setSuccess(false)
      setLoading(false)
      if (contractOnMumbai) {
        const txn = await contractOnMumbai.buyCoffee("", "", { gasLimit: 900000 });
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

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

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

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
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
              <FormLabel><b>Form</b></FormLabel>
              <Input ref={initialRef} placeholder='Your Name' />
            </FormControl>
            {/* Q2 */}
            <FormControl mt={4}>
              <FormLabel><b>Memo</b></FormLabel>
              <Input placeholder='Type a Short Message' />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            {/* Donate */}
            <Button 
              colorScheme={'pink'}
              bg={'pink.300'} 
              mr={3}
              _hover={{
                bg: 'pink.500',
            }}>
              Send Coffee
            </Button>
            {/* Donate */}
            <Button 
              colorScheme={'pink'}
              bg={'pink.300'} 
              mr={3}
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