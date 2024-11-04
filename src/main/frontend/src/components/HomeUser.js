
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
    const [sortOrder, setSortOrder] = useState('default'); // 기본 정렬 상태
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 추가
    const [filteredProducts, setFilteredProducts] = useState([]); // 필터링된 상품 상태
    const productsPerPage = 6; // 페이지당 상품 수
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 선언
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리


    // 데이터베이스에서 상품 데이터를 가져오는 함수
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:8080/products/list");
                setProducts(response.data.dtoList);
                setFilteredProducts(response.data.dtoList); // 초기값으로 모든 상품 설정
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleAvatarClick = () => {
        // 네비게이션으로 /mypage 경로로 이동
        navigate('/mypage', { state: { user } });
    };


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

    // 가격 정렬 함수
    const handleSort = (order) => {
        let sortedProducts;
        if (order === 'asc') {
            sortedProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
        } else if (order === 'desc') {
            sortedProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
        } else {
            sortedProducts = products; // 초기 상태로 되돌리기
        }
        setFilteredProducts(sortedProducts);
        setSortOrder(order);
        setCurrentPage(1); // 정렬 후 페이지를 1로 초기화
    };



    // 현재 페이지에 표시할 상품 계산
    const indexOfLastProduct = currentPage * productsPerPage; // 현재 페이지의 마지막 상품 인덱스
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage; // 현재 페이지의 첫 번째 상품 인덱스
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct); // 필터링된 현재 페이지에서 보여줄 상품들
    const bannerProducts = [...products].sort((a, b) => b.amount - a.amount);

    // 총 페이지 수 계산
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    // 페이지 변경 함수
    const handlePageChange = (event, value) => {
        setCurrentPage(value); // 페이지 번호 업데이트
    };

    // 상품 클릭 시 상세 화면으로 이동
    const handleCardClick = (productId) => {
        navigate(`/itempurchase/${productId}`, { state: { isLoggedIn } }); // 상품 ID와 함께 구매 페이지로 이동 , 로그인 상태 전달
    };



    // 검색 수행 함수
    const handleSearch = () => {
        const results = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(results);
        setCurrentPage(1); // 검색 후 페이지를 1로 초기화
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
                {['상의','아우터','바지'].map((text, index) => (
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
        window.open('http://localhost:3000/dashboard', '_blank', 'noopener,noreferrer'); // 새로운 팝업 열기
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
                    {user && user.role === 2 && (
                        <Button color="inherit" sx={{ mr: 2 }} onClick={openManagerList}>
                            관리자 페이지
                        </Button>
                    )}


                    {isLoggedIn ? (
                        <Avatar onClick={handleAvatarClick} style={{ cursor: 'pointer' }}>
                            {user.cname.charAt(0)}
                        </Avatar>// 사용자의 이름의 첫 글자를 Avatar에 표시
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
                                value={searchTerm} // 입력한 검색어 상태를 value로 설정
                                onChange={(e) => setSearchTerm(e.target.value)} // 검색어 업데이트
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
                                        <IconButton edge="end" onClick={handleSearch}> {/* 클릭 시 handleSearch 호출 */}
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </form>
                </Toolbar>
            </AppBar>
            {/*상품 배너*/}
            <Box sx={{ bgcolor: 'lightgray', p: 2 }}>
                <Swiper autoplay={true} pagination={true} navigation={true} modules={[Navigation , SwiperPagination , Autoplay]} className="mySwiper">
                    {bannerProducts.length === 0 ? (
                        <Typography variant="h6" color="text.secondary" sx={{ marginLeft: 4 }}>
                            일치하는 상품이 없습니다.
                        </Typography>
                    ) : (
                        bannerProducts.map((product , index) => (
                            <SwiperSlide>
                                <Card
                                    onClick={() => handleCardClick(product.id)} // 클릭 시 페이지 이동
                                    sx={{ cursor: 'pointer' }} // 커서를 포인터로 변경
                                >
                                    <CardContent>
                                        <CardMedia
                                            sx={{ height: 200 }}
                                            image={
                                                product.itemImage
                                                    ? require(`../sample/${product.itemImage}`) // 템플릿 리터럴 사용 (백틱)
                                                    : require('../sample/sample1.png') // 기본 이미지 경로
                                            }
                                            title={product.name}
                                        />
                                    </CardContent>
                                </Card>
                            </SwiperSlide>
                        ))
                    )}
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
                    <ToggleButton value="recent" aria-label="recent" onClick={() => handleSort(null)}>
                        최신순
                    </ToggleButton>
                    <ToggleButton value="lowPrice" aria-label="low price" onClick={() => handleSort('asc')}>
                        가격이 낮은 순
                    </ToggleButton>
                    <ToggleButton value="highPrice" aria-label="high price" onClick={() => handleSort('desc')}>
                        가격이 높은 순
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
            {/*하단의 상품 정렬 페이지*/}
            <Grid container spacing={2}>
                {currentProducts.length === 0 ? (
                    <Typography variant="h6" color="text.secondary" sx={{ marginLeft: 4 }}>
                        일치하는 상품이 없습니다.
                    </Typography>
                ) : (
                    currentProducts.map((product, index) => (
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
                                                ? require(`../sample/${product.itemImage}`) // 템플릿 리터럴 사용 (백틱)
                                                : require('../sample/sample1.png')  // 기본 이미지 경로
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
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 , pt: 4 , pb : 6}}>
                <Pagination
                    count={totalPages} // 총 페이지 수
                    page={currentPage} // 현재 페이지
                    onChange={handlePageChange} // 페이지 변경 함수
                    variant="outlined" // 스타일 설정
                    shape="rounded" // 모양 설정
                />
            </Box>
            {/*홈페이지의 최하단 네비게이션*/}
            <AppBar position="static" sx={{ bgcolor: 'gray', color: 'black' ,height: 50}}>
                <Toolbar></Toolbar>
            </AppBar>
        </div>
    );
}