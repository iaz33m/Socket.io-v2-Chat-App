import React, { Component } from "react";

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav } from "reactstrap";

class Header extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Chat App</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar />
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
