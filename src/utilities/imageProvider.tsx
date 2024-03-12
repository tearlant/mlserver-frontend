import React from "react";

import marquise1 from '../assets/img/diamonds/marquise1.jpg';
import pear2 from '../assets/img/diamonds/pear2.jpg';
import princess3 from '../assets/img/diamonds/princess3.jpg';
import cushion4 from '../assets/img/diamonds/cushion4.jpg';

import cat1 from '../assets/img/animals/cat1.jpg';
import squirrel2 from '../assets/img/animals/squirrel2.jpg';
import horse3 from '../assets/img/animals/horse3.jpg';
import butterfly4 from '../assets/img/animals/butterfly4.jpg';
  
import daisy1 from "../assets/img/flowers/daisy1.jpg";
import daisy2 from "../assets/img/flowers/daisy2.jpg";
import dandelion3 from "../assets/img/flowers/dandelion3.jpg";
import daisy4 from "../assets/img/flowers/daisy4.jpg";

import placeholder from "../assets/img/placeholder.png"

export interface Images {
    img1url: string;
    img2url: string;
    img3url: string;
    img4url: string;
}

export const animalImagesInit: Images = {
    img1url: cat1,
    img2url: squirrel2,
    img3url: horse3,
    img4url: butterfly4
}

export const flowerImagesInit: Images = {
    img1url: daisy1,
    img2url: daisy2,
    img3url: dandelion3,
    img4url: daisy4
}

export const diamondImagesInit: Images = {
    img1url: marquise1,
    img2url: pear2,
    img3url: princess3,
    img4url: cushion4
}

export const blankInit: Images = {
    img1url: placeholder,
    img2url: placeholder,
    img3url: placeholder,
    img4url: placeholder
  }
  