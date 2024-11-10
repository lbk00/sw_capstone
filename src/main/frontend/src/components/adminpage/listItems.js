import React, { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Inventory from '@mui/icons-material/Inventory'; // Added this line
import Store from '@mui/icons-material/Store'; // Added this line
import { Link } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import ListPage from '../Order/ListPage';
import Button from '@mui/material/Button';
import AddPage from "../Order/AddPage";
import AddPageSupplier from "../Manager/AddPage";
import AddPageProduct from "../Product/AddPage";

export const MainListItems = ({ user ,statePage, setStatePage }) => {
  const [openOrder, setOpenOrder] = React.useState(false);
  const [openSupplier, setOpenSupplier] = React.useState(false);
  const [openUser, setOpenUser] = React.useState(false);
  const [openInventory, setOpenInventory] = React.useState(false);
  const [openProduct, setOpenProduct] = React.useState(false);
  const [openDeliveryProduct, setOpenDeliveryProduct] = React.useState(false);
  const [openReturnProduct, setOpenReturnProduct] = React.useState(false);



  const handleClickOrder = () => {
      setStatePage(1);
      setOpenOrder(!openOrder);
  };

  // 납품 주문서 관리 서브메뉴 주문서 조회 클릭
    const handleClickOrderList = () => {
        setStatePage(1);
    };


  const handleClickSupplier = () => {
      setStatePage(2);
    setOpenSupplier(!openSupplier);
  };

    // 공급업체 관리 서브메뉴 공급업체 조회 클릭
    const handleClickSupplierList = () => {
        setStatePage(2);
    };

  const handleClickUser = () => {
      setStatePage(3);
      setOpenUser(!openUser);
  };

  const handleClickUserList = () => {
        setStatePage(3);

    };

  const handleClickInventory = () => {
        setStatePage(7);
        setOpenInventory(!openInventory);
    };





  const handleClickProduct = () => {
      setStatePage(5);
        setOpenProduct(!openProduct);
  };

    const handleClickProductList = () => {
        setStatePage(5);
    };

  const handleClickDeliveryProduct = () => {
        setStatePage(6);
          setOpenDeliveryProduct(!openDeliveryProduct);
  };

  const handleClickReturnProduct = () => {
        setStatePage(7);
          setOpenReturnProduct(!openReturnProduct);
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 주문서 등록을 위한 모달
    const [openOrderAdd, setOpenOrderAdd] = useState(false);
    const handleOpenOrderAdd = () => setOpenOrderAdd(true); // setOpenOrderAdd로 변경
    const handleCloseOrderAdd = () => setOpenOrderAdd(false); // setOpenOrderAdd로 변경

    const [openSupplierAdd, setOpenSupplierAdd] = useState(false);
    const handleOpenSupplierAdd = () => setOpenSupplierAdd(true); // setOpenSupplierAdd로 변경
    const handleCloseSupplierAdd = () => setOpenSupplierAdd(false);

    const [openProductAdd, setOpenProductAdd] = useState(false);
    const handleOpenProductAdd = () => setOpenProductAdd(true); // setOpenSupplierAdd로 변경
    const handleCloseProductAdd = () => setOpenProductAdd(false);

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

  return (
    <React.Fragment>
      <ListItemButton sx={{ justifyContent: 'flex-start', marginLeft: 5 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, marginBottom: 5 }}>
          <ListItemAvatar>
            <Avatar
              sx={{ borderRadius: '50%', width: 100, height: 100 }} // 크기를 조절
            >
                {user?.cname.charAt(0) || "Lee"}
            </Avatar>
          </ListItemAvatar>
            <ListItemText primary={user?.cname || "Unknown"} />
        </Box>
      </ListItemButton>
      <Divider />
      <ListItemButton onClick={handleClickOrder}> {/*주문서 관리시 상태 1로 변경*/}
      <ListItemIcon>
                <DashboardIcon />
      </ListItemIcon>
        <ListItemText primary="납품 주문서 관리" />
          {openOrder ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
        <Collapse in={openOrder} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="주문서 등록" onClick={handleOpenOrderAdd} />
                </ListItemButton>
                <Modal
                    open={openOrderAdd}
                    onClose={handleCloseOrderAdd}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalStyle}>
                        <h2 id="modal-modal-title">주문서 등록</h2>
                        <p id="modal-modal-description">
                            <AddPage/>
                        </p>
                    </Box>
                </Modal>

                <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="주문서 조회" onClick={handleClickOrderList} />
                </ListItemButton>
                <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => alert('수정 및 삭제할 주문서를 선택하세요.')}
                >
                    <ListItemText primary="주문서 수정 및 삭제" />
                </ListItemButton>
            </List>
        </Collapse>

      <ListItemButton onClick={handleClickSupplier}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="공급업체 관리" />
        {openSupplier ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openSupplier} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="공급업체 등록" onClick={handleOpenSupplierAdd} />
          </ListItemButton>
            <Modal
                open={openSupplierAdd}
                onClose={handleCloseSupplierAdd}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box>
                    <p id="modal-modal-description">
                        <AddPageSupplier open={openSupplierAdd} onClose={handleCloseSupplierAdd}/>
                    </p>
                </Box>
            </Modal>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="공급업체 조회"  onClick={handleClickSupplierList}/>
          </ListItemButton>
            <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => alert('수정 및 삭제할 공급업체를 선택하세요.')}
            >
                <ListItemText primary="공급업체 수정 및 삭제" />
            </ListItemButton>
        </List>
      </Collapse>


      <ListItemButton onClick={handleClickInventory}>
              <ListItemIcon>
                <Inventory />
              </ListItemIcon>
              <ListItemText primary="납품 관리" />
              {openInventory ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openInventory} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }} onClick={handleClickReturnProduct}>
                  <ListItemText primary="반품 품목 확인" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} onClick={handleClickDeliveryProduct}>
                  <ListItemText primary="납품 품목 확인" />
                </ListItemButton>

              </List>
            </Collapse>

      <ListItemButton onClick={handleClickProduct}>
                    <ListItemIcon>
                      <Store />
                    </ListItemIcon>
                    <ListItemText primary="재고 관리" />
                    {openProduct ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openProduct} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }} onClick={handleOpenProductAdd} >
                        <ListItemText primary="상품 등록" />
                      </ListItemButton>
                        <Modal
                            open={openProductAdd}
                            onClose={handleCloseProductAdd}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box>
                                <p id="modal-modal-description">
                                    <AddPageProduct open={openProductAdd} onClose={handleCloseProductAdd}/>
                                </p>
                            </Box>
                        </Modal>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="상품 조회" onClick={handleClickProductList}/>
                      </ListItemButton>
                        <ListItemButton
                            sx={{ pl: 4 }}
                            onClick={() => alert('수정 및 삭제할 상품을 선택하세요.')}
                        >
                            <ListItemText primary="상품 수정 및 삭제" />
                        </ListItemButton>
                    </List>
                  </Collapse>

        <ListItemButton onClick={handleClickUser}>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="사용자 관리" />
            {openUser ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openUser} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }} >
                    <ListItemText primary="사용자 조회" onClick={handleClickUserList} />
                </ListItemButton>


            </List>
        </Collapse>

    </React.Fragment>
  );
};