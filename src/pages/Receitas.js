import React from "react"
import Menu from "../components/Menu"
import Nova from "../components/receitas/Nova"

export default function Receitas({ ...rest }) {
  return (
    <>
      <Menu />
      <Nova {...rest} />
    </>
  )
}
