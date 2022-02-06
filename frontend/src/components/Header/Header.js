import React from 'react';
import {Navbar, Nav, Container, Button, Form, FormControl, NavDropdown} from  'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { logout } from '../../actions/userActions';

const Header = ({setSearch}) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)

  const {userInfo} = userLogin

  const logoutHandler = () => {
    dispatch(logout())

    navigate('/')
  }

  return(
    <>
        <Navbar bg="primary" expand="lg" variant='dark'>
          <Container>
            <Navbar.Brand>
              <Link to='/'>DigiClass</Link>
              </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className='m-auto'>
                <Form className="d-flex">
                    <FormControl
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </Form>
              </Nav>
              {userInfo ?<Nav
                className=" my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link>
                  <Link to='/mynotes'>My Notes</Link>
                </Nav.Link>
                <NavDropdown title={userInfo?.name} id="navbarScrollingDropdown">
                  <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>: <Nav>
                  {""}
                  <Nav.Link>
                    <Link to='/login'>Log In</Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link to='/register'>Sign Up</Link>
                  </Nav.Link>
                </Nav>}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
};

export default Header;
