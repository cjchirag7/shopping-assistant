import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: '25vw',
  },
  media: {
    height: '120px' ,
    marginLeft: 'auto',
    marginRight: 'auto',    
  }
});

function ProductCard({ title, img, price, link, trialLink, height, width }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          style={(height && width) ?{height, width}:null}
          image={img}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
          {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{textAlign: 'center', justifyContent: 'space-around' }}>
        {trialLink && <Link to={trialLink} target="_blank" rel="noopener noreferrer">
        <Button size="small" color="primary">
          <DoneOutlineIcon fontSize="small" />&nbsp;
          Try
        </Button>
        </Link>}
        <Button size="small" color="primary" onClick={() => {
          window.open(link,"_blank");
        }}>
          <AddShoppingCartIcon fontSize="small"/>&nbsp;
          Buy
        </Button>
      </CardActions>
    </Card>
  );  
}

export default ProductCard;