import React, { Component } from "react";
import {  Widget,  addResponseMessage, renderCustomComponent, addLinkSnippet } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import logo from "../../Images/avatar.jpeg";
import serverUrl from "../../Constants/serverUrl";
import ProductCard from "./ProductCard";
import SummaryCard from "./SummaryCard";
import clothImages from '../../Constants/ClothImages'
import sunglassesData from '../../Constants/SunglassesData'
class Chat extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      sunglassesIndex: 0,
      clothIndex: 0,
      recentProduct: ''
    };
  }

  componentDidMount() {
    addResponseMessage('Hope you are fine. Feel free to ask me anything related to any product. I will try my best to help you out.');    
  }

  handleNewUserMessage = newMessage => {
    this.postMes(newMessage);
  };

  postMes = text => {
     return fetch(`${serverUrl}ask?question=${text}`, {
      method: "GET",
      credentials: "same-origin"
    })
      .then(
        response => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error(
              "Error " + response.status + ": " + response.statusText
            );
            error.response = response;
            throw error;
          }
        },
        error => {
          throw error;
        }
      )
      .then(response => response.json())
      .then(res => {
          const {response} = res;
          if(typeof response === "string") {
            addResponseMessage(response);            
          }
          else if(response.type === "text") {
            addResponseMessage(response.payload);
          }
          else if(response.type === "summary") {
            const props = {title: response.product, summary: response.summary}       
            renderCustomComponent(SummaryCard,props);     
          }
          else if(response.type === "link") {
            addLinkSnippet(response.payload)
          } else if(response.type === "specific-suggestion"
           || response.type==="suggestion"
           || response.type==="requesting-more")
           {
            if(!response.payload) {              
              const { sunglassesIndex, clothIndex, recentProduct } = this.state;
              response.payload=[];
              if(response.type==="requesting-more") {
                response.product = recentProduct;
                console.log(recentProduct);
              if(response.product==="sunglasses") {
              ([0,1,2]).forEach((num) => {
                const len=sunglassesData.length;
                response.payload.push(sunglassesData[(sunglassesIndex+num)%len]);
              })
              this.setState({sunglassesIndex: sunglassesIndex+3});
            } else if(response.product==="cloth") {
              ([0,1,2]).forEach((num) => {
                const len=clothImages.length;
                response.payload.push(clothImages[(clothIndex+num)%len]);
              })
              this.setState({clothIndex: clothIndex+3});
            } else {
              addResponseMessage('Sorry, I have shown you all the available products.');        
            }
            }
            else if(response.type==="suggestion") {
              if(response.product==="sunglasses") {
                response.payload=sunglassesData.filter(
                  (glasses) => response.preferred.some(
                    (preferred_code)=>preferred_code===glasses.code)
                  );
              }
              else {
                response.payload=clothImages.filter(
                  (cloth) => response.preferred.some(
                    (preferred_id)=>preferred_id===cloth.productId)
                  );
              }
            }
            }
            if(response.payload.length === 1) {
              addResponseMessage('Try this one:');
            } else {
              addResponseMessage('Try these:');              
            }
            response.payload.forEach((payload) => {
            let props = {...payload};
            if(props.src) {
              props.img=props.src;
            }
            if(props.caption) {
              props.title=props.caption;
            }
            if(!props.link) {
              props.link='https://amazon.com'
            }
            if(response.product==="sunglasses") {
              props.trialLink=`/try/sunglasses?product_code=${props.code}`;
            } else if(response.product==="cloth") {
              props.height='200px';
              props.width='150px';
              props.trialLink=`/try/cloth?product_id=${props.productId}`;
            }
            renderCustomComponent(ProductCard,props);
          }) 
          this.setState({recentProduct: response.product});          
          } 
          return;
      })
      .catch(error => {
        console.log("\nError: " + error.message + "\n");
      });
  };
  render() {
    return (
      <div>
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          profileAvatar={logo}
          title="Shopping Assistant"
          subtitle="Ask anything related to any product"
          badge
        />
      </div>
    );
  }
}

export default Chat;