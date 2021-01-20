import { Box, Flex, Heading, IconButton, Text } from "@chakra-ui/core"
import React from "react"
import { FiEdit3 } from "react-icons/fi"
import { Link } from "react-router-dom"

export default function Detalhar({ receita }) {
  return (
    <Box m={2} p={5} shadow="md" borderWidth="1px">
      <Flex justifyContent="space-between" alignItems="center" mb={3}>
        <Heading fontSize="xl">{receita.name && receita.name.toUpperCase()}</Heading>

        <Link
          to={{
            pathname: `/receitas/${receita.key}/editar`,
            state: {
              receita,
            },
          }}
          style={{
            width: "32px",
          }}
        >
          <IconButton
            variant="outline"
            variantColor="blue"
            aria-label="Ir para Página Inicial"
            icon={FiEdit3}
            size="sm"
            mr={5}
          />
        </Link>
      </Flex>
      <Heading fontSize="sm" mb={1}>
        Ingredientes
      </Heading>
      <Text mb={10} whiteSpace="break-spaces">
        {receita.ingredientes}
      </Text>
      <Heading fontSize="sm" mb={1}>
        Modo de Preparo
      </Heading>
      <Text mb={10}>{receita.formaPreparo}</Text>
      {receita.link != null && (
        <>
          <Heading fontSize="sm" mb={1}>
            Link
          </Heading>
          <Text>{receita.link}</Text>
        </>
      )}
    </Box>
  )
}
