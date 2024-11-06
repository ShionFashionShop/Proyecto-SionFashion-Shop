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
import logoSena from '../../assets/images/image2.png';
import '../../theme/AppGeneral.css'


export default function Navbar() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen((prevState) => !prevState);
    };

    const drawer = (
        <div className="">
            <List>
                {['Home', 'Login', 'AlertasStockPage', 'UsuariosPage', 'Inventario', 'ProductoPage', 'EmpresasPage', 'FacturasPage', 'ClientesPage', 'EmpleadoPage', 'RolesPage', 'ProveedoresPage', 'CategoriasPage', 'Historial_inventarioPage', 'TiendaPage'].map((text) => (
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
        <div className="encabezado">
            <AppBar>
                <Toolbar className="d-flex flex-column">
                    <div className="principal d-flex justify-content-between w-100 p-2 ">
                        <div className=" d-flex justify-content-start col-sm-3 col-sm-3 col-md-3 col-lg-3">
                            <Box className="logo" component="img" src={logoSena} alt="Sion Fashion Shop" />
                            <Typography className="nombreApp d-flex align-items-center"> {/* Color del texto blanco */}
                                Sion Fashion Shop
                            </Typography>
                            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle} sx={{ display: { xs: 'block', md: 'none' } }} ><MenuIcon /></IconButton>
                        </div>

                        <div className="d-flex justify-content-end col-sm-5 col-sm-5 col-md-5 col-lg-5">
                            <Box className="d-flex align-items-center" >
                                {['Home', 'Login'].map((text) => (
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
                        </div>

                    </div>
                    <div className="menu d-flex justify-content-between w-100">
                        <Box className="d-flex align-items-center" >
                            {['AlertasStock', 'Usuarios',
                                'Inventario', 'Productos', 'Empresas',
                                'Facturas', 'Clientes', 'Empleados', 'Users-Roles',
                                'Proveedores', 'Categorias', 'Historial Inventario', 'Tiendas'].map((text) => (
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
                    </div>
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
        </div >
    );
}
