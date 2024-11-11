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
    IconButton,
    Paper,
    CardMedia
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
            <Container sx={{ backgroundColor: '#f5f5f5', py: 5 }}>
                <Typography variant="h4" gutterBottom align="center">
                    관리자 메뉴 내비게이션
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Paper
                            elevation={hoveredCard === 0 ? 6 : 3}
                            sx={{
                                height: 650,
                                p: 3
                            }}
                            onMouseEnter={() => handleMouseEnter(0)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Stack direction="column" spacing={2}>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="h5" component="div">납품 주문서 관리</Typography>
                                    <IconButton sx={{ p: 0 }}>
                                        <AssignmentIcon sx={{ fontSize: 30 }} />
                                    </IconButton>
                                </Stack>
                                <Divider textAlign="left">기능</Divider>
                                <CardMedia
                                    component="img"
                                    sx={{

                                        width: '100%',
                                        objectFit: 'cover',
                                    }}
                                    image={require('../../sample/주문서.png')}
                                    title="주문서 관리"
                                />
                                <Typography variant="body1" component="div" whiteSpace="pre-line">
                                    주문서 등록 : 새로운 주문서 정보 입력 및 등록{"\u00A0".repeat(30)}
                                    주문서 조회 : 모든 주문서 정보 조회{"\n"}
                                    주문서 수정 및 삭제 : 선택한 주문서 정보 수정 및 삭제
                                </Typography>
                                <Typography sx={{ color: "gray" }} variant="body2" component="div" whiteSpace="pre-line">
                                    참고사항 - 주문서는 수요일 밤 12:00 에 갱신됩니다.{"\n"}{"\u00A0".repeat(15)}
                                    - 수요예측시 현재 상품의 재고를 입력값으로 사용합니다.
                                </Typography>
                            </Stack>
                        </Paper>
                    </Grid>
                    {[
                        { title: "공급업체 관리", icon: <BusinessIcon sx={{ fontSize: 30 }} />, description: "공급업체 등록 : 새로운 공급업체 정보 입력 및 등록\n공급업체 조회 : 모든 공급업체 정보 조회\n공급업체 수정 및 삭제 : 선택한 공급업체 정보 수정 및 삭제"},
                        { title: "반품 및 납품 관리", icon: <InventoryIcon sx={{ fontSize: 30 }} />, description: "반품 품목 조회 : 반품 진행 중인 상품들의 리스트 조회\n납품 품목 조회 : 납품 처리된 상품들의 리스트 조회" },
                        { title: "재고 관리", icon: <ShoppingCartIcon sx={{ fontSize: 30 }} />, description: "상품 등록 : 새로운 상품 정보 입력 및 등록\n상품 조회 : 모든 상품 정보 조회\n상품 수정 및 삭제 : 선택한 상품 정보 수정 및 삭제" },
                        { title: "사용자 관리", icon: <PeopleIcon sx={{ fontSize: 30 }} />, description: "사용자 조회 : 현재 쇼핑몰의 고객 및 관리자 정보 조회" },
                    ].map((item, index) => (
                        <Grid item xs={12} md={6} key={index + 1}>
                            <Paper
                                elevation={hoveredCard === index + 1 ? 6 : 3}
                                sx={{
                                    height: item.icon ? 250 : 150,
                                    p: 3
                                }}
                                onMouseEnter={() => handleMouseEnter(index + 1)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <Stack direction="column" spacing={2}>
                                    {item.icon && (
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="h5" component="div">{item.title}</Typography>
                                            <IconButton sx={{ p: 0 }}>
                                                {item.icon}
                                            </IconButton>
                                        </Stack>
                                    )}
                                    <Divider textAlign="left">기능</Divider>
                                    <Typography variant="body1" component="div" whiteSpace="pre-line">
                                        {item.description}
                                    </Typography>
                                </Stack>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </ThemeProvider>
    );
}