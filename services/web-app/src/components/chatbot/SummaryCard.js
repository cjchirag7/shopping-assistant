import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    width: '25vw',
  },
  media: {
    marginLeft: 'auto',
    marginRight: 'auto',    
  }
});

function SummaryCard({ title, summary }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h4">
          {title}
          </Typography>
          <Typography variant="body2"  component="p">
          {summary.split(".").map((sen, i) => {
            if(!sen)
              return null;
            return <React.Fragment key={i.toString()}>
            {`${sen}.`}
            {(i!==sen.length-1) && <br/>}
            </React.Fragment>
          })}
          </Typography>          
          <Typography variant="body2" color="textSecondary" component="p">
          (Generated from 350 reviews)
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );  
}

export default SummaryCard;