import { atom } from "jotai";

export const temperatureAtom = atom({
  min: 0,
  max: 0,
});

export const weatherIconAtom = atom("");
