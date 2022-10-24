import React from "react";
import { Text } from '@chakra-ui/react';

export default function CardText({ boldText, text }) {
    return (
        <>
            <Text fontWeight={600} color={'gray.600'}>
                {boldText}
            </Text>
            <Text color={'gray.500'}>
                {text}
            </Text>
        </>   
    );
}