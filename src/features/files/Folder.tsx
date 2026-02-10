import { useState } from "react"
import FileComp from "./FileComp"

const Folder = ({ foldername, items }) => {
  const [open, setOpen] = useState(false)
  const handleClick = () => {
    setOpen((prev) => !prev)
  }
  return (
    <div className="ml-4">
      <h1 className="text-lg text-blue-500 font-bold flex items-center cursor-pointer">
        📁 {foldername}{" "}
        <span className="text-2xl" onClick={handleClick}>
          {open ? "-" : "+"}
        </span>
      </h1>

      {open &&
        items.map((item) => {
          if (item.type === "folder") {
            return (
              // <div className="ps-5">
              <Folder
                key={item.id}
                foldername={item.name}
                items={item.children}
              />
              // </div>
            )
          } else {
            return <FileComp key={item.id} filename={item.name} />
          }
        })}
    </div>
  )
}

export default Folder
