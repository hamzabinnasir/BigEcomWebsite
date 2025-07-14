import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import React from "react"
export default function StarRating({ratingAvg}) {
    return (
        <>
            <Rating
                name="text-feedback"
                value={ratingAvg}
                readOnly
                precision={0.5}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
        </>
    )
}