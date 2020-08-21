import React from "react"
import Menu from "../components/Menu"
import Detalhar from "../components/receitas/Detalhar"

export default function DetalharReceita({ location }) {
  const { receita } = location.state

  return (
    <>
      <Menu />
      <Detalhar receita={receita} />
    </>
  )
}
