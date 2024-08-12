import { Box, MenuItem, Select, TextField, Typography, useTheme} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import axios from "axios";
import { useEffect, useState } from "react";

const parametro = [
  {nome: 'Receita Bruta', tipo: 'ReceitaBruta' }
  ,
  {nome: 'Dedução Receita Bruta', tipo: 'DeducaoReceitaBruta'},
{nome: 'CMV/CPV/CSV', tipo:'CmvCpvCsv'},
{nome: 'Despesas Administrativas', tipo: 'DespesasADM'},
{nome: 'Despesas RH', tipo: 'DespesasRH'},
{nome: 'Despesas Operacionais', tipo: 'DespesasOperacionais'},
{nome: 'Despesas de Venda', tipo: 'DespesasVenda'},
{nome: 'Despesas de Marketing', tipo: 'DespesasMarketing'},
{nome: 'Despesas Financeiras', tipo: 'DespesasFinanceiras'},
{nome: 'Receitas Financeiras', tipo: 'ReceitasFinanceiras'},
{nome: 'Empréstimos', tipo: 'Emprestimos'},
{nome: 'investimentos e aquisicoes', tipo: 'investimentoaqui'},
{nome: 'retirada dos Sócios', tipo: 'RetiradaSocios'}
  ]
const Dre = () => {

  const [nome, setNome] = useState('');
  const [fluxo, setFluxo] = useState([]);

  const handleChange = (event) => {
    setNome(event.target.value);
     axios.get(`http://localhost:3000/tab-fluxo-caixa/classificacao/${event.target.value}`)
        .then((res) => setFluxo(res.data))
        .catch(() => {
          alert("Caixa não encontrado.");
        }, [])
    

  };

    useEffect(() => {


      //Get Data From Backend
    }, [])
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "data", headerName: "Data", flex: 1 },
    { field: "descricao", headerName: "descrição" , flex: 1},
    { field: "valor_movimentacao", headerName: "valor", flex: 1, 
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          R$ {params.row.valor_movimentacao}
        </Typography>
      ),
    },
    
    { field: "banco_origem", headerName: "Banco", flex: 1 }
  ];

  return (
    <Box m="20px" sx={{bottom: "90px"}}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={nome}
          label="Classificação do DRE"
          onChange={handleChange}
          
        >
          
          {parametro.map((choice) => (
          <MenuItem key={choice.tipo} value={choice.tipo}>
            {choice.nome}
          </MenuItem>
        ))}
        
        </Select>

        <TextField id="outlined-helperText" label="Ano" defaultValue={2024} sx={{ left:"10px"}}/>
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