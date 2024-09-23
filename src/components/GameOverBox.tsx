import { FormEvent, useState } from "react"
import { GameOverProps } from "../interfaces"
import { addPointsToDb } from "../services/supabase_client"
import { GameOver, GameOverButton, GameOverElement, Overlay } from "./common"
import { Link, Outlet } from "react-router-dom"

// Selitä
export function GameOverBox({ setShowGameOver, points }: GameOverProps) {
  const [nickname, setNickname] = useState("")

  const onSave = async () => {
    if (!nickname) { return }
    addPointsToDb(nickname, points)
    setShowGameOver(false)

  }

  function handleInput(e: FormEvent) {
    const inputElement: HTMLInputElement = e.target as HTMLInputElement
    const inputValue: string = inputElement.value
    setNickname(inputValue)
  }

  return (
    <Overlay>
      <GameOver>
        <p>Läpäisit pelin!</p>
        <GameOverElement><h3>Pisteet: {points}</h3></GameOverElement>
        <GameOverElement><label htmlFor="nickname">Nimimerkki:</label></GameOverElement>
        <GameOverElement>
          <input
            value={nickname}
            onInput={(e) => { handleInput(e) }}
            id="nickname"
            type="text" />
        </GameOverElement>

        <Link to="/"><GameOverButton onClick={onSave}>Tallenna</GameOverButton></Link>
        <Link to="/"><GameOverButton>Ohita</GameOverButton></Link>
      </GameOver>
      <Outlet />
    </Overlay>
  )
}