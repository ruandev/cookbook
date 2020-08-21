import { Box, Text } from "@chakra-ui/core"
import React, { useEffect, useState } from "react"
import FirebaseService from "../../services/firebaseService"

export default function Lista({ ...rest }) {
  const [categorias, setCategorias] = useState([])

  useEffect(() => {
    FirebaseService.getDataList("categorias", (dataReceived) =>
      setCategorias([...dataReceived])
    )
  }, [])

  return (
    <Box p={5} shadow="md" borderWidth="1px" {...rest}>
      {categorias &&
        categorias.map((categoria) => (
          <Text key={categoria.name}>{categoria.name}</Text>
        ))}
    </Box>
  )
}
