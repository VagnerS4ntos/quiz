import React from 'react';
import { Button } from '@mui/material';

function Error() {
  return (
    <div className="my-10 text-2xl">
      <Button
        variant="contained"
        size="large"
        sx={{ fontSize: '1.2rem', marginTop: '2rem' }}
        onClick={() => window.location.reload()}
      >
        Reload page
      </Button>
      <h1 className="text-red-600 font-semibold mt-5">
        Something is wrong... Check the Console in your browser
      </h1>
    </div>
  );
}

export default Error;
