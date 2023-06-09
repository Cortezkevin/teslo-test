import { IProduct } from "@/interfaces";
import NextLink from 'next/link';
import {
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  Box,
  Link,
  Chip,
} from "@mui/material";

import { FC, useMemo, useState } from 'react';

interface Props {
  product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {

  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const productImage = useMemo(() => {
    return isHovered ? product.images[1] : product.images[0];
  }, [ isHovered, product.images]);

  return (
    <Grid 
      item 
      xs={6} 
      sm={4}
    >
      <Card
        onMouseEnter={ () => setIsHovered(true) }
        onMouseLeave={ () => setIsHovered(false) }
      >
        <NextLink legacyBehavior href={`/product/${product.slug}`} passHref prefetch={ false }>
          <Link>            
            <CardActionArea>
              {
                product.inStock === 0 
                && <Chip color='warning' label='Not available' sx={{ position: 'absolute', zIndex: 99, top: '10px', left: '10px' }}/>
              }
              <CardMedia
                component={"img"}
                className="fadeIn"
                image={ productImage }
                alt={product.title}
                onLoad={() => setIsImageLoaded(true)}
              />
            </CardActionArea>
          </Link>
        </NextLink>
      </Card>
      <Box sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }} className='fadeIn'>
        <Typography fontWeight={700} >{ product.title }</Typography>
        <Typography fontWeight={500} color={'secondary'}>${ product.price }</Typography>
      </Box>
    </Grid>
  );
};
