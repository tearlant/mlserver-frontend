import React, { createContext, useEffect, useState } from "react";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

import ImageCard from "./widgets/ImageCard"
import BarChartCard from "./widgets/BarChartCard";
import ClassListCard from "./widgets/ClassListCard";
import { ModelSelection } from "routes";
import axios from "axios";

interface Props {
  modelToLoad: ModelSelection;
}

// The server API returns a response matching this schema
interface ModelOutput {
  score: number[];
  predictedLabel: string;
}

export interface ModelOutputs {
  labels: string[];
  image1: ModelOutput;
  image2: ModelOutput;
  image3: ModelOutput;
  image4: ModelOutput;
}

interface Images {
  img1url: string;
  img2url: string;
  img3url: string;
  img4url: string;
}

const sum = (arr: number[]) => arr.reduce((x, y) => x + y);
const normalize = (arr: number[]) => {
  const factor = 1.0 / sum(arr);
  return arr.map(x => factor * x);
}

const flowerImagesInit: Images = {
  img1url: process.env.PUBLIC_URL + "/img/flowers/daisy1.jpg",
  img2url: process.env.PUBLIC_URL + "/img/flowers/daisy2.jpg",
  img3url: process.env.PUBLIC_URL + "/img/flowers/dandelion3.jpg",
  img4url: process.env.PUBLIC_URL + "/img/flowers/daisy4.jpg"
}

const diamondImagesInit: Images = {
  img1url: process.env.PUBLIC_URL + "/img/diamonds/marquise1.jpg",
  img2url: process.env.PUBLIC_URL + "/img/diamonds/pear2.jpg",
  img3url: process.env.PUBLIC_URL + "/img/diamonds/princess3.jpg",
  img4url: process.env.PUBLIC_URL + "/img/diamonds/cushion4.jpg"
}

