import * as React from "react";
import Title from "./Title";
import Link from "@mui/material/Link";
import {
    Text,
    Typography,
    Paper,
    Box,
    Modal,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Card, Stack, Divider, Chip
} from '@mui/material';

export default function Explain() {
    return (
        <div>
            <Typography>관리자 메뉴 내비게이션</Typography>
            <hr style={{marginLeft: 0}}/>
            <Card variant="outlined" sx={{ maxWidth: 1550 }}>
                <Box sx={{ p: 2 }}>
                    <Stack
                        direction="row"
                        sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                    >
                        <Typography gutterBottom variant="h5" component="div" sx={{ ml : 10}}>
                            주문서 관리
                        </Typography>
                    </Stack>
                    <Divider textAlign="left"sx={{ width: 600 , ml : 10}} >기능</Divider>
                    <Typography variant="body1" sx={{ ml : 10}}>
                        모든 주문서 조회 및 특정 상태의 주문서 조회 / 주문서 수정 / 주문서 삭제 / 주문서 주문
                    </Typography>
                </Box>
                <Divider />
            </Card>
            <Card variant="outlined" sx={{ maxWidth: 1550 }}>
                <Box sx={{ p: 2 }}>
                    <Stack
                        direction="row"
                        sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                    >
                        <Typography gutterBottom variant="h5" component="div" sx={{ ml : 10}}>
                            공급업체 관리
                        </Typography>
                    </Stack>
                    <Divider textAlign="left"sx={{ width: 600 , ml : 10}} >기능</Divider>
                    <Typography variant="body1" sx={{ ml : 10}}>
                        공급업체 등록 : 새로운 공급업체 정보 입력 및 등록
                    </Typography>
                    <Typography variant="body1" sx={{ ml : 10}}>
                        공급업체 조회 : 모든 공급업체 정보 조회
                    </Typography>
                    <Typography variant="body1" sx={{ ml : 10}}>
                        공급업체 수정 : 선택한 공급업체 정보 수정
                    </Typography>
                    <Typography variant="body1" sx={{ ml : 10}}>
                        공급업체 삭제 : 선택한 공급업체 정보 삭제
                    </Typography>
                </Box>
                <Divider />
            </Card>
            <Card variant="outlined" sx={{ maxWidth: 1550 }}>
                <Box sx={{ p: 2 }}>
                    <Stack
                        direction="row"
                        sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                    >
                        <Typography gutterBottom variant="h5" component="div" sx={{ ml : 10}}>
                            사용자 관리
                        </Typography>
                    </Stack>
                    <Divider textAlign="left"sx={{ width: 600 , ml : 10}} >기능</Divider>
                    <Typography variant="body1" sx={{ ml : 10}}>
                        사용자 목록 : 현재 쇼핑몰의 관리자 정보 조회
                    </Typography>
                </Box>
                <Divider />
            </Card>
            <Card variant="outlined" sx={{ maxWidth: 1550 }}>
                <Box sx={{ p: 2 }}>
                    <Stack
                        direction="row"
                        sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                    >
                        <Typography gutterBottom variant="h5" component="div" sx={{ ml : 10}}>
                            재고 관리
                        </Typography>
                    </Stack>
                    <Divider textAlign="left"sx={{ width: 600 , ml : 10}} >기능</Divider>
                    <Typography variant="body1" sx={{ ml : 10}}>
                        재고 확인 및 수정 : 현재 쇼핑몰의 상품 재고 리스트 조회 및 수정
                    </Typography>
                    <Typography variant="body1" sx={{ ml : 10}}>
                        반품 품목 확인 : 반품 처리된 상품들의 리스트 조회
                    </Typography>
                    <Typography variant="body1" sx={{ ml : 10}}>
                        납품 품목 확인 : 납품 처리된 상품들의 리스트 조회
                    </Typography>
                </Box>
                <Divider />
            </Card>
            <Card variant="outlined" sx={{ maxWidth: 1550 }}>
                <Box sx={{ p: 2 }}>
                    <Stack
                        direction="row"
                        sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                    >
                        <Typography gutterBottom variant="h5" component="div" sx={{ ml : 10}}>
                            상품 관리
                        </Typography>
                    </Stack>
                    <Divider textAlign="left"sx={{ width: 600 , ml : 10}} >기능</Divider>
                    <Typography variant="body1" sx={{ ml : 10}}>
                        상품 등록 : 새로운 상품 정보 입력 및 등록
                    </Typography>
                    <Typography variant="body1" sx={{ ml : 10}}>
                        상품 조회 : 모든 상품 정보 조회
                    </Typography>
                    <Typography variant="body1" sx={{ ml : 10}}>
                        상품 수정 : 선택한 상품 정보 수정
                    </Typography>
                    <Typography variant="body1" sx={{ ml : 10}}>
                        상품 삭제 : 선택한 상품 정보 삭제
                    </Typography>
                </Box>
                <Divider />
            </Card>
            <Card variant="outlined" sx={{ maxWidth: 1550 }}>
                <Box sx={{ p: 2 }}>
                        <Typography sx={{ ml : 10}}>주문서는 수요일 밤 12:00 에 갱신</Typography>
                        <Typography sx={{ ml : 10}}>수요예측시 현재 상품의 재고를 입력값으로 사용</Typography>

                    </Box>
            </Card>
        </div>
    );
}