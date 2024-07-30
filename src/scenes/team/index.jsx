import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";
import { useEffect, useState } from "react";

const Team = () => {
  const [socio, setSocio] = useState([])
  console.log(socio)
    useEffect(() => {
      
      //Get Data From Backend
      axios.get(`http://localhost:3000/tab-socios`)
        .then((res) => setSocio(res.data))
        .catch(() => {
          alert("CNPJ não encontrado.");
        }, [])
    }, [])

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {field: "ID_Socio", headerName:"ID", flex: 1},
    {field: "cnpj_empresa", headerName:"CNPJ", flex: 1},
    {field: "pais", headerName:"país", flex: 1},
    {field: "nome_socio", headerName:"Nome", flex: 1},
    {field: "codigo_pais", headerName:"Código País", flex: 1},
    {field: "faixa_etaria", headerName:"Faixa Etária", flex: 1},
    {field: "cnpj_cpf_do_socio", headerName:"CPF", flex: 1},
    {field: "qualificacao_socio", headerName:"Qualificação", flex: 1},
    {field: "codigo_faixa_etaria", headerName:"Código Faixa Etária", flex: 1},
    {field: "data_entrada_sociedade", headerName:"Data de Entrada Sociedade", flex: 1},
    {field: "identificador_de_socio", headerName:"identificador", flex: 1},
    {field: "cpf_representante_legal", headerName:"CPF Representante Legal", flex: 1},
    {field: "nome_representante_legal", headerName:"Nome Representante Legal", flex: 1},
    {field: "codigo_qualificacao_socio", headerName:"Código Qualificação Sócio", flex: 1},
    {field: "qualificacao_representante_legal", headerName:"Qualificação Representante Legal", flex: 1},
    {field: "codigo_qualificacao_representante_legal", headerName:"Código representante Legal", flex: 1},
  ];

  return (
    <Box m="20px">
      <Header title="Sócios" subtitle="Lista de sócios da Fast" />
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
        }}
      >
        <DataGrid checkboxSelection rows={socio} columns={columns}
        getRowId={(row) => row.ID_Socio} />
      </Box>
    </Box>
  );
};

export default Team;
