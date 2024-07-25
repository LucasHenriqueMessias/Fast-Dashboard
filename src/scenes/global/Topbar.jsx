import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import InputMask from "react-input-mask";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [cnpj, setCnpj] = useState( ``);
  const [setCliente] = useState(``)

 
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
        
        position="relative"
        
      >
        <InputMask
  mask="99.999.999/9999-99"
  disabled={false}
  maskChar=" "
  font="inherit"
  style={
    {letterSpacing: "inherit", 
      color:"currentColor",
      padding: "4px 0 5px",
      border: "0",
      boxSize:"content-box",
      background: "none",
      margin: "0",
      WebkitTapHighlightColor: "transparent",
      display: "block",
      minWidth: "0",
      Width: "100%",
      backgroundColor: "#1F2A40"
    }
  }
    
  sx={{ ml: 2, flex: 1 }} placeholder="digite o cnpj"  value={cnpj} onChange={(event) =>{
    event = event.target.value.replace(".","")
    event = event.replace("/", "")
    event = event.replace("-","")
    setCnpj(event)
  } }

>
</InputMask>

        
        
        <IconButton type="button" sx={{ p: 1 }} onClick={() => {
          axios.get(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`)
          .then((res) => setCliente(res.data))
          .catch(() =>{
            alert("CNPJ não encontrado.");
          })
        }} >
          <SearchIcon/>
        </IconButton>
      </Box>

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
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
