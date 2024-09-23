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