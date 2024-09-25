export interface ResultItemProps {
  nickname: string
  points: number
  index: number
}

export interface ResultProps {
  nickname: string
  points: number
}

export interface ResultsProps {
  results: ResultProps[]
}

export interface BallProps {
  maxCount: number
  x: number
  y: number
  handlePointsFromChild: (num: number) => void
}

export interface GameOverProps {
  setShowGameOver: (p: boolean) => void
  points: number
}