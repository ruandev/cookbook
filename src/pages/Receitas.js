import React from "react"
import Menu from "../components/Menu"
import Formulario from "../components/receitas/Formulario"

export default function Receitas({ ...rest }) {
  return (
    <>
      <Menu />
      <Formulario {...rest} />
    </>
  )
}
