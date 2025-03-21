
import React, { useState , useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { MainListItems } from './listItems';
import { Routes, Route } from 'react-router-dom';
import ListComponent from '../Manager/ListComponent';
//import ListComponent from '../Order/ListComponent';
import ReadComponent from '../Manager/ReadComponent';
import useCustomMove from '../../hooks/useCustomMove';
import { Outlet } from 'react-router-dom';


import Deposits from './Deposits';
import Avatar from '@mui/material/Avatar';
import ManagerRead from '../Manager/ReadPage';

import AddPage from '../Manager/AddPage'; // AddPage 컴포넌트를 import 합니다.
import SupplierListPage from '../Manager/ListPage';
import UserListPage from '../User/ListPage';
import OrderListPage from '../Order/ListPage';
import ProductListPage from '../Product/ListPage';
import DeliveryProductListPage from '../Order/DeliveryProductListComponent';
import ReturnProductListPage from '../Order/ReturnProductListComponent';
import Explain from './Explain';
import axios from "axios"; // ListPage 컴포넌트를 import 합니다.


function Copyright(props) {
  return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
  );
}



const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: theme.palette.primary.main,
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
      '& .MuiDrawer-paper > .admin-profile': { // 추가된 스타일
        display: open ? 'block' : 'none',
      },
      '& .MuiDrawer-paper > *': {
        overflowX: 'visible',
      },
    }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
    // 현재 페이지를 나타내주는 변수 0 : 기본 / 1 : 주문서 관리 / 2:
    const [statePage, setStatePage] = useState(1);



    const [user, setUser] = useState(null);
  const [open, setOpen] = React.useState(true);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { moveToRead } = useCustomMove(); // useCustomMove 훅에서 moveToRead 함수를 가져옵니다.
  const handleRowClick = (userId) => {
    moveToRead(userId); // moveToRead 함수를 호출합니다.
    console.log(selectedUserId);
  };
  const { userId } = useParams();

  const toggleDrawer = () => {
    setOpen(!open);
  };
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
                console.error("사용자 정보 가져오기 오류:", error);
            }
        };

        fetchUser();
    }, []);

  {/* 알림 설정 */}
  const [alarmOpen, setAlarmOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, function (frame) {
      console.log('Connected: ' + frame);

      stompClient.subscribe('/topic/notifications', function (message) {
        console.log('Received message:', message.body);
        setNotificationCount(prevCount => prevCount + 1);
        setMessages(prevMessages => [...prevMessages, message.body]); // 메시지 저장
      });
    });

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);

  const handleAlarmOpen = () => {
    setAlarmOpen(true);
  };

  const handleAlarmClose = () => {
    setAlarmOpen(false);
    setNotificationCount(0); // 알림 확인 시 카운트 초기화
    setMessages([]); // 메시지 초기화 (원하는 경우)
  };


  {/**/}
  return (
      <>


        <ThemeProvider theme={defaultTheme}>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="absolute" open={open}>
              <Toolbar
                  sx={{
                    pr: '24px', // keep right padding when drawer closed
                  }}
              >
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    sx={{
                      marginRight: '36px',
                      ...(open && { display: 'none' }),
                    }}
                >
                  <MenuIcon />
                </IconButton>
                  <Typography
                      component="h1"
                      variant="h6"
                      color="inherit"
                      noWrap
                      sx={{ flexGrow: 1, cursor: 'pointer' }} // 클릭 커서 스타일 추가
                      onClick={() => setStatePage(0)} // 클릭 이벤트 핸들러 추가
                  >
                      Dashboard
                  </Typography>
                {/*주문서 생성 알림*/}
                <IconButton color="inherit" onClick={handleAlarmOpen}>
                  <Badge badgeContent={notificationCount} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <Dialog
                    open={alarmOpen}
                    onClose={handleAlarmClose}
                    PaperProps={{
                      style: {
                        position: 'absolute',
                        top: '20px', // 버튼 바로 아래 위치 조정
                        right: '1px', // 오른쪽 위치 조정
                        transform: 'translateX(0)', // 기본 위치
                      },
                    }}
                    BackdropProps={{ invisible: true }} // 배경 어두운 효과 끄기
                >
                  <DialogTitle>알림</DialogTitle>
                  <DialogContent>
                    {messages.length === 0 ? (
                        <Typography>현재 알림이 없습니다.</Typography>
                    ) : (
                        messages.map((msg, index) => (
                            <Typography key={index}>{msg}</Typography>
                        ))
                    )}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleAlarmClose}>닫기</Button>
                  </DialogActions>
                </Dialog>
                {/**/}
              </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
              <Toolbar
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                  }}
              >
              </Toolbar>
              <Divider />
              <List component="nav">
                  {/*관리자 메뉴*/}
                  <MainListItems user={user} statePage={statePage} setStatePage={setStatePage} />
                <Divider sx={{ my: 1 }} />
              </List>
            </Drawer>
            <Box
                component="main"
                sx={{
                  backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                          ? theme.palette.grey[100]
                          : theme.palette.grey[900],
                  flexGrow: 1,
                  height: '100vh',
                  overflow: 'auto',
                }}
            >
              <Toolbar />
              <Container maxWidth="lg" sx={{ ml:4, mt: 4, mb: 4 }}>
                      {/*서브메뉴 클릭시 변경되는 페이지*/}
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column',height : 'flex' , width: 1550 }}>
                        {/*statePage가 변경될때마다 구성내용 변경*/}
                        {statePage === 1 ? (
                            <OrderListPage/> // statePage가 1일 때
                        ) : statePage === 2 ? (
                            <SupplierListPage/> // statePage가 2일 때
                        )  : statePage === 3 ? (
                            <UserListPage/> // statePage가 3일 때
                        ) : statePage === 5 ? (
                           <ProductListPage/> // statePage가 4일 때
                        ) : statePage === 6 ? (
                           <DeliveryProductListPage/>
                        ) : statePage === 7 ? (
                           <ReturnProductListPage/>
                        ) : ( // statePage가 0일 때
                            <Explain/>
                  )}

              </Paper>
                {/*
                      <Routes>
                        <Route path="/add" element={<AddPage />} />
                        <Route path="/list" element={<OrderListPage />} />
                        <Route path="*" element={<Outlet />} />
                      </Routes>
                      */}

              </Container>
            </Box>
          </Box>
        </ThemeProvider>
      </>
  );
}