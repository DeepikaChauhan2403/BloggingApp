
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';

// function Header() {
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/login";
//   };

//   const token = localStorage.getItem("token");
//   return (
//     <Navbar expand="lg" className="bg-body-tertiary">
//       <Container>
//         <Navbar.Brand href="/homepage">Blogging App</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             <Nav.Link href="/homepage">Home</Nav.Link>
//             <Nav.Link href="/create-blog">Create Blog</Nav.Link>
//             <Nav.Link href="/my-blogs">My Blogs</Nav.Link>
//             <Nav.Link href="/follower-list">Follower List</Nav.Link>
//             <Nav.Link href="/following-list">Following List</Nav.Link>
//             <Nav.Link href="/users">Users</Nav.Link>
//             {
//               token ? (
//                 <>
//                   <Nav.Link href="#" onClick={handleLogout}>Logout</Nav.Link>
//                 </>
//               ) : (
//                 <>
//                   <Nav.Link href="/login">Login</Nav.Link>
//                   <Nav.Link href="/">Register</Nav.Link>
//                 </>
//               )
//             }
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default Header;

import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ArticleIcon from '@mui/icons-material/Article'; // Blog icon

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const pages = [
    { label: 'Home', link: '/homepage' },
    { label: 'Create Blog', link: '/create-blog' },
    { label: 'My Blogs', link: '/my-blogs' },
    { label: 'Follower List', link: '/follower-list' },
    { label: 'Following List', link: '/following-list' },
    { label: 'Users', link: '/users' },
    { label: 'Bin', link: '/my-deleted-blogs' }
  ];

  const settings = ['Logout', 'Profile'];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (link) => {
    setAnchorElNav(null);
    if (link) navigate(link);
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    if (setting === 'Logout') {
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      localStorage.removeItem('email');
      localStorage.removeItem('username');
      navigate('/login');
    } else if (setting === 'Profile') {
      navigate('/profile');
    } 
  };

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <ArticleIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
              // cursor: 'pointer'
            }}
          >
            HashBlog
          </Typography>

          {/* Mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            {token && (
              <IconButton size="large" color="inherit" onClick={handleOpenNavMenu}>
                <MenuIcon />
              </IconButton>
            )}

            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={() => handleCloseNavMenu()}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={() => handleCloseNavMenu(page.link)}>
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Mobile logo */}
          {/* <ArticleIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            // onClick={() => navigate('/homepage')}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
              // cursor: 'pointer'
            }}
          >
            HashBlog
          </Typography>

          {/* Desktop menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {/* {pages.map((page) => (
              <Button
                key={page.label}
                onClick={() => handleCloseNavMenu(page.link)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.label}
              </Button>
            ))} */}
            {token && (
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Button
                    key={page.label}
                    onClick={() => handleCloseNavMenu(page.link)}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page.label}
                  </Button>
                ))}
              </Box>
            )}

          </Box>

          {/* Avatar & settings */}
          {localStorage.getItem("token") && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title={username} arrow>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    sx={{
                      bgcolor: "#fff",
                      color: "#1976d2",
                    }}
                  >
                    {username?.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={() => handleCloseUserMenu()}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
