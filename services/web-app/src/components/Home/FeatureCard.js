import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '250px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function FeatureCard(props) {
  const classes = useStyles();  
  const {title, description, icon} = props
  return   <Card className={classes.root} style={{backgroundColor: "#f5f5f5"}}>
      <CardContent>
          {icon}
          <br/>
        <Typography variant="h6" component="h2">
       &nbsp;&nbsp; {title}
        </Typography>
        <Typography variant="body2" component="p">
        {description}
        </Typography>
      </CardContent>
    </Card>    
}

export default FeatureCard;