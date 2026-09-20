import { useState } from 'react';
import { Box, BoxProps } from '@mui/material';
import ImageIcon from 'icons/ImageIcon';
import { cssColor } from 'utils/colors';

export interface ProductPictureProps extends Omit<BoxProps, 'children'> {
    src?: string;
    alt?: string;
    /** Width / height of the frame. */
    ratio?: number;
}

/** Product image that fills its frame, shows a placeholder when missing or broken. */
const ProductPicture = ({
    src,
    alt = '',
    ratio = 1,
    sx,
    ...props
}: ProductPictureProps) => {
    // Remember which url failed so a new src gets a fresh try
    const [failedSrc, setFailedSrc] = useState<string>();
    const showImage = !!src && src !== failedSrc;

    return (
        <Box
            {...props}
            sx={{
                position: 'relative',
                aspectRatio: String(ratio),
                width: '100%',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: cssColor('grey100'),
                color: cssColor('grey500'),
                ...sx,
            }}
        >
            {showImage ? (
                <Box
                    component="img"
                    src={src}
                    alt={alt}
                    loading="lazy"
                    onError={() => setFailedSrc(src)}
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                    }}
                />
            ) : (
                <ImageIcon sx={{ fontSize: 48 }} />
            )}
        </Box>
    );
};

export default ProductPicture;
