import { Box, Heading, Spinner, Text } from "@chakra-ui/core"
import React, { useEffect, useState } from "react"
import FirebaseService from "../../services/firebaseService"

export default function Detalhar({ id }) {
  const [receita, setReceita] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    FirebaseService.getUniqueDataBy("receitas", id, (dataReceived) => {
      setReceita(dataReceived)
      setIsLoaded(true)
    })
  }, [id])

  return (
    <>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        display={isLoaded ? "none" : "block"}
        m={10}
      />
      <Box
        m={2}
        p={5}
        shadow="md"
        borderWidth="1px"
        display={!isLoaded ? "none" : "block"}
      >
        <Heading fontSize="xl" mb={5}>
          {receita.name && receita.name.toUpperCase()}
        </Heading>
        <Heading fontSize="sm" mb={1}>
          Ingredientes
        </Heading>
        <Text mb={10} whiteSpace="break-spaces">
          {receita.ingredientes}
        </Text>
        <Heading fontSize="sm" marginBottom={1}>
          Modo de Preparo
        </Heading>
        <Text>{receita.formaPreparo}</Text>
      </Box>
    </>
  )
}
