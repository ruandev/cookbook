import { CSSReset, theme, ThemeProvider } from "@chakra-ui/core"
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "./index.css"

const breakpoints = ["360px", "768px", "1024px", "1440px"]
breakpoints.sm = breakpoints[0]
breakpoints.md = breakpoints[1]
breakpoints.lg = breakpoints[2]
breakpoints.xl = breakpoints[3]

const newTheme = {
  ...theme,
  breakpoints,
}

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={newTheme}>
      <CSSReset />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
