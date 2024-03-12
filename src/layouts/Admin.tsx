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
import React, { Component, Dispatch, SetStateAction, createContext, useContext, useEffect, useRef, useState } from "react";
import { useLocation, Route, Routes } from "react-router-dom";

import AdminNavbar from "../components/Navbars/AdminNavbar";
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/Sidebar/Sidebar";

import routes, { LocalRoute } from "../routes";

import sidebarImage from "assets/img/sidebar-3.jpg";
import axios from "axios";

interface MobileModeContextType {
  isMobile: boolean;
}

const MobileModeContext = createContext<MobileModeContextType>({
  isMobile: false,
});

interface CurtainContextType {
  showCurtain: boolean;
  setShowCurtain: Dispatch<SetStateAction<boolean>>;
  showDescription: boolean;
  setShowDescription: Dispatch<SetStateAction<boolean>>;
}

export const CurtainContext = createContext<CurtainContextType>({
  showCurtain: true,
  setShowCurtain: () => {},
  showDescription: true,
  setShowDescription: () => {}
});

export const useMobileMode = () => useContext(MobileModeContext);

function Admin() {
  const [image, setImage] = useState(sidebarImage);
  const [color, setColor] = useState("black");
  const [hasImage, setHasImage] = useState(true);

  const location = useLocation();
  const mainPanel = useRef<HTMLDivElement>(null);

  const [showCurtain, setShowCurtain] = useState(true);
  const [showDescription, setShowDescription] = useState(true);

  useEffect(() => {
    axios.defaults.withCredentials = true;

    document.documentElement.scrollTop = 0;
    if (document.scrollingElement !== null) document.scrollingElement.scrollTop = 0;
    if (mainPanel.current !== null) mainPanel.current.scrollTop = 0;

    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      if (element !== null && element.parentNode !== null) element.parentNode.removeChild(element);
    }
  }, [location]);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check on component mount

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <CurtainContext.Provider value={{ showCurtain: showCurtain, setShowCurtain: setShowCurtain, showDescription: showDescription, setShowDescription: setShowDescription }}>
        <MobileModeContext.Provider value={{ isMobile }}>
          <div className="wrapper">
            <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
            <div className="main-panel" ref={mainPanel}>
              <AdminNavbar />
              <div className="content">
                <Routes>
                  {routes.map((route, index) => <Route key={route.path} path={route.path} element={<route.component modelToLoad={route.loadedModel}/>}></Route>)}
                </Routes>
              </div>
              <Footer />
            </div>
          </div>
          {/*
          <FixedPlugin
            hasImage={hasImage}
            setHasImage={() => setHasImage(!hasImage)}
            color={color}
            setColor={(color) => setColor(color)}
            image={image}
            setImage={(image) => setImage(image)}
          />*/}
        </MobileModeContext.Provider>
      </CurtainContext.Provider>
    </>
  );
}

export default Admin;
