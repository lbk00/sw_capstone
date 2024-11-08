import * as React from "react";
import { useState } from "react";
import {
    Typography,
    Card,
    Box,
    Stack,
    Divider,
    Container,
    Grid,
    ThemeProvider,
    createTheme,
    IconButton
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const theme = createTheme({
    typography: {
        fontFamily: 'Arial, sans-serif',
        h4: {
            fontSize: '2rem',
            fontWeight: 'bold',
        },
        h5: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
        },
        body1: {
            fontSize: '1.2rem',
        },
        body2: {
            fontSize: '1rem',
        },
    },
});

export default function Explain() {
    const [hoveredCard, setHoveredCard] = useState(null);

    const handleMouseEnter = (index) => {
        setHoveredCard(index);
    };

    const handleMouseLeave = () => {
        setHoveredCard(null);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Typography variant="h4" gutterBottom align="center">
                    관리자 메뉴 내비게이션
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Card
                            variant="outlined"
                            sx={{
                                boxShadow: 3,
                                height: 300,
                                backgroundColor: hoveredCard === 0 ? '#f0f0f0' : 'white',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s',
                            }}
                            onMouseEnter={() => handleMouseEnter(0)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Box sx={{ p: 3 }}>
                                <Stack direction="column" spacing={2}>
                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography variant="h5" component="div">주문서 관리</Typography>
                                        <IconButton sx={{ p: 0 }}>
                                            <AssignmentIcon sx={{ fontSize: 30 }} />
                                        </IconButton>
                                    </Stack>
                                    <Divider textAlign="left">기능</Divider>
                                    <Typography variant="body1">
                                        모든 주문서 조회 및 특정 상태의 주문서 조회 / 주문서 수정 / 주문서 삭제 / 주문서 주문
                                    </Typography>
                                </Stack>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card
                            variant="outlined"
                            sx={{
                                boxShadow: 3,
                                height: 300,
                                backgroundColor: hoveredCard === 1 ? '#f0f0f0' : 'white',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s',
                            }}
                            onMouseEnter={() => handleMouseEnter(1)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Box sx={{ p: 3 }}>
                                <Stack direction="column" spacing={2}>
                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography variant="h5" component="div">공급업체 관리</Typography>
                                        <IconButton sx={{ p: 0 }}>
                                            <BusinessIcon sx={{ fontSize: 30 }} />
                                        </IconButton>
                                    </Stack>
                                    <Divider textAlign="left">기능</Divider>
                                    <Typography variant="body1">
                                        공급업체 등록 : 새로운 공급업체 정보 입력 및 등록
                                    </Typography>
                                    <Typography variant="body1">
                                        공급업체 조회 : 모든 공급업체 정보 조회
                                    </Typography>
                                    <Typography variant="body1">
                                        공급업체 수정 : 선택한 공급업체 정보 수정
                                    </Typography>
                                    <Typography variant="body1">
                                        공급업체 삭제 : 선택한 공급업체 정보 삭제
                                    </Typography>
                                </Stack>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card
                            variant="outlined"
                            sx={{
                                boxShadow: 3,
                                height: 300,
                                backgroundColor: hoveredCard === 2 ? '#f0f0f0' : 'white',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s',
                            }}
                            onMouseEnter={() => handleMouseEnter(2)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Box sx={{ p: 3 }}>
                                <Stack direction="column" spacing={2}>
                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography variant="h5" component="div">사용자 관리</Typography>
                                        <IconButton sx={{ p: 0 }}>
                                            <PeopleIcon sx={{ fontSize: 30 }} />
                                        </IconButton>
                                    </Stack>
                                    <Divider textAlign="left">기능</Divider>
                                    <Typography variant="body1">
                                        사용자 목록 : 현재 쇼핑몰의 관리자 정보 조회
                                    </Typography>
                                </Stack>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card
                            variant="outlined"
                            sx={{
                                boxShadow: 3,
                                height: 300,
                                backgroundColor: hoveredCard === 3 ? '#f0f0f0' : 'white',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s',
                            }}
                            onMouseEnter={() => handleMouseEnter(3)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Box sx={{ p: 3 }}>
                                <Stack direction="column" spacing={2}>
                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography variant="h5" component="div">재고 관리</Typography>
                                        <IconButton sx={{ p: 0 }}>
                                            <InventoryIcon sx={{ fontSize: 30 }} />
                                        </IconButton>
                                    </Stack>
                                    <Divider textAlign="left">기능</Divider>

                                    <Typography variant="body1">
                                        반품 품목 확인 : 반품 처리된 상품들의 리스트 조회
                                    </Typography>
                                    <Typography variant="body1">
                                        납품 품목 확인 : 납품 처리된 상품들의 리스트 조회
                                    </Typography>
                                </Stack>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card
                            variant="outlined"
                            sx={{
                                boxShadow: 3,
                                height: 300,
                                backgroundColor: hoveredCard === 4 ? '#f0f0f0' : 'white',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s',
                            }}
                            onMouseEnter={() => handleMouseEnter(4)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Box sx={{ p: 3 }}>
                                <Stack direction="column" spacing={2}>
                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography variant="h5" component="div">상품 관리</Typography>
                                        <IconButton sx={{ p: 0 }}>
                                            <ShoppingCartIcon sx={{ fontSize: 30 }} />
                                        </IconButton>
                                    </Stack>
                                    <Divider textAlign="left">기능</Divider>
                                    <Typography variant="body1">
                                        상품 등록 : 새로운 상품 정보 입력 및 등록
                                    </Typography>
                                    <Typography variant="body1">
                                        상품 조회 : 모든 상품 정보 조회
                                    </Typography>
                                    <Typography variant="body1">
                                        상품 수정 : 선택한 상품 정보 수정
                                    </Typography>
                                    <Typography variant="body1">
                                        상품 삭제 : 선택한 상품 정보 삭제
                                    </Typography>
                                </Stack>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card
                            variant="outlined"
                            sx={{
                                boxShadow: 3,
                                height: 150,
                                backgroundColor: hoveredCard === 5 ? '#f0f0f0' : 'white',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s',
                            }}
                            onMouseEnter={() => handleMouseEnter(5)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Box sx={{ p: 3 }}>
                                <Stack direction="column" spacing={2}>
                                    <Typography variant="body2" align="center">
                                        주문서는 수요일 밤 12:00 에 갱신됩니다.
                                    </Typography>
                                    <Typography variant="body2" align="center">
                                        수요예측시 현재 상품의 재고를 입력값으로 사용합니다.
                                    </Typography>
                                </Stack>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}