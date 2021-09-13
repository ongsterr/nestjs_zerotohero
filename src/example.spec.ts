function addNumbers(num1: number, num2: number) {
  return num1 + num2
}

describe('Example test', () => {
  it('equals true', () => {
    expect(true).toEqual(true)
    expect('ariel').toEqual('ariel')
  })
})

describe('addNumbers', () => {
  it('adds 2 numbers', () => {
    expect(addNumbers(2, 2)).toEqual(4)
  })
})
