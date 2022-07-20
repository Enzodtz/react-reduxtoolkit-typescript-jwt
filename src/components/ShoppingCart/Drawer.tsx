import {
  AppBar,
  Avatar,
  BottomNavigation,
  Box,
  Button,
  Card,
  Drawer as _Drawer,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  styled,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import img from "assets/img.jpg";
import CartItem from "./Item";
import { Close } from "@mui/icons-material";
import { CartType } from "common/types/cart";
import { useSelector } from "app/hooks";
import generateWppLink from "utils/generateWppLink";

interface IShoppingCartDrawer {
  open: boolean;
  toggleOpen: Function;
}

const Title = styled("h2")`
  flex-grow: 1;
`;

const Drawer = styled(_Drawer)`
  ${"> .MuiDrawer-paper"} {
    box-sizing: "border-box";
    width: 400px;
  }

  /* width: 350px;
  padding-top: 0;

  ${(props) => props.theme.breakpoints.up("sm")} {
  }
  ${(props) => props.theme.breakpoints.up("md")} {
  }
  ${(props) => props.theme.breakpoints.up("lg")} {
  } */
`;

const ContentWrapper = styled(Box)`
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const ItemsList = styled(List)`
  // TODO: remove hardcoding (if possible :P)
  height: calc(100vh - 126.5px - 75.813px);
  overflow: auto;
`;

function ShoppingCartDrawer({ open, toggleOpen }: IShoppingCartDrawer) {
  const items = useSelector((state) => state.cart);
  const theme = useTheme();

  return (
    <Drawer anchor="right" open={open} onClose={() => toggleOpen(false)}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Title>Carrinho de Compras</Title>
          <IconButton onClick={() => toggleOpen(false)}>
            <Close sx={{ color: theme.palette.primary.contrastText }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <ContentWrapper>
        <ItemsList>
          {items.map((item) => {
            return <CartItem key={item.product.id} item={item} />;
          })}
        </ItemsList>
        <Card variant="outlined" sx={{ borderRadius: 0 }}>
          <Box p={2}>
            <Button
              size="large"
              fullWidth
              variant="contained"
              color="primary"
              disableElevation
              href={generateWppLink(items)}
              target="_blank"
            >
              Finalizar Compra
            </Button>
            <Box pt={1} />
            <Button
              size="large"
              fullWidth
              variant="outlined"
              color="primary"
              onClick={() => toggleOpen(false)}
              disableElevation
            >
              Adicionar Mais Produtos
            </Button>
          </Box>
        </Card>
      </ContentWrapper>
    </Drawer>
  );
}

export default ShoppingCartDrawer;
