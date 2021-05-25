import React from 'react'
import Tour from 'reactour'

const steps = [
  {
    selector: '#step1',
    content: 'First, upload your image here.',
  },
  {
    selector: '#step2',
    content: 'Select any dress here.',
  },
  {
    selector: '#step3',
    content: 'View how would you look when you wear this dress.',
  }  
];

const ClothTryOnUITour = (props) => {
  const { isOpen, onRequestClose } = props;
  return (
      <Tour
        steps={steps}
        isOpen={isOpen}
        onRequestClose={onRequestClose}
      />
  )
};

export default ClothTryOnUITour;