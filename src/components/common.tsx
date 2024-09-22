import styled from "styled-components"

/* Tehtävä 2: styled-components-kirjaston hyödyntäminen itsekustomoitujen 
uudelleenkäytettävien tyylikomponenttien tekemiseksi. 

Kirjaston GitHub-repositorio:
https://github.com/styled-components/styled-components */

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
  background: #7A2048;
  color: white;
  border: 1px solid white;
  padding: 10px 20px;
  font-size: medium;
  font-weight: bold;
  border-radius: 6px;
`

export const TotalPoints = styled.div`
  color: white;
  margin-right: 10rem;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: x-large;
`
