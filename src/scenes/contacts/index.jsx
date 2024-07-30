import { Box, Button, IconButton, InputBase, TextField, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import AddBoxIcon from '@mui/icons-material/AddBox';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from "@mui/icons-material/Search";


const Contacts = () => {
  const [cliente, setCliente] = useState([])
  const [modal, setModal] = useState(false)
  const [cnpj] = useState(``);
  const [getCnpj, setCnpj] = useState(``);


  console.log(cliente)
  useEffect(() => {

    //Get Data From Backend
    axios.get(`http://localhost:3000/loja`)
      .then((res) => setCliente(res.data))
      .catch(() => {
        alert("CNPJ não encontrado.");
      }, [])
  }, [])

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

console.log(cnpj)
console.log(getCnpj)



  const columns = [
    { field: "cnpj", headerName: "CNPJ", flex: 0.5 },
    { field: "razao_social", headerName: "Razão Social" },
    { field: "capital_social", headerName: "Capital Social", type: "number", cellClassName: "name-column--cell", headerAlign: "left", align: "left" },
    { field: "ddd_telefone_1", headerName: "Telefone 1", flex: 1 },
    { field: "ddd_telefone_2", headerName: "Telefone 2", flex: 1 },
    { field: "cnae_fiscal_descricao", headerName: "CNAE Descrição", flex: 1 },
    { field: "cnae_fiscal", headerName: "Código CNAE", flex: 1, cellClassName: "name-column--cell", headerAlign: "left", align: "left" },
    {
      field: "renda_bruta_atual", headerName: "Renda Bruta", type: "number", cellClassName: "name-column--cell", headerAlign: "left", align: "left",
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          R$ {params.row.renda_bruta_atual}
        </Typography>
      ),
    },
    {
      field: "renda_liquida_atual", headerName: "Renda Líquida", type: "number", cellClassName: "name-column--cell", headerAlign: "left", align: "left",
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          R$ {params.row.renda_liquida_atual}
        </Typography>
      ),
    },
    { field: "municipio", headerName: "Municipio", flex: 1 },
    { field: "bairro", headerName: "Bairro", flex: 1 },
    { field: "descricao_tipo_de_logradouro", headerName: "Tipo Logradouro", flex: 1 },
    { field: "logradouro", headerName: "Logradouro", flex: 1 },
    { field: "uf", headerName: "UF", flex: 1 },
  ];



  const toggleModal = () => {
    setModal(!modal)
  }

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Clientes"
          subtitle="Lista de Todos os Clientes da Fast"
        />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={toggleModal}
          >
            <AddBoxIcon sx={{ mr: "10px" }} />
            Adicionar Novo Cliente
          </Button>
        </Box>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={cliente}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.cnpj}
        />
      </Box>


      {modal && (
        <div className="modal" style={{
          width: "100vw",
          height: "100vh",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          position: "fixed"

        }}>
          <div className="overlay" style={{

            background: "rgba(49,49,49,0.8)"
            
          }}
          ></div>
          <div className="modal-content" style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            lineHeight: 1.4,
            background: "#f1f1f1",
            padding: "120px 10px",
            borderRadius: "3px",
            maxWidth: "600px",
            minWidth: "300px",
            backgroundColor: "#141b2d"
          }}>
            <Button className="close-modal"
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "1px",
                fontWeight: "bold",
                padding: "1px 2px",
                float: "right"
              }}
              onClick={toggleModal}
            ><CancelIcon /></Button>

            <p>Cadastro de Novos Clientes</p>
            <Box
              display="flex"
              backgroundColor={colors.primary[400]}
              borderRadius="3px"
              position="relative"
              
            >
              <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Inserir CNPJ" onChange={event => { setCnpj(event.target.value)}}/>
              <IconButton type="button" sx={{ p: 1 }} onClick={() => {
                //console.log(`https://brasilapi.com.br/api/cnpj/v1/${getCnpj}`)
                axios.get(`https://brasilapi.com.br/api/cnpj/v1/${getCnpj}`)
                  .then((res) => setCnpj(res.data))
                  .catch(() => {
                    alert("CNPJ não encontrado.");
                  })
              }} >
                <SearchIcon />
                
              </IconButton>

              
            </Box>
            
              <TextField id="outlined-helperText" label="CNPJ" defaultValue="Default Value" sx={{top: "20px", left:"10px"}}/>
              <TextField id="outlined-helperText" label="Razão Social" defaultValue="Default Value" sx={{top: "20px", left:"20px"}}/>
              <TextField id="outlined-helperText" label="Capital Inicial" defaultValue="Default Value" sx={{top: "20px", left:"30px"}}/>
              <TextField id="outlined-helperText" label="Telefone 1" defaultValue="Default Value"sx={{top: "40px", left: "10px"}}/>
              <TextField id="outlined-helperText" label="Telefone 2" defaultValue="Default Value" sx={{top: "40px", left:"20px"}}/>
              <TextField id="outlined-helperText" label="Descrição CNAE" defaultValue="Default Value"sx={{top: "40px", left:"30px"}}/>
              <TextField id="outlined-helperText" label="CNAE" defaultValue="Default Value" sx={{top: "60px", left:"10px"}}/>
              <TextField id="outlined-helperText" label="Renda Bruta Atual" defaultValue="Default Value" sx={{top: "60px", left:"20px"}}/>
              <TextField id="outlined-helperText" label="Renda Líquida Atual" defaultValue="Default Value" sx={{top: "60px", left: "30px"}}/>
              <TextField id="outlined-helperText" label="Municipio" defaultValue="Default Value" sx={{top: "80px", left: "10px"}}/>
              <TextField id="outlined-helperText" label="Bairro" defaultValue="Default Value" sx={{top: "80px", left:"20px"}}/>
              <TextField id="outlined-helperText" label="Logradouro" defaultValue="Default Value" sx={{top: "80px", left:"30px"}}/>
              <TextField id="outlined-helperText" label="UF" defaultValue="Default Value" sx={{top: "100px", left:"10px"}}/>
              
          </div>
        </div>

      )}
    </Box>

  );
};

export default Contacts;
