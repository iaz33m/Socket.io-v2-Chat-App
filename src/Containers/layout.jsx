import React, { Component } from "react";
import { Container, Row } from "reactstrap";
import { Route, Switch } from "react-router-dom";

import Header from "../Components/Header";

import routes from "../routes";

class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Container>
          <Row>
            <Switch>
              {routes.map((r, i) => {
                return r.Component ? (
                  <Route
                    key={i}
                    path={r.path}
                    exact={r.exact}
                    render={p => <r.Component {...p} />}
                  />
                ) : null;
              })}
            </Switch>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default Layout;
