import React, { useCallback, useEffect, useState } from "react";
import { deleteOne, getOne, putOne } from "../../api/OrderApi";
import { TextField, Button, Box } from '@mui/material';

import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";

const initState = {
    id: 0,
    orderType: '',
    orderedProducts: '',
    totalAmount: '',
    totalPrice: '',
    complete: false
}

const ModifyComponent = ({ id, moveList }) => {

    const [order, setOrder] = useState({ ...initState })

    // 모달 창을 위한 상태
    const [result, setResult] = useState(null)

    // 이동을 위한 기능들
    const { moveToList, OrdermoveToRead } = useCustomMove()

    const handleClickModify = () => { // 버튼 클릭 시
        putOne(order).then(data => {
            console.log("modify result: " + data)
            setResult('Modified')
        })
    }

    const handleClickDelete = () => { // 버튼 클릭 시
        deleteOne(id).then(data => {
            console.log("delete result: " + data)
            setResult('Deleted')
        })
    }

    // 모달 창이 close될 때
    const closeModal = () => {
        if (result === 'Deleted') {
            moveToList()
        } else {
            OrdermoveToRead(id)
        }
    }

    useEffect(() => {
        getOne(id).then(data => setOrder(data))
    }, [id])

    const handleChangeOrder = (e) => {
        order[e.target.name] = e.target.value
        setOrder({ ...order })
    }

    const handleChangeOrderComplete = (e) => {
        const value = e.target.value
        order.complete = (value === 'Y')
        setOrder({ ...order })
    }

    return (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            {result ? <ResultModal title={'처리결과'} content={result} callbackFn={closeModal}></ResultModal> : <></>}

            <TextField
                label="Type"
                variant="outlined"
                name="orderType"
                value={order.orderType}
                onChange={handleChangeOrder}
            />
            <TextField
                label="Product"
                variant="outlined"
                name="orderedProducts"
                value={order.orderedProducts}
                onChange={handleChangeOrder}
            />
            <TextField
                label="Amount"
                variant="outlined"
                name="totalAmount"
                value={order.totalAmount}
                onChange={handleChangeOrder}
            />
            <TextField
                label="Price"
                variant="outlined"
                name="totalPrice"
                value={order.totalPrice}
                onChange={handleChangeOrder}
            />
            <TextField
                label="COMPLETE"
                variant="outlined"
                name="complete"
                value={order.complete ? 'Y' : 'N'}
                onChange={handleChangeOrderComplete}
                select
                SelectProps={{
                    native: true,
                }}
            >
                <option value='Y'>Completed</option>
                <option value='N'>Not Yet</option>
            </TextField>

            <Button variant="contained" color="secondary" onClick={handleClickDelete}>
                Delete
            </Button>

            <Button variant="contained" color="primary" onClick={handleClickModify}>
                Modify
            </Button>
        </Box>
    );
}

export default ModifyComponent;