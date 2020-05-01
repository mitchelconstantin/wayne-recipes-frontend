import React from 'react';
import { Box, LinearProgress } from '@material-ui/core';

export const Loading = () => {
  return (
    <Box width={'100%'}>
      <LinearProgress />
    </Box>
  );
};
