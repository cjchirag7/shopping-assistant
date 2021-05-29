import React from "react";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { makeStyles, Typography } from "@material-ui/core";
import UploadImage from "./UploadImage";
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import Button from '@material-ui/core/Button';

const useStyle = makeStyles((theme) => ({
  spacing: {
    margin: "20px",
    width: 280
  },
  spacingUploadButton: {
    margin: "5px"
  },
  slider: {
  },
  buttonGrid: {
    margin: "10px",
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },  
  selectButton: {
    width: "200px"
  }
}));

const Sidebar = ({
  classes,
  open,
  handleDrawerClose,
  theme,
  img,
  handleImgChange,
  selectedProduct,
  setSelectedProduct,
  isSelectClothDialogOpen,
  setSelectClothDialogOpen          
}) => {

  const spacing = useStyle();
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <div  style={{marginTop: '-20px'}}>
      <UploadImage
        classes={spacing}
        img={img}
        handleImgChange={handleImgChange}
      />
      {img?.img?.length > 0 ? null :<><br/><br/><br/><br/></>}
      <div style={{textAlign: 'center'}} id="step2">
      <Button
        variant="contained"
        color="primary"
        className={spacing.selectButton}
        startIcon={<PhotoLibraryIcon />}
        onClick={() => {
          setSelectClothDialogOpen(true);
        }}
      >
        Select dress
      </Button>
      <br/>

        {selectedProduct && <>
        <br/>
        <img src={selectedProduct.src} style={{width: '150px'}} alt='Loading'/>
        <Typography variant="h5" className={classes.title}>
        {selectedProduct.caption}
        </Typography>
        <Typography variant="h6" className={classes.title}>
        {selectedProduct.price}
        </Typography>        
        </>}
      </div>
      </div>
    </Drawer>
  );
};

export default Sidebar;