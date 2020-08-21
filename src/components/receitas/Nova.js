import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/core"
import { Field, Form, Formik } from "formik"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import Select from "react-select"
import makeAnimated from "react-select/animated"
import FirebaseService from "../../services/firebaseService"

function validarCampoObrigatorio(value) {
  let error
  if (!value) {
    error = "Campo obrigatório"
  }
  return error
}

function validarCategorias(value) {
  let error
  if (!value || value.length === 0) {
    error = "Selecione pelo menos uma categoria"
  }
  return error
}

export default function Nova({ ...rest }) {
  const [categoriasOptions, setCategorias] = useState([])

  useEffect(() => {
    FirebaseService.getDataList("categorias", (dataReceived) => {
      setCategorias([...dataReceived])
    })
  }, [])

  const toast = useToast()
  const history = useHistory()
  const animatedComponents = makeAnimated()

  function salvarReceita(values, actions) {
    const { name, ingredientes, formaPreparo } = values
    const categoriasSelecionadas = []

    values.categorias.forEach((categoria) =>
      categoriasSelecionadas.push(categoria.key)
    )

    FirebaseService.pushData("receitas", {
      name,
      ingredientes,
      formaPreparo,
      categoriasSelecionadas,
    })

    toast({
      title: "Sucesso",
      description: "Receita salva com sucesso.",
      status: "success",
      duration: 9000,
      isClosable: true,
    })

    actions.setSubmitting(false)
    history.push("/")
  }

  return (
    <Box p={5} shadow="md" borderWidth="1px" {...rest} m={2}>
      <Heading fontSize="xl" marginBottom={5}>
        Nova Receita
      </Heading>
      <Formik
        initialValues={{
          name: "",
          ingredientes: "",
          formaPreparo: "",
          categorias: [],
        }}
        onSubmit={salvarReceita}
      >
        {(props) => (
          <Form>
            <Field name="name" validate={validarCampoObrigatorio}>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <Input {...field} id="name" placeholder="Nome" />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="ingredientes" validate={validarCampoObrigatorio}>
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.ingredientes && form.touched.ingredientes}
                  mt={3}
                >
                  <Textarea
                    {...field}
                    id="ingredientes"
                    placeholder="Ingredientes"
                    resize="vertical"
                    height={200}
                  />
                  <FormErrorMessage>{form.errors.ingredientes}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="formaPreparo" validate={validarCampoObrigatorio}>
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.formaPreparo && form.touched.formaPreparo}
                  mt={3}
                >
                  <Textarea
                    {...field}
                    id="formaPreparo"
                    placeholder="Forma de Preparo"
                    resize="vertical"
                    height={200}
                  />
                  <FormErrorMessage>{form.errors.formaPreparo}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="categorias" validate={validarCategorias}>
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.categorias && form.touched.categorias}
                  mt={3}
                >
                  <Select
                    id={field.name}
                    type="text"
                    value={form.values[field.name]}
                    onChange={(option) => form.setFieldValue(field.name, option)}
                    options={categoriasOptions}
                    onBlur={form.handleBlur}
                    isMulti
                    placeholder="Categorias"
                    components={animatedComponents}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.key}
                  />
                  <FormErrorMessage>{form.errors.categorias}</FormErrorMessage>
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
