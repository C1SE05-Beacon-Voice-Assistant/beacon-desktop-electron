import React, { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { styled, useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import HomeIcon from "~/components/icons/home-icon";
import LogoIcon from "~/components/icons/logo-icon";
import SettingIcon from "~/components/icons/setting-icon";
import InforIcon from "~/components/icons/infor-icon";
import TimeIcon from "~/components/icons/time-icon";
import { AppRouter } from "~/constants/appRoutes";
import { List } from "@mui/material";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
type SideBarLayoutProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function DefaultSidebar(props: SideBarLayoutProps) {
  const { open, setOpen } = props;
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(1);
  const history = useNavigate();

  return (
    <>
      {open && (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
                backgroundColor: "var(--gray-700)",
                color: "var(--white-900)",
                boxShadow: "none",
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={() => setOpen(false)}>
                {theme.direction === "ltr" ? <button /> : <button />}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              {[LogoIcon, HomeIcon, TimeIcon, SettingIcon, InforIcon].map(
                (IconComponent, index) => (
                  <ListItem key={index}>
                    <ListItemButton
                      onClick={() => {
                        setSelectedIndex(index);
                        history(
                          index === 2
                            ? AppRouter.CONVERSATION
                            : index === 3
                            ? AppRouter.SETTING
                            : index === 4
                            ? AppRouter.ABOUT_TEAM
                            : AppRouter.HOME
                        );
                      }}
                    >
                      <Icon
                        style={{
                          borderRadius: "15%",
                          padding: "5px",
                          width: "40px",
                          height: "40px",
                          lineHeight: "40px",
                          flexShrink: "0",
                          backgroundColor:
                            index === selectedIndex
                              ? "var(--yellow-900)"
                              : "var(--gray-700)",
                          boxSizing: "content-box",
                        }}
                      >
                        <IconComponent />
                      </Icon>
                      <ListItemText
                        primary={
                          index == 1
                            ? "Home"
                            : index == 2
                            ? "Coversition"
                            : index == 3
                            ? "Setting"
                            : index == 4
                            ? "About team"
                            : ""
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                )
              )}
            </List>
            <Divider />
          </Drawer>
        </Box>
      )}
    </>
  );
}
const Icon = styled("div")({
  display: "flex",
  marginRight: 10,
});
