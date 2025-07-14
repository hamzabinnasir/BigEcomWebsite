import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
export default function RatingBars({barData}) {
    return (
        <Box sx={{ width: '100%', maxWidth: 500 }}>
            {barData.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography sx={{ minWidth: 80 }}>{item.label}</Typography>
                    <Box sx={{ flexGrow: 1, mr: 1 }}>
                        <LinearProgress
                            variant="determinate"
                            value={item.value}
                            sx={{
                                height: 8,
                                borderRadius: 5,
                                backgroundColor: "#D1D0D1",
                                [`& .MuiLinearProgress-bar`]: {
                                    backgroundColor: item.color,
                                },
                            }}
                        />
                    </Box>
                    <Typography sx={{ minWidth: 40 }} color="text.secondary">{item.value}</Typography>
                </Box>
            ))}
        </Box>
    );
}
