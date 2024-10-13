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


export const MainListItems = ({ user }) => {
  const [openOrder, setOpenOrder] = React.useState(false);
  const [openSupplier, setOpenSupplier] = React.useState(false);
  const [openUser, setOpenUser] = React.useState(false);
  const [openInventory, setOpenInventory] = React.useState(false);
  const [openProduct, setOpenProduct] = React.useState(false);


  const handleClickOrder = () => {
    setOpenOrder(!openOrder);
  };

  const handleClickSupplier = () => {
    setOpenSupplier(!openSupplier);
  };

  const handleClickUser = () => {
      setOpenUser(!openUser);
  };

  const handleClickInventory = () => {
        setOpenInventory(!openInventory);
  };

  const handleClickProduct = () => {
        setOpenProduct(!openProduct);
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <ListItemButton sx={{ justifyContent: 'flex-start', marginLeft: 5 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, marginBottom: 5 }}>
          <ListItemAvatar>
            <Avatar
              alt="Admin Name"
              src="/sample/sample1.jpg"
              sx={{ borderRadius: '50%', width: 100, height: 100 }} // 크기를 조절
            />
          </ListItemAvatar>
            <ListItemText primary={user?.cname || "Unknown"} />
        </Box>
      </ListItemButton>
      <Divider />

      <ListItemButton onClick={handleOpen}>
      <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
        <ListItemText primary="주문서 관리" />
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <Box sx={{
                p: 4,
                width: '80vw',
                height: '80vh',
                overflow: 'auto',
                backgroundColor: 'white',
                position: 'absolute', // Add position here
                top: '50%', // Add top here
                left: '50%', // Add left here
                transform: 'translate(-50%, -50%)' // Add transform here
            }}>
              <ListPage />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button variant="contained" component={Link} to="/order/add">주문서 등록</Button>
                <Button variant="contained" component={Link} to="/order/modify">주문서 수정</Button>
                <Button variant="contained">주문서 삭제</Button>
              </Box>
            </Box>
          </Modal>
      </ListItemButton>

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
            <ListItemText primary="공급업체 등록" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="공급업체 조회" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="공급업체 수정" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="공급업체 삭제" />
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
                <ListItemButton sx={{ pl: 4 }} component={Link} to="/manager/list">
                  <ListItemText primary="사용자 목록" />
                </ListItemButton>


              </List>
            </Collapse>

      <ListItemButton onClick={handleClickInventory}>
              <ListItemIcon>
                <Inventory />
              </ListItemIcon>
              <ListItemText primary="재고 관리" />
              {openInventory ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openInventory} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="재고 확인 및 수정" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="반품 품목 확인" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="납품 품목 확인" />
                </ListItemButton>

              </List>
            </Collapse>

      <ListItemButton onClick={handleClickProduct}>
                    <ListItemIcon>
                      <Store />
                    </ListItemIcon>
                    <ListItemText primary="상품 관리" />
                    {openProduct ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openProduct} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="상품 등록" />
                      </ListItemButton>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="상품 조회" />
                      </ListItemButton>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="상품 수정" />
                      </ListItemButton>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="상품 삭제" />
                      </ListItemButton>
                    </List>
                  </Collapse>
    </React.Fragment>
  );
};