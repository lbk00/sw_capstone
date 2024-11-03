import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
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
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

export default function SignUp() {
  const [user, setUser] = useState({
    cid: '',
    cname: '',
    cgender: '',
    ctel: '',
    cpw: '',
    cemail: '',
    cadr: '',
    cprofileimage: '',
    role: 1, // Default role is 1 (user)
  });

  const [supplier, setSupplier] = useState({
    sid: '',
    sname: '',
    sgender: '',
    stel: '',
    spw: '',
    semail: '',
    sadr: '',
    sprofileimage: '',
    role: 2, // Default role is 2 (supplier)
  });

  const [openModal, setOpenModal] = useState(false);
  const [profileImage, setProfileImage] = useState('');
  const [address, setAddress] = useState('');
  const [open, setOpen] = useState(false);
  const [specialCode, setSpecialCode] = useState('');
  const [isSupplier, setIsSupplier] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsSupplier(specialCode === 'ftqchblbahstrspt');
  }, [specialCode]);

  const submitUser = (data) => {
    const endpoint = isSupplier ? 'supplier' : 'user';
    axios.post(`http://localhost:8080/api/${endpoint}/signup`, data)
      .then(response => {
        console.log(response);
        setOpenModal(true);
        setTimeout(() => {
          navigate('/signin');
        }, 2000); // Navigate to /signin after 2 seconds
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSupplier) {
      submitUser(supplier);
    } else {
      submitUser(user);
    }
  };

  const handleImageChange = (e) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
      if (isSupplier) {
        setSupplier({ ...supplier, sProfileImage: reader.result });
      } else {
        setUser({ ...user, cprofileimage: reader.result });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

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
    if (isSupplier) {
      setSupplier({ ...supplier, sAdr: fullAddress });
    } else {
      setUser({ ...user, cadr: fullAddress });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isSupplier) {
      setSupplier({ ...supplier, [name]: value });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleGenderChange = (gender) => {
    if (isSupplier) {
      setSupplier({ ...supplier, sGender: gender });
    } else {
      setUser({ ...user, cgender: gender });
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
            회원 가입
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={6}>
              {isSupplier ? (
                <>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="sid"
                      label="아이디"
                      name="sid"
                      autoComplete="sid"
                      onChange={handleChange}
                    />
                    <Box mt={1}>
                      <Typography color="text.secondary">
                        영문, 숫자의 조합으로 4~12자리로 입력해주세요.
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="sname"
                      label="이름(실명)"
                      name="sname"
                      autoComplete="sname"
                      onChange={handleChange}
                    />
                    <Box mt={1}>
                      <Typography color="text.secondary">
                        실명을 입력해 주세요.
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography component="legend">성별</Typography>
                    <Button
                      variant={supplier.sGender === '남' ? 'contained' : 'outlined'}
                      onClick={() => handleGenderChange('남')}
                    >
                      남
                    </Button>
                    <Button
                      variant={supplier.sGender === '여' ? 'contained' : 'outlined'}
                      onClick={() => handleGenderChange('여')}
                    >
                      여
                    </Button>
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
                          onChange={handleChange}
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
                          id="stel"
                          label="휴대폰번호"
                          name="stel"
                          autoComplete="stel"
                          onChange={handleChange}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="spw"
                      label="비밀번호"
                      type="password"
                      id="spw"
                      autoComplete="new-password"
                      onChange={handleChange}
                    />
                    <Box mt={1}>
                      <Typography color="text.secondary">
                        영문,숫자를 포함한 6자 이상의 비밀번호를 입력하세요.
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
                      onChange={handleChange}
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
                      id="semail"
                      label="이메일"
                      name="semail"
                      autoComplete="semail"
                      onChange={handleChange}
                    />
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
                        id="sadr"
                        label="기본 주소"
                        name="sadr"
                        value={address}
                        autoComplete="sadr"
                        onChange={handleChange}
                      />
                    </Box>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="cid"
                      label="아이디"
                      name="cid"
                      autoComplete="cid"
                      onChange={handleChange}
                    />
                    <Box mt={1}>
                      <Typography color="text.secondary">
                        영문, 숫자의 조합으로 4~12자리로 입력해주세요.
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="cname"
                      label="이름(실명)"
                      name="cname"
                      autoComplete="cname"
                      onChange={handleChange}
                    />
                    <Box mt={1}>
                      <Typography color="text.secondary">
                        실명을 입력해 주세요.
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography component="legend">성별</Typography>
                    <Button
                      variant={user.cgender === '남' ? 'contained' : 'outlined'}
                      onClick={() => handleGenderChange('남')}
                    >
                      남
                    </Button>
                    <Button
                      variant={user.cgender === '여' ? 'contained' : 'outlined'}
                      onClick={() => handleGenderChange('여')}
                    >
                      여
                    </Button>
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
                          onChange={handleChange}
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
                          id="ctel"
                          label="휴대폰번호"
                          name="ctel"
                          autoComplete="ctel"
                          onChange={handleChange}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="cpw"
                      label="비밀번호"
                      type="password"
                      id="cpw"
                      autoComplete="new-password"
                      onChange={handleChange}
                    />
                    <Box mt={1}>
                      <Typography color="text.secondary">
                        영문,숫자를 포함한 6자 이상의 비밀번호를 입력하세요.
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
                      onChange={handleChange}
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
                      id="cemail"
                      label="이메일"
                      name="cemail"
                      autoComplete="cemail"
                      onChange={handleChange}
                    />
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
                        id="cadr"
                        label="기본 주소"
                        name="cadr"
                        value={address}
                        autoComplete="cadr"
                        onChange={handleChange}
                      />
                    </Box>
                    <Box mt={1}>
                      <TextField
                        required
                        fullWidth
                        id="c_adr"
                        label="상세 주소"
                        name="c_adr"
                        autoComplete="c_adr"
                        onChange={handleChange}
                      />
                    </Box>
                  </Grid>
                </>
              )}
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

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="specialCode"
                  label="Special Code"
                  name="specialCode"
                  autoComplete="special-code"
                  onChange={(e) => setSpecialCode(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              회원가입 하기
            </Button>
            <Dialog open={openModal} onClose={() => setOpenModal(false)}>
              <DialogTitle>회원가입이 성공하였습니다.</DialogTitle>
            </Dialog>
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