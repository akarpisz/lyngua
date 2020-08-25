import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import navbarL from "../images/navbarL.png";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  //NavbarText
} from "reactstrap";

const TopMenu = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const style = {
    color: "white",
  };
  const toggle = () => setIsOpen(!isOpen);
  //const { id } = useParams();
  return (
    <div>
      <Router>
        <Navbar color="dark" light expand="md">
          <NavbarBrand id="brand">
            <Link to="/">
              <img src={navbarL} alt="logo L" id="nav-L" />
              yngua
            </Link>
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink style={style} href="https://github.com/akarpisz/">
                  Drew's GitHub
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle style={style} nav caret>
                  Menu
                </DropdownToggle>
                <DropdownMenu className="drop" right>
                  <DropdownItem>
                    <NavItem>
                      <NavLink tag={Link} id="login" to="/login">
                        Login
                      </NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink tag={Link} id="signup" to="/signup">
                        Signup
                      </NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      {/* https://reactrouter.com/web/example/auth-workflow */}
                      {/* <NavLink tag={Link} to={`/user/:id`}>
                        User Home
                      </NavLink> */}
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem divider />
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </Router>
    </div>
  );
};

export default TopMenu;
