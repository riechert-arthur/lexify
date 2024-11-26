import type { FC, FormEvent } from "react"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import Radio from "@mui/material/Radio"

export interface QuizFormProps {
  question: string
  handleSubmit: (event: FormEvent) => void
  options: string[]
}

export const QuizForm: FC<QuizFormProps> = (props) => {
  return (
    <form>
      <FormControl variant="standard">
        <FormLabel>{props.question}</FormLabel>
        <RadioGroup name="quiz" onChange={props.handleSubmit} className="grid grid-cols-2">
          {props.options.map((answerChoice: string, i: number) => (
            <FormControlLabel key={i} value={i} control={<Radio/>} label={answerChoice} />
          ))}
        </RadioGroup>
      </FormControl> 
    </form>
  )
}