const blankInit: Images = {
  img1url: process.env.PUBLIC_URL + "/img/placeholder.png",
  img2url: process.env.PUBLIC_URL + "/img/placeholder.png",
  img3url: process.env.PUBLIC_URL + "/img/placeholder.png",
  img4url: process.env.PUBLIC_URL + "/img/placeholder.png"
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

const diamondLabels = ['Cushion', 'Emerald', 'Heart', 'Marquise', 'Oval', 'Pear', 'Princess', 'Round'];
const flowerLabels = ['Daisy', 'Dandelion'];

const diamondSeedData: ModelOutputs = {
  labels: diamondLabels,
  image1: {predictedLabel: 'Marquise', score: normalize([0.0753362838013259, 4.19893463598376682, 0.0798603538584275, 0.061255409103740124, 0.12040283375409261, 0.10426414060055768, 0.15884397185836902, 0.20110237103972042])},
  image2: {predictedLabel: 'Pear', score: normalize([0.25086750253437967, 0.007454750678838048, 0.04882508510660393, 6.07589220367849187, 0.17531103030021972, 0.08440417660940411, 0.24140865891759103, 0.1158365921744717])},
  image3: {predictedLabel: 'Princess', score: normalize([0.034083808119851136, 0.23171925712834002, 0.18163283802794897, 0.010319295958000445, 0.24345578920529123, 5.14495484611004228, 0.12657743382975964, 0.027256731620766222])},
  image4: {predictedLabel: 'Cushion', score: normalize([0.1442332022214041, 7.1455701694354531, 2.18621825426328212, 0.10887413324541537, 0.10173619751660662, 0.006709650504642851, 0.17385756635229974, 0.13280082646089614])}
}

const flowerSeedData: ModelOutputs = {
  labels: flowerLabels,
  image1: {predictedLabel: 'Daisy', score: normalize([85, 14])},
  image2: {predictedLabel: 'Daisy', score: normalize([107, 31])},
  image3: {predictedLabel: 'Dandelion', score: normalize([3, 17.6])},
  image4: {predictedLabel: 'Daisy', score: normalize([67.83, 9.25423])}
}

const colorPalette = [ "#030637", "#3C0753", "#720455", "#910A67" ];

// TODO: Move this to a CSS file
const curtainStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white overlay
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const DashboardContext = createContext({
  updateImage: (newUrl: string, newProbs: ModelOutput, id: number) => {}
});

function Dashboard({ modelToLoad }: Props) {
  const [ colors, setColors ] = useState(colorPalette);
  const [ loadedModel, setLoadedModel ] = useState(ModelSelection.None);

  const [ imageUrls, setImageUrls ] = useState(blankInit);

  // For the sake of the demonstration, the diamond images and flower images are treated differently
  // so that they can persist after changing tabs and changing back.
  const [ flowerImages, setFlowerImages ] = useState(flowerImagesInit);
  const [ diamondImages, setDiamondImages ] = useState(diamondImagesInit);

  const [ diamondModelOutputs, setDiamondModelOutputs ] = useState(diamondSeedData);
  const [ flowerModelOutputs, setFlowerModelOutputs ] = useState(flowerSeedData); // TODO: Move up one level

  const [ modelOutputs, setModelOutputs ] = useState(diamondModelOutputs); // TODO: Move up one level

  useEffect(() => {

    console.log(`PUBLIC_URL is ${process.env.PUBLIC_URL}`)

    let modelGuid = '';

    switch (modelToLoad) {
      case ModelSelection.Diamonds:
        modelGuid = 'e9a0c9da-5aa7-4fd4-90c3-bf88b1c6ddeb';
        break;
      case ModelSelection.Flowers:
        modelGuid = '51848328-657f-48ad-ab9b-b278761eed6e';
        break;
      default:
        setLoadedModel(modelToLoad);
        break;
    }

    if (modelGuid !== '') {
      axios.get(`https://localhost:44346/api/Prediction/extractandsave/${modelGuid}`)
      .then(response1 => {
          console.log('First Response from API:', response1.data); // Debugging statement
          return axios.get('https://localhost:44346/api/Prediction/labels');
      })
      .then(response2 => {
        const newLabels: string[] = response2.data;
        console.log('Second Response from API:', response2.data); // Debugging statement
        console.log(`Setting model to ${modelToLoad}`)
        setLoadedModel(modelToLoad);
        console.log('Setting labels by way of Server')
        updateLabels(modelOutputs, newLabels);
      })
      .catch(error => {
        console.error('Error:', error);
        console.log(`Setting model to ${modelToLoad}`)
        setLoadedModel(modelToLoad); // TODO: Remove, but need to make sure the app doesn't get stuck

        // This is quick and dirty for the demo, but if it reaches this point, it's either Flowers or Diamonds
        updateLabels(modelOutputs, modelToLoad === ModelSelection.Flowers ? flowerLabels : diamondLabels);
      });  
    }

  }, [modelToLoad])

  useEffect(() => {
    console.log(`Loaded model: ${loadedModel.toString()}`)

    switch (loadedModel) {
      case ModelSelection.Diamonds:
        setImageUrls(diamondImages);
        setModelOutputs(diamondModelOutputs);
        break;
      case ModelSelection.Flowers:
        setImageUrls(flowerImages);
        setModelOutputs(flowerModelOutputs);
        break;
      default:
        // TODO: Use placeholders
        setImageUrls(blankInit);
        break;
    }
  }, [loadedModel, flowerImages, diamondImages]);

  const updateImage = (newUrl: string, newProbs: ModelOutput, id: number) => {
    switch (loadedModel) {
      case ModelSelection.Diamonds:
        setDiamondImages(updateImageUrls(diamondImages, newUrl, id));

        // Not strictly necessary, but it optimizes things for the demo by making data persist as the user switches back and forth between models.
        setDiamondModelOutputs(updateProbabilities(diamondModelOutputs, newProbs, id));

        break;
      case ModelSelection.Flowers:
        setFlowerImages(updateImageUrls(flowerImages, newUrl, id));

        // Not strictly necessary, but it optimizes things for the demo by making data persist as the user switches back and forth between models.
        setFlowerModelOutputs(updateProbabilities(flowerModelOutputs, newProbs, id));

        break;
      case ModelSelection.Custom:
        setImageUrls(blankInit);
        break;
    }

    setModelOutputs(updateProbabilities(modelOutputs, newProbs, id));
  }

  return (
    <DashboardContext.Provider value={{updateImage}}>
        <div>
          {loadedModel !== modelToLoad ? (
            <div style={curtainStyle}>
              <p>Loading...</p>
            </div>
          ) : (
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
                  <BarChartCard modelOutputs={modelOutputs} colors={colors} />
                </Col>
                <Col md="4">
                  <ClassListCard classLabels={modelOutputs.labels} colors={colors} ></ClassListCard>
                </Col>
              </Row>
            </Container>    
          )}
        </div>
    </DashboardContext.Provider>
  );
}

export default Dashboard;
