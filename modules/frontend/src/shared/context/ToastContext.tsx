import { createContext } from 'react'

export interface ToastMessage {
  id: number
  text: string
  type: 'error' | 'success'
}

export interface ToastContextValue {
  messages: ToastMessage[]
  showError: (msg: string) => void
  showSuccess: (msg: string) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)
