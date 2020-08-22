import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/core"
import { Field, Form, Formik } from "formik"
import React from "react"
import FirebaseService from "../../services/firebaseService"

function validateName(value) {
  let error
  if (!value) {
    error = "Categoria é obrigatório"
  }
  return error
}

export default function Nova({ ...rest }) {
  const toast = useToast()

  function salvarCategoria(values, actions) {
    const { name } = values

    FirebaseService.pushData("categorias", {
      name,
    })

    toast({
      title: "Sucesso",
      description: "Categoria salva com sucesso.",
      status: "success",
      duration: 9000,
      isClosable: true,
    })

    actions.setSubmitting(false)
    actions.resetForm()
  }

  return (
    <Box p={5} shadow="md" borderWidth="1px" {...rest} backgroundColor="white">
      <Heading fontSize="xl" marginBottom={5}>
        Nova Categoria
      </Heading>
      <Formik initialValues={{ name: "" }} onSubmit={salvarCategoria}>
        {(props) => (
          <Form>
            <Field name="name" validate={validateName}>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <Input {...field} id="name" placeholder="Categoria" />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              variantColor="teal"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Salvar
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  )
}
