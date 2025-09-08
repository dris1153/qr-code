export function shortAddress(address: string, numberOfInits = 4, numberOfLast = 4) {
  if (address && address.length > numberOfInits && address.length - numberOfLast > 0) {
    return `${address.slice(0, numberOfInits)}...${address.slice(address.length - numberOfLast)}`
  }
  return ''
}

export function convertCamelCaseToTitleCase(inputText: string) {
  const result = inputText.split(/(?=[A-Z])/).join(' ')
  return result.charAt(0).toUpperCase() + result.slice(1)
}
