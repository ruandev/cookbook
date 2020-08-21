import React from "react"
import Menu from "../components/Menu"
import Formulario from "../components/receitas/Formulario"

export default function EditarReceita({ location }) {
  const { receita } = location.state

  return (
    <>
      <Menu />
      <Formulario receita={receita} />
    </>
  )
}
