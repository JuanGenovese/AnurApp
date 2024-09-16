import React, { useContext, useState } from "react";
import { FrogContext } from "../context/FrogContext";
import { Form, Navbar } from "react-bootstrap";
import '../css/app.css'

const SearchFrog = () => {
  const { search, setSearchKey, searchKey } = useContext(FrogContext);
  const [showInput, setShowInput] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true)

  const reloadSearch = () => {
    setSearchKey("");
  };

  const handleShowSearch = () => {
    setFirstLoad(false);
    setShowInput(!showInput);
  };

  const handleHideSearch = () => {
    setShowInput(!showInput);
    reloadSearch();
  };

    
  

  

  return (
    <div className="search-navbar">
      {!firstLoad ? (
        <div className={ showInput ? "animate__animated animate__fadeInRight input-search" : "animate__animated  animate__fadeOutRight input-search"}>
          <Navbar>
            <img 
              alt="back arrow" 
              onClick={()=> handleHideSearch()} 
              className="search-indicator" 
              src={require("../assets/icons/back-arrow.svg").default} 
            />
            <input
              className="input-search-style ml-4"
              onInput={search}
              value={searchKey}
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              placeholder="Buscar"
            />
          </Navbar>
        </div>
      ) : null}
      
        <Navbar className="bg-light justify-content-between search-bar">
          <Form inline>
            Anura
          </Form>
          <Form inline>
              <img 
                alt="search icon" 
                onClick={()=> handleShowSearch()}
                className="search-indicator" 
                src={require("../assets/icons/search.svg").default} 
              />
            <p>
        </p>
          </Form>
        </Navbar>
    </div>
  );
};

export default SearchFrog;