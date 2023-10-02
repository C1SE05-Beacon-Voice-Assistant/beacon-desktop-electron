import React, { ReactNode, useState } from 'react'
import SideBarLayout from '../sidebar/sidebar-layout'
import HeaderLayout from '../header/header-layout'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import styled from 'styled-components'
interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: any) {
  const [open, setOpen] = useState(false)
  return (
    <Box sx={{ display: 'flex' }}>
      <SideBarLayout open={open} setOpen={setOpen} />
      <HeaderLayout setOpen={setOpen} open={open} />
      <Main>{children}</Main>
    </Box>
  )
}
const Main = styled.div `margin-top: 50px`