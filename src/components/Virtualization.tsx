import { useState } from "react"

const Virtualization = () => {
  const [scroll, setScroll] = useState(0)

  const itemHeight = 40
  const totalItems = 10000
  const start = Math.floor(scroll / itemHeight)
  const end = start + 20
  return (
    <>
      <h1>Virtualization</h1>
      <div
        style={{
          height: "600px",
          overflow: "auto",
          border: "1px solid #ccc",
          marginTop: "20px",
        }}
        onScroll={(e) => setScroll(e.currentTarget.scrollTop)}
      >
        <div
          style={{
            position: "relative",
            height: totalItems * itemHeight + "px",
          }}
        >
          {Array.from({ length: end - start }, (_, i) => {
            const index = start + i
            if (index >= totalItems) return null
            return (
              <div
                style={{
                  position: "absolute",
                  top: index * itemHeight + "px",
                  height: itemHeight + "px",
                }}
                key={index}
              >
                Item is {index}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Virtualization
