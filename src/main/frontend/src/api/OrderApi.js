import axios from "axios"


export const API_SERVER_HOST = 'http://localhost:8080'
const prefix = `${API_SERVER_HOST}/api/orders`

export const getOne = async (id) => {
  const res = await axios.get(`${prefix}/${id}`)
  return res.data
}

export const getList = async (pageParam) => {
  const {page, size} = pageParam
  const res = await axios.get(`${prefix}/list`, {params: {page: page, size: size}})
  return res.data
}

export const postAdd = async (orderObj) => {
  const res = await axios.post(`${prefix}/`, orderObj)
  return res.data
}

export const deleteOne = async (id) => {
  const res = await axios.delete(`${prefix}/${id}`)
  return res.data
}

export const putOne = async (order) => {
  const res = await axios.put(`${prefix}/${order.id}`, {
    id: order.id,
    orderedProducts: order.orderedProducts,
    totalPrice: order.totalPrice,
    orderType: order.orderType,
    pageRequestDTO: order.pageRequestDTO,
    total: order.total
  })
  return res.data
}