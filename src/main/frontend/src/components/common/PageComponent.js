import React from 'react';
import { Box, Button } from '@mui/material';

const PageComponent = ({serverData, movePage}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', m: 1, p: 1 }}>
      {serverData.prev ?
        <Button variant="contained" color="primary" onClick={() => movePage({page:serverData.prevPage})}>
          Prev
        </Button> : null}
      {serverData.pageNumList.map(pageNum =>
        <Button key={pageNum} variant="contained" color={serverData.current === pageNum? 'secondary':'primary'} onClick={() => movePage( {page:pageNum})}>
          {pageNum}
        </Button>
      )}
      {serverData.next ?
        <Button variant="contained" color="primary" onClick={() => movePage( {page:serverData.nextPage})}>
          Next
        </Button> : null}
    </Box>
  );
}

export default PageComponent;