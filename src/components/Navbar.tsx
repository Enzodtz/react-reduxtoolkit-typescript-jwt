import {
  AppBar,
  Badge,
  Collapse,
  Drawer,
  IconButton,
  InputAdornment,
  InputBase,
  styled,
  Toolbar as _Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Close, LocalMall, Login, Person, Search } from "@mui/icons-material";
import { useSelector } from "app/hooks";
import ShoppingCartDrawer from "./ShoppingCart/Drawer";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const AppBarFixedSize = styled(AppBar)`
  /* height: 75.813px; // size hard coded, might need to change */
`;

const SearchSizeWrapper = styled("div")`
  height: 75.813px; // size hard coded, might need to change
  flex-grow: 1;
  display: flex;
  align-items: center;
`;

const Title = styled("h2")`
  flex-grow: 1;
  flex-basis: 0;
`;

const Buttons = styled("span")`
  flex-grow: 1;
  flex-basis: 0;
  text-align: end;
`;

const Toolbar = styled(_Toolbar)`
  display: flex;
  justify-content: space-between;
`;

const UnstyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const StyledBadge = styled(Badge)`
  ${"> .MuiBadge-badge"} {
    ${"&::after"} {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      animation: ripple 1.2s infinite ease-in-out;
      border: 1px solid ${(props) => props.theme.palette.error.main};
      content: "";
    }
  }
  ${"@keyframes ripple"} {
    ${"0%"} {
      transform: scale(0.8);
      opacity: 1;
    }
    ${"100%"} {
      transform: scale(1.8);
      opacity: 0;
    }
  }
`;

function NormalToolbar({ onChange, transitioning, setDrawerOpen }: any) {
  const shoppingCart = useSelector((state) => state.cart);

  let shoppingCartQuantity = 0;
  shoppingCart.forEach((item) => {
    shoppingCartQuantity += item.quantity;
  });

  return (
    <Toolbar>
      <UnstyledLink to="/">
        <Title>Bycavallinixx</Title>
      </UnstyledLink>
      <Buttons>
        <IconButton color="inherit" onClick={() => onChange()}>
          <Search />
        </IconButton>
        <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
          <StyledBadge badgeContent={shoppingCartQuantity} color="error">
            <LocalMall />
          </StyledBadge>
        </IconButton>
        {/* <IconButton color="inherit">
          <Person />
        </IconButton> */}
        {/* <IconButton color="inherit">
          <Login />
        </IconButton> */}
      </Buttons>
    </Toolbar>
  );
}

function SearchToolbar({ onChange, transitioning, search }: any) {
  const theme = useTheme();
  const textInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: { search },
  });

  useEffect(() => {
    if (!transitioning) {
      textInput.current!.focus();
    }
  }, [transitioning]);

  function onSubmit(data: any) {
    console.log(data);
    navigate("/", {
      state: {
        query: data.search,
      },
    });
    navigate({
      pathname: "/search",
      search: createSearchParams({
        query: data.search,
      }).toString(),
    });
  }

  return (
    <Toolbar>
      <SearchSizeWrapper>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <InputBase
            sx={{
              color: theme.palette.primary.contrastText,
            }}
            fullWidth
            {...register("search")}
            placeholder="Procure por algum produto..."
            inputRef={textInput}
            inputProps={{ "aria-label": "Procure por algum produto..." }}
            startAdornment={
              <InputAdornment color="" position="start">
                <IconButton aria-label="Search" type="submit">
                  <Search
                    sx={{
                      color: theme.palette.primary.contrastText,
                    }}
                  />
                </IconButton>
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Close search bar"
                  onClick={() => onChange()}
                >
                  <Close sx={{ color: theme.palette.primary.contrastText }} />
                </IconButton>
              </InputAdornment>
            }
          />
        </form>
      </SearchSizeWrapper>
    </Toolbar>
  );
}

interface INavbar {
  search?: string;
}

function Navbar(props: INavbar) {
  // const { user } = useSelector((state) => state.auth);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOn, setSearchOn] = useState(!!props.search);
  const [transitioning, setTransitioning] = useState(false);

  function onChange() {
    setSearchOn(!searchOn);
    setTransitioning(true);
  }

  return (
    <>
      <AppBarFixedSize position="sticky" elevation={0}>
        <Collapse in={searchOn} addEndListener={() => setTransitioning(false)}>
          <SearchToolbar
            search={props.search}
            onChange={onChange}
            transitioning={transitioning}
          />
        </Collapse>
        <Collapse in={!searchOn} addEndListener={() => setTransitioning(false)}>
          <NormalToolbar
            onChange={onChange}
            transitioning={transitioning}
            setDrawerOpen={setDrawerOpen}
          />
        </Collapse>
      </AppBarFixedSize>

      <ShoppingCartDrawer open={drawerOpen} toggleOpen={setDrawerOpen} />
    </>
  );
}

export default Navbar;
