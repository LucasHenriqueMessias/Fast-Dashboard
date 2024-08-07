import { Box, Typography, useTheme} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";
import { useEffect, useState } from "react";

const Dre = () => {

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
      <Header title="Receita Bruta" />
      <Box>
        </Box>
      <Box
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
    </Box>
  );
};
export default Dre;