import { createContext, useContext, useState } from "react"
import ReactDOM from "react-dom"

interface Toast {
  id: number
  msg: string
  color: string
}
interface ToastContextType {
  toast: Toast[]
  showToast: (msg: string, color?: string) => void
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined,
)

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<Toast[]>([])

  const showToast = (msg: string, color: string = "green") => {
    const id = Date.now()
    setToast((prev) => [...prev, { id, msg, color }])
    setTimeout(() => {
      setToast((prev) => prev.filter((item) => item.id !== id))
    }, 3000)
  }

  const handleClose = (id: number) => {
    console.log("id is:", id)
    setToast((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toast, showToast }}>
      {children}
      <ToastContainer toast={toast} handleClose={handleClose} />
    </ToastContext.Provider>
  )
}

function ToastContainer({
  toast,
  handleClose,
}: {
  toast: Toast[]
  handleClose: (id: number) => void
}) {
  const container = document.querySelector(".toast-container")
  if (!container) return null
  return ReactDOM.createPortal(
    <div className="fixed top-5 left-0 right-0 text-center">
      {toast.map((t) => (
        <span
          style={{
            backgroundColor: t.color,
            padding: "10px",
            color: "white",
            borderRadius: "5px",
            margin: "auto",
          }}
          key={t.id}
        >
          {t.msg}
          <span
            className="text-2xl ms-2 cursor-pointer"
            onClick={() => handleClose(t.id)}
          >
            <b>X</b>
          </span>
        </span>
      ))}
    </div>,
    container,
  )
}

export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error("useToast must be inside ToastProvider")
  return ctx
}
