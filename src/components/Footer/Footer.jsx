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
import React, { Component } from "react";
import { Container } from "react-bootstrap";

class Footer extends Component {
  render() {
    return (
      <footer className="footer px-0 px-lg-3">
        <Container fluid>
          <nav>
            <ul className="footer-menu">
              <li>
                <a href="https://www.tearlant.com/" target="_blank">
                  Home
                </a>
              </li>
              <li>
                <a href="https://www.tearlant.com/#portfolio" target="_blank">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="https://www.tearlant.com/contact/" target="_blank">
                  Contact me
                </a>
              </li>
            </ul>
            <p className="copyright text-center">
              © {new Date().getFullYear()}{" "}
              <a href="http://www.tearlant.com">Patterns on a Screen</a>, all rights reserved.
            </p>
          </nav>
        </Container>
      </footer>
    );
  }
}

export default Footer;
