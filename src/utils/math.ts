export function calculateTotal(a: any, b: any): number {
  if (Number.isNaN(a)) {
    console.log('a is nan')
    return 0
  }

  if (Number.isNaN(b)) {
    console.log('b is nan')
    return 0
  }

  if (Number.isNaN(a * b)) {
    console.log('a * b is nan')
    return 0
  }

  console.log('a * b is', a * b)
  return a * b
}
