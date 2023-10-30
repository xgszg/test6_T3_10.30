import Mock from "mockjs"
// 内存模拟数据
const arr = []
const apple = []
for (let i = 0; i < 10; i++) {
  arr.push({
    id: Mock.mock("@id"),
    name: Mock.mock("@cname"),
    place: Mock.mock("@county(true)"),
  })
}
for (let i = 0; i < 10; i++) {
  apple.push({
    id: Mock.mock("@increment(1)"),
    price: Mock.mock("@float(2, 10, 0, 2)")
  })
}
export default [
  {
    url: "/list",
    method: "get",
    response: () => {
      return arr
    },
  },
  {
    url: "/del/:id",
    method: "delete",
    response: (req) => {
      const index = arr.findIndex((item) => item.id === req.query.id)
      if (index > -1) {
        arr.splice(index, 1)
        return { success: true }
      } else {
        return { success: false }
      }
    },
  },
  {
    url: "/edit/:id",
    method: "patch",
    response: ({ query, body }) => {
      const item = arr.find((item) => item.id === query.id)
      if (item) {
        item.name = body.name
        item.place = body.place
        return { success: true }
      } else {
        return { success: false }
      }
    },
  },
  {
    url: "/appleList",
    method: "get",
    response: () => {
      return apple
    }
  },
  {
    url: "/appleDel/:id",
    method: "delete",
    response: (req) => {
      const index = apple.findIndex((item) => item.id == req.query.id)
      console.log("找到id" + index);
      if (index > -1) {
        apple.splice(index, 1)
        return { success: true }
      } else {
        return { success: false }
      }
    },
  },
  {
    url: "/Appleedit/:id",
    method: "patch",
    response: ({ query, body }) => {
      const item = apple.find((item) => item.id == query.id)
      if (item) {
        item.price = body.price
        return { success: true }
      } else {
        return { success: false }
      }
    },
  },
  {
    url: "/Addapple",
    method: "patch",
    response: ({ query, body }) => {
      apple.push(body)
    },
  },
]
