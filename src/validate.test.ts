import { describe, it, expect } from 'vitest'
import { validateEmail, validatePassword } from './validate'

describe('validateEmail', () => {
  it('Email hợp lệ → trả null', () => {
    expect(validateEmail('user@example.com')).toBeNull()
  })

  it('Email rỗng → báo lỗi', () => {
    expect(validateEmail('')).toBe('Email không được để trống')
  })

  it('Email thiếu @ → báo lỗi', () => {
    expect(validateEmail('userexample.com')).toBe('Email không hợp lệ')
  })
})

describe('validatePassword', () => {
  it('Password đủ điều kiện → trả null', () => {
    expect(validatePassword('Aa1@abcd')).toBeNull()
  })

  it('Password < 8 ký tự → báo lỗi', () => {
    expect(validatePassword('Aa1@abc')).toBe('Mật khẩu tối thiểu 8 ký tự')
  })

  it('Password thiếu chữ HOA → báo lỗi', () => {
    expect(validatePassword('aa1@abcd')).toBe('Mật khẩu phải có ít nhất 1 chữ HOA')
  })

  it('Password thiếu chữ thường → báo lỗi', () => {
    expect(validatePassword('AA1@ABCD')).toBe('Mật khẩu phải có ít nhất 1 chữ thường')
  })

  it('Password thiếu số → báo lỗi', () => {
    expect(validatePassword('Aa@AbcdE')).toBe('Mật khẩu phải có ít nhất 1 chữ số')
  })

  it('Password thiếu ký tự đặc biệt → báo lỗi', () => {
    expect(validatePassword('Aa1Abcde')).toBe('Mật khẩu phải có ký tự đặc biệt')
  })
})
