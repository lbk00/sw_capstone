import axios from "axios"

 export const API_SERVER_HOST = 'http://localhost:8080'
 const prefix = `${API_SERVER_HOST}/api/user`
 export const getOne = async (user_Id) => {
  const res = await axios.get(`${prefix}/${user_Id}` )
  return res.data
  }
export const getList = async ( pageParam ) => {
 const {page,size} = pageParam
 const res = await axios.get(`${prefix}/list`, {params: {page:page,size:size }})
 return res.data
 }

export const postAdd = async (userObj) => {
 const res = await axios.post(`${prefix}/` , userObj)
 return res.data
 }

export const deleteOne = async (user_Id) => {

  const res = await axios.delete(`${prefix}/${user_Id}` )

  return res.data

}

export const putOne = async (user) => {

  const res = await axios.put(`${prefix}/${user.user_Id}`, user)

  return res.data
}


