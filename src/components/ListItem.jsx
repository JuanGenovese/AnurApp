import React from "react";
import { Card } from 'react-bootstrap';
import '../css/app.css';
// import 'bootstrap/dist/css/bootstrap.min.css';


const ListItem = ({frog,handleShow,handleClick}) => {
  const tryGetImage=()=>{
    try{
      return require(`../assets/images/especies/${frog.url_image}.jpg`);
    }catch(err){
      return require(`../assets/images/especies/default.jpg`).default;
    }
  }
  const handleClicked=(frodId)=>{
    handleClick(frodId);
    handleShow();
  }
  return ( 
    
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-frog">
        <Card className="bg-dark text-white card-frog" onClick={()=>handleClicked(frog.id)}>
          <Card.Img src={tryGetImage()} alt="Card image" />
          <Card.ImgOverlay>
            <Card.Title className="card-title-frog">{frog.ncientifico}</Card.Title>            
              <div className="div-container-indicators col-12">
                <div className="div-list-icon-indicator" style={{ backgroundColor:frog.conservauicn }} >
                  <img alt="indicator" className="icon-indicator" src={require("../assets/icons/uicn.svg").default} />
                </div>
                <div className="div-list-icon-indicator" style={{ backgroundColor:frog.conservaarg }} >
                  <img alt="indicator" className="icon-indicator" src={require("../assets/icons/arg.svg").default} />
                </div>
                <div className="div-list-icon-indicator" style={{ backgroundColor:frog.abundancia }} >
                  <img alt="indicator" className="icon-indicator" src={require("../assets/icons/dabundancia.svg").default} />
                </div>
                <div className="div-list-icon-indicator" style={{ backgroundColor:frog.dvisual }} >
                  <img alt="indicator" className="icon-indicator" src={require("../assets/icons/dvisual.svg").default} />
                </div>
                <div className="div-list-icon-indicator" style={{ backgroundColor:frog.dauditiva }} >
                  <img alt="indicator" className="icon-indicator" src={require("../assets/icons/auditiva.svg").default} />
                </div>
              </div>
          </Card.ImgOverlay>
        </Card>
      </div>
  );
};

export default ListItem;
