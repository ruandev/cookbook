import React from "react"
import { useParams } from "react-router-dom"
import Menu from "../components/Menu"
import Detalhar from "../components/receitas/Detalhar"

export default function DetalharReceita() {
  const { id } = useParams()

  return (
    <>
      <Menu />
      <Detalhar id={id} />
    </>
  )
}
