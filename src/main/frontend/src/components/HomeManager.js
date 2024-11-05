// App.js


import React, {useState} from 'react';
import { Navigation , Autoplay }from 'swiper/modules';
import { Pagination as SwiperPagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './swiper.css';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';




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
import SearchIcon from '@mui/icons-material/Search';
import { Link as RouterLink } from 'react-router-dom';


export default function App() {
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
                    <Avatar>Lee</Avatar>
                    <Link
                       component={RouterLink}
                       to="/SignIn"
                       underline="none"
                       color="inherit"
                       >
                    <Button color="inherit">
                       로그인
                    </Button>
                    </Link>

                    <Link
                          component={RouterLink}
                          to="/SignUp"
                          underline="none"
                          color="inherit"
                        >
                        <Button color="inherit">
                          회원가입
                        </Button>
                    </Link>

                </Toolbar>
            </AppBar>
            <Divider />
            {/*관리자용 메뉴 및 검색창*/}
            <AppBar position="static" sx={{ bgcolor: 'white', color: 'black' }}>
                <Toolbar>

                    <Button
                        id="basic-button1"
                        aria-controls={openUser ? 'basic-menu1' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openUser ? 'true' : undefined}
                        onClick={handleUserClick}
                        sx={{
                            width : 130,
                            color: 'black',
                            '&:hover': {
                                color: 'red',
                            },
                        }}
                    >
                        사용자 목록
                    </Button>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Menu
                        id="basic-menu1"
                        anchorEl={anchorElUser}
                        open={openUser}
                        onClose={handleCloseUser}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button1',
                        }}
                    >
                        <MenuItem onClick={handleCloseUser}>사용자 등록</MenuItem>
                        <MenuItem onClick={handleCloseUser}>사용자 수정</MenuItem>
                        <MenuItem onClick={handleCloseUser}>사용자 삭제</MenuItem>
                        <MenuItem onClick={handleCloseUser}>사용자 검색</MenuItem>
                    </Menu>
                    <Button
                        id="basic-button2"
                        aria-controls={openProduct ? 'basic-menu2' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openProduct ? 'true' : undefined}
                        onClick={handleProductClick}
                        sx={{
                            width : 130,
                            color: 'black',
                            '&:hover': {
                                color: 'red',
                            },
                        }}
                    >
                        상품 목록
                    </Button>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Menu
                        id="basic-menu2"
                        anchorEl={anchorElProduct}
                        open={openProduct}
                        onClose={handleCloseProduct}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button2',
                        }}
                    >
                        <MenuItem onClick={handleCloseProduct}>상품 등록</MenuItem>
                        <MenuItem onClick={handleCloseProduct}>상품 수정</MenuItem>
                        <MenuItem onClick={handleCloseProduct}>상품 삭제</MenuItem>
                        <MenuItem onClick={handleCloseProduct}>상품 검색</MenuItem>
                    </Menu>
                    <Button
                        id="basic-button3"
                        aria-controls={openOrdersheet ? 'basic-menu3' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openOrdersheet ? 'true' : undefined}
                        onClick={handleOrdersheetClick}
                        sx={{
                            width : 130,
                            color: 'black',
                            '&:hover': {
                                color: 'red',
                            },
                        }}
                    >
                        주문서 관리
                    </Button>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Menu
                        id="basic-menu3"
                        anchorEl={anchorElOrdersheet}
                        open={openOrdersheet}
                        onClose={handleCloseOrdersheet}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button3',
                        }}
                    >
                        <MenuItem onClick={handleCloseOrdersheet}>주문서 조회</MenuItem>
                        <MenuItem onClick={handleCloseOrdersheet}>주문서 작성</MenuItem>
                        <MenuItem onClick={handleCloseOrdersheet}>주문서 수정</MenuItem>
                        <MenuItem onClick={handleCloseOrdersheet}>주문서 삭제</MenuItem>
                    </Menu>
                    <Button
                        id="basic-button4"
                        aria-controls={openInventory ? 'basic-menu4' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openInventory ? 'true' : undefined}
                        onClick={handleInventoryClick}
                        sx={{
                            width : 130,
                            color: 'black',
                            '&:hover': {
                                color: 'red',
                            },
                        }}
                    >
                        재고 관리
                    </Button>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Menu
                        id="basic-menu4"
                        anchorEl={anchorElInventory}
                        open={openInventory}
                        onClose={handleCloseInventory}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button4',
                        }}
                    >
                        <MenuItem onClick={handleCloseInventory}>매진상품 예측</MenuItem>
                        <MenuItem onClick={handleCloseInventory}>재고확인 및 수정</MenuItem>
                        <MenuItem onClick={handleCloseInventory}>반품품목 확인</MenuItem>
                        <MenuItem onClick={handleCloseInventory}>납품품목 확인</MenuItem>
                    </Menu>
                    <Button
                        id="basic-button5"
                        aria-controls={openSupplier ? 'basic-menu5' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openSupplier ? 'true' : undefined}
                        onClick={handleSupplierClick}
                        sx={{
                            width : 130,
                            color: 'black',
                            '&:hover': {
                                color: 'red',
                            },
                        }}
                    >
                        공급업체 관리
                    </Button>
                    <Menu
                        id="basic-menu5"
                        anchorEl={anchorElSupplier}
                        open={openSupplier}
                        onClose={handleCloseSupplier}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button5',
                        }}
                    >
                        <MenuItem onClick={handleCloseSupplier}>공급업체 등록</MenuItem>
                        <MenuItem onClick={handleCloseSupplier}>공급업체 조회</MenuItem>
                        <MenuItem onClick={handleCloseSupplier}>공급업체 삭제</MenuItem>
                        <MenuItem onClick={handleCloseSupplier}>공급업체 수정</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
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
                            image={require("./sample/sample1.png")}
                            title="sample1"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CardMedia
                            sx={{ height: 200 }}
                            image={require("./sample/sample1.png")}
                            title="sample1"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CardMedia
                            sx={{ height: 200 }}
                            image={require("./sample/sample1.png")}
                            title="sample1"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CardMedia
                            sx={{ height: 200 }}
                            image={require("./sample/sample1.png")}
                            title="sample1"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CardMedia
                            sx={{ height: 200 }}
                            image={require("./sample/sample1.png")}
                            title="sample1"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <CardMedia
                            sx={{ height: 200 }}
                            image={require("./sample/sample1.png")}
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
            <Grid container spacing={2} sx={{ padding: 2 }}>
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <CardMedia
                                sx={{ height: 400 }}
                                image={require("./sample/sample1.png")}
                                title="sample1"
                            />
                            <Typography gutterBottom variant="h5" component="div">
                                상품이름
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                가격 : 10000원
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <CardMedia
                                sx={{ height: 400 }}
                                image={require("./sample/sample1.png")}
                                title="sample1"
                            />
                            <Typography gutterBottom variant="h5" component="div">
                                상품이름
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                가격 : 10000원
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <CardMedia
                                sx={{ height: 400 }}
                                image={require("./sample/sample1.png")}
                                title="sample1"
                            />
                            <Typography gutterBottom variant="h5" component="div">
                                상품이름
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                가격 : 10000원
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <CardMedia
                                sx={{ height: 400 }}
                                image={require("./sample/sample1.png")}
                                title="sample1"
                            />
                            <Typography gutterBottom variant="h5" component="div">
                                상품이름
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                가격 : 10000원
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <CardMedia
                                sx={{ height: 400 }}
                                image={require("./sample/sample1.png")}
                                title="sample1"
                            />
                            <Typography gutterBottom variant="h5" component="div">
                                상품이름
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                가격 : 10000원
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <CardMedia
                                sx={{ height: 400 }}
                                image={require("./sample/sample1.png")}
                                title="sample1"
                            />
                            <Typography gutterBottom variant="h5" component="div">
                                상품이름
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                가격 : 10000원
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            {/*상품 이동 페이지네이션*/}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Pagination count={10} />
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
