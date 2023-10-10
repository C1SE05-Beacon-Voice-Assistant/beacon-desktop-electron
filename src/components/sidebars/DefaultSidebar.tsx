import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from "~/icons/HomeIcon";
import InfoIcon from "~/icons/InfoIcon";
import LogoIcon from "~/icons/LogoIcon";
import SettingIcon from "~/icons/SettingIcon";
import TimeIcon from "~/icons/TimeIcon";
import { AppRouter } from "~/util/constants/appRoutes";

export default function SideBarLayout() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(1);
  const history = useNavigate();

  return (
    <>
      <Box sx={{ display: "flex" }}>
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
          open={true}
        >
          <List>
            {[LogoIcon, HomeIcon, TimeIcon, SettingIcon, InfoIcon].map(
              (IconComponent, index) => (
                <ListItem style={{ padding: 0, margin: 0 }} key={index}>
                  <ListItemButton
                    style={{
                      padding: 0,
                      marginBottom: "15px",
                      borderRadius: "15px",
                    }}
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
    </>
  );
}
const Icon = styled("div")({
  display: "flex",
  marginRight: 10,
});
