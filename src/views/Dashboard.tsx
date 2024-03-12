import React, { createContext, useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ImageCard from "./widgets/ImageCard"
import BarChartCard from "./widgets/BarChartCard";
import ClassListCard from "./widgets/ClassListCard";
import { ModelSelection } from "routes";
import axios from "axios";
import OverlayBoxComponent from "./OverlayBoxComponent";
import { useMobileMode } from "MobileModeContext";
import ModelLoadStepper from "./widgets/ModelLoadStepper";
import { appDescriptionVerbiage } from "./verbiage/AppDescriptionVerbiage";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CurtainOverlay from "./widgets/CurtainOverlay";
import urljoin from 'url-join';
import { Images, animalImagesInit, blankInit, diamondImagesInit } from "utilities/imageProvider";
import { CurtainContext } from "layouts/Admin";
import { animalLabels, animalSeedData, diamondLabels, diamondSeedData } from "utilities/seedDataProvider";

interface Props {
  modelToLoad: ModelSelection;
}

// The server API returns a response matching this schema
interface ModelOutput {
  score: number[] | null;
  predictedLabel: string | null;
}

export interface ModelOutputs {
  labels: string[];
  image1: ModelOutput;
  image2: ModelOutput;
  image3: ModelOutput;
  image4: ModelOutput;
}

const updateImageUrls = (images: Images, newUrl: string, id: number): Images => {
  return {
    img1url: id === 1 ? newUrl : images.img1url,
    img2url: id === 2 ? newUrl : images.img2url,
    img3url: id === 3 ? newUrl : images.img3url,
    img4url: id === 4 ? newUrl : images.img4url
  };
}

const updateProbabilities = (modelOutputs: ModelOutputs, newModelOutput: ModelOutput, id: number): ModelOutputs => {
  switch (id) {
    case 1:
      return { ...modelOutputs, image1: newModelOutput };
    case 2:
      return { ...modelOutputs, image2: newModelOutput };
    case 3:
      return { ...modelOutputs, image3: newModelOutput };
    case 4:
      return { ...modelOutputs, image4: newModelOutput };
    default:
      return modelOutputs;
  }
}

const updateLabels = (modelOutputs: ModelOutputs, newLabels: string[]): ModelOutputs => {
  return { ...modelOutputs, labels: newLabels };
}

const clearPredictions = (modelOutputs: ModelOutputs): ModelOutputs => {
  return { ...modelOutputs,
    image1: {predictedLabel: null, score: null},
    image2: {predictedLabel: null, score: null},
    image3: {predictedLabel: null, score: null},
    image4: {predictedLabel: null, score: null},
  };
}

// TODO: Move this into a theme
const colorPalette = ["#0b132b", "#1c2541", "#3a506b", "#5bc0be", "6fffe9"];
const colorSet = ["#0b132b", "#1c2541", "#3a506b", "#5bc0be"];
const accent1 = colorPalette[4];
const accent2 = "#236444"; // A random number that I put in for testing, but I quite like the aesthetic.

export const DashboardContext = createContext({
  updateImage: (newUrl: string, newProbs: ModelOutput, id: number) => {}
});

function Dashboard({ modelToLoad }: Props) {
  const [ colors, setColors ] = useState(colorSet);
  const [ accents, setAccents ] = useState({accent1: accent1, accent2: accent2}); // TODO: Move this to a global store

  const [ loadedModel, setLoadedModel ] = useState(ModelSelection.None);
  //const [ showCurtain, setShowCurtain ] = useState(true);
  //const [ showDescription, setShowDescription ] = useState(true);

  const [ imageUrls, setImageUrls ] = useState(blankInit);

  // For the sake of the demonstration, the diamond images and animal images are treated differently
  // so that they can persist after changing tabs and changing back.
  const [ animalImageUrls, setAnimalImageUrls ] = useState(animalImagesInit);
  const [ diamondImageUrls, setDiamondImageUrls ] = useState(diamondImagesInit);

  const [ diamondModelOutputs, setDiamondModelOutputs ] = useState(diamondSeedData);
  const [ animalModelOutputs, setAnimalModelOutputs ] = useState(animalSeedData); // TODO: Move up one level

  const [ modelOutputs, setModelOutputs ] = useState(diamondModelOutputs); // TODO: Move up one level

  const { isMobile } = useMobileMode();
  const { showCurtain, setShowCurtain, showDescription, setShowDescription } = useContext(CurtainContext);

  // This is a caching mechanism to make sure the demo does not need to make as many server calls, especially while switching between tabs.
  const getNextModelDataToLoad = (nextModel: ModelSelection) => {
    switch (nextModel) {
      case ModelSelection.Diamonds:
        return diamondModelOutputs;
      case ModelSelection.Animals:
        return animalModelOutputs;
      default:
        return clearPredictions(modelOutputs);
    }
  }

  const restoreImages = () => {
    switch (loadedModel) {
      case ModelSelection.Diamonds:
        setImageUrls(diamondImageUrls);
        break;
      case ModelSelection.Animals:
        setImageUrls(animalImageUrls);
        break;
      default:
        // When opening a new Custom model, start from a blank slate
        setImageUrls(blankInit);
        break;
    }
  }

  const restoreModelOutputs = () => {
    switch (loadedModel) {
      case ModelSelection.Diamonds:
        setModelOutputs(diamondModelOutputs);
        break;
      case ModelSelection.Animals:
        setModelOutputs(animalModelOutputs);
        break;
      default:
        break;
    }
  }

  const updateAndCacheModelOutputs = (model: ModelSelection, newModelOutput: ModelOutputs) => {
    switch (model) {
      case ModelSelection.Diamonds:
        setDiamondModelOutputs(newModelOutput);
        break;
      case ModelSelection.Animals:
        setAnimalModelOutputs(newModelOutput);
        break;
      default:
        break;
    }

    setModelOutputs(newModelOutput);
  }

  useEffect(() => {

    const fixedModels: Set<ModelSelection> = new Set([ModelSelection.Diamonds, ModelSelection.Animals])

    if (fixedModels.has(modelToLoad)) {
      const apiRoot = process.env.REACT_APP_API_ROOT || 'localhost:44346';
      axios.get(urljoin(apiRoot, 'api', 'FixedModels', modelToLoad))
      .then(response1 => {
          console.log('First Response from API:', response1.data); // Debugging statement
          return axios.get(urljoin(apiRoot, 'api', 'Prediction', 'labels'));
      })
      .then(response2 => {
        const newLabels: string[] = response2.data;
        console.log('Second Response from API:', response2.data); // Debugging statement
        setLoadedModel(modelToLoad);
        const modelData = getNextModelDataToLoad(modelToLoad);
        updateAndCacheModelOutputs(modelToLoad, updateLabels(modelData, newLabels));
      })
      .catch(error => {
        console.error('Error:', error);
        setLoadedModel(modelToLoad); // TODO: Remove, but need to make sure the app doesn't get stuck

        // This is quick and dirty for the demo, but if it reaches this point, it's either Animals or Diamonds
        updateAndCacheModelOutputs(modelToLoad, updateLabels(modelOutputs, modelToLoad === ModelSelection.Animals ? animalLabels : diamondLabels));
      });  
    } else {
      //setLoadedModel(modelToLoad);
      // TODO: Set labels. This should be done the same way as above. The enum set is artificial. 
    }

    setShowCurtain(showDescription || modelToLoad !== loadedModel);
  }, [modelToLoad])

  useEffect(() => {
    restoreImages();
    restoreModelOutputs();
    setShowCurtain(showDescription || modelToLoad !== loadedModel);
  }, [loadedModel, animalImageUrls, diamondImageUrls, showDescription]);

  const updateImage = (newUrl: string, newProbs: ModelOutput, id: number) => {
    switch (loadedModel) {
      case ModelSelection.Diamonds:
        // Not strictly necessary, but it optimizes the demo by making data persist as the user switches back and forth between models. (Eliminating a server request)
        setDiamondImageUrls(updateImageUrls(diamondImageUrls, newUrl, id));
        setDiamondModelOutputs(updateProbabilities(diamondModelOutputs, newProbs, id));
        break;
      case ModelSelection.Animals:
        // Not strictly necessary, but it optimizes the demo by making data persist as the user switches back and forth between models. (Eliminating a server request)
        setAnimalImageUrls(updateImageUrls(animalImageUrls, newUrl, id));
        setAnimalModelOutputs(updateProbabilities(animalModelOutputs, newProbs, id));
        break;
      case ModelSelection.Custom:
        setImageUrls(updateImageUrls(imageUrls, newUrl, id));
        break;
    }

    console.log(`Setting model (in updateImage callback)`)
    updateAndCacheModelOutputs(loadedModel, updateProbabilities(modelOutputs, newProbs, id));
  }

  const handleSteppedThroughOverlay = () => {
    const apiRoot = process.env.REACT_APP_API_ROOT || 'localhost:44346';

    axios.get(urljoin(apiRoot, 'api', 'Prediction', 'labels'))
    .then(res => {
      console.log('Response from API Labels:', res.data); // Debugging statement
      const newLabels: string[] = res.data;
      setLoadedModel(modelToLoad);
      const tmp = updateLabels(modelOutputs, newLabels);
      updateAndCacheModelOutputs(ModelSelection.Custom, clearPredictions(tmp));
    });
  };

  const renderOverlayComponent = (frameBackground: string, contentBackground: string) => {
    let child: JSX.Element | null = null;

    console.log(`Debugging: showCurtain = ${showCurtain}, showDescription = ${showDescription}`)

    if (showDescription) {
      child = <>
        {appDescriptionVerbiage.map((line, index, arr) => (
          <React.Fragment key={`appDescription${index}`}>
            <Typography>{line}</Typography>
            {index !== arr.length - 1 && <br />}
          </React.Fragment>
        ))}
        <div style={{display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'center', alignItems: 'center', padding: '20px'}}>
          <Button variant="contained" sx={{ m: 1 }} onClick={() => {setShowDescription(false); setShowCurtain(false)}}>Get Started</Button>
          <Link to={"https://github.com/tearlant"} target="_blank" rel="noopener noreferrer">
            <Button variant="contained" sx={{ m: 1 }} color="primary">
              GitHub
            </Button>
          </Link>
          <Link to={"https://tearlant.com"} target="_blank" rel="noopener noreferrer">
            <Button variant="contained" sx={{ m: 1 }} color="primary">
              My Portfolio
            </Button>
          </Link>
        </div>
      </>
    } else if (modelToLoad === ModelSelection.Custom) {
      child = <ModelLoadStepper onClose={handleSteppedThroughOverlay}/>
    } else {
      return <></>
    }

    return <OverlayBoxComponent isMobile={isMobile} frameBackground={frameBackground} contentBackground={contentBackground}>
      {child}
    </OverlayBoxComponent>
  }

  return (
    <DashboardContext.Provider value={{updateImage}}>
      <Container fluid>
        <Row style={{marginTop: '0.25rem', marginBottom: '0.25rem'}}>
          <Col lg="3" sm="6">
            <ImageCard imgSrc={imageUrls.img1url} id={1} predictedLabel={modelOutputs.image1.predictedLabel} primaryColor={colors[0]} secondaryColor={colors[0]} />
          </Col>
          <Col lg="3" sm="6">
            <ImageCard imgSrc={imageUrls.img2url} id={2} predictedLabel={modelOutputs.image2.predictedLabel} primaryColor={colors[0]} secondaryColor={colors[0]} />
          </Col>
          <Col lg="3" sm="6">
            <ImageCard imgSrc={imageUrls.img3url} id={3} predictedLabel={modelOutputs.image3.predictedLabel} primaryColor={colors[0]} secondaryColor={colors[0]} />
          </Col>
          <Col lg="3" sm="6">
            <ImageCard imgSrc={imageUrls.img4url} id={4} predictedLabel={modelOutputs.image4.predictedLabel} primaryColor={colors[0]} secondaryColor={colors[0]} />
          </Col>
        </Row>
        <Row>
          <Col md="8">
            <BarChartCard modelOutputs={modelOutputs} barColors={colors} accentColor={accents.accent1} sliderColor={accents.accent2} />
          </Col>
          <Col md="4">
            <ClassListCard classLabels={modelOutputs.labels} colors={colors} ></ClassListCard>
          </Col>
        </Row>
      </Container>
      { showCurtain && <CurtainOverlay color={colors[0]} alpha={0.5} onClick={() => setShowDescription(false)} /> }
      { showCurtain && renderOverlayComponent(colors[3], "#cfcfcf")}
    </DashboardContext.Provider>
  );
}

export default Dashboard;
