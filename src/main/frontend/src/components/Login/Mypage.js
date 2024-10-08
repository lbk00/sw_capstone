import React, { useState } from 'react';
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
import { Select, MenuItem } from '@mui/material';
import DaumPostcode from 'react-daum-postcode';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';

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


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const sendVerificationCode = () => {
    // TODO: Implement the logic to send the verification code to the user's phone number
    console.log('Sending verification code...');
  };


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {

  const [profileImage, setProfileImage] = useState('');

    const handleImageChange = (e) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    };
  const [address, setAddress] = useState('');
    const [open, setOpen] = useState(false);

    const handleComplete = (data) => {
      let fullAddress = data.address;
      let extraAddress = '';

      if (data.addressType === 'R') {
        if (data.bname !== '') {
          extraAddress += data.bname;
        }
        if (data.buildingName !== '') {
          extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
        }
        fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
      }

      setAddress(fullAddress);
      setOpen(false);
    }

    const sendVerificationCode = () => {
      // TODO: Implement the logic to send the verification code to the user's phone number
      console.log('Sending verification code...');
    };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
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
            회원정보수정
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={6}>
               <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="id"
                  label="아이디"
                  name="id"
                  autoComplete="id"
                />

                <Box mt={1}>
                 <Typography color="text.secondary">
                 수정할 아이디를 입력해 주세요.
                 </Typography>
                </Box>
                </Grid>
               <Grid item xs={12}>
                <TextField
                 required
                 fullWidth
                 id="name"
                 label="이름(실명)"
                 name="name"
                 autoComplete="name"
                 />
                 <Box mt={1}>
                  <Typography color="text.secondary">
                   수정할 실명을 입력해 주세요.
                  </Typography>
                 </Box>
                </Grid>

              <Grid item xs={12}>
               <TextField
                required
                fullWidth
                id="nickname"
                label="닉네임"
                name="nickname"
                autoComplete="nickname"
               />
               <Box mt={1}>
                <Typography color="text.secondary">
                 수정할 닉네임을 입력해주세요.
                </Typography>
               </Box>
              </Grid>

               <Grid item xs={12}>
                 <Grid container spacing={1}>
                   <Grid item xs={4}>
                     <Select
                       required
                       fullWidth
                       id="phonePrefix"
                       name="phonePrefix"
                       defaultValue="010"
                     >
                       <MenuItem value="010">010</MenuItem>
                       <MenuItem value="011">011</MenuItem>
                       <MenuItem value="016">016</MenuItem>
                       <MenuItem value="017">017</MenuItem>
                       <MenuItem value="018">018</MenuItem>
                       <MenuItem value="019">019</MenuItem>
                     </Select>
                   </Grid>
                   <Grid item xs={8}>
                     <TextField
                       required
                       fullWidth
                       id="phone"
                       label="휴대폰 번호"
                       name="phone"
                       autoComplete="phone"
                     />
                   </Grid>
                   <Box mt={1}>
                    <Typography color="text.secondary">
                     수정할 휴대폰 번호를 입력하세요.
                    </Typography>
                   </Box>
                 </Grid>
                 <Box mt={1}>
                   <Button
                     variant="contained"
                     color="primary"
                     onClick={sendVerificationCode} // 인증번호를 보내는 함수
                   >
                     인증하기
                   </Button>
                 </Box>
                 <Box mt={1}>
                   <TextField
                     required
                     fullWidth
                     id="verificationCode"
                     label="인증번호"
                     name="verificationCode"
                   />
                 </Box>
               </Grid>

               <Grid item xs={12}>
                 <TextField
                   required
                   fullWidth
                   name="password"
                   label="비밀번호"
                   type="password"
                   id="password"
                   autoComplete="new-password"
                 />
                 <Box mt={1}>
                  <Typography color="text.secondary">
                   영문,숫자를 포함한 6자 이상의 수정할 비밀번호를 입력하세요.
                  </Typography>
                 </Box>
               </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="비밀번호 확인"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                />
                <Box mt={1}>
                  <Typography color="text.secondary">
                    다시 한번 비밀번호를 입력하세요.
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="이메일"
                  name="email"
                  autoComplete="email"
                />
                <Box mt={1}>
                 <Typography color="text.secondary">
                  수정할 이메일을 입력하세요
                 </Typography>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box mt={1}>
                  <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                    우편번호 검색
                  </Button>
                  <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle>우편번호 검색</DialogTitle>
                    <DialogContent>
                      <DaumPostcode onComplete={handleComplete} />
                    </DialogContent>
                  </Dialog>
                </Box>
                <Box mt={2}>
                  <TextField
                    required
                    fullWidth
                    id="address"
                    label="기본 주소"
                    name="address"
                    value={address}
                    autoComplete="address"
                  />

                </Box>
                <Box mt={1}>
                 <TextField
                  required
                  fullWidth
                  id="address"
                  label="상세 주소"
                  name="address"
                  autoComplete="address"
                 />
                </Box>

              </Grid>
              <Grid item xs={12}>
                    <input
                      accept="image/*"
                      type="file"
                      onChange={handleImageChange}
                    />
                    {profileImage && (
                      <img src={profileImage} alt="프로필 이미지" style={{ width: 100, height: 100 }} />
                    )}
                  </Grid>


            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              회원정보 수정 완료
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  이미 아이디가 있으신가요? 로그인하러 가기
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}