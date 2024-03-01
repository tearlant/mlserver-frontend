import React, { ReactNode, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import {
  BarChart,
  Bar,
  Brush,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ModelOutputs } from '../Dashboard'


interface DataForRecharts {
  [key: string]: string | number | null;
}

interface Props {
  modelOutputs: ModelOutputs;
  colors: string[];
}

function generateData(labels: string[], img1probs: number[], img2probs: number[], img3probs: number[], img4probs: number[]): DataForRecharts[] {
  return labels.map((x, i) => {
    return {
      nameOfSeries: x, // TODO: Make it so that this name won't potentially clash with a classification class.
      'Image 1': img1probs ? img1probs[i] : null,
      'Image 2': img2probs ? img2probs[i] : null,
      'Image 3': img3probs ? img3probs[i] : null,
      'Image 4': img4probs ? img4probs[i] : null,
    };
  });
}

function generateKeyedData(labels: string[], img1probs: number[], img2probs: number[], img3probs: number[], img4probs: number[]): DataForRecharts[] {
  const images = [img1probs, img2probs, img3probs, img4probs];
  const names = ['Image 1', 'Image 2', 'Image 3', 'Image 4'];

  // A bit of gymnastics to deal with null-value edge cases
  const x: DataForRecharts[] = [];

  const res = images.reduce((acc, curr, index) => {
    if (curr) {
        const imageData: DataForRecharts = {nameOfSeries: names[index] };
        const r = labels.reduce((acc_inner, curr_inner, index_inner) => { acc_inner[curr_inner] = curr[index_inner]; return acc_inner; }, imageData)
        acc.push(r);
    }
    return acc;
  }, x);

  return res;
}

function generateBars(data: DataForRecharts[], colorList: string[]): ReactNode[] {
  if (data.length === 0) return []; // TODO: This is a vacuous edge case. Handle better.

  const numColors = colorList.length;

  return Object.keys(data[0]).reduce((acc, curr, index) => {
      if (curr !== 'nameOfSeries') acc.push(<Bar key={curr} dataKey={curr} fill={colorList[index % numColors]}/>);
      return acc;
  }, [] as ReactNode[]);
}

function BarChartCard({modelOutputs, colors}: Props) {
  const [ data, setData ] = useState(generateKeyedData(
    modelOutputs.labels, modelOutputs.image1.score, modelOutputs.image2.score, modelOutputs.image3.score, modelOutputs.image4.score
  ));
  const [ groupedByImage, setGroupedByImage ] = useState(true);

  useEffect(() => {
    setData(
      generateKeyedData(
        modelOutputs.labels,
        modelOutputs.image1.score,
        modelOutputs.image2.score,
        modelOutputs.image3.score,
        modelOutputs.image4.score
      )
    )}, [JSON.stringify([modelOutputs])]
  );

  return (
    <Card>

      <Card.Header>
        <Card.Title as="h4">Model Predictions</Card.Title>
        <p className="card-category">TODO: Make this dynamic, depending on whether grouped by image or category</p>
      </Card.Header>

      <Card.Body>
        <div className="ct-chart" id="chartHours">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart width={ 500 } height={ 300 } data={ data } margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nameOfSeries" />
              <YAxis domain={[0,1]} />
              <Tooltip />
              <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
              <ReferenceLine y={0} stroke="#000" />
              <Brush dataKey="nameOfSeries" height={30} stroke="#8884d8" />
              { generateBars(data, colors) }
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card.Body>

      <Card.Footer>
        <hr></hr>
        <div className="stats">
          <i className="fas fa-history"></i>
          Updated 3 minutes ago
        </div>
      </Card.Footer>
    </Card>
  );
}

export default BarChartCard;
