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
import { ComponentType, ReactElement } from "react";
import Dashboard from "./views/Dashboard";

export enum LoadedModel {
  Diamonds,
  Flowers,
  Custom
}

export interface LocalRoute {
  path: string;
  name: string;
  icon: string;
  component: typeof Dashboard;
  layout: string;
  loadedModel: LoadedModel;
  redirect?: boolean;
}

const dashboardRoutes: LocalRoute[] = [
  {
    path: "/diamonds",
    name: "Diamonds",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
    loadedModel: LoadedModel.Diamonds
  },
  {
    path: "/flowers",
    name: "Flowers",
    icon: "nc-icon nc-circle-09",
    component: Dashboard,
    layout: "/admin",
    loadedModel: LoadedModel.Flowers
  },
  {
    path: "/custom",
    name: "Custom Model",
    icon: "nc-icon nc-paper-2",
    component: Dashboard,
    layout: "/admin",
    loadedModel: LoadedModel.Custom
  }
];

export default dashboardRoutes;
