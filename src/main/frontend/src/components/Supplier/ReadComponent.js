import { useEffect, useState,} from "react"
import { useParams } from 'react-router-dom';
import { getOne } from "../../api/ManagerApi"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import  useCustomMove  from "../../hooks/useCustomMove";

const initState = {
    userId: 0,
    mID: '',
    mPW: '',
    mName: '',
    mGender: '',
    mbirthDate: '',
    mtel: '',
    mEmail: '',
    mProfileImage: '',
    uAdr: '',
}

function ReadComponent({ userId }) {


    const [manager, setManager] = useState(initState);

    const {moveToList, moveToModify} = useCustomMove();

    useEffect(() => {
      getOne(userId)
        .then(data => {
          console.log(data); // API로부터 받아온 데이터를 콘솔에 출력
          setManager(data);
        })
        .catch(error => {
          console.error('Error fetching data: ', error); // API 호출에 실패했을 때 에러 메시지를 출력
        });
    }, [userId]);

    return(
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>userId</TableCell>
                            <TableCell align="right">이름</TableCell>
                            <TableCell align="right">성별</TableCell>
                            <TableCell align="right">ID</TableCell>
                            <TableCell align="right">PW</TableCell>
                            <TableCell align="right">생년월일</TableCell>
                            <TableCell align="right">전화번호</TableCell>
                            <TableCell align="right">이메일</TableCell>
                            <TableCell align="right">주소</TableCell>


                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                {manager.userId}
                            </TableCell>
                            <TableCell align="right">{manager.mname}</TableCell>
                            <TableCell align="right">{manager.mgender}</TableCell>
                            <TableCell align="right">{manager.mid}</TableCell>
                            <TableCell align="right">{manager.mpw}</TableCell>
                            <TableCell align="right">{manager.mbirthDate}</TableCell>
                            <TableCell align="right">{manager.mtel}</TableCell>
                            <TableCell align="right">{manager.memail}</TableCell>
                            <TableCell align="right">{manager.uadr}</TableCell>


                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>


            <div className="flex justify-end p-4">
              <button type="button"
                           className="rounded p-4 text-xl w-32 text-white bg-blue-500"
                           onClick={() => moveToList()}>
                    list
                    </button>
            </div>

            <div className="flex justify-end p-4">
              <button type="button"
                    className="rounded p-4 text-xl w-32 text-white bg-red-500"
                    onClick={() => moveToModify(manager.userId)}>
              Modify
              </button>
            </div>
        </>
    );
}

const makeDiv = (title, value) =>
  <div className="flex justify-center">
    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
      <div className="w-1/5 p-6 text-right font-bold">{title}</div>
        <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
          {value}
        </div>
      </div>
    </div>

export default ReadComponent;