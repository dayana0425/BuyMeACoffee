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
    useDisclosure
} from "@chakra-ui/react";
// Wagmi 
import { useContract, useSigner } from 'wagmi';
// Address + ABI 
import { contractAddress } from '../../utils/contractAddress.js';
import contractABI from '../../contracts/ABI/BuyMeCoffee.json';

export default function Withdraw() {
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

  const withdrawFunds = async () => {
    try {
      setSuccess(false)
      setLoading(false)
      if (contractOnMumbai) {
        const txn = await contractOnMumbai.withdrawTips({ gasLimit: 900000 });
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
      alert("Sorry, you're not the owner so you can't withdraw.");
    }
  }

  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme={'pink'}
        bg={'purple.300'}
        rounded={'full'}
        px={6}
        _hover={{
          bg: 'purple.500',
        }}>
          Withdraw
      </Button>
      {/* Modal Message + Withdraw */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Withdraw Your Crypto 🤑</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <p>
              <b>Warning:</b> Only the owner can withdraw earnings. If you&apos;re not the owner the transaction will fail!
              <br></br>
              <br></br>
            </p>
          </ModalBody>
          <ModalFooter>
            {/* Withdraw */}
            <Button 
              colorScheme={'pink'}
              bg={'pink.300'} 
              mr={3}
              onClick={()=>withdrawFunds()}
              _hover={{
                bg: 'pink.500',
            }}>
              Withdraw
            </Button>
            {/* Close */}
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}