import { useState } from 'react'

export default function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function validatePassword(pwd: string) {
    if (pwd.length < 8) 
      return 'Mật khẩu tối thiểu 8 ký tự'
    if (!/[A-Z]/.test(pwd)) 
      return 'Mật khẩu phải có ít nhất 1 chữ HOA (A-Z)'
    if (!/[a-z]/.test(pwd)) 
      return 'Mật khẩu phải có ít nhất 1 chữ thường (a-z)'
    if (!/[0-9]/.test(pwd)) 
      return 'Mật khẩu phải có ít nhất 1 chữ số (0-9)'
    if (!/[@#$%^&*!]/.test(pwd)) 
      return 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt (@, #, $...)'
    return null
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes('@')) {
      setError('Email không hợp lệ')
      return
    }
    const pwdError = validatePassword(password)
    if (pwdError) {
      setError(pwdError)
      return
    }
    setError('')
    alert('✅ Đăng nhập thành công!')
  }

  return (
    <div style={{ 
      display: 'flex', justifyContent: 'center', 
      alignItems: 'center', height: '100vh',
      backgroundColor: '#f0f2f5'
    }}>
      <div style={{
        background: 'white', padding: '40px',
        borderRadius: '12px', width: '380px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '8px' }}>
          🔐 Đăng nhập
        </h2>

        {/* Gợi ý yêu cầu mật khẩu */}
        <div style={{
          backgroundColor: '#f8f9fa', padding: '12px',
          borderRadius: '8px', marginBottom: '20px',
          fontSize: '12px', color: '#666'
        }}>
          <strong>Yêu cầu mật khẩu:</strong>
          <ul style={{ margin: '4px 0 0 0', paddingLeft: '16px' }}>
            <li>Tối thiểu 8 ký tự bao gồm có chữ hoa, chữ thường, chữ số và kí tự đặc biệt</li>
          </ul>
        </div>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email (vd: abc@gmail.com)"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ 
              width: '100%', padding: '12px', 
              marginBottom: '12px', borderRadius: '8px',
              border: '1px solid #ddd', boxSizing: 'border-box',
              fontSize: '14px' 
            }}
          />
          <input
            type="password"
            placeholder="Mật khẩu (vd: Abc123@#)"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ 
              width: '100%', padding: '12px',
              marginBottom: '12px', borderRadius: '8px',
              border: '1px solid #ddd', boxSizing: 'border-box',
              fontSize: '14px' 
            }}
          />
          {error && (
            <p style={{ 
              color: 'red', fontSize: '13px',
              marginBottom: '12px',
              backgroundColor: '#fff0f0',
              padding: '8px', borderRadius: '6px'
            }}>
              ⚠️ {error}
            </p>
          )}
          <button 
            type="submit"
            style={{
              width: '100%', padding: '12px',
              backgroundColor: '#4CAF50', color: 'white',
              border: 'none', borderRadius: '8px',
              cursor: 'pointer', fontSize: '16px',
              fontWeight: 'bold'
            }}>
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  )
}