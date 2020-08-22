import {
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/core"
import { Field, Form, Formik, isEmptyArray } from "formik"
import React, { useEffect, useState } from "react"
import { FaFilter } from "react-icons/fa"
import { Link } from "react-router-dom"
import Select from "react-select"
import makeAnimated from "react-select/animated"
import FirebaseService from "../../services/firebaseService"
import getRandomColor from "../../utils/color"

export default function Lista() {
  const animatedComponents = makeAnimated()
  const [receitas, setReceitas] = useState([])
  const [allReceitas, setAllReceitas] = useState([])
  const [categorias, setCategorias] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    FirebaseService.getDataList("categorias", (dataReceived) =>
      setCategorias([...dataReceived])
    )

    async function getAllReceitas() {
      await FirebaseService.getReceitas((dataReceived) => {
        setReceitas([...dataReceived])
        setAllReceitas([...dataReceived])
        setIsLoaded(true)
      })
    }

    getAllReceitas()
  }, [])

  function filtrarReceitas(values, actions) {
    let receitasFiltradas = []
    let filtrei = false

    if (values.pesquisar) {
      const normalizedSearchText = normalizeText(values.pesquisar)
      receitasFiltradas = allReceitas.filter(
        (receita) =>
          normalizeText(receita.name).includes(normalizedSearchText) ||
          normalizeText(receita.ingredientes).includes(normalizedSearchText)
      )
      filtrei = true
      setReceitas([...receitasFiltradas])
    }

    if (!isEmptyArray(values.categorias) && values.categorias != null) {
      filtrei = true
      if (isEmptyArray(receitasFiltradas)) {
        values.categorias.forEach((categoria) => {
          receitasFiltradas = receitasFiltradas.concat(
            allReceitas.filter(
              (receita) =>
                receita.categoriasSelecionadas.find((c) => categoria.key === c) !==
                undefined
            )
          )
        })
      } else {
        values.categorias.forEach((categoria) => {
          receitasFiltradas = receitasFiltradas.filter(
            (receita) =>
              receita.categoriasSelecionadas.find((c) => categoria.key === c) !==
              undefined
          )
        })
      }
    }

    if (!filtrei) {
      setReceitas([...allReceitas])
    } else {
      setReceitas([...receitasFiltradas])
    }
  }

  function normalizeText(text) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
  }

  return (
    <>
      <Box m={2} p={2} shadow="md" borderWidth="1px">
        <AccordionItem>
          <AccordionHeader _expanded={{ bg: "tomato", color: "white" }}>
            <Box flex="1" textAlign="left">
              Filtrar
            </Box>
            <AccordionIcon />
          </AccordionHeader>
          <AccordionPanel>
            <Formik
              initialValues={{
                pesquisar: "",
                categorias: [],
              }}
              onSubmit={filtrarReceitas}
            >
              {(props) => (
                <Form>
                  <Field name="pesquisar">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.pesquisar && form.touched.pesquisar}
                      >
                        <Input {...field} id="busca" placeholder="Pesquisar" />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="categorias">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.categorias && form.touched.categorias}
                        mt={3}
                      >
                        <Select
                          id={field.name}
                          type="text"
                          value={form.values[field.name]}
                          onChange={(option) =>
                            form.setFieldValue(field.name, option)
                          }
                          options={categorias}
                          onBlur={form.handleBlur}
                          isMulti
                          placeholder="Categorias"
                          components={animatedComponents}
                          getOptionLabel={(option) => option.name}
                          getOptionValue={(option) => option.key}
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Button
                    leftIcon={FaFilter}
                    variantColor="blue"
                    variant="outline"
                    type="submit"
                    size="sm"
                    mt={3}
                  >
                    Filtrar
                  </Button>
                </Form>
              )}
            </Formik>
          </AccordionPanel>
        </AccordionItem>
      </Box>
      <Skeleton
        height="100px"
        my="10px"
        m={2}
        display={isLoaded ? "none" : "block"}
      />
      <Flex p={2} pt={0} wrap="wrap" justifyContent="space-between">
        {receitas.map((receita) => (
          <AccordionItem
            key={receita.key}
            width={{
              sm: "100%",
              md: "45%",
              lg: "30%",
              xl: "30%",
            }}
            bg={getRandomColor()}
            p={3}
            mt={5}
          >
            <AccordionHeader flexDirection="column" alignItems="start">
              <Heading as="h4" size="md" color="white" mb={3}>
                {receita.name.toUpperCase()}
              </Heading>
              <Stack isInline>
                {receita.categoriasSelecionadas.map((categoria) => {
                  const categoriaCompleta = categorias.find(
                    (c) => c.key === categoria
                  )

                  return (
                    <Badge key={categoria} variantColor="purple">
                      {categoriaCompleta.name}
                    </Badge>
                  )
                })}
              </Stack>
            </AccordionHeader>
            <AccordionPanel>
              <Text color="white" mt={3} whiteSpace="break-spaces">
                {receita.ingredientes}
              </Text>
              <Link
                to={{
                  pathname: `/receitas/${receita.key}`,
                  state: {
                    receita,
                  },
                }}
              >
                <Button variant="outline" w="100%" mt={2}>
                  Ver receita completa
                </Button>
              </Link>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Flex>
    </>
  )
}
