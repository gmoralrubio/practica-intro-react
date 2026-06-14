import { useAuth } from '@features/Auth/hooks/useAuth'
import { useToast } from '@shared/hooks/useToast'
import { parseError } from '@shared/utils/error.utils'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'

interface FormState {
  email: string
  password: string
  passwordConfirmation: string
}

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate()
  const [passwordMatches, setPasswordMatches] = useState<boolean>(true)
  const { isLoading, error, signup, login } = useAuth()
  const { showError, showSuccess } = useToast()
  const loginAfterSignupRef = useRef(false)

  const [formData, setFormData] = useState<FormState>({
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  // Detect login result after signup succeeds (login no longer throws)
  useEffect(() => {
    if (loginAfterSignupRef.current && !isLoading) {
      loginAfterSignupRef.current = false
      if (error) {
        showSuccess('Account created! Please log in.')
        navigate('/auth/login')
      } else {
        navigate('/')
      }
    }
  }, [isLoading, error, showSuccess, navigate])

  const updateFormField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const passwordConfirmation = formData.get('passwordConfirmation') as string

    if (password !== passwordConfirmation) {
      setPasswordMatches(false)
      return
    }

    setPasswordMatches(true)

    try {
      await signup(email, password)
      // Signup succeeded — trigger login
      loginAfterSignupRef.current = true
      await login(email, password)
    } catch (e) {
      // Signup failed (signup still throws)
      showError(parseError(e).message)
    }
  }

  return (
    <div className="my-20 flex justify-center">
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      <form
        className="fieldset bg-base-200 border-base-300 rounded-box h-fit w-xs border p-4"
        onSubmit={handleSubmit}
      >
        <fieldset className="fieldset">
          <label
            htmlFor="email"
            className="label"
          >
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            className="input"
            placeholder="Email"
            required
            value={formData.email}
            onChange={updateFormField}
          />
        </fieldset>

        <fieldset className="fieldset">
          <label
            htmlFor="password"
            className="label"
          >
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="input"
            placeholder="Contraseña"
            minLength={6}
            required
            value={formData.password}
            onChange={updateFormField}
          />
        </fieldset>

        <fieldset className="fieldset">
          <label
            htmlFor="password-confirmation"
            className="label"
          >
            Confirma contraseña
          </label>
          <input
            type="password"
            name="passwordConfirmation"
            id="password-confirmation"
            className="input"
            placeholder="Contraseña"
            minLength={6}
            required
            value={formData.passwordConfirmation}
            onChange={updateFormField}
          />
          <span className="hint text-red-500">
            {!passwordMatches && 'Password doesn´t match'}
          </span>
        </fieldset>

        <button
          className="btn btn-primary mt-4"
          type="submit"
          disabled={isLoading ? true : false}
        >
          {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>
        <button
          type="button"
          className="btn btn-ghost mt-1"
          onClick={() => navigate('/')}
        >
          Volver
        </button>
      </form>
    </div>
  )
}
