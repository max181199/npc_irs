/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Custom styles for the SidenavCollapse
import {
  collapseItem,
  collapseIconBox,
  collapseListIcon,
  collapseText,
} from "examples/Sidenav/styles/sidenavCollapse";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";
import { useState } from "react";



function SidenavList({name, openList, setOpenList, ...rest }) {
  const [controller] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller;

  return (
    <ListItem component="li">
      <MDBox
        {...rest}
        sx={(theme) =>
          collapseItem(theme, {
            active: false,
            transparentSidenav,
            whiteSidenav,
            darkMode,
            sidenavColor,
          })
        }
        onClick={()=>{setOpenList()}}
      >
        <ListItemIcon
          sx={(theme) =>
            collapseIconBox(theme, { transparentSidenav, whiteSidenav, darkMode, active: false, color:'white' })
          }
        >
          {
            !openList
            ?
            <Icon sx={(theme) => collapseListIcon(theme, { transparentSidenav, whiteSidenav, darkMode, active: false })}>expand_more</Icon>
            :
            <Icon sx={(theme) => collapseListIcon(theme, { transparentSidenav, whiteSidenav, darkMode, active: false })}>expand_less</Icon>
          }
        </ListItemIcon>

        <ListItemText
          primary={name}
          sx={(theme) =>
            collapseText(theme, {
              miniSidenav,
              transparentSidenav,
              whiteSidenav,
              active: false,
            })
          }
        />
      </MDBox>
    </ListItem>
  );
}


// Typechecking props for the SidenavCollapse
SidenavList.propTypes = {
  name: PropTypes.string.isRequired,
  openList: PropTypes.bool.isRequired,
  setOpenList: PropTypes.func.isRequired,
};

export default SidenavList
