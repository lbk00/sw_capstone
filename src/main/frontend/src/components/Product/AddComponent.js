import React, { useState } from "react";
import { postAdd } from "../../api/ProductApi";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";
import { TextField, Button, Box } from '@mui/material';

const initState = {

    name : '',
    item_type : '',
    size : '',
    price : '',
    amount : '',



}

const AddComponent = () => {

    const [product, setProduct] = useState({...initState})
    const [result, setResult] = useState(null)
    const {moveToList} = useCustomMove()

    const handleChangeProduct = (e) => {
        product[e.target.name] = e.target.value
        setProduct({...product})
    }

    const handleClickAdd = () => {
        postAdd(product)
            .then(result => {
                
                
                setResult(result.id)
                setProduct({...initState})
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
                label="Name"
                variant="outlined"
                name="name"
                value={product.name}
                onChange={handleChangeProduct}
            />
            <TextField
                label="Type"
                variant="outlined"
                name="item_type"
                value={product.item_type}
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
                label="Price"
                variant="outlined"
                name="price"
                value={product.price}
                onChange={handleChangeProduct}
            />
            />
            <Button variant="contained" onClick={handleClickAdd}>
                ADD
            </Button>
        </Box>
    );
};

export default AddComponent;
