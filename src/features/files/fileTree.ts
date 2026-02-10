const fileTree = [
  {
    id: 1,
    name: "root",
    type: "folder",
    children: [
      {
        id: 2,
        name: "src",
        type: "folder",
        children: [
          {
            id: 3,
            name: "components",
            type: "folder",
            children: [{ id: 4, name: "Header.jsx", type: "file" }],
          },
          { id: 5, name: "index.js", type: "file" },
        ],
      },
      { id: 6, name: "package.json", type: "file" },
    ],
  },
]

export default fileTree
