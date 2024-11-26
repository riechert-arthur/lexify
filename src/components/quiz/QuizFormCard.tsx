import Card from "@mui/material/Card"
import type { FC, ReactNode } from "react"

interface QuizFormCardProps {
  children: Readonly<ReactNode>
}

export const QuizFormCard: FC<QuizFormCardProps> = ({ children }) => {
  return (
    <Card className="p-6" variant="outlined">
      {children}
    </Card>
  )
}
