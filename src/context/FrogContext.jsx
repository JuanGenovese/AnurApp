import React, { createContext, useEffect, useState } from "react";

export const FrogContext = createContext();


const FrogProvider = (props) => {
  

  const [showLoad, setShowLoad] = useState(false); 
  
  const [frogs, setFrogs] = useState([]);
  const [frogsBase, setFrogsBase] = useState([]);
  const [frogsDetail, setFrogDetails] = useState([]);
  
  const [searchKey, setSearchKey] = useState("");

  
  const search = (event) => {
    setSearchKey(event.target.value);
  };


  useEffect(() => {
    if (searchKey.length >= 0) {
      const filterFrogs = frogsBase.filter(
        (x) =>
          x.ncientifico.toLowerCase().includes(searchKey.toLowerCase()) ||
          x.nvulgar.toLowerCase().includes(searchKey.toLowerCase()) ||
          x.familia.toLowerCase().includes(searchKey.toLowerCase())
      );
      
      setFrogs(filterFrogs);

    } else {

      setFrogs(frogsBase);

    }

  }, [searchKey, frogsBase]);


  useEffect(() => {
    const data = require("../assets/json-header/header.json");
    setFrogsBase(data);
    setFrogs(data);
    loadFrogsDetails(data);
    setShowLoad(true);
  }, []);


  const loadFrogsDetails = (data) => {
    let frogsDetail = [];
    data.forEach((element) => {
      const dataDetail = require(`../assets/json-detail/${element.id}.json`);
      frogsDetail.push(dataDetail);
    });
    setFrogDetails(frogsDetail);
  };


  return (
    <FrogContext.Provider
      value={{
        search,      //Funcion
        setSearchKey,//Funcion modificadora de estado local
        frogs,       //Estado local
        frogsDetail, //Estado local
        showLoad,    //Estado local
        searchKey    //Estado local
      }}
    >
      {props.children}
    </FrogContext.Provider>
  );
};

export default FrogProvider;
