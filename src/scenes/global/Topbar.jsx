import { Box, IconButton, Menu, useTheme } from "@mui/material";
import React, { useContext } from "react";
import { ColorModeContext} from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { MenuItem } from "react-pro-sidebar";

const Topbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);


  return (
    <Box display="flex" justifyContent="space-between" p={2}>

      {/* SEARCH BAR */}
      <Box></Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
          <Menu id="basic-menu"

            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem >Profile</MenuItem>
            <MenuItem >My account</MenuItem>
            <MenuItem >Logout</MenuItem>

          </Menu>
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
