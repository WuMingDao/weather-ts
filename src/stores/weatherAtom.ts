import { atom } from "jotai";
import type { weather } from "../types/weather";

export const temperatureAtom = atom({
  min: 0,
  max: 0,
});

export const weatherIconAtom = atom("");

export const forecastAtom = atom<weather[]>([]);
