
//
// Port numbers range from 0 to 65535, but only port 
// numbers 0 to 1023 are reserved for privileged services
// and designated as well-known ports
//
let alphabet = 'abcdefghijklmnopqrstuvwxyz'
export function platformNameToPortNumber (subdomain) {
  // configuration
  // console.log('subdomain', subdomain)

  // name to numbers
  let letters = subdomain.split('')
  let numbers = []
  letters.forEach((letter) => {
    let number = alphabet.indexOf(letter)
    numbers.push(number)
  })
  // console.log('numbers', numbers)
  
  // number to port
  let number = parseInt(numbers.join(''))
  let total = 65000
  let start = 3000
  let max = total - start
  let port = number % max + start
  // console.log('port', port)

  return port
}