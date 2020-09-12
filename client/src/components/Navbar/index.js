import React, { useState } from "react";
import { Link } from "react-router-dom";
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
  Button
  //NavbarText
} from "reactstrap";


const TopMenu2 = (props) => {
  const {login, setLogin} = props;
  const [isOpen, setIsOpen] = useState(false);


  const style = {
    color: "white",
  };
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" light expand="md">
        <NavbarBrand id="brand" href="/">
          <img src={navbarL} alt="logo L" id="nav-L" />
          yngua
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
              
              {login ? (
                <>
                <DropdownToggle style={style} nav caret>
                Welcome
              </DropdownToggle>
                <DropdownMenu className="drop" right>
                  <DropdownItem>
                    <NavItem>
                      <NavLink tag={Link} id="navuserhome"to="/userhome">
                        Home
                      </NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink tag={Link} id="navmsgs" to="/messages">
                        Messages
                      </NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink tag={Link} id="navsaved" to="/saved">
                        Saved Translations
                      </NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem divider />
                </DropdownMenu>
                </>
              ) : (
                <>
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
                    <NavItem></NavItem>
                  </DropdownItem>
                  <DropdownItem divider />
                </DropdownMenu>
                </>
              )}
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

const TopMenu = (props) => {

  const {login, setLogin} = props;
  const [isOpen, setIsOpen] = useState(false);


  const style = {
    color: "white",
  };
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <a className="navbar-brand" style={{color:"#3498db"}} href="/"><img src={navbarL} alt="logo L" id="nav-L" />
          yngua</a>
  {/* <Button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </Button> */}
  <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} className="collapse navbar-collapse" id="navbarColor02" navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              
            <UncontrolledDropdown nav inNavbar>
              
              {login ? (
                <>
                <DropdownToggle style={style} nav caret>
                Welcome
              </DropdownToggle>
                <DropdownMenu className="drop" right>
                  <DropdownItem>
                    <NavItem>
                      <NavLink tag={Link} to="/userhome">
                        Home
                      </NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink tag={Link}  to="/messages">
                        Messages
                      </NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink tag={Link}  to="/saved">
                        Saved Translations
                      </NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink tag={Link}  to="/newtranslation">
                        Add New Trans.
                      </NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem divider />
                </DropdownMenu>
                </>
              ) : (
                <>
                <DropdownToggle style={style} nav caret>
                Menu
              </DropdownToggle>
                <DropdownMenu className="drop" right>
                  <DropdownItem>
                    <NavItem>
                      <NavLink className="nav-link" tag={Link} id="login" to="/login">
                        Login
                      </NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem>
                    <NavItem>
                      <NavLink className="nav-link" tag={Link} id="signup" to="/signup">
                        Signup
                      </NavLink>
                    </NavItem>
                  </DropdownItem>
                  <DropdownItem divider />
                </DropdownMenu>
                </>
              )}
            </UncontrolledDropdown>
            {/* <NavLink style={style} href="https://github.com/akarpisz/">
                Drew's GitHub
              </NavLink> */}
            </NavItem>
          </Nav>
        </Collapse>
  
</Nav>
  )
};



export default TopMenu;
