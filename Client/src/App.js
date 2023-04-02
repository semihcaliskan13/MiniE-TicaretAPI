import { Box, Stack, ThemeProvider } from "@mui/material";
import Feed from "./layout/Feed";
import Navbar from "./layout/Navbar";
import { theme } from './theme'
import './style.css'
function App() {
  return (

    <ThemeProvider theme={theme}>
      <Box sx={{margin:0}}>                
          <Feed />                  
      </Box>
    </ThemeProvider>
  );
}

export default App;
