import React, { useState } from "react";
import { postAdd } from "../../api/OrderApi";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";
import { TextField, Button, Box } from '@mui/material';

const initState = {

    orderType : '',
    orderedProducts : '',
    totalAmount : '',
    totalPrice : '',



}

const AddComponent = () => {

    const [order, setOrder] = useState({...initState})
    const [result, setResult] = useState(null)
    const {moveToList} = useCustomMove()

    const handleChangeOrder = (e) => {
        order[e.target.name] = e.target.value
        setOrder({...order})
    }

    const handleClickAdd = () => {
        postAdd(order)
            .then(result => {
                let date = new Date(result.mbirthDate);
                console.log(date.toISOString());
                setResult(result.userId)
                setOrder({...initState})
            }).catch(e => { console.error(e) })
    }

    const closeModal = () => {
        setResult(null)
        moveToList()
    }

    return (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            {result ? <ResultModal title={'Add Result'} content={`New ${result} Added`} callbackFn={closeModal}/>: <></>}
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
            />
            <Button variant="contained" onClick={handleClickAdd}>
                ADD
            </Button>
        </Box>
    );
};

export default AddComponent;
