import { Button, ButtonProps, CircularProgress } from "@mui/material";

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
}

function LoadingButton(props: LoadingButtonProps) {
  return (
    <Button {...props}>
      {props.children}
      <CircularProgress color="inherit" size="small" />
    </Button>
  );
}

export default LoadingButton;
