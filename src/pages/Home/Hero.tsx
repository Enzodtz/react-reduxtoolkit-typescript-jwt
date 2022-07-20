import React from "react";
// @ts-ignore
import img1 from "assets/img.jpg";
// @ts-ignore
import img2 from "assets/img2.jpg";
import { Box, CircularProgress, styled } from "@mui/material";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "config/axios";
import { BannerType } from "common/types/banner";

const BANNERS_URL = "/api/banners/";

const SwiperImg = styled("img")`
  object-fit: cover;
  /* width: 100%;
  height: 100%; */
  width: 100vw;
  height: 500px;
`;

const SwiperPlaceholderBox = styled(Box)`
  width: 100vw;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function fetchBanners() {
  return axios.get(BANNERS_URL);
}

function Hero() {
  const { data, error, isFetching, isLoading, isError } = useQuery(
    ["banners"],
    fetchBanners
  );

  if (isLoading) {
    return (
      <SwiperPlaceholderBox>
        <CircularProgress />
      </SwiperPlaceholderBox>
    );
  }
  if (isError) {
    return <p>Error</p>;
  }

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={50}
      autoplay={{ delay: 2500 }}
      pagination
    >
      {data.data[0].images.map((image: any, i: number) => {
        return (
          <SwiperSlide key={i}>
            <SwiperImg src={image.image} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default Hero;
