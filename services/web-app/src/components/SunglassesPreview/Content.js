import React, { useState, useRef, useEffect } from 'react'
import ControlCameraIcon from '@material-ui/icons/ControlCamera';
import { JEELIZVTO, JEELIZVTOWIDGET } from 'jeelizvtowidget'
import Button from '@material-ui/core/Button';
import searchImage from '../../Images/avatar.jpeg'
import MuiAlert from '@material-ui/lab/Alert';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function init_VTOWidget(placeHolder, canvas, toggleLoading){
  JEELIZVTOWIDGET.start({
    placeHolder,
    canvas,
    callbacks: {
      ADJUST_START: null,
      ADJUST_END: null,
      LOADING_START: toggleLoading.bind(null, true),
      LOADING_END: toggleLoading.bind(null, false)
    },
    sku: 'empty', 
    searchImageMask: searchImage, //',
    searchImageColor: 0xeeeeee, // color of loading (face not found) animation
    searchImageRotationSpeed: -0.001, // negative -> clockwise
    callbackReady: function(){
      console.log('INFO: JEELIZVTOWIDGET is ready :)');
    },
    onError: function(errorLabel){ // this function catches errors, so you can display custom integrated messages
      alert('An error happened. errorLabel =' + errorLabel)
      switch(errorLabel) {
        case 'WEBCAM_UNAVAILABLE':
          // the user has no camera, or does not want to share it.
          break;

        case 'INVALID_SKU':
          // the provided SKU does not match with a glasses model
          break;

        case 'PLACEHOLDER_NULL_WIDTH':
        case 'PLACEHOLDER_NULL_HEIGHT':
          // Something is wrong with the placeholder
          // (element whose id='JeelizVTOWidget')
          break;
          
        case 'FATAL':
        default:
          // a bit error happens:(
          break;
      } // end switch
    } // end onError()
  }) // end JEELIZVTOWIDGET.start call
}


function Content(props){
  const { selectedSunglasses } = props;
  const refPlaceHolder = useRef();
  const refCanvas = useRef();
  const refLoading = useRef();
  const [adjustMode, setAdjustMode] = useState(false);

  const toggleLoading = (isLoadingVisible) => {
    refLoading.current.style.display = (isLoadingVisible) ? 'block' : 'none';
  }

  const enter_adjustMode = () => {
    setAdjustMode(true);
    JEELIZVTOWIDGET.enter_adjustMode();
  }

  const exit_adjustMode = () => {
    JEELIZVTOWIDGET.exit_adjustMode();
    setAdjustMode(false);    
  }

  const set_glassesModel = (sku) => {
    JEELIZVTOWIDGET.load(sku);
  }

  useEffect(() => {
    const placeHolder = refPlaceHolder.current;
    const canvas = refCanvas.current;
    init_VTOWidget(placeHolder, canvas, toggleLoading);

    return () => {
      JEELIZVTOWIDGET.destroy();
    }
  }, []);

  useEffect(() => {
    if(!selectedSunglasses)
      return;
    set_glassesModel(selectedSunglasses);
  },[selectedSunglasses]);

  return (
    <div>
    {adjustMode && <div style={{marginTop: '70px', width: '60vw', marginLeft: '460px'}}>
    <MuiAlert elevation={6} variant="filled" severity="info">
      Move the glasses to adjust them.
        </MuiAlert>
        </div>}      
    <div ref={refPlaceHolder} className='JeelizVTOWidget' style={adjustMode?({ marginTop: '3vh'}):({marginTop: '20vh'})}>      
      <canvas ref={refCanvas} className='JeelizVTOWidgetCanvas'></canvas>      
      <div ref={refLoading} className='JeelizVTOWidgetLoading'>
       <div className='JeelizVTOWidgetLoadingText'>
        </div>
      </div>
    </div>
    {selectedSunglasses && !adjustMode && <div style={{textAlign: 'center'}}>
      <br/>
      <Button
        variant="contained"
        color="primary"
        startIcon={<ControlCameraIcon />}
        onClick={()=>{
          enter_adjustMode();
        }}
        style={{marginLeft: '140px'}}
      >
        Adjust glasses
      </Button>
    </div>} 
    {selectedSunglasses && adjustMode && <div style={{textAlign: 'center'}}>
      <br/>
      <Button
        variant="contained"
        color="primary"
        startIcon={<ExitToAppIcon />}
        onClick={()=>{
          exit_adjustMode();
        }}
        style={{marginLeft: '140px'}}
      >
        Exit adjust mode
      </Button>
    </div>}     
    </div>
  )
}

export default Content