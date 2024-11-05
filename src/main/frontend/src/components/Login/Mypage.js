import React, {useEffect, useState} from 'react';
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
import {Select, MenuItem, DialogContentText, DialogActions} from '@mui/material';
import DaumPostcode from 'react-daum-postcode';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import axios from "axios";
import { useLocation } from 'react-router-dom';

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

export default function Mypage() {

  const [profileImage, setProfileImage] = useState('');
    const location = useLocation();
    const { user } = location.state || {};
    const handleOpen = () => setOpen(true); // 모달창을 열기 위한 함수를 생성합니다.
    const handleClose = () => setOpen(false); // 모달창을 닫기 위한 함수를 생성합니다.

    const handleUpdate = async (event) => {
        event.preventDefault();

        // 폼 데이터를 가져오기
        const formData = new FormData(event.currentTarget);
        // 객체의 순서를 유지하기 위해 배열을 사용
        const updatedUserInfo = {
            user_Id: user.user_Id, // user_Id
            cid: formData.get('id') || user.cid, // cid
            cpw: formData.get('password') || user.cpw, // cpw
            cname: formData.get('name') || user.cname, // cname
            cgender: formData.get('gender') || user.cgender, // cgender
            cbirthDate: formData.get('birthDate') || user.cbirthDate, // cbirthDate
            ctel: formData.get('phonePrefix') + formData.get('phone'), // ctel
            cemail: formData.get('email') || user.cemail, // cemail
            cadr: formData.get('fullAddress') || user.cadr, // cadr
            cprofileImage: profileImage || user.cprofileImage, // cprofileImage
            role: user.role // role
        };

        // 순서가 보장된 JSON 문자열 생성
        const jsonString = JSON.stringify({
            user_Id: updatedUserInfo.user_Id,
            cid: updatedUserInfo.cid,
            cpw: updatedUserInfo.cpw,
            cname: updatedUserInfo.cname,
            cgender: updatedUserInfo.cgender,
            cbirthDate: updatedUserInfo.cbirthDate,
            ctel: updatedUserInfo.ctel,
            cemail: updatedUserInfo.cemail,
            cadr: updatedUserInfo.cadr,
            cprofileImage: updatedUserInfo.cprofileImage,
            role: updatedUserInfo.role
        });

        try {
            // PUT 요청으로 회원 정보 수정
            const response = await axios.put(`http://localhost:8080/api/user/${user.user_Id}`, jsonString, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                alert('회원정보가 수정되었습니다.');
            } else {
                alert('회원정보 수정에 실패했습니다.');
            }
        } catch (error) {
            console.error('회원정보 수정 에러:', error);
            alert('회원정보 수정 중 오류가 발생했습니다.');
        }
    };

    // 사용자 삭제
    const userDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/user/${id}`);
            alert('삭제가 완료되었습니다.');
        } catch (error) {
            console.error('삭제 중 오류가 발생했습니다:', error);
        }
    };

    const handleDelete = () => {
        userDelete(user.user_Id); // 삭제 함수 호출
        handleClose(); // 모달 닫기
    };


    const handleImageChange = (e) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    };

  const [address, setAddress] = useState('');
    const [open, setOpen] = useState(false);
    const [openAdr, setOpenAdr] = useState(false);
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
                회원정보
            </Typography>
            <Box component="form" noValidate onSubmit={handleUpdate} sx={{ mt: 3 }}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="id"
                            label="아이디"
                            name="id"
                            autoComplete="id"
                            defaultValue={user.cid}
                        />
                        <Box mt={1}>
                            <Typography color="text.secondary">수정할 아이디를 입력해 주세요.</Typography>
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
                            defaultValue={user.cname}
                        />
                        <Box mt={1}>
                            <Typography color="text.secondary">수정할 이름을 입력해 주세요.</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography component="legend">성별</Typography>
                        <Button value="M" name="gender">남</Button>
                        <Button value="F" name="gender">여</Button>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <Select required fullWidth id="phonePrefix" name="phonePrefix" defaultValue="010">
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
                                    defaultValue={user.ctel ? user.ctel.substring(3) : ''}
                                />
                            </Grid>
                            <Box mt={1}>
                                <Typography color="text.secondary">수정할 휴대폰 번호를 입력하세요.</Typography>
                            </Box>
                        </Grid>
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
                            <Typography color="text.secondary">영문, 숫자를 포함한 6자 이상의 비밀번호를 입력하세요.</Typography>
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
                            <Typography color="text.secondary">다시 한번 비밀번호를 입력하세요.</Typography>
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
                            defaultValue={user.cemail}
                        />
                        <Box mt={1}>
                            <Typography color="text.secondary">수정할 이메일을 입력하세요</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box mt={1}>
                            <Button variant="contained" color="primary" onClick={() => setOpenAdr(true)}>
                                우편번호 검색
                            </Button>
                            <Dialog open={openAdr} onClose={() => setOpenAdr(false)}>
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
                                defaultValue={user.cadr}
                            />
                        </Box>
                        <Box mt={1}>
                            <TextField
                                required
                                fullWidth
                                id="detailAddress"
                                label="상세 주소"
                                name="detailAddress"
                                autoComplete="address"
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <input accept="image/*" type="file" onChange={handleImageChange} />
                        {profileImage && <img src={profileImage} alt="프로필 이미지" style={{ width: 100, height: 100 }} />}
                    </Grid>
                </Grid>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    회원정보 수정 완료
                </Button>
          </Box>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleOpen} // 모달 열기
            >
                회원탈퇴하기
            </Button>
            {/* 삭제 확인 모달 */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>회원 탈퇴</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        정말 탈퇴하시겠습니까?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDelete} color="primary" autoFocus>
                        예
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        아니오
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}