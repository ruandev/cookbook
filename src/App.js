import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import "./App.css"
import Categorias from "./pages/Categorias"
import DetalharReceita from "./pages/DetalharReceita"
import EditarReceita from "./pages/EditarReceita"
import Home from "./pages/Home"
import Receitas from "./pages/Receitas"

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/categorias">
          <Categorias />
        </Route>
        <Route exact path="/receitas/nova">
          <Receitas />
        </Route>
        <Route exact path="/receitas/:id" component={DetalharReceita} />
        <Route exact path="/receitas/:id/editar" component={EditarReceita} />
      </Switch>
    </Router>
  )
}
