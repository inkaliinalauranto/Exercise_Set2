import styled from "styled-components"

/* Tehtävä 2: styled-components-kirjaston hyödyntäminen itsekustomoitujen 
uudelleenkäytettävien tyylikomponenttien tekemiseksi. 

Kirjaston GitHub-repositorio:
https://github.com/styled-components/styled-components */

export const GameOver = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 20px 30px 20px;
  background: #1E2761;
  height: fit-content;
  width: 15rem;
  box-shadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px";
  border: 2px solid white;
  border-radius: 8px;
  color: white;
`

export const Overlay = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100dvh;
  background: #a9a9a99c;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const GameOverElement = styled.div`
  margin-bottom: 12px;
`

export const Layout = styled.div`
  background: pink;
  width: 100vw;
  height: 100dvh;
`

export const Navigation = styled.div`
  width: 100%;
  height: 80px;
  background-color: #1E2761;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const NavigationButton = styled.button`
  margin-left: 2rem;
  margin-right: 2rem;
  background: #7A2048;
  color: white;
  border: 1px solid white;
  padding: 10px 20px;
  font-size: medium;
  font-weight: bold;
  border-radius: 6px;
`

export const GameOverButton = styled.button`
  background: #7A2048;
  color: white;
  border: 1px solid white;
  padding: 10px 20px;
  font-size: small;
  font-weight: bold;
  border-radius: 6px;
  width: 6rem;
  margin: 10px 10px 0px 10px;
`

export const TotalPoints = styled.div`
  color: white;
  margin-right: 2rem;
  margin-left: 2rem;
  font-size: x-large;
`
export const InputField = styled.div`
  cursor: auto;
`