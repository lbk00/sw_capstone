import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { getList } from '../../api/ProductApi';

const PageComponent = () => {
  const [serverData, setServerData] = useState({
    prev: false,
    next: false,
    prevPage: 0,
    nextPage: 0,
    pageNumList: [],
    current: 1
  });

  const fetchPageData = async (page) => {
    const pageParam = { page: page, size: 10 }; // Adjust size as needed
    try {
      const data = await getList(pageParam);
      setServerData(data);
    } catch (error) {
      console.error('Error fetching list:', error);
    }
  };

  const movePage = (page) => {
    fetchPageData(page);
  };

  useEffect(() => {
    fetchPageData(1); // Fetch initial data for page 1
  }, []);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', m: 1, p: 1 }}>
      {serverData.prev ?
        <Button variant="contained" color="primary" onClick={() => movePage(serverData.prevPage)}>
          Prev
        </Button> : null}
      {serverData.pageNumList.map(pageNum =>
        <Button key={pageNum} variant="contained" color={serverData.current === pageNum ? 'secondary' : 'primary'} onClick={() => movePage(pageNum)}>
          {pageNum}
        </Button>
      )}
      {serverData.next ?
        <Button variant="contained" color="primary" onClick={() => movePage(serverData.nextPage)}>
          Next
        </Button> : null}
    </Box>
  );
}

export default PageComponent;