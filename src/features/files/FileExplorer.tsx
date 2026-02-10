import { useState } from "react"
import FileComp from "./FileComp"
import fileTree from "./fileTree"
import Folder from "./Folder"

const FileExplorer = () => {
  const [data, setData] = useState(fileTree)
  return (
    <>
      <h1>FileExplorer</h1>
      {data.map((item) => {
        if (item.type === "folder") {
          return (
            <Folder
              key={item.id}
              foldername={item.name}
              items={item.children}
            />
          )
        } else {
          return <FileComp key={item.id} filename={item.name} />
        }
      })}
    </>
  )
}

export default FileExplorer
