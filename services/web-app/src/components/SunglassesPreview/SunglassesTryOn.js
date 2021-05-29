import React, { useCallback, useEffect, useState } from "react";
import Content from "./Content";
import Sidebar from "./Sidebar";
import Navbar from "../Navbar";
import sunglassesData from '../../Constants/SunglassesData'

const SunglassesTryOn = (props) => {
  const { classes, theme, productCode } = props;
  const [open, setOpen] = useState(true);  
  const [selectedSunglasses, setSelectedSunglasses] = useState('');
  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if(!productCode || !sunglassesData.some((glasses) => glasses.code === productCode))
      return;
      console.log(productCode)
    setSelectedSunglasses(productCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

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