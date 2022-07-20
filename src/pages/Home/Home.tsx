import {
  Button,
  InputBase,
  makeStyles,
  Paper,
  styled,
  Theme,
} from "@mui/material";
import { useSelector } from "app/hooks";
import Navbar from "components/Navbar";
import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Hero from "./Hero";
import Products from "../../components/Products";
import axios from "config/axios";

const PRODUCTS_URL = "/api/products/";

function fetchProducts({ pageParam = PRODUCTS_URL }) {
  return axios.get(pageParam);
}

function Home() {
  useEffect(() => {
    document.title = "By Cavallinixx | Home";
  });

  const useQuery = () =>
    useInfiniteQuery(["products"], fetchProducts, {
      getNextPageParam: (lastPage, pages) => lastPage.data.next,
    });

  return (
    <>
      <Navbar />
      <Hero />
      <Products useInfiniteQuery={useQuery} />
    </>
  );
}

export default Home;
