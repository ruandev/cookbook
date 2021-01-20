export function validarCampoObrigatorio(value) {
  let error
  if (!value) {
    error = "Campo obrigatório"
  }
  return error
}

export function validarCampoCategorias(value) {
  let error
  if (!value || value.length === 0) {
    error = "Selecione pelo menos uma categoria"
  }
  return error
}

export function validarHttpURL(value) {
  let error
  let url

  if (!value || value.length === 0) {
    return error
  }

  try {
    url = new URL(value)
  } catch (_) {
    error = "Coloque uma URL válida"
  }

  return error
}
