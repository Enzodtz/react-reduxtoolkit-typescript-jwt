import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  styled,
} from "@mui/material";
import React from "react";
import Product from "./Product";
import axios from "config/axios";
import { ProductType } from "common/types/product";
import LoadingButton from "@mui/lab/LoadingButton";

const ProgressBox = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface IProducts {
  useInfiniteQuery: Function;
}

function Products(props: IProducts) {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    isError,
  } = props.useInfiniteQuery();

  if (isLoading) {
    return (
      <ProgressBox py={10}>
        <CircularProgress color="primary" />
      </ProgressBox>
    );
  }

  if (isError) {
    return (
      <Container>
        <Box py={10}>
          <Alert variant="filled" severity="error">
            Não foi possível carregar os produtos!
          </Alert>
        </Box>
      </Container>
    );
  }

  if (!data.pages[0].data.results.length) {
    return (
      <Container>
        <Box py={10}>Não foram encontrados produtos!</Box>
      </Container>
    );
  }

  // return (
  //   <>
  //     <div>

  //     </div>
  //     <div>
  //
  //     </div>
  //   </>
  // );
  return (
    <Container>
      <Box py={10}>
        <Grid
          container
          rowSpacing={10}
          columnSpacing={10}
          justifyContent="space-between"
        >
          {data.pages.map((group: any, i: any) => {
            return (
              <React.Fragment key={i}>
                {group.data.results.map((product: ProductType) => (
                  <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <Product product={product} />
                  </Grid>
                ))}
              </React.Fragment>
            );
          })}
        </Grid>
        <ProgressBox pt={10}>
          <LoadingButton
            size="large"
            variant="contained"
            disableElevation
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage}
            loading={isFetching || isFetchingNextPage}
          >
            Carregar Mais Produtos
          </LoadingButton>
        </ProgressBox>
        {/* {isFetching || isFetchingNextPage ? (
          <ProgressBox pt={10}>
            <CircularProgress />
          </ProgressBox>
        ) : null} */}
      </Box>
    </Container>
  );
}

export default Products;
