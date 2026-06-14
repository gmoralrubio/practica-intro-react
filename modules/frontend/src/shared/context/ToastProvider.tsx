import { useState } from 'react'
import type { ReactNode } from 'react'
import { ToastContext } from './ToastContext'
import type { ToastMessage } from './ToastContext'

const AUTO_DISMISS_MS = 6000

export function ToastProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ToastMessage[]>([])

  const removeMessage = (id: number) => {
    setMessages((prev) => prev.filter((m) => m.id !== id))
  }

  const addMessage = (text: string, type: 'error' | 'success') => {
    const id = Date.now()
    setMessages((prev) => [...prev, { id, text, type }])
    setTimeout(() => removeMessage(id), AUTO_DISMISS_MS)
  }

  const showError = (msg: string) => addMessage(msg, 'error')
  const showSuccess = (msg: string) => addMessage(msg, 'success')

  return (
    <ToastContext value={{ messages, showError, showSuccess }}>
      {children}
    </ToastContext>
  )
}
