import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import { Link as RouterLink } from 'react-router-dom';
import logoSena from '../../assets/images/image.png';

export default function Navbar() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen((prevState) => !prevState);
    };

    const drawer = (
        <div>
            <List>
                {['Home', 'Login', 'AlertasStockPage','UsuariosPage','Inventario','ProductoPage'].map((text) => (
                    <ListItem
                        button
                        component={RouterLink}
                        to={`/${text.toLowerCase()}`}
                        key={text}
                        onClick={handleDrawerToggle} // Cerrar el drawer al seleccionar un item
                    >
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div>
            <AppBar position="fixed" sx={{ backgroundColor: 'rgb(220, 50, 190)' }}> {/* Color rosado */}
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box
                        component="img"
                        sx={{
                            height: 40,
                            marginRight: 2,
                        }}
                        src={logoSena}
                        alt="SENA Logo"
                    />
                    <Typography variant="h6" sx={{ flexGrow: 1, color: '#ffffff' }}> {/* Color del texto blanco */}
                        SISTEMA DE GESTION DE INVENTARIO
                    </Typography>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleDrawerToggle}
                        sx={{ display: { xs: 'block', md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {['Home', 'Login', 'AlertasStock', 'Usuarios','Inventario','Productos'].map((text) => (
                            <Typography
                            key={text}
                            sx={{ margin: 1, color: '#ffffff', textDecoration: 'none' }} /* Este es un comentario válido */
                            component={RouterLink}
                            to={`/${text.toLowerCase()}`}
                        >
                            {text}
                        </Typography>
                        
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Margen superior para evitar que el contenido quede tapado */}
            <Box sx={{ marginTop: '64px' }}>
                {/* Aquí iría el contenido de tu página */}
            </Box>

            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={handleDrawerToggle}
            >
                {drawer}
            </Drawer>
        </div>
    );
}
