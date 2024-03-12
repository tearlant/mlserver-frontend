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

export enum ModelSelection {
  None = '',
  Animals = 'animals',
  Diamonds = 'diamonds',
  Custom = 'custom'
}

export interface LocalRoute {
  path: string;
  name: string;
  icon: string;
  component: typeof Dashboard;
  layout: string;
  loadedModel: ModelSelection;
  redirect?: boolean;
}

const dashboardRoutes: LocalRoute[] = [
  {
    path: "/animals",
    name: "Animals",
    icon: "nc-icon nc-stre-right",
    component: Dashboard,
    layout: "/admin",
    loadedModel: ModelSelection.Animals
  },
  {
    path: "/diamonds",
    name: "Diamonds",
    icon: "nc-icon nc-stre-right",
    component: Dashboard,
    layout: "/admin",
    loadedModel: ModelSelection.Diamonds
  },
  {
    path: "/custom",
    name: "Custom Model",
    icon: "nc-icon nc-simple-add",
    component: Dashboard,
    layout: "/admin",
    loadedModel: ModelSelection.Custom
  }
];

export default dashboardRoutes;
