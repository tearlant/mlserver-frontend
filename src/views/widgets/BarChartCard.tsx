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
  Rectangle,
} from 'recharts';
import { ModelOutputs } from '../Dashboard'
import { hexToRGBA } from "utilities/colorUtils";


interface DataForRecharts {
  [key: string]: string | number | null;
}

interface Props {
  modelOutputs: ModelOutputs;
  barColors: string[];
  sliderColor: string;
  accentColor: string;
}

// TODO: Move this to a higher level or utility class
function formatAsPercentage(number: number): string {
  // Multiply by 100 to convert to percentage, then format using Intl.NumberFormat
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  }).format(number);
}

function generateData(labels: string[], img1probs: number[] | null, img2probs: number[] | null, img3probs: number[] | null, img4probs: number[] | null): DataForRecharts[] {
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

function generateKeyedData(labels: string[], img1probs: number[] | null, img2probs: number[] | null, img3probs: number[] | null, img4probs: number[] | null): DataForRecharts[] {
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
      if (curr !== 'nameOfSeries') acc.push(<Bar key={curr} dataKey={curr} fill={colorList[(index - 1) % numColors]}/>);
      return acc;
  }, [] as ReactNode[]);
}

function BarChartCard({modelOutputs, barColors, sliderColor, accentColor}: Props) {
  const [ data, setData ] = useState(generateKeyedData(
    modelOutputs.labels, modelOutputs.image1.score, modelOutputs.image2.score, modelOutputs.image3.score, modelOutputs.image4.score
  ));
  const [ groupedByCategory, setGroupedByCategory ] = useState(false);

  useEffect(() => {
    if (groupedByCategory) {
      setData(
        generateData(
          modelOutputs.labels,
          modelOutputs.image1.score,
          modelOutputs.image2.score,
          modelOutputs.image3.score,
          modelOutputs.image4.score
        )
      );
    } else {
      setData(
        generateKeyedData(
          modelOutputs.labels,
          modelOutputs.image1.score,
          modelOutputs.image2.score,
          modelOutputs.image3.score,
          modelOutputs.image4.score
        )
      );
    }

}, [JSON.stringify([modelOutputs]), groupedByCategory]
  );

  return (
    <Card>

      <Card.Header>
        <Card.Title as="h4">Model Predictions</Card.Title>
        <p className="card-category" onClick={() => setGroupedByCategory(curr => !curr)}>Click here to switch between grouping by image and by category</p>
      </Card.Header>

      <Card.Body>
        <div className="ct-chart" id="chartHours">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart width={ 500 } height={ 300 } data={ data } margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid stroke="#ccc" strokeWidth={1} strokeDasharray="null" fill={hexToRGBA(accentColor, 0.1)} />
              <XAxis dataKey="nameOfSeries" />
              <YAxis domain={[0,1]} />
              <Tooltip content={<CustomTooltip groupedByCategory={groupedByCategory} />} />
              <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
              <ReferenceLine y={0} stroke="#000" />
              <Brush dataKey="nameOfSeries" height={30} stroke={sliderColor} />
              { generateBars(data, barColors) }
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card.Body>

      <Card.Footer>
        <hr></hr>
        <div className="stats">
          Scores and predictions are updated when a model is loaded
        </div>
      </Card.Footer>

    </Card>
  );
}


interface CustomTooltipProps {
  active?: boolean;
  payload?: { color: string, value: number, name: string }[];
  label?: string | number;
  groupedByCategory: boolean;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label, groupedByCategory}) => {
  if (active && payload) {
    const sortedFoos = [...payload].sort((a, b) => b.value - a.value);
    let topFour = sortedFoos.slice(0, 4);

    // If it's grouped by category, these are not scores or predictions, so sort by labels.
    // Otherwise it looks awkward to have "Image 3", "Image 1", etc.
    if (groupedByCategory) {
      topFour = [...topFour].sort((a, b) => a.name.localeCompare(b.name))
    }

    return (
      <Card>
        {groupedByCategory ? 'Scores by image' : 'Prediction (confidence level):'}
        {topFour.map((x, i) => (
          <React.Fragment key={`tooltip${i}`}>
            <p style={{color: x.color, margin: 0, fontSize: '14px'}}>{x.name}: ({formatAsPercentage(x.value)}) </p>
          </React.Fragment>
        ))}
      </Card>
    );
  }

  return <></>;
};


export default BarChartCard;
