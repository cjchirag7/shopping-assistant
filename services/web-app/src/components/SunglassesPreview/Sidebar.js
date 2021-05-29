import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from "@material-ui/core";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import sunglassesData from '../../Constants/SunglassesData'

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
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflowX: 'hidden',
    backgroundColor: theme.palette.background.paper,
    marginTop: '-50px'
  },
  gridList: {
    width: 400
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const Sidebar = ({
  classes,
  open,
  selectedSunglasses,  
  setSelectedSunglasses
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
      </div>
      <div className={spacing.root}>
      <GridList cellHeight={180} className={spacing.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
        <Typography variant="h5" style={{textAlign: 'center'}}>Choose sunglasses</Typography>
        <br/>
        </GridListTile>
        {sunglassesData.map((tile) => (
          <GridListTile key={tile.img+Math.floor(Math.random()*10000)} onClick={()=>{
            setSelectedSunglasses(tile.code);
          }} cols={2} 
          style={{cursor:'pointer'}}
          >
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>{tile.price}</span>}
              actionIcon={  (selectedSunglasses===tile.code) ?<IconButton aria-label={`Selected`} className={spacing.icon}>
                  <CheckCircleIcon />
                </IconButton>
                :null}
            />
          </GridListTile>
        ))}
      </GridList>      
      </div>
      <Divider />
    </Drawer>
  );
};

export default Sidebar;