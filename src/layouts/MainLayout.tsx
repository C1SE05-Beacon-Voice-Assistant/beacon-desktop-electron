import { ReactNode, useState } from "react";
import { DefaultSidebar } from "~/components/sidebars";
import { DefaultHeader } from "~/components/headers";
import Box from "@mui/material/Box";
import styled from "styled-components";

export default function MainLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <Box sx={{ display: "flex" }}>
      <DefaultSidebar open={open} setOpen={setOpen} />
      <DefaultHeader setOpen={setOpen} open={open} />
      <Main>{children}</Main>
    </Box>
  );
}
const Main = styled("div")({
  width: "100%",
});
