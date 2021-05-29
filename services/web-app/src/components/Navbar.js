import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link, useLocation } from "react-router-dom";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const useStyles = makeStyles(theme => ({
  menuOptions: {
    marginLeft: 'auto'
  },
  uiMenuOptions: {
    float: "left"
  },  
  dropdownText: {
    margin: theme.spacing(0, 0.5, 0, 1)
   } ,
  dropdownIcon: {
    marginBottom: -4
  }
}));

const uiOptions = [
  {
    text: 'Clothes Try-on',
    links: ['/try/cloth'],
    link: "/try/cloth"
  },
  {
    text: 'Sunglasses Try-on',
    links: ['/try/sunglasses'],
    link: "/try/sunglasses"
  }
]

export default function Navbar({ 
  classes,
  open,
  isTimelineOpen,
  handleDrawerOpen,
  openTour
}) {
  const navbarClasses = useStyles();

  const [uiAnchorEl, setUIAnchorEl] = React.useState(null);
  const isUIMenuOpen = Boolean(uiAnchorEl);
  const currentPath = useLocation().pathname;
  
  let selectedUIOption = uiOptions.filter(({links}) => links.some(link => currentPath === link))[0]
  if(selectedUIOption) selectedUIOption = selectedUIOption.text;

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarLeftShift]: open,
        [classes.appBarRightShift]: isTimelineOpen,
        [classes.appBarShift]: open&&isTimelineOpen,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(navbarClasses.menuButton, open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <Button color="inherit" onClick={(e) => setUIAnchorEl(e.currentTarget)}  aria-haspopup="true" className={navbarClasses.uiMenuOptions}>
          <span className={navbarClasses.dropdownText}>
            {selectedUIOption}
            <ExpandMoreIcon fontSize="small" className={navbarClasses.dropdownIcon} />          
          </span>
        </Button>
        <Menu
          anchorEl={uiAnchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          open={isUIMenuOpen}
          onClose={() => setUIAnchorEl(null)}
        >
          {uiOptions.map(({text,link, links},i) =>  <MenuItem
                  component={Link}
                  data-no-link="true"
                  to={link}
                  key={i.toString()}
                  selected={links.some(link => currentPath === link)}
                  onClick={() => setUIAnchorEl(null)}
                >
                  {text}
                </MenuItem>)
              }
        </Menu>
        {selectedUIOption === "Clothes Try-on" &&
            <Tooltip TransitionComponent={Zoom} title="Tutorial">        
              <IconButton color="inherit" aria-label="Help" component="span" className={navbarClasses.menuOptions} onClick={openTour}>
                <HelpOutlineIcon/>
              </IconButton>
            </Tooltip>                    
        }     
      </Toolbar>
    </AppBar>
  );
}
