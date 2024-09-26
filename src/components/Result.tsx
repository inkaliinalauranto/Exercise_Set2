import { ResultItemProps } from "../interfaces";
import { ResultStyle, Space } from "./common";

//Tehtävä 2.1 lisäominaisuus
export function Result({ nickname, points, index }: ResultItemProps) {
  /*Palautetaan yhtä suoritusta kuvaavat propseina saadut arvot 
  tyylitellysti: */
  return <>
    <ResultStyle>
      <Space><p>Sija {index}.</p></Space>
      <Space><p>{nickname}, </p></Space>
      <Space><p>pisteet: {points}</p></Space>
    </ResultStyle>
  </>
}