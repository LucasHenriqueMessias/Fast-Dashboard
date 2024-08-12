import { Box, Button, Typography, useTheme, TextField, InputBase, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";
import { useEffect, useState } from "react";

import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from "@mui/icons-material/Search";


import AddBoxIcon from '@mui/icons-material/AddBox';

const Invoices = () => {
  const [fluxo, setFluxo] = useState([])
    useEffect(() => {
      
      //Get Data From Backend
      axios.get(`http://localhost:3000/tab-fluxo-caixa/`)
        .then((res) => setFluxo(res.data))
        .catch(() => {
          alert("Caixa não encontrado.");
        }, [])
    }, [])
    const [modal, setModal] = useState(false)
    //remover 
  const [getCnpj, setCnpj] = useState(``);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "data", headerName: "Criação", flex: 1 },
    { field: "data_ajustada", headerName: "ajuste", flex: 1 },
    { field: "banco_origem", headerName: "Origem", flex: 1 },
    { field: "Categoria", headerName: "Categoria", flex: 1 },
    { field: "tipo", headerName: "tipo" , flex: 1},
    { field: "valor_movimentacao", headerName: "valor", flex: 1, 
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          R$ {params.row.valor_movimentacao}
        </Typography>
      ),
    },
    { field: "descricao", headerName: "descrição" , flex: 1},
    { field: "efetivado", headerName: "efetivado" , flex: 1},
    { field: "vencimento_original", headerName: "vencimento", flex: 1 },
    { field: "competencia", headerName: "competência" , flex: 1},
  ];

  const toggleModal = () => {
    setModal(!modal)
  }

  return (
    <Box m="20px">
      <Header title="Fluxo de Caixa" />
      <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              left: "90%"
            }}
            onClick={toggleModal}
          >
            <AddBoxIcon sx={{ mr: "10px" }} />
            Novo Fluxo
          </Button>
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
        <DataGrid  editMode="cell" rows={fluxo} columns={columns}
        components={{ Toolbar: GridToolbar }}
        getRowId={(row) => row.id} />
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
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            lineHeight: 1.4,
            background: "#f1f1f1",
            padding: "10px 10px 10px",
            borderRadius: "3px",
            maxWidth: "600px",
            minWidth: "300px",
            maxHeight: "600px",
            minHeight: "500px",
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

export default Invoices;
