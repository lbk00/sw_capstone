import axios from "axios"

 export const API_SERVER_HOST = 'http://localhost:8080'
 const prefix = `${API_SERVER_HOST}/api/supplier`
 export const getOne = async (supplierId) => {
  const res = await axios.get(`${prefix}/${supplierId}` )
  return res.data
  }
export const getList = async ( pageParam ) => {
 const {page,size} = pageParam
 const res = await axios.get(`${prefix}/list`, {params: {page:page,size:size }})
 return res.data
 }

export const postAdd = async (supplierObj) => {
 const res = await axios.post(`${prefix}/` , supplierObj)
 return res.data
 }

export const deleteOne = async (supplierId) => {

  const res = await axios.delete(`${prefix}/${supplierId}` )

  return res.data

}

export const putOne = async (supplier) => {

  const res = await axios.put(`${prefix}/${supplier.supplierId}`, supplier)

  return res.data
}


