import React from 'react';
import Chat from '../chatbot/Chat';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FeatureCard from './FeatureCard';
import PersonIcon from '@material-ui/icons/Person';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import ReplayIcon from '@material-ui/icons/Replay';

function Home(props) {
  return <div style={{justifyContent:'center',textAlign: 'center',  backgroundImage:`url('/shopping.jpg')`,minHeight: '100vh'}}>
<br/>
<Typography variant="h4" component="h2" style={{color: 'white'}}>
  Shopping Assistant
</Typography>
<br/>
<Typography variant="h6" component="h2" style={{color: 'white'}}>
  by Team Salesperson
</Typography>
<br/><br/><br/><br/><br/>
<Typography variant="h5" component="h2" style={{color: 'white'}}>
  Our Features
</Typography>
<br/><br/>
<Grid container direction="row" justify="space-around">
  <Grid item>
  <FeatureCard
    title="A virtual salesperson"
    description="Provides you a salesperson who can assist you in deciding the right product."
    icon={<PersonIcon fontSize="large"/>}
  />
  </Grid>
  <Grid item>
  <FeatureCard
    title="Virtual trial room"
    description="Allows you to virtually try on various clothes, sunglasses, etc. and check how they look on you."
    icon={<ReplayIcon fontSize="large"/>}
  />  
  </Grid>
  <Grid item>
  <FeatureCard
    title="Summarized reviews"
    description="Prevents you from doing the tedious job of going through numerous reviews of a product."
    icon={<SpeakerNotesIcon fontSize="large"/>}
  />  
  </Grid>  
</Grid>

    <Chat/>
  </div>
}

export default Home;