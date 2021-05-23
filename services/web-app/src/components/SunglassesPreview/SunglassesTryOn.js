import React, { useCallback, useEffect, useState, useRef } from "react";
import serverUrl from "../../Constants/serverUrl";
import Content from "./Content";
import Sidebar from "./Sidebar";
import Navbar from "../Navbar";

const SunglassesTryOn = (props) => {
  const { classes, theme } = props;
  const [open, setOpen] = useState(true);  
  const [selectedSunglasses, setSelectedSunglasses] = useState('');
  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Navbar
        classes={classes}
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        theme={theme}
      />    
      <Sidebar
        classes={classes}
        open={open}
        handleDrawerClose={handleDrawerClose}
        theme={theme}
        selectedSunglasses={selectedSunglasses}  
        setSelectedSunglasses={setSelectedSunglasses}        
      />
      <Content
        classes={classes}
        open={open}
        selectedSunglasses={selectedSunglasses}
      />
    </>
  );
};

export default SunglassesTryOn;