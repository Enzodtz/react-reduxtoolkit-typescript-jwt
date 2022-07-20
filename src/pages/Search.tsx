import { useInfiniteQuery } from "@tanstack/react-query";
import Navbar from "components/Navbar";
import Products from "components/Products";
import axios from "config/axios";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const PRODUCTS_URL = "/api/products/";

function fetchProducts({ pageParam = PRODUCTS_URL, queryKey }: any) {
  return axios.get(pageParam, {
    params: {
      search: queryKey[1],
    },
  });
}

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    document.title = "By Cavallinixx | " + (query != null ? query : "Pequisa");
  }, [query]);

  const useQuery = () =>
    useInfiniteQuery(["products", query], fetchProducts, {
      getNextPageParam: (lastPage, pages) => lastPage.data.next,
    });

  return (
    <>
      <Navbar search={query} />
      <Products useInfiniteQuery={useQuery} />
    </>
  );
}

export default Search;
