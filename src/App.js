import './App.css';
import Carlist from './components/Carlist';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function App() {
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Carshop
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    <Carlist/>
    </div>
  );
}

export default App;
