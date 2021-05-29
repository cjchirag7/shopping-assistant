import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Dialog from "@material-ui/core/Dialog";
import Gallery from "react-grid-gallery";
import Slide from "@material-ui/core/Slide";
import Toolbar from "@material-ui/core/Toolbar";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ClothImages from "../../Constants/ClothImages"

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function SelectClothDialog({open, setOpen, setSelectedProduct})
{
const classes = useStyles();
const handleClose = () => {
  setOpen(false);
}

const onSelectImage = (index) => {
  setSelectedProduct(ClothImages[index]);
  handleClose();
};

return (<Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Select a dress
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{padding: "5px"}}>
          <Gallery 
            images={ClothImages}
            onSelectImage={onSelectImage}
            onClickThumbnail={onSelectImage}
            enableLightbox={false}
          />
        </div>
      </Dialog>);
}

export default SelectClothDialog;
