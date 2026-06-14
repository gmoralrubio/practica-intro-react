import { ToastContext } from '@shared/context/ToastContext'
import { useContext } from 'react'

export function Toast() {
  const ctx = useContext(ToastContext)
  if (!ctx || ctx.messages.length === 0) return null

  return (
    <div className="toast toast-top toast-start z-50">
      {ctx.messages.map((msg) => (
        <div
          key={msg.id}
          className={`alert ${msg.type === 'error' ? 'alert-error' : 'alert-success'}`}
        >
          <span>{msg.text}</span>
        </div>
      ))}
    </div>
  )
}
