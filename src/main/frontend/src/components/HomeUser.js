
import React, { useEffect,useState} from 'react';
import axios from "axios";
import { Navigation , Autoplay }from 'swiper/modules';
import { Pagination as SwiperPagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './swiper.css';
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 훅
import defaultImage from "./sample/sample1.jpg"; // 기본 이미지


import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';



import {
    Avatar,
    BottomNavigationAction,
    Box,
    Breadcrumbs,
    ButtonGroup,
    Card,
    CardContent,
    CardMedia,
    Divider,
    Drawer,
    FormControl,
    Grid,
    Icon,
    InputAdornment,
    Link,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    OutlinedInput,
    Pagination,
    ToggleButton,
    ToggleButtonGroup
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function HomeUser() {
    {/*메뉴 이벤트 관리*/}
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [anchorElProduct, setAnchorElProduct] = useState(null);
    const [anchorElOrdersheet, setAnchorElOrdersheet] = useState(null);
    const [anchorElInventory, setAnchorElInventory] = useState(null);
    const [anchorElSupplier, setAnchorElSupplier] = useState(null);

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


    /* 백엔드에서 가져올 상품정보 */
    // 상품 데이터를 저장할 state
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
    const productsPerPage = 6; // 페이지당 상품 수
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 선언

    // 데이터베이스에서 상품 데이터를 가져오는 함수
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // 백엔드에서 상품 데이터를 가져옴 (API 엔드포인트 수정 필요)
                const response = await axios.get("http://localhost:8080/products/list");
                setProducts(response.data.products); // 응답에서 products 배열에 접근
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };

        fetchProducts(); // 컴포넌트가 마운트될 때 데이터 가져오기
    }, []);

    // 현재 페이지에 표시할 상품 계산
    const indexOfLastProduct = currentPage * productsPerPage; // 현재 페이지의 마지막 상품 인덱스
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage; // 현재 페이지의 첫 번째 상품 인덱스
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct); // 현재 페이지에서 보여줄 상품들

    // 총 페이지 수 계산
    const totalPages = Math.ceil(products.length / productsPerPage);

    // 페이지 변경 함수
    const handlePageChange = (event, value) => {
        setCurrentPage(value); // 페이지 번호 업데이트
    };

    // 상품 클릭 시 상세 화면으로 이동
    const handleCardClick = (productId) => {
        navigate(`/itempurchase/${productId}`); // 상품 ID와 함께 구매 페이지로 이동
    };


    {/*상품 메뉴 옆 Drawer*/}
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
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
                {['바지', '운동화', '트레이닝복', '티셔츠' , '점퍼'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <MenuIcon /> : <MenuIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    {/*상품 정렬 타입*/}
    const [sortType, setSortType] = useState('popularity');

    const handleSortTypeChange = (event, newSortType) => {
        if (newSortType !== null) {
            setSortType(newSortType);
        }
    };

    const openManagerList = () => {
        window.open('http://localhost:3000/manager/list', '_blank', 'noopener,noreferrer'); // 새로운 팝업 열기
    };

    return (
        <div className="App">
            {/*최상단의 페이지 로고 및 프로필, 로그인 ,회원가입*/}
            <AppBar position="static" sx={{ bgcolor: 'white', color: 'black' }}>
                {/*상단페이지*/}
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <Icon sx={{ mr: 1 }} />
                    </IconButton>
                    <Typography align="left" variant="h6" sx={{ flexGrow: 1 }}>
                        메인페이지
                    </Typography>
                    <Button color="inherit" sx={{ mr: 2 }} onClick={openManagerList}>관리자 페이지</Button>
                    <Avatar>Lee</Avatar>
                    <Button color="inherit">Login</Button>
                    <Button color="inherit">Sign up</Button>
                </Toolbar>
            </AppBar>
            <Divider />
            {/*상품 목록 메뉴*/}
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
            {/*임시 배너*/}
            <Box sx={{ bgcolor: 'lightgray', p: 2 }}>
                <Swiper autoplay={true} pagination={true} navigation={true} modules={[Navigation , SwiperPagination , Autoplay]} className="mySwiper">
                    <SwiperSlide>
                        <CardMedia
                            sx={{ height: 200 }}
                            image={require("./sample/sample1.jpg")}
                            title="sample1"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CardMedia
                            sx={{ height: 200 }}
                            image={require("./sample/sample1.jpg")}
                            title="sample1"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CardMedia
                            sx={{ height: 200 }}
                            image={require("./sample/sample1.jpg")}
                            title="sample1"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CardMedia
                            sx={{ height: 200 }}
                            image={require("./sample/sample1.jpg")}
                            title="sample1"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CardMedia
                            sx={{ height: 200 }}
                            image={require("./sample/sample1.jpg")}
                            title="sample1"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CardMedia
                            sx={{ height: 200 }}
                            image={require("./sample/sample1.jpg")}
                            title="sample1"
                        />
                    </SwiperSlide>
                </Swiper>
            </Box>
            {/*상품 정렬 타입 선택*/}
            <Box sx={{ display: 'flex', justifyContent: 'right', my: 2 }}>
                <ToggleButtonGroup
                    value={sortType}
                    exclusive
                    onChange={handleSortTypeChange}
                    aria-label="sort type"
                >
                    <ToggleButton value="popularity" aria-label="popularity">
                        인기순
                    </ToggleButton>
                    <ToggleButton value="recent" aria-label="recent">
                        최근순
                    </ToggleButton>
                    <ToggleButton value="lowPrice" aria-label="low price">
                        가격이 낮은순
                    </ToggleButton>
                    <ToggleButton value="highPrice" aria-label="high price">
                        가격이 높은순
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
            {/*하단의 상품 정렬 페이지*/}
            <Grid container spacing={2}>
                {currentProducts.length === 0 ? (
                    <Typography variant="h6" color="text.secondary">
                        상품을 불러오는 중입니다...
                    </Typography>
                ) : (
                    currentProducts.map((product) => (
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <Card
                                onClick={() => handleCardClick(product.id)} // 클릭 시 페이지 이동
                                sx={{ cursor: 'pointer' }} // 커서를 포인터로 변경
                            >
                                <CardContent>
                                    <CardMedia
                                        sx={{ height: 400 }}
                                        image={
                                            product.itemImage
                                                ? `data:image/jpeg;base64,${product.itemImage}`
                                                : defaultImage // 기본 이미지 사용
                                        }
                                        title={product.name}
                                    />
                                    <Typography gutterBottom variant="h5" component="div">
                                        {product.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        가격: {product.price}원
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>

            {/*상품 이동 페이지네이션*/}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Pagination
                    count={totalPages} // 총 페이지 수
                    page={currentPage} // 현재 페이지
                    onChange={handlePageChange} // 페이지 변경 함수
                    variant="outlined" // 스타일 설정
                    shape="rounded" // 모양 설정
                />
            </Box>
            {/*홈페이지의 최하단 네비게이션*/}
            <BottomNavigationAction label="Recents" icon={<MenuIcon />} />
            <BottomNavigationAction label="Favorites" icon={<MenuIcon />} />
            <BottomNavigationAction label="Nearby" icon={<MenuIcon />} />
            <AppBar position="static" sx={{ bgcolor: 'gray', color: 'black' ,height: 50}}>
                <Toolbar></Toolbar>
            </AppBar>
        </div>
    );
}

// export default HomeUser;