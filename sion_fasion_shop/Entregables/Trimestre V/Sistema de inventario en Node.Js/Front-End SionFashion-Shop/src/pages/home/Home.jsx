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
import '../../theme/AppGeneral.css';


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
                backgroundColor: '#f4f4f4',
                padding: 4
            }}
        >
            {/* Bienvenida principal */}
            <Typography variant="h3" gutterBottom sx={{ color: '#007832', fontWeight: 'bold' }}>
                Bienvenido a Sion Fashion Shop
            </Typography>
            <Typography variant="h5" gutterBottom>
                Sistema de Gestión de Inventario
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 3 }}>
                Aquí podrás administrar fácilmente los productos, realizar seguimientos de ventas y gestionar tu inventario con eficiencia.
            </Typography>

            <Divider sx={{ width: '80%', marginBottom: 3 }} />

            {/* Opciones principales del sistema */}
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} sm={4}>
                    <Button
                        component={RouterLink}
                        to="/inventory"
                        variant="contained"
                        color="primary"
                        startIcon={<InventoryIcon />}
                        sx={{
                            padding: 2,
                            width: '100%',
                            backgroundColor: '#007832',
                            '&:hover': { backgroundColor: '#005f29' },
                        }}
                    >
                        Gestionar Inventario
                    </Button>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Button
                        component={RouterLink}
                        to="/orders"
                        variant="contained"
                        color="secondary"
                        startIcon={<AddShoppingCartIcon />}
                        sx={{
                            padding: 2,
                            width: '100%',
                            backgroundColor: '#6a1b9a',
                            '&:hover': { backgroundColor: '#4a148c' },
                        }}
                    >
                        Gestionar Pedidos
                    </Button>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Button
                        component={RouterLink}
                        to="/sales"
                        variant="contained"
                        color="success"
                        startIcon={<TrendingUpIcon />}
                        sx={{
                            padding: 2,
                            width: '100%',
                            backgroundColor: '#2e7d32',
                            '&:hover': { backgroundColor: '#1b5e20' },
                        }}
                    >
                        Ver Reportes de Ventas
                    </Button>
                </Grid>
            </Grid>

            <Divider sx={{ width: '80%', marginTop: 3 }} />

            {/* Descripción adicional */}
            <Typography variant="body2" sx={{ marginTop: 3, color: '#555' }}>
                Mantén tu inventario actualizado y mejora la eficiencia en la gestión de tus productos y ventas.
            </Typography>
        </Box>
    );
};

export default Home;
