import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

import axios from 'axios'; // axios를 사용하여 API 요청
import { Dialog, DialogTitle } from '@mui/material'; // 모달창 컴포넌트

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

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅
  const [openModal, setOpenModal] = React.useState(false); // 모달창 상태 관리

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const cID = data.get('id'); // 아이디
    const cPW = data.get('password'); // 비밀번호

    // 로그인 API 호출
    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        cID,
        cPW,
      });

      if (response.data.success) { // 로그인 성공 여부 확인
        setOpenModal(true); // 모달창 열기
        setTimeout(() => {
          navigate('/homeuser'); // 홈 페이지로 이동
        }, 2000); // 2초 후에 이동
      } else {
        alert('로그인 실패: ' + response.data.message); // 로그인 실패 메시지
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      alert('로그인 중 오류 발생'); // 오류 메시지
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="id"
              label="아이디"
              name="id"
              autoComplete="id"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="아이디 기억하기"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              로그인
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  비밀번호를 잊으셨나요?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"계정이 없으신가요? 회원가입하기"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />

        {/* 로그인 성공 모달 */}
        <Dialog open={openModal} onClose={() => setOpenModal(false)}>
          <DialogTitle>로그인 성공입니다!</DialogTitle>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}
