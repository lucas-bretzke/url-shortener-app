const urlValidator = (url: string): boolean => {
  const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i
  return regex.test(url)
}

const generateRandomString = (length: number): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''

  for (let i = 0; i < length; i++) {
    // Escolhe um caractere aleatório da string `chars`
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  return result
}

export { urlValidator, generateRandomString }
