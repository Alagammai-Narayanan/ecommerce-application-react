import { createContext, useContext, useState } from "react"
import ReactDOM from "react-dom"

export const ToastContext = createContext(undefined)

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState([])

  const showToast = (msg, color = "green") => {
    const id = Date.now()
    setToast((prev) => [...prev, { id, msg, color }])
    setTimeout(() => {
      setToast((prev) => prev.filter((item) => item.id !== id))
    }, 3000)
  }

  const handleClose = (id) => {
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

function ToastContainer({ toast, handleClose }) {
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
    document.querySelector(".toast-container"),
  )
}

export const useToast = () => useContext(ToastContext)
