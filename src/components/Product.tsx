import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
// @ts-ignore
import img from "assets/img3.jpg";
import { LocalMall, Visibility } from "@mui/icons-material";
import { ProductType } from "common/types/product";
import { useDispatch } from "app/hooks";
import { cartActions } from "features/cart/cartSlice";
import displayPrice from "utils/displayPrice";

interface IProduct {
  product: ProductType;
}

function Product({ product }: IProduct) {
  const dispatch = useDispatch();

  return (
    <Card variant="outlined" elevation={0}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={product.images[0].image}
          alt={product.name}
        />
      </CardActionArea>
      <CardContent>
        <Typography variant="h5" fontWeight={600} component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {displayPrice(product.price)}
        </Typography>
      </CardContent>
      <CardActions sx={{ padding: 2, paddingTop: 0 }}>
        <Button
          variant="contained"
          disableElevation
          color="primary"
          onClick={() => dispatch(cartActions.add(product))}
        >
          <LocalMall />
        </Button>
        {/* <Button variant="outlined" disableElevation color="primary">
          <Visibility />
        </Button> */}
        {/* <IconButton variant="outlined" disableElevation>
          Ver mais
        </IconButton> */}
      </CardActions>
    </Card>
  );
}

export default Product;
