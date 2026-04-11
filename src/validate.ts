export function validateEmail(email: string) {
  if (!email) return 'Email không được để trống'
  if (!email.includes('@')) return 'Email không hợp lệ'
  return null
}

export function validatePassword(pwd: string) {
  if (pwd.length < 8) 
    return 'Mật khẩu tối thiểu 8 ký tự'
  if (!/[A-Z]/.test(pwd)) 
    return 'Mật khẩu phải có ít nhất 1 chữ HOA'
  if (!/[a-z]/.test(pwd)) 
    return 'Mật khẩu phải có ít nhất 1 chữ thường'
  if (!/[0-9]/.test(pwd)) 
    return 'Mật khẩu phải có ít nhất 1 chữ số'
  if (!/[@#$%^&*!]/.test(pwd)) 
    return 'Mật khẩu phải có ký tự đặc biệt'
  return null
}