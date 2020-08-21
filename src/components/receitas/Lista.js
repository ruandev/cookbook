import { Badge, Box, Flex, Heading, Skeleton, Stack, Text } from "@chakra-ui/core"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import FirebaseService from "../../services/firebaseService"
import getRandomColor from "../../utils/color"

export default function Lista() {
  const [receitas, setReceitas] = useState([])
  const [categorias, setCategorias] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    FirebaseService.getDataList("categorias", (dataReceived) =>
      setCategorias([...dataReceived])
    )

    async function getAllReceitas() {
      await FirebaseService.getReceitas((dataReceived) => {
        setReceitas([...dataReceived])
        setIsLoaded(true)
      })
    }

    getAllReceitas()
  }, [])

  return (
    <>
      <Skeleton
        height="50px"
        my="10px"
        m={2}
        display={isLoaded ? "none" : "block"}
      />
      <Flex p={2} pt={0} wrap="wrap" justifyContent="space-between">
        {receitas.map((receita, key) => (
          <Box
            id={key}
            width={{
              sm: "100%",
              md: "45%",
              lg: "30%",
              xl: "30%",
            }}
            bg={getRandomColor()}
            p={3}
            mt={5}
          >
            <Link to={`/receitas/${receita.key}`}>
              <Heading as="h4" size="md" color="white" mb={3}>
                {receita.name.toUpperCase()}
              </Heading>
              <Stack isInline>
                {receita.categoriasSelecionadas.map((categoria) => {
                  const categoriaCompleta = categorias.find(
                    (c) => c.key === categoria
                  )
                  return (
                    <Badge key={categoria} variantColor="purple">
                      {categoriaCompleta.name}
                    </Badge>
                  )
                })}
              </Stack>
              <Text color="white" mt={3} whiteSpace="break-spaces">
                {receita.ingredientes}
              </Text>
            </Link>
          </Box>
        ))}
      </Flex>
    </>
  )
}
