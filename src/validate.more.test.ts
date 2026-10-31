import { describe, expect, it } from 'vitest'
import { validateEmail, validatePassword } from './validate'

describe('validateEmail', () => {
  it.each([
    'user@example.com',
    'name.surname@domain.vn',
    'a@b.co',
    'user_name+tag@example.io',
    'admin@localhost',
    'abc@xyz',
    'user@domain',
    'email@sub.domain.com'
  ])('accepts valid email: %s', (email) => {
    expect(validateEmail(email)).toBeNull()
  })

  it.each([
    ['', 'Email không được để trống'],
    ['userexample.com', 'Email không hợp lệ'],
    ['user example.com', 'Email không hợp lệ'],
    ['  ', 'Email không hợp lệ'],
    ['userexample', 'Email không hợp lệ']
  ])('rejects invalid email: %s', (email, expectedError) => {
    expect(validateEmail(email)).toBe(expectedError)
  })
})

describe('validatePassword', () => {
  it.each([
    'Aa1@abcd',
    'StrongP@ss1',
    'Abcdef12!',
    'XyZ9$pass',
    'A1!bcdefg',
    'Longer@Pass9',
    'Aa@1bcde'
  ])('accepts valid password: %s', (password) => {
    expect(validatePassword(password)).toBeNull()
  })

  it.each([
    ['a1@bcde', 'Mật khẩu tối thiểu 8 ký tự'],
    ['aa1@abcd', 'Mật khẩu phải có ít nhất 1 chữ HOA'],
    ['AA1@ABCD', 'Mật khẩu phải có ít nhất 1 chữ thường'],
    ['Aa@Abcde', 'Mật khẩu phải có ít nhất 1 chữ số'],
    ['Aa1Abcde', 'Mật khẩu phải có ký tự đặc biệt'],
    ['A1@bcde', 'Mật khẩu tối thiểu 8 ký tự'],
    ['Aa1bcdef', 'Mật khẩu phải có ký tự đặc biệt']
  ])('rejects password %s with message %s', (password, expectedError) => {
    expect(validatePassword(password)).toBe(expectedError)
  })

  it('checks password rules in the intended priority order', () => {
    expect(validatePassword('a1@bcde')).toBe('Mật khẩu tối thiểu 8 ký tự')
    expect(validatePassword('aa1@abcd')).toBe('Mật khẩu phải có ít nhất 1 chữ HOA')
    expect(validatePassword('AA1@ABCD')).toBe('Mật khẩu phải có ít nhất 1 chữ thường')
    expect(validatePassword('Aa@Abcde')).toBe('Mật khẩu phải có ít nhất 1 chữ số')
    expect(validatePassword('Aa1Abcde')).toBe('Mật khẩu phải có ký tự đặc biệt')
  })
})
