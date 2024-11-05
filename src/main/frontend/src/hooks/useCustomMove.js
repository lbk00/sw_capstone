import { useCallback, useState } from "react"
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom"



const getNum = (param, defaultValue) => {

    if(!param){
    return defaultValue
    }

    return parseInt(param)
}


const useCustomMove = () => {


      const navigate = useNavigate()

      const [refresh, setRefresh] = useState(false)

      const [queryParams] = useSearchParams()

      const page = getNum(queryParams.get('page'), 1)
      const size = getNum(queryParams.get('size'), 10)

      const queryDefault = createSearchParams({page, size}).toString()

      const moveToList = (pageParam) => {
      console.log('moveToList called with: ', pageParam);
        let queryStr = ""
         if(pageParam){

          const pageNum = getNum(pageParam.page, 1)
          const sizeNum = getNum(pageParam.size, 10)

          queryStr = createSearchParams({page:pageNum, size: sizeNum}).toString()
      }  else {
          queryStr = queryDefault
         }

         setRefresh(!refresh)

       console.log('Navigating to: ', {pathname: '/list', search: queryStr}); // Check the navigate function
       navigate({pathname: '/list', search: queryStr});
      }


     const moveToModify = useCallback((num) => {
     console.log(queryDefault)
     navigate({ pathname: `../modify/${num}`, search: queryDefault })
     },[page,size])

     const moveToRead = (userId) => {
       console.log('userId:', userId); // userId 파라미터 로깅
       console.log(queryDefault)
       navigate({
         pathname: `../read/${userId}`,
         search: queryDefault
       })
     }

     const moveToDashboard = () => {
         navigate('/dashboard');
       };


     return {moveToList, moveToModify, moveToDashboard, moveToRead, page, size, refresh}
   }
export default useCustomMove;