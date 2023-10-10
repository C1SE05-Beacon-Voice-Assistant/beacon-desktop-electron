import Box from "@mui/material/Box";
import { ReactNode } from "react";
import styled from "styled-components";
import { DefaultHeader } from "~/components/headers";
import { DefaultSidebar } from "~/components/sidebars";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ display: "flex" }}>
      <DefaultSidebar />
      <DefaultHeader />
      <Main>{children}</Main>
    </Box>
  );
}
const Main = styled("div")({
  width: "100%",
  overflow: "hidden",
  maxHeight: "100vh",
  padding: "90px 20px 0 100px",
  height: "max-content",
});
