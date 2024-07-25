import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";


const Contacts = () => {
  const [cliente, setCliente] = useState([])
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





  const columns = [
    { field: "cnpj", headerName: "CNPJ", flex: 0.5 },
    { field: "razao_social", headerName: "Razão Social" },
    { field: "capital_social", headerName: "Capital Social", type: "number", cellClassName: "name-column--cell", headerAlign: "left", align: "left" },
    { field: "ddd_telefone_1", headerName: "Telefone 1", flex: 1 },
    { field: "ddd_telefone_2", headerName: "Telefone 2", flex: 1 },
    { field: "cnae_fiscal_descricao", headerName: "CNAE Descrição", flex: 1 },
    { field: "cnae_fiscal", headerName: "Código CNAE", flex: 1, cellClassName: "name-column--cell", headerAlign: "left", align: "left" },
    { field: "renda_bruta_atual", headerName: "Renda Bruta", type: "number", cellClassName: "name-column--cell", headerAlign: "left", align: "left" },
    { field: "renda_liquida_atual", headerName: "Renda Líquida", type: "number", cellClassName: "name-column--cell", headerAlign: "left", align: "left" },
    { field: "municipio", headerName: "Municipio", flex: 1 },
    { field: "bairro", headerName: "Bairro", flex: 1 },
    { field: "descricao_tipo_de_logradouro", headerName: "Tipo Logradouro", flex: 1 },
    { field: "logradouro", headerName: "Logradouro", flex: 1 },
    { field: "uf", headerName: "UF", flex: 1 },
  ];

  return (
    <Box m="20px">
      <Header
        title="Clientes"
        subtitle="Lista de Todos os Clientes da Fast"
      />
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
    </Box>
  );
};

export default Contacts;
