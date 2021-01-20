import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Spinner,
  Textarea,
  useToast,
} from "@chakra-ui/core"
import { Field, Form, Formik } from "formik"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import Select from "react-select"
import makeAnimated from "react-select/animated"
import FirebaseService from "../../services/firebaseService"
import {
  validarCampoCategorias,
  validarCampoObrigatorio,
  validarHttpURL,
} from "../../utils/validate"

export default function Formulario({ receita }) {
  const animatedComponents = makeAnimated()
  const isEdit = receita != null
  const [categoriasOptions, setCategorias] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const categoriasOriginais = []

  const toast = useToast()
  const history = useHistory()

  function salvarReceita(values, actions) {
    const { name, ingredientes, formaPreparo, link } = values
    const categoriasSelecionadas = []

    values.categorias.forEach((categoria) =>
      categoriasSelecionadas.push(categoria.key)
    )

    if (isEdit) {
      FirebaseService.updateData(receita.key, "receitas", {
        name,
        ingredientes,
        formaPreparo,
        categoriasSelecionadas,
        link,
      })
    } else {
      FirebaseService.pushData("receitas", {
        name,
        ingredientes,
        formaPreparo,
        categoriasSelecionadas,
        link,
      })
    }

    toast({
      title: "Sucesso",
      description: isEdit
        ? "Receita atualizada com sucesso."
        : "Receita Salva com Sucesso",
      status: "success",
      duration: 9000,
      isClosable: true,
    })

    actions.setSubmitting(false)
    if (isEdit) {
      history.goBack()
    } else {
      history.push("/")
    }
  }

  useEffect(() => {
    FirebaseService.getDataList("categorias", (dataReceived) => {
      setCategorias([...dataReceived])

      if (isEdit) {
        receita.categoriasSelecionadas.forEach((cat) => {
          const categoriaFound = dataReceived.find((c) => c.key === cat)
          categoriasOriginais.push(categoriaFound)
        })
      }
      setIsLoaded(true)
    })
  }, [])

  return (
    <>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        display={isLoaded ? "none" : "block"}
        m={10}
      />
      <Box
        p={5}
        shadow="md"
        borderWidth="1px"
        m={2}
        display={!isLoaded ? "none" : "block"}
        backgroundColor="white"
      >
        <Heading fontSize="xl" marginBottom={5}>
          {isEdit ? "Editar Receita" : "Nova Receita"}
        </Heading>
        <Formik
          initialValues={{
            name: isEdit ? receita.name : "",
            ingredientes: isEdit ? receita.ingredientes : "",
            formaPreparo: isEdit ? receita.formaPreparo : "",
            categorias: isEdit ? categoriasOriginais : [],
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

              <Field name="categorias" validate={validarCampoCategorias}>
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

              <Field name="link" validate={validarHttpURL}>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.link && form.touched.link}
                    mt={3}
                  >
                    <Input {...field} id="link" placeholder="Link" />
                    <FormErrorMessage>{form.errors.link}</FormErrorMessage>
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
    </>
  )
}
