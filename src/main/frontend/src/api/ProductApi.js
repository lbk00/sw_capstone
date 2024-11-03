import axios from "axios"

 export const API_SERVER_HOST = 'http://localhost:8080'
 const prefix = `${API_SERVER_HOST}/products`
 export const getOne = async (id) => {
  const res = await axios.get(`${prefix}/${id}`)
  return res.data
  }
export const getList = async ( pageParam ) => {
 const {page,size} = pageParam
 const res = await axios.get(`${prefix}/list`, {params: {page:page,size:size }})
 return res.data
 }

export const postAdd = async (productObj) => {
 const res = await axios.post(`${prefix}/create` , productObj)
 return res.data
 }

export const deleteOne = async (id) => {

  const res = await axios.delete(`${prefix}/${id}` )

  return res.data

}

export const putOne = async (product) => {

  const res = await axios.put(`${prefix}/${product.id}`, product)

  return res.data
}


