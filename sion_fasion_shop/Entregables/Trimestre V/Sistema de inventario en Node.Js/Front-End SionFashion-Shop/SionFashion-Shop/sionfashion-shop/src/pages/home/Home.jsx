import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Link as RouterLink } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const Home = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f7b4ef, #c2185b)',
                color: '#fff',
                padding: 4,
                overflow: 'hidden',
            }}
        >
            <Container maxWidth="lg">
                <Paper
                    elevation={8}
                    sx={{
                        padding: 6,
                        borderRadius: 3,
                        textAlign: 'center',
                        backgroundColor: '#fff',
                        color: '#333',
                        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.15)',
                        marginBottom: 6,
                    }}
                >
                    <Typography variant="h3" gutterBottom sx={{ fontWeight: 600, color: '#c2185b' }}>
                        Bienvenido a Sion Fashion Shop
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 400, color: '#555', marginBottom: 3 }}>
                        Gestión de Inventario Innovadora y Eficiente
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#777', marginBottom: 5 }}>
                        Administra tus productos, usuarios y optimiza el inventario para maximizar la eficiencia.
                    </Typography>

                    {/* Sección de botones de navegación */}
                    <Grid container spacing={4} justifyContent="center">
                        <Grid item xs={12} sm={4}>
                            <Button
                                component={RouterLink}
                                to="/inventario"
                                variant="contained"
                                startIcon={<InventoryIcon />}
                                sx={{
                                    padding: '12px 20px',
                                    width: '100%',
                                    backgroundColor: '#ff8a65',
                                    color: '#fff',
                                    borderRadius: 2,
                                    fontWeight: 500,
                                    fontSize: '1.1rem',
                                    textTransform: 'none',
                                    boxShadow: '0px 4px 8px rgba(255, 138, 101, 0.5)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: '#ff7043',
                                        transform: 'translateY(-3px)',
                                    },
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
                                startIcon={<PeopleIcon />}
                                sx={{
                                    padding: '12px 20px',
                                    width: '100%',
                                    backgroundColor: '#ba68c8',
                                    color: '#fff',
                                    borderRadius: 2,
                                    fontWeight: 500,
                                    fontSize: '1.1rem',
                                    textTransform: 'none',
                                    boxShadow: '0px 4px 8px rgba(186, 104, 200, 0.5)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: '#ab47bc',
                                        transform: 'translateY(-3px)',
                                    },
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
                                    padding: '12px 20px',
                                    width: '100%',
                                    backgroundColor: '#64b5f6',
                                    color: '#fff',
                                    borderRadius: 2,
                                    fontWeight: 500,
                                    fontSize: '1.1rem',
                                    textTransform: 'none',
                                    boxShadow: '0px 4px 8px rgba(100, 181, 246, 0.5)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: '#42a5f5',
                                        transform: 'translateY(-3px)',
                                    },
                                }}
                            >
                                Gestionar Productos
                            </Button>
                        </Grid>
                    </Grid>

                    {/* Sección de estadísticas rápidas */}
                    <Stack
                        direction="row"
                        spacing={3}
                        sx={{
                            marginTop: 6,
                            justifyContent: 'center',
                        }}
                    >
                        <Box textAlign="center">
                            <Avatar sx={{ bgcolor: '#ff7043', width: 56, height: 56 }}>
                                <InventoryIcon />
                            </Avatar>
                            <Typography variant="h6" sx={{ marginTop: 1 }}>Total Productos</Typography>
                            <Typography variant="h4">1</Typography>
                        </Box>
                        <Box textAlign="center">
                            <Avatar sx={{ bgcolor: '#ab47bc', width: 56, height: 56 }}>
                                <PeopleIcon />
                            </Avatar>
                            <Typography variant="h6" sx={{ marginTop: 1 }}>Usuarios Activos</Typography>
                            <Typography variant="h4">1</Typography>
                        </Box>
                        <Box textAlign="center">
                            <Avatar sx={{ bgcolor: '#42a5f5', width: 56, height: 56 }}>
                                <BarChartIcon />
                            </Avatar>
                            <Typography variant="h6" sx={{ marginTop: 1 }}>Ventas Hoy</Typography>
                            <Typography variant="h4">1</Typography>
                        </Box>
                    </Stack>
                </Paper>

                {/* Sección de lema inspirador */}
                <Paper
                    sx={{
                        padding: 4,
                        borderRadius: 3,
                        textAlign: 'center',
                        background: 'rgba(255, 255, 255, 0.8)',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <Typography variant="h5" sx={{ color: '#333', fontWeight: 500 }}>
                        "Potencia tu negocio con gestión de inventario moderna y eficiente"
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666', marginTop: 2 }}>
                        Administra fácilmente tus recursos, optimiza tus operaciones y haz crecer tu negocio con Sion Fashion Shop.
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
};

export default Home;
