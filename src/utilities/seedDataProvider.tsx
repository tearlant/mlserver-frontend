import React, { createContext, useContext, useEffect, useState } from "react";
import { ModelOutputs } from "views/Dashboard";

// So that the demonstration always loads properly, some cached mock data is used to initialize it.

const sum = (arr: number[]) => arr.reduce((x, y) => x + y);
const normalize = (arr: number[]) => {
  const factor = 1.0 / sum(arr);
  return arr.map(x => factor * x);
}

export const diamondLabels = ['cushion', 'emerald', 'heart', 'marquise', 'oval', 'pear', 'princess', 'round'];
export const animalLabels = ['butterfly', 'cat', 'chicken', 'cow', 'dog', 'elephant', 'horse', 'sheep', 'spider', 'squirrel'];
export const flowerLabels = ['daisy', 'dandelion'];

export const diamondSeedData: ModelOutputs = {
  labels: diamondLabels,
  image1: {predictedLabel: 'marquise', score: normalize([0.0753362838013259, 4.19893463598376682, 0.0798603538584275, 0.061255409103740124, 0.12040283375409261, 0.10426414060055768, 0.15884397185836902, 0.20110237103972042])},
  image2: {predictedLabel: 'pear', score: normalize([0.25086750253437967, 0.007454750678838048, 0.04882508510660393, 6.07589220367849187, 0.17531103030021972, 0.08440417660940411, 0.24140865891759103, 0.1158365921744717])},
  image3: {predictedLabel: 'princess', score: normalize([0.034083808119851136, 0.23171925712834002, 0.18163283802794897, 0.010319295958000445, 0.24345578920529123, 5.14495484611004228, 0.12657743382975964, 0.027256731620766222])},
  image4: {predictedLabel: 'cushion', score: normalize([0.1442332022214041, 7.1455701694354531, 2.18621825426328212, 0.10887413324541537, 0.10173619751660662, 0.006709650504642851, 0.17385756635229974, 0.13280082646089614])}
}

export const animalSeedData: ModelOutputs = {
  labels: animalLabels,
  image1: {predictedLabel: 'cat', score: normalize([9, 85, 14, 8, 11, 20, 6, 5, 10, 4])},
  image2: {predictedLabel: 'squirrel', score: normalize([9, 10, 4, 8, 11, 2, 13, 5, 10, 93])},
  image3: {predictedLabel: 'horse', score: normalize([10, 44, 14, 10, 12, 9, 103, 5, 13, 11])},
  image4: {predictedLabel: 'butterfly', score: normalize([100, 3, 4, 11, 21, 2, 9, 8, 11, 10, 6])}
}

export const flowerSeedData: ModelOutputs = {
  labels: flowerLabels,
  image1: {predictedLabel: 'daisy', score: normalize([85, 14])},
  image2: {predictedLabel: 'daisy', score: normalize([107, 31])},
  image3: {predictedLabel: 'dandelion', score: normalize([3, 17.6])},
  image4: {predictedLabel: 'daisy', score: normalize([67.83, 9.25423])}
}
