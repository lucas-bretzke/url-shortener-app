const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const MIN_PASSWORD_LENGTH = 6
const SPECIAL_CHAR_REGEX = /[@#$%^&+=]/
const ALLOWED_CHAR_REGEX = /^[A-Za-z0-9@]+$/

const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email)
}

const validatePassword = (password: string): boolean => {
  if (password.length < MIN_PASSWORD_LENGTH) {
    // Verifique se a senha tem pelo menos 6 caracteres
    return false
  }

  if (!/[A-Z]/.test(password)) {
    // Verifique se a senha contém pelo menos uma letra maiúscula
    return false
  }

  if (!ALLOWED_CHAR_REGEX.test(password)) {
    // Verifique se a senha contém apenas letras, números e caracteres especiais permitidos
    return false
  }

  if (!SPECIAL_CHAR_REGEX.test(password)) {
    // Verifique se a senha contém pelo menos um caractere especial
    return false
  }

  return true
}

export { validateEmail, validatePassword }
