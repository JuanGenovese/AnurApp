import React, { useContext, useState } from "react";
import { FrogContext } from "../context/FrogContext";


import BlockUI from "./BlockUI";
import ListItem from "./ListItem";


import Waveform from "./shared/wavesurfer/WaveForm";
import CustomToast from "./shared/CustomToast";
import {
  valAbundancia,
  valConservaarg,
  valConservauicn,
  valDauditiva,
  valDvisual,
  colores,
} from "../helpers/constants";


import { 
  Button, 
  Modal, 
  Carousel, 
  Row, 
  Col 
} from "react-bootstrap";
import "../css/app.css";




const FrogList = () => {

  const { frogs, frogsDetail } = useContext(FrogContext);

  const [show, setShow] = useState(false);
  const [pause, setPause] = useState(false);
  const [blocking, setBlocking] = useState(false);
  const [showPeriodToast, setShowPeriodToast] = useState(false);
  const [showIndicatorToast, setShowIndicatorToast] = useState(false);
  const [showSectionTitleToast,setShowSectionTitleToast] = useState(false);
  

  const [indicatorTitle, setIndicatorTitle] = useState("");
  const [indicatorMessage, setIndicatorMessage] = useState("");
  const [sectionTitleTitle, setSectionTitleTitle] = useState("");
  const [sectionTitleMessage, setSectionTitleMessage] = useState("");
  const [toastHeaderColor, setToastHeaderColor] = useState("toast-header");

  const [frogDetail, setFrogDetail] = useState({});

  const [index, setIndex] = useState(0);
  

  const handleBlockClicker = () => {
    setBlocking(!blocking);
    setShowIndicatorToast(false);
    setShowPeriodToast(false);
    setShowSectionTitleToast(false);
  }

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const handleClose = () => {
    if (pause) {
      document.getElementById("btn-play-pause").click();
    }
    setIndex(0);
    setShowIndicatorToast(false);
    setShowPeriodToast(false);
    setShowSectionTitleToast(false);
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const handleClick = (frogid) => {
    const fd = frogsDetail.find((fd) => fd.id === frogid);
    setFrogDetail(fd);
  };

  const handleRelatedClicked = (frog) => {
    let frogDtl = frogsDetail.find((f) => f.clave === frog);
    setFrogDetail(frogDtl);
    handleClose();
    setTimeout(handleShow, 200);
  };


  const tryGetImage = (imageClave) => {
    try {
      return require(`../assets/images/especies/${imageClave}.jpg`);
    } catch (err) {
      return require(`../assets/images/especies/default.jpg`).default;
    }
  };

  const tryGetMapImage = (map) => {
    console.log(map)
    try {
      return require(`../assets/images/mapas/${map}.svg`).default;
    } catch (err) {
      return require(`../assets/images/mapas/empty.svg`).default;
    }
  };

  const periodMessage =
    "Los casilleros coloreados corresponden a los meses del año en el que se pueden escuchar los cantos y observar a los adultos de cada especie.";
  const periodTitle = "Período de Actividad";

  const handleIndicatorClick = (indicatorName, color) => {
    setBlocking(!blocking);

    let title = "";
    let desc = "";
    let colorClassName = getColorClass(color);

    let index = -1;

    const valNoEncontrado = "Nombre no encontrado";

    switch (indicatorName) {
      case "conservauicn":
        title = "Estado de Conservación UICN";
        index = colores.indexOf(color);
        desc = index === -1 ? valNoEncontrado : valConservauicn[index];
        break;
      case "conservaarg":
        title = "Estado de Conservación en Argentina";
        index = colores.indexOf(color);
        desc = index === -1 ? valNoEncontrado : valConservaarg[index];
        break;
      case "abundancia":
        title = "Abundancia";
        index = colores.indexOf(color);
        desc = index === -1 ? valNoEncontrado : valAbundancia[index];
        break;
      case "dvisual":
        title = "Detectabilidad Visual";
        index = colores.indexOf(color);
        desc = index === -1 ? valNoEncontrado : valDvisual[index];
        break;
      case "dauditiva":
        title = "Detectabilidad Auditiva";
        index = colores.indexOf(color);
        desc = index === -1 ? valNoEncontrado : valDauditiva[index];
        break;
      default:
        title = "Nombre no encontrado";
        break;
    }
    setToastHeaderColor(colorClassName);
    setIndicatorTitle(title);
    setIndicatorMessage(desc);

    if (showPeriodToast) {
      setShowPeriodToast(false);
      }
    if(showSectionTitleToast){
      setShowSectionTitleToast(false);
    }
    setShowIndicatorToast(true);
  };

  const handlePeriodClick = (color) => {
    setBlocking(!blocking);
    let colorClassName = getColorClass(color);
    setToastHeaderColor(colorClassName);
    if (showIndicatorToast) {
      setShowIndicatorToast(false);
    }
    setShowPeriodToast(true);
  };

  const handleSectionTitleClick = (titleName,color) => {
    setBlocking(!blocking);
    let desc="";
    let title="";
    let colorClassName = getColorClass(color);
    switch (titleName) {
      case "familia":
        desc = "Familia a la que pertenece cada especie, información obtenida de Frost (2018).";
        title = "Familia";
        break;
      case "tamanio":
        desc = "Categorías referidas al tamaño promedio que presentan los adultos de cada especie. También se incluye el rango de tamaño basado en bibliografía y datos personales de los autores entre paréntesis.";
        title = "Tamaño";
        break;
      case "habitat":
        desc = "Se refiere a los lugares en donde pasan la mayor parte del tiempo los adultos de cada especie. Pueden encontrarse en la tierra (terrestres), en la vegetación (arborícolas), en el agua (acuáticos) y/o en cuevas (cavícolas).";
        title = "Hábitat";
        break;
      case "habito":
        desc = "Se refiere al momento del día en el que se encuentran activos los adultos de cada especie. Pueden ser diurnos, nocturnos y/o crepuscular (intervalo ante de la puesta del sol).";
        title = "Hábito";
        break;
      default:
        desc="No encontrado";
        title="";
    }
    setSectionTitleTitle(title);
    setSectionTitleMessage(desc);
    setToastHeaderColor(colorClassName);
    if (showIndicatorToast) {
    setShowSectionTitleToast(false);
    }
    setShowSectionTitleToast(true);
  }

  const getColorClass = (color) => {
    let colorClass = "";
    switch (color) {
      case "#4cd964":
        colorClass = "toast-indicator-lightgreen";
        break;
      case "#2196f3":
        colorClass = "toast-indicator-lightblue";
        break;
      case "#ffcc00":
        colorClass = "toast-indicator-yelow";
        break;
      case "#ff3b30":
        colorClass = "toast-indicator-red";
        break;
      case "#ff9500":
        colorClass = "toast-indicator-orange";
        break;
      case "#1010101c":
        colorClass = "toast-indicator-transparent";
        break;
      case "#ffbf00":
        colorClass = "toast-indicator-amber";
        break;
      case "gray":
        colorClass = "toast-indicator-gray";
        break;
      case "#cddc39":
        colorClass = "toast-indicator-lime";
        break;
      default:
        colorClass = "toast-header";
        break;
    }
    return colorClass;
  };

  const hasFill = (month) => {
    return month === "fill";
  };








  return (
    <div className="container-frogs">
      {frogs.length > 0 ? (
        frogs.map((frog, ind) => {
          return (
            <ListItem
              key={ind}
              frog={frog}
              handleShow={handleShow}
              handleClick={handleClick}
            />
          );
        })
      ) : (
        <div className="col-12 alert-search">
          <div className="alert alert-danger col-12 text-center" role="alert">
            No se encontraron resultados para la búsqueda.
          </div>
        </div>
      )}
      {!show ? null : (
        <Modal
          key={frogDetail.id}
          show={show}
          onHide={handleClose}
          size="lg"
          aria-labelledby="example-modal-sizes-title-lg modal-class-position"
        >
          <div className="btn-close-modal-frog" aria-label="Close">
            <div className="icon-close-modal" onClick={handleClose}>
            &times;
            </div>
          </div>
          <Modal.Header className="p-0">
            <Carousel
              activeIndex={index}
              onSelect={handleSelect}
            >
              {frogDetail.imagenes.map((i, ind) => (
                <Carousel.Item key={ind}>
                  <img
                    key={ind}
                    className="d-block w-100 img-carrousel"
                    src={tryGetImage(i.nombre)}
                    alt="Fotos"
                  />
                  <div className="copyright">© {i.copyright}</div>
                </Carousel.Item>
              ))}
            </Carousel>
          </Modal.Header>
          <Modal.Body>
          <div className="ml-0">
            <h1 className="frog-title-modal">{frogDetail.ncientifico}</h1>
          </div>
          <div className="ml-0">
            <h3 className="frog-sub-title-modal">{frogDetail.nvulgar}</h3>
          </div>
          <div className="ml-0">
              <p className="m-0 p-0"><span className="section-tittle" onClick={() => handleSectionTitleClick("familia","#ff3b30") }>Familia </span>{frogDetail.familia}</p>  
              <p className="m-0 p-0"><span className="section-tittle"  onClick={() => handleSectionTitleClick("tamanio","#ff3b30") }>Tamaño </span>{frogDetail.tamano}</p>  
              <p className="m-0 p-0"><span className="section-tittle"  onClick={() => handleSectionTitleClick("habitat","#ff3b30") }>Hábitat </span>{frogDetail.habitat}</p>  
              <p className="m-0 p-0"><span className="section-tittle"  onClick={() => handleSectionTitleClick("habito","#ff3b30") }>Hábito </span>{frogDetail.habito}</p>  
            </div>
            {showSectionTitleToast ? (
                <CustomToast 
                    title={ sectionTitleTitle} 
                    message={sectionTitleMessage} 
                    show={show}
                    color={toastHeaderColor}
                    handleClose={handleBlockClicker}
                    />) : null}
            <br></br>
            <div className="ml-0 botones">
              <div>
                <div
                  className="div-icon-indicator"
                  style={{ backgroundColor: frogDetail.conservauicn }}
                  onClick={() =>
                    handleIndicatorClick(
                      "conservauicn",
                      frogDetail.conservauicn
                    )
                  }
                >
                  <img
                    alt="indicator"
                    className="icon-indicator"
                    src={require("../assets/icons/uicn.svg").default}
                  />
                </div>
                <div
                  className="div-icon-indicator"
                  style={{ backgroundColor: frogDetail.conservaarg }}
                  onClick={() =>
                    handleIndicatorClick("conservaarg", frogDetail.conservaarg)
                  }
                >
                  <img
                    alt="indicator"
                    className="icon-indicator"
                    src={require("../assets/icons/arg.svg").default}
                  />
                </div>
                <div
                  className="div-icon-indicator"
                  style={{ backgroundColor: frogDetail.abundancia }}
                  onClick={() =>
                    handleIndicatorClick("abundancia", frogDetail.abundancia)
                  }
                >
                  <img
                    alt="indicator"
                    className="icon-indicator"
                    src={require("../assets/icons/dabundancia.svg").default}
                  />
                </div>
                <div
                  className="div-icon-indicator"
                  style={{ backgroundColor: frogDetail.dvisual }}
                  onClick={() =>
                    handleIndicatorClick("dvisual", frogDetail.dvisual)
                  }
                >
                  <img
                    alt="indicator"
                    className="icon-indicator"
                    src={require("../assets/icons/dvisual.svg").default}
                  />
                </div>
                <div
                  className="div-icon-indicator"
                  style={{ backgroundColor: frogDetail.dauditiva }}
                  onClick={() =>
                    handleIndicatorClick("dauditiva", frogDetail.dauditiva)
                  }
                >
                  <img
                    alt="indicator"
                    className="icon-indicator"
                    src={require("../assets/icons/auditiva.svg").default}
                  />
                </div>
              </div>
            </div>
            {showIndicatorToast ? (
              <CustomToast
                title={indicatorTitle}
                message={indicatorMessage}
                show={show}
                color={toastHeaderColor}
                handleClose={handleBlockClicker}
              />
            ) : null}
            <br/>
            <br></br><br></br>
            <div className="ml-0">
              <div className="row mb-0 pb-0">
                <div className="col text-left">
                  <p className="section-tittle-periodo mb-0 p-0">
                    Período de Actividad
                  </p>
                </div>
              </div>
              <Row
                className="row period-container"
                style={{ fontSize: "0.8em" }}
                onClick={() => handlePeriodClick("#ff9500")}
              >
                <Col
                  className={
                    hasFill(frogDetail.jul)
                      ? "col border-period text-center p-0 box-month period-fill"
                      : " col border-period text-center p-0 box-month period-outline"
                  }
                >
                  <strong className="text-period">Jul</strong>
                </Col>
                <Col
                  className={
                    hasFill(frogDetail.ago)
                      ? "col border-period text-center p-0 box-month period-fill"
                      : " col border-period text-center p-0 box-month period-outline"
                  }
                >
                  <strong className="text-period">Ago</strong>
                </Col>
                <Col
                  className={
                    hasFill(frogDetail.sep)
                      ? "col border-period text-center p-0 box-month period-fill"
                      : " col border-period text-center p-0 box-month period-outline"
                  }
                >
                  <strong className="text-period">Sep</strong>
                </Col>
                <Col
                  className={
                    hasFill(frogDetail.oct)
                      ? "col border-period text-center p-0 box-month period-fill"
                      : " col border-period text-center p-0 box-month period-outline"
                  }
                >
                  <strong className="text-period">Oct</strong>
                </Col>
                <Col
                  className={
                    hasFill(frogDetail.nov)
                      ? "col border-period text-center p-0 box-month period-fill"
                      : " col border-period text-center p-0 box-month period-outline"
                  }
                >
                  <strong className="text-period">Nov</strong>
                </Col>
                <Col
                  className={
                    hasFill(frogDetail.dic)
                      ? "col border-period text-center p-0 box-month period-fill"
                      : " col border-period text-center p-0 box-month period-outline"
                  }
                >
                  <strong className="text-period">Dic</strong>
                </Col>
                <Col
                  className={
                    hasFill(frogDetail.ene)
                      ? "col border-period text-center p-0 box-month period-fill"
                      : " col border-period text-center p-0 box-month period-outline"
                  }
                >
                  <strong className="text-period">Ene</strong>
                </Col>
                <Col
                  className={
                    hasFill(frogDetail.feb)
                      ? "col border-period text-center p-0 box-month period-fill"
                      : " col border-period text-center p-0 box-month period-outline"
                  }
                >
                  <strong className="text-period">Feb</strong>
                </Col>
                <Col
                  className={
                    hasFill(frogDetail.mar)
                      ? "col border-period text-center p-0 box-month period-fill"
                      : " col border-period text-center p-0 box-month period-outline"
                  }
                >
                  <strong className="text-period">Mar</strong>
                </Col>
                <Col
                  className={
                    hasFill(frogDetail.abr)
                      ? "col border-period text-center p-0 box-month period-fill"
                      : " col border-period text-center p-0 box-month period-outline"
                  }
                >
                  <strong className="text-period">Abr</strong>
                </Col>
                <Col
                  className={
                    hasFill(frogDetail.may)
                      ? "col border-period text-center p-0 box-month period-fill"
                      : " col border-period text-center p-0 box-month period-outline"
                  }
                >
                  <strong className="text-period">May</strong>
                </Col>
                <Col
                  className={
                    hasFill(frogDetail.jun)
                      ? "col border-period text-center p-0 box-month period-fill"
                      : " col border-period text-center p-0 box-month period-outline"
                  }
                >
                  <strong className="text-period">Jun</strong>
                </Col>
              </Row>
            </div>
            {showPeriodToast ? (
              <CustomToast
                title={periodTitle}
                message={periodMessage}
                show={show}
                color={toastHeaderColor}
                handleClose={handleBlockClicker}
              />
            ) : null}
            <br></br>
            <div className="row">
              <Waveform
                frogName={frogDetail.clave}
                setPause={setPause}
                pause={pause}
              />
            </div>
            <br></br>
            <div className="row">
              <div className="col text-justify">
                <p className="section-tittle mb-0 p-0">Características</p>

                <p>{frogDetail.caracteristicas}</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p className="section-tittle mb-0 p-0">¿Cómo se reproducen?</p>

                <p>{frogDetail.modoreproductivo}</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p className="section-tittle mb-0 p-0">¿Dónde se los encuentra?</p>

                <p>{frogDetail.microhabitats}</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p className="section-tittle mb-0 p-0">Rango Altitudinal</p>

                <p>{frogDetail.rangoaltitud}</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p className="section-tittle mb-0 p-0">Ecorregión</p>

                <p>{frogDetail.ecoregion}</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p className="section-tittle mb-0 p-0">Distribución General</p>

                <p>{frogDetail.distrigeneral}</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p className="section-tittle mb-0 p-0">Distribución en Argentina</p>

                <p>{frogDetail.distriargentina}</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p className="section-tittle mb-0 p-0">Distribución en Jujuy</p>

                <div className="maps-container">
                  <img
                    alt="mapa"
                    className="maps-background"
                    src={require("../assets/images/jujuy.svg").default}
                  />
                  <img
                    alt="mapa"
                    className="maps"
                    src={tryGetMapImage(frogDetail.clave)}
                  />
                </div>
              </div>
            </div>
            <Row>
              <Col>
                <p className="section-tittle mb-0 p-0">Especies Similares</p>

                {frogDetail.similares && frogDetail.similares.similarid ? (
                  frogDetail.similares.similarid.map((sf, idn) => {
                    const idx = frogDetail.similares.similarid.indexOf(sf);
                    return (
                      <Row
                        key={idn}
                        className="related-frogs"
                        onClick={() =>
                          handleRelatedClicked(
                            frogDetail.similares.similarclave[idx]
                          )
                        }
                      >
                        <Col
                          className="container-img-frog-modal-similar"
                          xs={4}
                          sm={2}
                          md={2}
                          lg={2}
                          xl={2}
                        >
                          <img
                            key={idn}
                            className="img-frog-modal-similar"
                            src={tryGetImage(
                              frogDetail.similares.similarclave[idx]
                            )}
                            alt="First slide"
                          />
                        </Col>
                        <Col
                          className="col-text-frog"
                          xs={8}
                          sm={10}
                          md={10}
                          lg={10}
                          xl={10}
                        >
                          <div className="row title-frog-modal-similar">
                            {frogDetail.similares.similarncientifico[idx]}
                          </div>
                          <div className="row subtitle-frog-modal-similar">
                            {frogDetail.similares.similarnvulgar[idx]}
                          </div>
                        </Col>
                        <br></br>
                        <hr></hr>
                      </Row>
                    );
                  })
                ) : (
                  <div
                    className="alert alert-warning col-12 text-center"
                    role="alert"

                  >
                    No se encontraron especies similares
                  </div>
                )}
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose} className="btn-close-modal">
              Cerrar
            </Button>
          </Modal.Footer>
          <BlockUI 
              blocking={blocking}
              handleClick={handleBlockClicker}
          />
        </Modal>
      )}
    </div>
  );
};

export default FrogList;
