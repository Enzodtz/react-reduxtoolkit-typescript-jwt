import {
  AppBar,
  Avatar,
  Box,
  Box as _Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import img from "assets/img.jpg";
import { Add, Remove } from "@mui/icons-material";
import { useDispatch } from "app/hooks";
import { cartActions } from "features/cart/cartSlice";
import { CartItemType } from "common/types/cart";
import displayPrice from "utils/displayPrice";

const ActionRow = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface ICartItem {
  item: CartItemType;
}

function CartItem({ item }: ICartItem) {
  const dispatch = useDispatch();

  console.log(JSON.stringify(item.product));

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar src={item.product.images[0].image} variant="rounded" />
      </ListItemAvatar>
      <Box mr={2} flexGrow={1}>
        <ListItemText
          primary={item.product.name}
          secondary={displayPrice(item.product.price * item.quantity)}
        />
      </Box>
      <ActionRow>
        <IconButton onClick={() => dispatch(cartActions.remove(item.product))}>
          <Remove />
        </IconButton>
        <Box pl={1} pr={1}>
          {item.quantity}
        </Box>
        <IconButton onClick={() => dispatch(cartActions.add(item.product))}>
          <Add />
        </IconButton>
      </ActionRow>
    </ListItem>
  );
}

export default CartItem;
