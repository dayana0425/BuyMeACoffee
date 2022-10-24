import React, { useState, useEffect, memo } from "react";
import {
    Avatar,
    Box,
    chakra,
    Flex,
    SimpleGrid,
    useColorModeValue,
  } from '@chakra-ui/react';
// utils
import { backgrounds } from "../../utils/backgrounds"
import { images } from "../../utils/images"
// Wagmi 
import { useContract, useSigner, useAccount } from 'wagmi';
// Address + ABI 
import { contractAddress } from '../../utils/contractAddress.js';
import contractABI from '../../contracts/ABI/BuyMeCoffee.json';

  function TestimonialCard(memoInfo) {
    return (
      <Flex
        boxShadow={'lg'}
        maxW={'640px'}
        direction={{ base: 'column-reverse', md: 'row' }}
        width={'full'}
        rounded={'xl'}
        p={10}
        justifyContent={'space-between'}
        position={'relative'}
        bg={useColorModeValue('white', 'gray.800')}
        _after={{
          content: '""',
          position: 'absolute',
          height: '21px',
          width: '29px',
          left: '35px',
          top: '-10px',
          backgroundSize: 'cover',
          backgroundImage: `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='29' height='21' viewBox='0 0 29 21' fill='none'%3E%3Cpath d='M6.91391 21C4.56659 21 2.81678 20.2152 1.66446 18.6455C0.55482 17.0758 0 15.2515 0 13.1727C0 11.2636 0.405445 9.43939 1.21634 7.7C2.0699 5.91818 3.15821 4.3697 4.48124 3.05454C5.84695 1.69697 7.31935 0.678787 8.89845 0L13.3157 3.24545C11.5659 3.96667 9.98676 4.94242 8.57837 6.17273C7.21266 7.36061 6.25239 8.63333 5.69757 9.99091L6.01766 10.1818C6.27373 10.0121 6.55114 9.88485 6.84989 9.8C7.19132 9.71515 7.63944 9.67273 8.19426 9.67273C9.34658 9.67273 10.4776 10.097 11.5872 10.9455C12.7395 11.7939 13.3157 13.1091 13.3157 14.8909C13.3157 16.8848 12.6542 18.4121 11.3311 19.4727C10.0508 20.4909 8.57837 21 6.91391 21ZM22.5982 21C20.2509 21 18.5011 20.2152 17.3488 18.6455C16.2391 17.0758 15.6843 15.2515 15.6843 13.1727C15.6843 11.2636 16.0898 9.43939 16.9007 7.7C17.7542 5.91818 18.8425 4.3697 20.1656 3.05454C21.5313 1.69697 23.0037 0.678787 24.5828 0L29 3.24545C27.2502 3.96667 25.6711 4.94242 24.2627 6.17273C22.897 7.36061 21.9367 8.63333 21.3819 9.99091L21.702 10.1818C21.9581 10.0121 22.2355 9.88485 22.5342 9.8C22.8756 9.71515 23.3238 9.67273 23.8786 9.67273C25.0309 9.67273 26.1619 10.097 27.2715 10.9455C28.4238 11.7939 29 13.1091 29 14.8909C29 16.8848 28.3385 18.4121 27.0155 19.4727C25.7351 20.4909 24.2627 21 22.5982 21Z' fill='%239F7AEA'/%3E%3C/svg%3E")`,
        }}
        _before={{
          content: '""',
          position: 'absolute',
          zIndex: '-1',
          height: 'full',
          maxW: '640px',
          width: 'full',
          filter: 'blur(40px)',
          transform: 'scale(0.98)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          top: 0,
          left: 0,
          backgroundImage: backgrounds[memoInfo.index % 4],
        }}>
        <Flex
          direction={'column'}
          textAlign={'left'}
          justifyContent={'space-between'}>
          <chakra.p
            fontFamily={'Inter'}
            fontWeight={'medium'}
            fontSize={'15px'}
            pb={4}>
            {memoInfo.message}
          </chakra.p>
          <chakra.p fontFamily={'Work Sans'} fontWeight={'bold'} fontSize={14}>
            {memoInfo.name}
            <chakra.span
              fontFamily={'Inter'}
              fontWeight={'medium'}
              color={'gray.500'}>
              {' '}
              - {memoInfo.from}
            </chakra.span>
          </chakra.p>
        </Flex>
        <Avatar
          src={images[memoInfo.index % 7]}
          height={'80px'}
          width={'80px'}
          alignSelf={'center'}
          m={{ base: '0 0 35px 0', md: '0 0 0 50px' }}
        />
      </Flex>
    );
  }
  
  export default function RecievedMemos() {
    const { isConnected } = useAccount();
    const [memos, setMemos] = useState(null);
    const signer = useSigner();
    const contractOnMumbai = useContract({
      addressOrName: contractAddress,
      contractInterface: contractABI,
      signerOrProvider: signer.data,
    });

  const getMemos = async () => {
    try {
      if (contractOnMumbai && isConnected) {        
        console.log("fetching memos from the blockchain..");
        const res = await contractOnMumbai.getMemos();
        console.log("fetched!");
        setMemos(res);
      } else {
        console.log("Metamask is not connected");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
      if(isConnected){
        getMemos();
      }
  }, [isConnected, getMemos]);


    return (
      <Flex
        textAlign={'center'}
        pt={10}
        justifyContent={'center'}
        direction={'column'}
        width={'full'}>
        <Box width={{ base: 'full', sm: 'lg', lg: 'xl' }} margin={'auto'}>
            <chakra.h3
                fontFamily={'Work Sans'}
                fontWeight={'bold'}
                fontSize={20}
                textTransform={'uppercase'}
                color={'purple.400'}>
                All Coffees Recieved ☕️
            </chakra.h3>
        </Box>
        <SimpleGrid
            columns={{ base: 1, xl: 2 }}
            spacing={'20'}
            mt={16}
            mx={'auto'}>
        {memos && memos.map((memoInfo, index) => (
          <TestimonialCard {...memoInfo} key={index} index={index}/>
        ))}
        </SimpleGrid>
      </Flex>
    );
  }