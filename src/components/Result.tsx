import { ResultItemProps } from "../interfaces";
import { ResultStyle, Space } from "./common";

export function Result({ nickname, points, index }: ResultItemProps) {
    return <>
      <ResultStyle>
        <Space><p>Sija {index}.</p></Space>
        <Space><p>{nickname}, </p></Space>
        <Space><p>pisteet: {points}</p></Space>
      </ResultStyle>
    </>
  }