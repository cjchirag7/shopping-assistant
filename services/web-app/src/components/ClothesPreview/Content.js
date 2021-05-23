import React from "react";
import { Button, Grid, makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import Tooltip from '@material-ui/core/Tooltip';
import GetAppIcon from '@material-ui/icons/GetApp';
import { downloadImage } from "../../Utils";

const useStyles = makeStyles(() => ({
  spacing: {
    margin: "35px 180px 20px",
  },
  grid: {
    marginLeft: '360px'
  },
  fixedWidthImg: {
    textAlign: "center",
    width: "300px",
  },
  originalImg: {
    textAlign: "center",
  },
}));

const Content = ({
  classes,
  open,
  img,
  previewImg,
  loading,
  selectedProduct
}) => {
  const styles = useStyles();

  return (
    <main
      className={clsx(classes.content, {
        [classes.contentLeftShift]: open,
        [classes.contentRightShift]: false
      })}
    >
      <div className={classes.drawerHeader} />

      {img?.img?.length > 0 ? (
        <Grid container justify="center" alignItems="center" direction="column" id="step3">
         {
           selectedProduct && <Typography variant="h6" align="center">
            Your preview
          </Typography>
          } 
          <br />
          {loading && <CircularProgress />}
          {!loading && selectedProduct && previewImg && (
            <img
              src={previewImg}
              alt={"Loading"}
              className={styles.originalImg}
            />
          )}
          {!loading && selectedProduct && previewImg && <Tooltip title="Download this preview image" placement="right">
              <Button 
                variant="contained"
                color="primary"
                onClick={() => {
                  downloadImage(previewImg)
                 }}
                startIcon={<GetAppIcon/>}
                className={styles.spacing}
                size="small"                
              >
                Download
              </Button>
            </Tooltip>}
            {!loading && !selectedProduct && <>
              <Typography variant="h6">
                 Please select a dress in the sidebar menu.
               </Typography>
               <div className={styles.grid} style={{height: '500px', width: '300px'}}>
               </div>
               </>
            }
        </Grid>
      ) : (
        <Grid container justify="center" alignItems="center" direction="column" id="step3">
          <br />
          <Typography variant="h6">
            Please upload your image in the sidebar menu.
          </Typography>
          <div className={styles.grid} style={{height: '500px', width: '300px'}}>
          </div>
        </Grid>
      )}
    </main>
  );
};

export default Content;