import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '../../components/icons/home-icon';
import TimeIcon from '../../components/icons/time-icon';
import LogoIcon from '../../components/icons/logo-icon';
import SettingIcon from '../../components/icons/setting-icon';
import InforIcon from '../../components/icons/infor-icon';
import { useNavigate, NavLink } from 'react-router-dom';
import { AppRouter } from '../../components/constants/app-routes';
import ConversitionHistory from 'renderer/pages/conversition-history/conversition-history-page';
// import styled from 'styled-components/macro';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
type SideBarLayoutProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function SideBarLayout(props: SideBarLayoutProps) {
  const { open, setOpen } = props;
  const theme = useTheme();
  const history = useNavigate();
  return (
    <>
      {open && (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                backgroundColor: '#292929',
                color: '#fff',
                boxShadow: 'none',
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={() => setOpen(false)}>
                {theme.direction === 'ltr' ? <button /> : <button />}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              {['Logo', 'Home', 'Time', 'Setting', 'Information'].map(
                (text, index) => (
                  <ListItem key={text}>
                    <ListItemButton
                      onClick={() =>
                        history(
                          index === 2
                            ? AppRouter.COVERSITION_HISTORY
                            : index === 3
                            ? AppRouter.SETTING
                            : index === 4
                            ? AppRouter.ABOUT_TEAM
                            : AppRouter.HOME
                        )
                      }
                    >
                      {index === 0 ? (
                        <Icon>
                          <LogoIcon />
                        </Icon>
                      ) : index === 1 ? (
                        <Icon>
                          <HomeIcon />
                        </Icon>
                      ) : index === 2 ? (
                        <>
                          <Icon>
                            <TimeIcon />
                          </Icon>
                        </>
                      ) : index === 3 ? (
                        <Icon>
                          <SettingIcon />
                        </Icon>
                      ) : (
                        <Icon>
                          <InforIcon />
                        </Icon>
                      )}
                      <ListItemText primary={index === 0 ? '' : text} />
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
const Icon = styled('div')({
  display: 'flex',
  marginRight: 10,
});
