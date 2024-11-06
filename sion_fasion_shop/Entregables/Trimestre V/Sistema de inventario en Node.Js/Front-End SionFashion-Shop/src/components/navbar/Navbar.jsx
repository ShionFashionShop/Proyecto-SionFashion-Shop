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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

export default function Navbar() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openGroup, setOpenGroup] = useState(null);

    const handleDrawerToggle = () => {
        setDrawerOpen((prevState) => !prevState);
    };

    const pageGroups = [
        { title: 'Gestión Stock', pages: ['alertasstock', 'usuarios'] },
        { title: 'Inventario', pages: ['inventario', 'productos', 'empresas', 'facturas'] },
        { title: 'Gestión Trabajo', pages: ['clientes', 'empleados', 'roles', 'proveedores'] },
        { title: 'Categorías e Historial', pages: ['categorias', 'historial-inventario', 'tiendas'] }
    ];

    const handleChangeGroup = (event) => {
        setSelectedGroup(event.target.value);
    };

    const handleMenuOpen = (event, groupIndex) => {
        setAnchorEl(event.currentTarget);
        setOpenGroup(groupIndex);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setOpenGroup(null);
    };

    const drawer = (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>Selecciona un grupo de páginas</Typography>
            <Select
                value={selectedGroup}
                onChange={handleChangeGroup}
                fullWidth
                displayEmpty
                sx={{ marginBottom: 2 }}
            >
                {pageGroups.map((group, index) => (
                    <MenuItem key={index} value={index}>
                        {group.title}
                    </MenuItem>
                ))}
            </Select>
            <List>
                {pageGroups[selectedGroup].pages.map((text) => (
                    <ListItem
                        button
                        component={RouterLink}
                        to={`/${text.toLowerCase()}`}
                        key={text}
                        onClick={handleDrawerToggle}
                    >
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <AppBar position="fixed" sx={{ backgroundColor: 'rgb(220, 50, 190)' }}>
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
                    <Typography variant="h6" sx={{ flexGrow: 1, color: '#ffffff' }}>
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
                        <Typography
                            sx={{ margin: 1, color: '#ffffff', textDecoration: 'none' }}
                            component={RouterLink}
                            to="/home"
                        >
                            Home
                        </Typography>
                        <Typography
                            sx={{ margin: 1, color: '#ffffff', textDecoration: 'none' }}
                            component={RouterLink}
                            to="/login"
                        >
                            Login
                        </Typography>
                        {pageGroups.map((group, index) => (
                            <div key={index}>
                                <Typography
                                    sx={{ margin: 1, color: '#ffffff', cursor: 'pointer' }}
                                    onClick={(event) => handleMenuOpen(event, index)}
                                >
                                    {group.title}
                                </Typography>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl) && openGroup === index}
                                    onClose={handleMenuClose}
                                >
                                    {group.pages.map((page) => (
                                        <MenuItem
                                            key={page}
                                            component={RouterLink}
                                            to={`/${page.toLowerCase()}`}
                                            onClick={handleMenuClose}
                                        >
                                            {page}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </div>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
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
