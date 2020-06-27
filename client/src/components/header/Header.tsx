import {
  AppBar,
  Drawer,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Menu, Home, Search, LibraryMusic } from "@material-ui/icons";

import React from "react";
import { stateType, setSideMenuVisibility } from "../../store/slice";
import { connect } from "react-redux";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { NavLink } from "react-router-dom";
import {makeStyles} from "@material-ui/styles";

interface HeaderProps {
  title: string;
  songProgress?: number;
  setSideMenuVisibility: ActionCreatorWithPayload<boolean>;
  isSideMenuOpen: boolean;
}

export const SIDE_MENU_OPTIONS = {
  HOME: "Home",
  SEARCH: "Search",
  LIBRARY: "Library",
};

const sideMenuIcons = {
  [SIDE_MENU_OPTIONS.HOME]: <Home/>,
  [SIDE_MENU_OPTIONS.SEARCH]: <Search/>,
  [SIDE_MENU_OPTIONS.LIBRARY]: <LibraryMusic/>,
};

const useStyles = makeStyles((theme) => ({
  drawer: {
    backgroundColor: "#333"
  },
  link: {
    color: "#fff",
    textDecoration: "none"
  },
  activeLink: {
    backgroundColor: "#fff"
  }
}))

const Header = ({
  title = "Music Player",
  songProgress,
  setSideMenuVisibility,
  isSideMenuOpen,
  ...props
}: HeaderProps) => {
  const styles = useStyles();
  return (
    <>
      <AppBar {...props} color="primary" position="static">
        <Toolbar>
          <IconButton onClick={() => setSideMenuVisibility(true)}>
            <Menu />
          </IconButton>
          <Typography variant="h6">{title}</Typography>
        </Toolbar>
        {songProgress && (
          <LinearProgress variant="determinate" value={songProgress} />
        )}
      </AppBar>
      <Drawer
        classes={{paper: styles.drawer}}
        color="primary"
        anchor="left"
        open={isSideMenuOpen}
        onClose={() => setSideMenuVisibility(false)}
      >
        <div
          role="presentation"
          onClick={() => setSideMenuVisibility(false)}
          onKeyDown={() => setSideMenuVisibility(false)}
        >
          <List>
            {Object.values(SIDE_MENU_OPTIONS).map((label) => (
              <NavLink to={`/${label.toLowerCase()}`} className={styles.link} activeClassName={styles.activeLink}>
                <ListItem button key={label}>
                  <ListItemIcon>{sideMenuIcons[label]}</ListItemIcon>
                  <ListItemText primary={label} />
                </ListItem>
              </NavLink>
            ))}
          </List>
        </div>
      </Drawer>
    </>
  );
};
const mapStateToProps = (state: stateType) => ({
  songProgress: (state.song.currentTime / state.song.duration) * 100 + 0.1,
  isSideMenuOpen: state.sideMenuVisibility,
});

const mapDispatchToProps = {
  setSideMenuVisibility,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
