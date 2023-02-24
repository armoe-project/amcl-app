function getSystemLanguage() {
  const arr = navigator.language.split('-')
  return `${arr[0]}-${arr[1].toUpperCase()}`
}

export { getSystemLanguage }
