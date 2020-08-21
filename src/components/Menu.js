import { Button, IconButton, Stack } from "@chakra-ui/core"
import React from "react"
import { FaHome } from "react-icons/fa"
import { NavLink } from "react-router-dom"

export default function Menu() {
  return (
    <Stack spacing={10} p={2} isInline>
      <NavLink
        exact
        to="/"
        activeStyle={{
          display: "none",
        }}
      >
        <IconButton
          variantColor="blue"
          aria-label="Ir para Página Inicial"
          icon={FaHome}
          size="md"
          mr={5}
        />
      </NavLink>
      <NavLink
        to="/receitas/nova"
        activeStyle={{
          display: "none",
        }}
      >
        <Button variantColor="pink" size="md" mr={5}>
          Nova Receita
        </Button>
      </NavLink>
      <NavLink
        to="/categorias"
        activeStyle={{
          display: "none",
        }}
      >
        <Button variantColor="purple" size="md">
          Categorias
        </Button>
      </NavLink>
    </Stack>
  )
}
