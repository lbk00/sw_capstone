import React , { useState }  from "react";
import {Link, useSearchParams} from "react-router-dom";
import { Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import ListComponent from "./ListComponent";
import Button from "@mui/material/Button";



  const ListPage = () => {
      const [orderType, setOrderType] = useState('option1'); // 선택된 옵션을 관리하는 상태

      const handleChange = (event) => {
          setOrderType(event.target.value);
      };

    const [queryParams] = useSearchParams()
    const page = queryParams.get("page") ||1
    const size = queryParams.get("size") ||10
    const handleRowClick = (id) => {
        console.log(`Row with id ${id} was clicked`);
        // 여기에 행 클릭 시 수행할 작업을 추가합니다.
      };

    return (
    <div className="p-4 w-full bg-orange-200 ">
     <div className="text-3xl font-extrabold">
       주문서 관리
     </div>
     <ListComponent onRowClick={handleRowClick} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, gap: 2 }}>
            <FormControl fullWidth variant="outlined" sx={{ width: '8%', '&:hover': { bgcolor: 'gray' }, ml: 60 }}>
                <InputLabel sx={{
                    '&.Mui-focused': {
                        color: 'black', // 포커스 시 라벨 색상
                    },
                }}>주문서 종류</InputLabel>
                <Select
                    value={orderType}
                    onChange={handleChange}
                    label="주문서 종류"
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                '& .MuiMenuItem-root': {
                                },
                            },
                        },
                    }}
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'gray',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'gray',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            color : 'black',
                            borderColor: 'gray', // 포커스 시 테두리 색상 유지
                        },
                        '& .MuiSvgIcon-root': {
                        },
                    }}
                >
                    {/*< 0 = 주문 전, 1 = 주문 중 , 2 = 납품(주문) 완료 , 3 = 반품 중 , 4 = 반품 완료 , 5 = 취소>*/}
                    <MenuItem value="option1">전체</MenuItem>
                    <MenuItem value="option2">주문 전</MenuItem>
                    <MenuItem value="option3">주문 중</MenuItem>
                    <MenuItem value="option4">주문 완료</MenuItem>
                    <MenuItem value="option5">반품 중</MenuItem>
                    <MenuItem value="option6">반품 완료</MenuItem>
                    <MenuItem value="option7">취소</MenuItem>
                </Select>
            </FormControl>
            <Button
                sx={{ bgcolor: 'gray', color: 'white', width: '8%', '&:hover': { bgcolor: 'gray' } , mr: 60}}
                variant="contained"
                component={Link}
                to="/order/add"
            >
                주문서 등록
            </Button>
        </Box>
     <div>{page}</div>

    </div>
    );
  }
export default ListPage;

