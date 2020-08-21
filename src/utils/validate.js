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
