import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Divider from '@mui/material/Divider';
import { Link as RouterLink } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

const Home = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center',
                padding: 4,
            }}
        >
            {/* Bienvenida principal */}
            <Container maxWidth="lg">
                <Paper elevation={6} sx={{ padding: 5, backgroundColor: '#f7b4ef', borderRadius: 2 }}>
                    <Typography variant="h3" gutterBottom sx={{ color: '#c2185b', fontWeight: 600 }}>
                        Bienvenido a Sion Fashion Shop
                    </Typography>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 400 }}>
                        Sistema de Gestión de Inventario
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 4, color: '#555' }}>
                        Aquí podrás administrar fácilmente los productos, y gestionar tu inventario con eficiencia.
                    </Typography>
                    <Divider sx={{ width: '80%', marginBottom: 4, mx: 'auto', borderColor: '#f8bbd0' }} />
                    {/* Opciones principales del sistema */}
                    <Grid container spacing={3} justifyContent="center">
                        <Grid item xs={12} sm={4}>
                            <Button
                                component={RouterLink}
                                to="/inventario"
                                variant="contained"
                                startIcon={<InventoryIcon />}
                                sx={{
                                    padding: '15px 25px',
                                    width: '100%',
                                    backgroundColor: '#e91e63', // Rosa oscuro
                                    '&:hover': { backgroundColor: '#ad1457' },
                                    fontSize: '1.1rem',
                                    fontWeight: 500,
                                    textTransform: 'none',
                                }}
                            >
                                Gestionar Inventario
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Button
                                component={RouterLink}
                                to="/usuarios"
                                variant="contained"
                                startIcon={<AddShoppingCartIcon />}
                                sx={{
                                    padding: '15px 25px',
                                    width: '100%',
                                    backgroundColor: '#e91e63', // Rosa claro
                                    '&:hover': { backgroundColor: '#ec407a' },
                                    fontSize: '1.1rem',
                                    fontWeight: 500,
                                    textTransform: 'none',
                                }}
                            >
                                Gestionar Usuarios
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Button
                                component={RouterLink}
                                to="/productos"
                                variant="contained"
                                startIcon={<TrendingUpIcon />}
                                sx={{
                                    padding: '15px 25px',
                                    width: '100%',
                                    backgroundColor: '#d81b60', // Rosa intenso
                                    '&:hover': { backgroundColor: '#c2185b' },
                                    fontSize: '1.1rem',
                                    fontWeight: 500,
                                    textTransform: 'none',
                                }}
                            >
                                Gestionar Productos
                            </Button>
                        </Grid>
                    </Grid>
                    <Divider sx={{ width: '80%', marginTop: 4, mx: 'auto', borderColor: '#f8bbd0' }} />
                    {/* Descripción adicional */}
                    <Typography variant="body2" sx={{ marginTop: 3, color: '#777' }}>
                        Mantén tu inventario actualizado y mejora la eficiencia en la gestión de tus productos y ventas.
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
};

export default Home;
