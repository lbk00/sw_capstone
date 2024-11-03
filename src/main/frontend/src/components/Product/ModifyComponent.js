import React, { useCallback, useEffect, useState } from "react";
import { deleteOne, getOne, putOne } from "../../api/ProductApi";
import { TextField, Button, Box } from '@mui/material';

import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";

const initState = {
    id: 0,
    name: '',
    itemType: '',
    price: '',
    size: '',
    amount:'',
    complete: false
}

const ModifyComponent = ({ id, moveList }) => {

    const [product, setProduct] = useState({ ...initState })

    // 모달 창을 위한 상태
    const [result, setResult] = useState(null)

    // 이동을 위한 기능들
    const { moveToList, ProductmoveToRead } = useCustomMove()

    const handleClickModify = () => { // 버튼 클릭 시
        putOne(product).then(data => {
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
            ProductmoveToRead(id)
        }
    }

    useEffect(() => {
        getOne(id).then(data => setProduct(data))
    }, [id])

    const handleChangeProduct = (e) => {
        product[e.target.name] = e.target.value
        setProduct({ ...product })
    }

    const handleChangeProductComplete = (e) => {
        const value = e.target.value
        product.complete = (value === 'Y')
        setProduct({ ...product })
    }

    return (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            {result ? <ResultModal title={'처리결과'} content={result} callbackFn={closeModal}></ResultModal> : <></>}

            <TextField
                label="Name"
                variant="outlined"
                name="name"
                value={product.name}
                onChange={handleChangeProduct}
            />
            <TextField
                label="Type"
                variant="outlined"
                name="itemType"
                value={product.itemType}
                onChange={handleChangeProduct}
            />
            <TextField
                            label="Price"
                            variant="outlined"
                            name="price"
                            value={Product.totalPrice}
                            onChange={handleChangeProduct}
            />

            <TextField
                   label="Size"
                   variant="outlined"
                   name="size"
                   value={product.size}
                   onChange={handleChangeProduct}
            />

            <TextField
                label="Amount"
                variant="outlined"
                name="amount"
                value={product.amount}
                onChange={handleChangeProduct}
            />

            <TextField
                label="COMPLETE"
                variant="outlined"
                name="complete"
                value={Product.complete ? 'Y' : 'N'}
                onChange={handleChangeProductComplete}
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