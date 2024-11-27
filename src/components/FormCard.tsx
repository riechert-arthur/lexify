import Card from "@mui/material/Card"
import type { FC, ReactNode } from "react"

interface FormCardProps {
  children: Readonly<ReactNode>
}

export const FormCard: FC<FormCardProps> = ({ children }) => {
  return (
    <Card className="p-6" variant="outlined">
      {children}
    </Card>
  )
}
