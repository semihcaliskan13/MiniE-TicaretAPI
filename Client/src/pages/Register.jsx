import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HttpClientService from "../services/http-client-service";
import { Modal } from '@mui/material';

const theme = createTheme();

function Register() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const data2 = {
      "Name":data.get('firstName'),
      "Surname":data.get('lastName'),
      "Email":data.get('email'),
      "Password":data.get('password'),
      "PasswordConfirm":data.get('passwordAgain'),
      "UserName":data.get("userName")
    }
    HttpClientService.createUser(data2).then(function (response) {
      //handle success
      console.log(response.status);
    })
      .catch(function (error) {
        //handle error
        console.log(error.message);
      });

    
  };
  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  return (
    <ThemeProvider theme={theme}>
      <Button sx={{ color: "white" }} onClick={handleOpen}>KAYDOL</Button>
      
        <Container sx={{
          backgroundColor: "#ede9fe",
          borderRadius: 4
        }}
          component="main"
          maxWidth="xs" >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, width: 60, height: 60 }}
             
            >
            </Avatar>
            <Typography component="h1"
              variant="h5"
              sx={{ color: "#4f46e5" }}>
              KAYDOL
            </Typography>
            <Box component="form" noValidate
              onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    color="secondary"
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="Ad"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    color="secondary"
                    required
                    fullWidth
                    id="lastName"
                    label="Soyad"
                    name="lastName"
                    autoComplete="family-name"
                  />
                  
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    color="secondary"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    color="secondary"
                    required
                    fullWidth
                    id="userName"
                    label="Username"
                    name="userName"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    color="secondary"
                    required
                    fullWidth
                    name="password"
                    label="Şifre"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    color="secondary"
                    required
                    fullWidth
                    name="passwordAgain"
                    label="Şifre Tekrar"
                    type="password"
                    id="passwordAgain"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                size='large'
                variant="contained"
                sx={{
                  mt: 3, mb: 2,
                  backgroundImage: "linear-gradient(to right, blue, indigo, purple,fuchsia, pink)",
                  borderRadius: 2
                }}>
                Kaydol
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="#" variant="body2" sx={{ color: "#8b5cf6" }}>
                    Hesabın var mı? Giriş Yap
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
     
    </ThemeProvider>
  );
}
export default Register