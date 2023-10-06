import { ReactNode, useState } from "react";
import SideBarLayout from "../sidebar/sidebar-layout";
import HeaderLayout from "../header/header-layout";
import Box from "@mui/material/Box";
import styled from "styled-components";
interface MainLayoutProps {
  children?: ReactNode;
}
export default function MainLayout({ children }: MainLayoutProps) {
  const [open, setOpen] = useState(false);
  return (
    <Box sx={{ display: "flex" }}>
      <SideBarLayout open={open} setOpen={setOpen} />
      <HeaderLayout setOpen={setOpen} open={open} />
      <Main>{children}</Main>
    </Box>
  );
}
const Main = styled("div")({
  width: "100%",
  margin: "170px 100px 0 100px"
});
