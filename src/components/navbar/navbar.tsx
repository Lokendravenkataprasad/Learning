import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import './navbar.css';
import { Link } from 'react-router-dom';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Todo', path: '/todo' },
  { name: 'Chatbot', path: '/chatbot' },
  { name: 'Shopping Cart', path: '/shopping-cart' },
  { name: 'Api Fetching', path: '/api-fetching' },
];

function Navbar() {
  return (
    <AppBar position="static" className={'container'}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
            className="pages-container"
          >
            {pages.map((page) => (
              <Link to={page.path} style={{ textDecoration: 'none' }} key={page.path}>
                <Button
                  className="tab-name"
                  sx={{
                    my: 2,
                    color: 'white',
                    display: 'block',
                    textDecoration: 'none',
                  }}
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
