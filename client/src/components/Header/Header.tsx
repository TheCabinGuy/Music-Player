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
  Typography
} from "@material-ui/core";
import { Menu, Home, Search, LibraryMusic, Queue } from "@material-ui/icons";

import React from "react";
import { StateType, SET_SIDE_MENU_VISIBILITY } from "../../store/slice";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

interface HeaderProps {
  title: string;
  songProgress?: number;
  onSideMenuClick: (val: boolean) => void;
  isSideMenuOpen?: boolean;
  songTitle?: string;
}

export const SIDE_MENU_OPTIONS = {
  HOME: "Home",
  SEARCH: "Search",
  LIBRARY: "Library",
  QUEUE: "Queue"
};

const sideMenuIcons = {
  [SIDE_MENU_OPTIONS.HOME]: <Home />,
  [SIDE_MENU_OPTIONS.SEARCH]: <Search />,
  [SIDE_MENU_OPTIONS.LIBRARY]: <LibraryMusic />,
  [SIDE_MENU_OPTIONS.QUEUE]: <Queue />
};

const useStyles = makeStyles({
  root: {
    marginBottom: 15
  },
  title: {
    flexGrow: 1
  },
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
});

const Header = ({
  title = "Music Player",
  songTitle,
  songProgress,
  onSideMenuClick,
  isSideMenuOpen,
  ...props
}: HeaderProps) => {
  const styles = useStyles();
  return (
    <>
      <AppBar {...props} className={styles.root} color="primary" position="static">
        <Toolbar>
          <IconButton onClick={() => onSideMenuClick(true)}>
            <Menu />
          </IconButton>
          <Typography variant="h6" className={styles.title}>
            {title}
          </Typography>
          {songTitle && <Typography align="right">{songTitle}</Typography>}
        </Toolbar>
        {songProgress && <LinearProgress variant="determinate" value={songProgress} />}
      </AppBar>
      <Drawer
        classes={{ paper: styles.drawer }}
        color="primary"
        anchor="left"
        open={isSideMenuOpen}
        onClose={() => onSideMenuClick(false)}
      >
        <div
          role="presentation"
          onClick={() => onSideMenuClick(false)}
          onKeyDown={() => onSideMenuClick(false)}
        >
          <List>
            {Object.values(SIDE_MENU_OPTIONS).map(label => (
              <NavLink
                key={label}
                to={`/${label.toLowerCase()}`}
                className={styles.link}
                activeClassName={styles.activeLink}
              >
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

const mapStateToProps = (state: StateType) => ({
  songProgress: (state.currentSong.currentTime / state.currentSong.duration) * 100 + 0.1,
  isSideMenuOpen: state.sideMenuVisibility,
  songTitle: state.currentSong.songName
});

const mapDispatchToProps = {
  onSideMenuClick: SET_SIDE_MENU_VISIBILITY
};

export { Header };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
