import { Stack } from "@chakra-ui/core"
import React from "react"
import Lista from "../components/categorias/Lista"
import Nova from "../components/categorias/Nova"
import Menu from "../components/Menu"

export default function Categorias() {
  return (
    <>
      <Menu />
      <Stack spacing={10} p={2}>
        <Nova />
        <Lista />
      </Stack>
    </>
  )
}
