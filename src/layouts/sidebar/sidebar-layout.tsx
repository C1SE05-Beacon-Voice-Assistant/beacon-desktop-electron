import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "~/components/icons/home-icon";
import TimeIcon from "~/components/icons/time-icon";
import LogoIcon from "~/components/icons/logo-icon";
import SettingIcon from "~/components/icons/setting-icon";
import InforIcon from "~/components/icons/infor-icon";
import { AppRouter } from "~/components/constants/app-routes";

type SideBarLayoutProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function SideBarLayout(props: SideBarLayoutProps) {
  const { open, setOpen } = props;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(1);
  const history = useNavigate();

  return (
    <>
      {open && (
        <Box sx={{ display: "flex"}}>
          <CssBaseline />
          <Drawer
            sx={{
              flexShrink: 0,
              "& .MuiDrawer-paper": {
              width: 56,
                boxSizing: "border-box",
                paddingX: 1,
                backgroundColor: "var(--gray-700)",
                color: "var(--white-900)",
                boxShadow: "none",
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <List>
              {[LogoIcon, HomeIcon, TimeIcon, SettingIcon, InforIcon].map(
                (IconComponent, index) => (
                  <ListItem style={{padding: 0, margin: 0}} key={index}>
                    <ListItemButton
                      style={{padding: 0, marginBottom: "15px",  borderRadius: "15px",}}
                      onClick={() => {
                        setSelectedIndex(index);
                        history(
                          index === 2
                            ? AppRouter.COVERSITION_HISTORY
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
                          borderRadius: "15px",
                          padding: "5px",
                          width: "40px",
                          height: "40px",
                          lineHeight: "40px",
                          flexShrink: "0",
                          backgroundColor:
                            index === selectedIndex && index !== 0
                              ? "var(--yellow-900)"
                              : "var(--gray-700)",
                        }}
                      >
                        <IconComponent />
                      </Icon>
                    </ListItemButton>
                  </ListItem>
                )
              )}
            </List>
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
