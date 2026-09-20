import { Avatar } from '@mui/material';
import ImageIcon from 'icons/ImageIcon';
import { cssColor } from 'utils/colors';

export interface ProductImageProps {
    src?: string;
    alt?: string;
    size?: number;
}

/** Product thumbnail, shows a placeholder when there is no image. */
const ProductImage = ({ src, alt = '', size = 40 }: ProductImageProps) => (
    <Avatar
        variant="rounded"
        src={src}
        alt={alt}
        sx={{
            width: size,
            height: size,
            backgroundColor: cssColor('grey100'),
            color: cssColor('grey600'),
            border: `1px solid ${cssColor('grey200')}`,
        }}
    >
        <ImageIcon fontSize="small" />
    </Avatar>
);

export default ProductImage;
