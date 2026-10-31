import { describe, expect, it } from 'vitest'
import { validateEmail, validatePassword } from './validate'

const validEmails = [
  ...Array.from({ length: 60 }, (_, i) => `user${i + 1}@example.com`),
  ...Array.from({ length: 40 }, (_, i) => `name${i + 1}@sub.domain${i}.io`),
  ...Array.from({ length: 20 }, (_, i) => `a${i + 1}b${i + 2}@mail.${i}.co`)
]

const invalidEmails = [
  ...Array.from({ length: 100 }, (_, i) => `user${i + 1}.example.com`),
  ...Array.from({ length: 60 }, (_, i) => `example${i + 1}`)
]

const emptyEmails = ['']

const validPasswords = Array.from({ length: 60 }, (_, i) => {
  const prefixes = ['Aa', 'Bb', 'Cc', 'Dd', 'Ee', 'Ff', 'Gg', 'Hh', 'Ii', 'Jj']
  const specials = ['@', '#', '!', '$', '%']
  const prefix = prefixes[i % prefixes.length]
  const special = specials[i % specials.length]
  const suffix = ['ab', 'cd', 'ef', 'gh', 'ij', 'kl'][i % 6]
  return `${prefix}${i + 1}${special}${suffix}${String.fromCharCode(97 + (i % 6))}${String.fromCharCode(97 + ((i + 2) % 6))}`
})

const lengthFailurePasswords = [
  ...Array.from({ length: 7 }, (_, i) => 'Aa1!bc'.slice(0, i + 1)),
  ...Array.from({ length: 10 }, (_, i) => `A1!a${i}`.slice(0, 7)),
  ...Array.from({ length: 10 }, (_, i) => `aA1!b${i}`.slice(0, 7)),
  ...Array.from({ length: 10 }, (_, i) => `Ba1!c${i}`.slice(0, 7))
]

const missingUppercasePasswords = Array.from({ length: 25 }, (_, i) => {
  const suffix = `${(i + 2)}@${'x'.repeat(4)}${(i + 7)}`
  return `aa${suffix}`
})

const missingLowercasePasswords = Array.from({ length: 25 }, (_, i) => {
  const suffix = `${(i + 2)}@${'X'.repeat(4)}${(i + 7)}`
  return `AA${suffix}`
})

const missingDigitPasswords = Array.from({ length: 25 }, (_, i) => {
  const suffix = `${'Aa'}@${'b'.repeat(4)}${'C'.repeat(2)}`
  return `${suffix}${String.fromCharCode(97 + (i % 5))}`
})

const missingSpecialPasswords = Array.from({ length: 25 }, (_, i) => {
  const suffix = `${'Aa'}${(i + 1)}${'bcdefg'}`
  return suffix
})

describe('validateEmail', () => {
  it.each(validEmails)('accepts valid email: %s', (email) => {
    expect(validateEmail(email)).toBeNull()
  })

  it.each(emptyEmails)('rejects empty email: %p', (email) => {
    expect(validateEmail(email)).toBe('Email không được để trống')
  })

  it.each(invalidEmails)('rejects invalid email: %s', (email) => {
    expect(validateEmail(email)).toBe('Email không hợp lệ')
  })
})

describe('validatePassword', () => {
  it.each(validPasswords)('accepts valid password: %s', (password) => {
    expect(validatePassword(password)).toBeNull()
  })

  it.each(lengthFailurePasswords)('returns length error for short password: %s', (password) => {
    expect(validatePassword(password)).toBe('Mật khẩu tối thiểu 8 ký tự')
  })

  it.each(missingUppercasePasswords)('returns uppercase error for: %s', (password) => {
    expect(validatePassword(password)).toBe('Mật khẩu phải có ít nhất 1 chữ HOA')
  })

  it.each(missingLowercasePasswords)('returns lowercase error for: %s', (password) => {
    expect(validatePassword(password)).toBe('Mật khẩu phải có ít nhất 1 chữ thường')
  })

  it.each(missingDigitPasswords)('returns digit error for: %s', (password) => {
    expect(validatePassword(password)).toBe('Mật khẩu phải có ít nhất 1 chữ số')
  })

  it.each(missingSpecialPasswords)('returns special char error for: %s', (password) => {
    expect(validatePassword(password)).toBe('Mật khẩu phải có ký tự đặc biệt')
  })
})
