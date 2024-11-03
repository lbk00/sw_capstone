import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from "axios";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import defaultImage from "./sample/sample1.png"; // 기본 이미지 설정

import {
    Avatar,
    Box,
    Card,
    CardContent,
    CardMedia,
    Divider,
    Drawer,
    FormControl,
    Grid, Icon, InputAdornment,
    InputLabel,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Snackbar,
    Alert
} from '@mui/material';


export default function ItemPurchase() {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [anchorElProduct, setAnchorElProduct] = useState(null);
    const [anchorElOrdersheet, setAnchorElOrdersheet] = useState(null);
    const [anchorElInventory, setAnchorElInventory] = useState(null);
    const [anchorElSupplier, setAnchorElSupplier] = useState(null);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleUserClick = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleProductClick = (event) => {
        setAnchorElProduct(event.currentTarget);
    };

    const handleOrdersheetClick = (event) => {
        setAnchorElOrdersheet(event.currentTarget);
    };

    const handleInventoryClick = (event) => {
        setAnchorElInventory(event.currentTarget);
    };

    const handleSupplierClick = (event) => {
        setAnchorElSupplier(event.currentTarget);
    };

    const handleCloseUser = () => {
        setAnchorElUser(null);
    };

    const handleCloseProduct = () => {
        setAnchorElProduct(null);
    };

    const handleCloseOrdersheet = () => {
        setAnchorElOrdersheet(null);
    };

    const handleCloseInventory = () => {
        setAnchorElInventory(null);
    };

    const handleCloseSupplier = () => {
        setAnchorElSupplier(null);
    };

    const openUser = Boolean(anchorElUser);
    const openProduct = Boolean(anchorElProduct);
    const openOrdersheet = Boolean(anchorElOrdersheet);
    const openInventory = Boolean(anchorElInventory);
    const openSupplier = Boolean(anchorElSupplier);

    const [open, setOpen] = React.useState(false);
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const [user, setUser] = useState(null);

    // Axios 요청에 withCredentials 옵션 추가
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/user/current-user', {
                    withCredentials: true // 세션 쿠키 전달을 위한 설정
                });
                console.log(response.data); // 확인용 로그
                setUser(response.data);
                setIsLoggedIn(true); // 로그인 처리
            } catch (error) {
                console.error("사용자 정보 가져오기 오류:", error);
            }
        };

        fetchUser();
    }, []);

    const location = useLocation();

    const [isLoggedIn, setIsLoggedIn] = useState(location.state);

    // 상품 정보
    const { productId } = useParams();
    const [product, setProduct] = useState(null);




    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/products/${productId}`);
                setProduct(response.data); // 받아온 데이터를 product 상태에 저장
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };
        fetchProduct();
    }, [productId]); // productId가 변경될 때마다 데이터를 가져온다



    //로그인
    {/*현재 로그인한 관리자 정보*/}
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/user/current-user', {
                    withCredentials: true // 세션 쿠키 전달을 위한 설정
                });
                console.log(response.data); // 확인용 로그
                setUser(response.data);
            } catch (error) {
                setIsLoggedIn(false);
            }
        };

        fetchUser();
    }, []);

    // 로그아웃 함수
    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8080/api/user/logout', {}, { withCredentials: true });
            window.location.href = "/homeuser"; // 페이지 새로고침
            setIsLoggedIn(false); // 로그아웃 처리
            sessionStorage.clear(); // sessionStorage 비우기
        } catch (error) {
            console.error("로그아웃 실패:", error);
        }
    };

    const handleLogin = () => {
        navigate('/signin');  // 로그인 페이지 이동
    };

    const handleSignup = () => {
        navigate('/signup');  // 회원가입 페이지 이동
    };

    const handleCart = () => {
        navigate('/cart');  // 로그인 페이지 이동
    };

    const openManagerList = () => {
        window.open('http://localhost:3000/dashboard', '_blank', 'noopener,noreferrer'); // 새로운 팝업 열기
    };

    // 장바구니 페이지로 상품 ID 전송
    const navigate = useNavigate();
    const handleAddToCart = () => {
        if(isLoggedIn) {
            const parsedQuantity = parseInt(quantity, 10);

            // 수량 검증
            if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
                setSnackbarMessage("유효한 수량을 입력하세요.");
                setOpenSnackbar(true);
                return;
            }

            // 남은 수량 체크
            if (parsedQuantity > product.amount) {
                setSnackbarMessage("재고가 충분하지 않습니다.");
                setOpenSnackbar(true);
                return;
            }

            // 장바구니 페이지로 product를 배열로 전달
            const cartItem = {
                id: product.id,
                name: product.name,
                price: product.price,
                size: product.size,
                itemImage: product.itemImage,
                amount: parseInt(quantity, 10),
            };

            // 기존 장바구니 상품 가져오기 (없으면 빈 배열)
            let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
            // 장바구니에 이미 있는지 확인
            const existingItemIndex = cartItems.findIndex(item => item.id === product.id);

            if (existingItemIndex > -1) {
                // 이미 있는 경우, 수량 업데이트
                cartItems[existingItemIndex].amount += cartItem.amount;

            } else {
                // 새로 추가
                cartItems.push(cartItem);
            }
            // 세션 스토리지에 저장
            sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
            setSnackbarMessage("장바구니에 추가되었습니다.");
            setOpenSnackbar(true);
            // 장바구니 페이지로 이동
            navigate('/cart', {state: {cartItem}});
        } else {
            setSnackbarMessage("로그인 후 이용이 가능합니다.");
            setOpenSnackbar(true);

        }
    };

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
                {['상의','아우터','바지'].map((text, index) => (
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

    const [option1, setOption1] = React.useState('');
    const [option2, setOption2] = React.useState('');
    const [option3, setOption3] = React.useState('');

    const handleOption1Change = (event) => {
        setOption1(event.target.value);
    };

    const handleOption2Change = (event) => {
        setOption2(event.target.value);
    };

    const handleOption3Change = (event) => {
        setOption3(event.target.value);
    };

    const [quantity, setQuantity] = useState(); // 기본 수량 설정

    const handleQuantityChange = (event) => {
        const value = event.target.value;
        // 숫자만 입력받도록 설정 (0보다 작지 않도록)
        if (value >= 0) {
            setQuantity(value);
        }
    };

    // 상품이 로드되기 전에는 product가 null이므로 초기 상태를 설정. 데이터가 준비되기 전에 로딩메시지를 표시하도록
    if (!product) {
        return <p>상품을 불러오는 중입니다...</p>; // 데이터가 로드 중일 때
    }

    return (
        <div className="App">
            <AppBar position="static" sx={{ bgcolor: 'white', color: 'black' }}>
                {/*상단페이지*/}
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <Icon sx={{ mr: 1 }} />
                    </IconButton>
                    <Typography align="left" variant="h6" sx={{ flexGrow: 1 }}>
                        메인페이지
                    </Typography>
                    {user && user.role === 2 && (
                        <Button color="inherit" sx={{ mr: 2 }} onClick={openManagerList}>
                            관리자 페이지
                        </Button>
                    )}


                    {isLoggedIn ? (
                        <Avatar>{user.cname.charAt(0)}</Avatar> // 사용자의 이름의 첫 글자를 Avatar에 표시
                    ) : (
                        <h1></h1>
                    )}
                    {isLoggedIn ? ( // 로그인 여부에따라 버튼 다르게 뜨도록
                        <>
                            <Button color="inherit" onClick={handleCart}>장바구니</Button>
                            <Button color="inherit" onClick={handleLogout}>로그아웃</Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" onClick={handleLogin}>로그인</Button>
                            <Button color="inherit" onClick={handleSignup}>회원가입</Button>
                        </>
                    )}
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

                    <Button sx={{ width : 90, color: 'black' }}>상의</Button>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Button sx={{ width : 90, color: 'black' }}>아우터</Button>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Button sx={{ width : 90, color: 'black' }}>바지</Button>
                    <Divider orientation="vertical" variant="middle" flexItem />
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
            {/*상단과 여백을 위해 생성한 Box*/}
            <Box sx={{ bgcolor: '#ffffff' , height : 50 }}></Box>
            {/*상품 상세 페이지*/}
            <Grid container spacing={0} justifyContent="center" alignItems="center">
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            {product && (
                            <CardMedia
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: 500,
                                    width: 500
                                }}

                                image={product.itemImage ? `data:image/jpeg;base64,${product.itemImage}` : defaultImage}
                                title={product.name}
                            />
                                )}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent sx={{ height: 500, width: 400 }}>
                            <Typography gutterBottom variant="h5" component="div">
                                {product.name}
                            </Typography>
                            <Typography variant="h5">
                                ₩ {product.price}
                            </Typography>
                            <Typography variant="h6">
                                사이즈 : {product.size}
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                남은 수량 : {product.amount}
                            </Typography>
                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <InputLabel
                                    htmlFor="quantity-input"
                                    sx={{
                                        color: 'gray',
                                        '&.Mui-focused': {
                                            color: 'gray',
                                        },
                                        display: quantity ? 'none' : 'block',
                                    }}
                                >
                                    수량
                                </InputLabel>
                                <TextField
                                    id="quantity-input"
                                    type="number" // 숫자만 입력 가능
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    sx={{
                                        '& .MuiInputBase-input': {
                                            color: 'gray',
                                        },
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'gray',
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'gray',
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'gray',
                                        },
                                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'gray', // 포커스 시 테두리 색상 회색
                                        },
                                    }}
                                    InputProps={{
                                        onFocus: (e) => e.target.select(), // 숫자 입력 시 포커스될 때 전체 선택
                                    }}
                                />
                            </FormControl>

                            <Grid container spacing={2} sx={{ mt: 2 }}>
                                {/*구매하기 & 장바구니 버튼*/}
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            bgcolor: 'gray',
                                            color: 'white',
                                            '&:hover': { bgcolor: 'gray' },
                                        }}
                                        onClick={handleAddToCart} // 장바구니 버튼 클릭 시 호출
                                    >
                                        구매하기
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            borderColor: 'gray',
                                            color: 'gray',
                                            '&:hover': {
                                                borderColor: 'gray',
                                                color: 'gray',
                                            },
                                        }}
                                        onClick={handleAddToCart} // 장바구니 버튼 클릭 시 호출
                                    >
                                        장바구니
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                //message={"재고가 부족합니다."}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // Snackbar 위치 설정
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity="warning">
                    {snackbarMessage}
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
