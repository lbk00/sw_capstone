import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

import {
    Alert,
    Avatar,
    Box,
    Card,
    CardContent,
    CardMedia, Checkbox,
    Divider,
    Drawer,
    FormControl, FormControlLabel,
    Grid, Icon, InputAdornment,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    OutlinedInput,
    Snackbar
} from '@mui/material';


export default function ShoppingCart() {

    const location = useLocation();
    const [cartItems, setCartItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]); // 선택된 항목들의 ID
    const [selectAll, setSelectAll] = useState(false); // 전체 선택 상태

    const [open, setOpen] = React.useState(false);
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    // location.state에서 새로 전달된 cartItem을 가져옴
    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCartItems);
    }, []);  // 컴포넌트가 처음 렌더링될 때 한 번만 실행

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {['전체보기'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <MenuIcon />
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['바지', '운동화', '트레이닝복', '티셔츠', '점퍼'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <MenuIcon />
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    // 장바구니 초기화 함수
    const handleClearCart = () => {
        localStorage.removeItem('cartItems');  // 'cartItems' 키의 항목을 로컬 스토리지에서 삭제
        setCartItems([]);  // 상태를 빈 배열로 설정하여 UI에서도 장바구니가 비워짐
    };



    // 체크박스 변경 핸들러
    const handleCheckboxChange = (productId) => {
        setSelectedItems((prevSelectedItems) => {
            if (prevSelectedItems.includes(productId)) {
                // 이미 선택된 경우 해제
                return prevSelectedItems.filter((id) => id !== productId);
            } else {
                // 선택되지 않은 경우 추가
                return [...prevSelectedItems, productId];
            }
        });

        // "모두 선택" 상태 업데이트
        if (selectedItems.length + 1 === cartItems.length) {
            setSelectAll(true); // 모두 선택된 상태로 변경
        } else {
            setSelectAll(false); // 선택 해제된 경우
        }
    };

    const handleSelectAllChange = () => {
        if (selectAll) {
            setSelectedItems([]); // 모두 해제
        } else {
            setSelectedItems(cartItems.map(product => product.id)); // 모두 선택
        }
        setSelectAll(!selectAll); // 전체 선택 상태 토글
    };

    // 선택된 항목 삭제
    const handleDeleteSelected = () => {
        const updatedCartItems = cartItems.filter((product) => !selectedItems.includes(product.id));
        setCartItems(updatedCartItems);
        setSelectedItems([]); // 선택 항목 초기화
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems)); // 로컬 스토리지 업데이트
    };

    //장바구니 상품 구매 처리
    const handlePurchase = async () => {
        try {
            // 선택된 상품 정보만 필터링
            const purchaseData = cartItems
                .filter(item => selectedItems.includes(item.id)) // 체크된 상품만 선택
                .map(item => ({
                    id: item.id,
                    amount: item.amount // 수량도 여기서 가져오기
                }));

            if (purchaseData.length === 0) {
                alert('구매할 상품을 선택해주세요.'); // 아무것도 선택되지 않았을 경우 알림
                return;
            }
            // 3. POST 요청 보내기
            const response = await axios.post('http://localhost:8080/orders/purchase', purchaseData);
            console.log('구매가 완료되었습니다:', response.data);
            setSnackbarOpen(true); // Snackbar 열기
            // 장바구니에서 구매한 상품 제거
            const updatedCartItems = cartItems.filter(item => !selectedItems.includes(item.id));
            setCartItems(updatedCartItems);
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems)); // 로컬 스토리지 업데이트
            setSelectedItems((prev) => prev.filter(id => !selectedItems.includes(id)));

        } catch (error) {
            // 에러 처리
            console.error('구매 중 오류가 발생했습니다:', error);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const calculateTotalPrice = (products) => {
        return products.reduce((total, product) => {
            return total + product.price * product.amount;
        }, 0);
    };

    const totalPrice = calculateTotalPrice(cartItems); // 최종 가격 계산

    return (
        <div className="App">
            <AppBar position="static" sx={{ bgcolor: 'white', color: 'black' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <Icon sx={{ mr: 1 }} />
                    </IconButton>
                    <Typography align="left" variant="h6" sx={{ flexGrow: 1 }}>
                        메인페이지
                    </Typography>
                    <Avatar>Lee</Avatar>
                    <Button color="inherit">Login</Button>
                    <Button color="inherit">Sign up</Button>
                </Toolbar>
            </AppBar>
            <Divider />
            <AppBar position="static" sx={{ bgcolor: 'white', color: 'black'}}>
                <Toolbar>
                    <div>
                        <Button sx={{ color: 'black' }} onClick={toggleDrawer(true)}>
                            <MenuIcon/>
                        </Button>
                        <Drawer open={open} onClose={toggleDrawer(false)}>
                            {DrawerList}
                        </Drawer>
                    </div>

                    <Button sx={{ width : 90, color: 'black' }}>바지</Button>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Button sx={{ width : 90, color: 'black' }}>운동화</Button>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Button sx={{ width : 90, color: 'black' }}>트레이닝복</Button>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Button sx={{ width : 90, color: 'black' }}>티셔츠</Button>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Button sx={{ width : 90, color: 'black' }}>점퍼</Button>
                    <Box sx={{ flexGrow: 1 }} />
                    <form noValidate autoComplete="off">
                        <FormControl sx={{ width: '25ch', bgcolor: 'white' }} size="small">
                            <OutlinedInput
                                placeholder="검색어를 입력하세요"
                                sx={{
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'red',
                                        borderWidth: '2px',
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'red',
                                        borderWidth: '2px',
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'red',
                                        borderWidth: '2px',
                                    },
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton edge="end">
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </form>
                </Toolbar>
            </AppBar>
            <Divider />
            {/*일반배송 ,장바구니 표시*/}
            <AppBar position="static" sx={{ bgcolor: 'white', color: 'black' }}>
                <Toolbar>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography gutterBottom variant="h5">
                                일반배송
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Typography gutterBottom variant="h5">
                                장바구니
                            </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>

            {/*장바구니 정보*/}
            <Box>
                {/* 여러 상품 렌더링 */}
                {cartItems.map((product, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        {/* 체크박스 */}
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedItems.includes(product.id)}
                                    onChange={() => handleCheckboxChange(product.id)}
                                />
                            }
                            label=""
                            sx={{ marginLeft: 2 }} // 왼쪽 여백 추가
                        />
                        {/* 상품 이미지 */}
                        <CardMedia
                            sx={{ height: 200, width: 400, marginRight: '20px' }}
                            image={product.itemImage ? `data:image/jpeg;base64,${product.itemImage}` : require("./sample/sample1.jpg")}
                            title={product.name}
                        />
                        <Divider orientation="vertical" variant="middle" flexItem />
                        {/* 상품 이름 및 가격 */}
                        <CardContent sx={{ height: 200, width: 400, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                            <Typography gutterBottom variant="h5" component="div">
                                {product.name}
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                ₩ {product.price.toLocaleString()}원
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                수량 {product.amount.toLocaleString()}
                            </Typography>
                        </CardContent>
                        <Divider orientation="vertical" variant="middle" flexItem />

                        {/* 색상 및 사이즈 */}
                        <CardContent sx={{ height: 200, width: 400, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                            <Typography gutterBottom variant="h5" component="div">
                                색상: 화이트
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div">
                                사이즈: {product.size}
                            </Typography>
                            <Button sx={{ backgroundColor: 'darkgray', color: 'black', '&:hover': { backgroundColor: 'darkgrey' } }}>
                                주문수정
                            </Button>
                        </CardContent>
                        <Divider orientation="vertical" variant="middle" flexItem />
                        {/* 상품 금액 */}
                        <CardContent sx={{ height: 200, width: 400, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                            <Typography gutterBottom variant="h5" component="div">
                                상품 금액
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div">
                                ₩ {product.price.toLocaleString()} 원
                            </Typography>
                        </CardContent>
                        <CardContent sx={{ height: 200, width: 400, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                            <Typography gutterBottom variant="h5" component="div">
                                ₩ {(product.price * product.amount).toLocaleString()} 원
                            </Typography>
                        </CardContent>
                    </Box>
                ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={selectAll}
                            onChange={handleSelectAllChange}
                        />
                    }
                    sx={{ marginLeft: 2 }} // 왼쪽 여백 추가
                    label=""
                />

                <Typography
                    variant="h5"
                    component="div"
                    sx={{
                        textAlign: 'right', // 텍스트를 오른쪽 정렬
                        marginRight: 20, // 오른쪽 마진 추가 (원하는 값으로 조절 가능)
                    }}
                >
                    총 가격: ₩ {totalPrice.toLocaleString()} 원
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center',gap: 2, mb: 2 }}>
                <Button
                    variant="contained"
                    sx={{
                        bgcolor: 'gray',
                        color: 'white',
                        '&:hover': { bgcolor: 'gray' },
                    }}
                    onClick={handleClearCart} // 상품 모두 삭제
                >모두 삭제</Button>
                {/* 선택된 항목 삭제 버튼 */}
                <Button
                    variant="contained"
                    sx={{
                        bgcolor: 'gray',
                        color: 'white',
                        '&:hover': { bgcolor: 'gray' },
                    }}
                    onClick={handleDeleteSelected}>
                    선택된 항목 삭제
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        bgcolor: 'gray',
                        color: 'white',
                        '&:hover': { bgcolor: 'gray' },
                    }}
                    onClick={handlePurchase} // 구매하기
                >구매하기</Button>
            </Box>
            {/* Snackbar 컴포넌트 추가 */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                //message="구매가 완료되었습니다."
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // Snackbar 위치 설정
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="success">
                    구매가 완료되었습니다.
                </Alert>
            </Snackbar>
            {/*하단과 여백을 위해 생성한 Box*/}
            <Box sx={{ bgcolor: '#ffffff' , height : 80 }}></Box>
            <AppBar position="static" sx={{ bgcolor: 'gray', color: 'black', height: 50 }}>
                <Toolbar></Toolbar>
            </AppBar>
        </div>
    );
}