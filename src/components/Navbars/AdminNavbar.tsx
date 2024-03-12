/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useContext, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Navbar, Container, Nav, Dropdown, Button } from "react-bootstrap";
import { CurtainContext } from "layouts/Admin";

function Header() {

  const { setShowCurtain, setShowDescription } = useContext(CurtainContext);

  // TODO: This is an ugly workaround necessary to translate older javascript code.
  // This should be improved, but for now, it works
  const btnRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const mobileSidebarToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function () {
      if (btnRef.current) {
        const parentElement = btnRef.current.parentElement;        
        if(parentElement) parentElement.removeChild(btnRef.current);
      }
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  };

  return (
    <div ref={btnRef}>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
            <Button
              variant="dark"
              className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
              onClick={mobileSidebarToggle}
            >
              <i className="fas fa-ellipsis-v"></i>
            </Button>
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
            <span className="navbar-toggler-bar burger-lines"></span>
            <span className="navbar-toggler-bar burger-lines"></span>
            <span className="navbar-toggler-bar burger-lines"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav" className="d-flex justify-content-between">
            <Nav className="nav mr-auto" navbar>
              <Nav.Item>
                <Nav.Link className="m-0" href="#pablo" onClick={() => {setShowDescription(true); setShowCurtain(true);}}>
                  <span className="d-lg-block">About</span>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link className="m-0" href="#pablo" onClick={(e) => e.preventDefault()}>
                  <span className="d-lg-block">Settings</span>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link className="m-0" href="https://github.com/tearlant" target="_blank">
                  <span className="d-lg-block">Source Code</span>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Dropdown as={Nav.Item}>
                <Dropdown.Toggle
                  aria-expanded={false}
                  aria-haspopup={true}
                  as={Nav.Link}
                  data-toggle="dropdown"
                  id="navbarDropdownMenuLink"
                  variant="default"
                  className="m-0"
                >
                <span className="no-icon">Tool Stack</span>
                </Dropdown.Toggle>
                  <Dropdown.Menu aria-labelledby="navbarDropdownMenuLink">
                    <Dropdown.Item href="https://www.tensorflow.org/" target="_blank">Tensorflow</Dropdown.Item>
                    <Dropdown.Item href="https://dotnet.microsoft.com/en-us/apps/machinelearning-ai/ml-dotnet" target="_blank">ML.NET (Backend)</Dropdown.Item>
                    <Dropdown.Item href="https://www.tensorflow.org/api_docs/python/tf/keras/applications/inception_v3/InceptionV3" target="_blank">Inception (Tensorflow model)</Dropdown.Item>
                    <Dropdown.Item href="https://www.kaggle.com/datasets/" target="_blank">Kaggle (training data)</Dropdown.Item>
                    <div className="divider"></div>
                    <Dropdown.Item href="https://react.dev/" target="_blank">React</Dropdown.Item>
                    <Dropdown.Item href="https://recharts.org/en-US/" target="_blank">Recharts</Dropdown.Item>
                    <Dropdown.Item href="https://www.creative-tim.com/product/light-bootstrap-dashboard-react" target="_blank">Creative Tim</Dropdown.Item>
                    <Dropdown.Item href="https://react-bootstrap.netlify.app/" target="_blank">React Bootstrap</Dropdown.Item>
                    <Dropdown.Item href="https://mui.com/material-ui/" target="_blank">Material UI</Dropdown.Item>
                    <div className="divider"></div>
                    <Dropdown.Item>Hosted on AWS</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

              </Nav.Item>
            </Nav>
            <Nav className="ml-auto" navbar>
              <Nav.Link className="m-0" href="https://tearlant.com">
                <span className="d-lg-block">Return to portfolio</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>

  );
}

export default Header;
