"use client"

import type { FC, FormEvent } from "react"
import { useMemo, useState, useEffect } from "react"
import { QuizForm } from "@/components/quiz/QuizForm"
import { FormCard } from "@/components/FormCard"
import { type AllJapaneseChunksType, fetchAllJapaneseChunks } from "@/lib/supabase/fetch"
import { shuffle, computeRandomQuestionAndAnswers } from "@/lib/random"
import Alert from "@mui/material/Alert"
import CircularProgress from '@mui/material/CircularProgress';
import Button from "@mui/material/Button"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import Typography from "@mui/joy/Typography"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"

interface HomePageProps {}

const DEFAULT_NUMBER_OF_ANSWERS = 10

const HomePage: FC<HomePageProps> = () => {
  const [error, setError] = useState("")
  const [lexicalChunkData, setLexicalChunkData] = useState<AllJapaneseChunksType>([])
  const [currentQuizIndices, setCurrentQuizIndices] = useState<{ questionIdx: number, answerIndices: number[] }>({ questionIdx: 0, answerIndices: [0,2,3]})
  const [answerIsWrong, setAnswerIsWrong] = useState(false)
  const [answerIsCorrect, setAnswerIsCorrect] = useState(false) 
  const [isLoading, setIsLoading] = useState(true)
  const [currentNumberOfAnswers, setCurrentNumberOfAnswers] = useState(DEFAULT_NUMBER_OF_ANSWERS)
  const [currentAnswerOptions, setCurrentAnswerOptions] = useState<string[]>([""])

  const generateQuizFromLexicalChunks = (lexicalChunkData: AllJapaneseChunksType, numberOfAnswers: number) => {
    const shuffledLexicalChunkData = shuffle(lexicalChunkData)
    const quizIndices = computeRandomQuestionAndAnswers(shuffledLexicalChunkData, numberOfAnswers)
    const shuffledQuizIndices = { ...quizIndices, answerIndices: shuffle(quizIndices.answerIndices)}
    const answerOptions = shuffledQuizIndices.answerIndices.map(i => shuffledLexicalChunkData[i].japanese_chunk)
    setCurrentAnswerOptions(answerOptions)
    setLexicalChunkData(shuffledLexicalChunkData)
    setCurrentQuizIndices(quizIndices)
  }

  useEffect(() => {
    const fetchQuizData = async () => {
      await fetchAllJapaneseChunks()
        .then((lexicalChunks) => {
          generateQuizFromLexicalChunks(lexicalChunks, DEFAULT_NUMBER_OF_ANSWERS)
          setIsLoading(false)
        })
        .catch((e) => {
          setError(e.message)
        })
    }
    fetchQuizData()
  },[])

  const optionsForNumberOfAnswers = useMemo(() => {
    return Array.from({ length: 50 }, (_, index) => ({
      id: index + 1,
      label: (index + 1).toString(),
    }))
  }, [])

  const handleQuizSubmit = (event: FormEvent, value: string) => {
    event.preventDefault()

    const userAnswer = value 
    const correctAnswer = lexicalChunkData[currentQuizIndices.questionIdx].japanese_chunk
    if (userAnswer !== correctAnswer) {
      setAnswerIsWrong(true)
      setAnswerIsCorrect(false)
    } else {
      setAnswerIsWrong(false)
      setAnswerIsCorrect(true)
    }
  }

  const handleNextQuestion = (event: FormEvent) => {
    event.preventDefault()

    setIsLoading(true)
    setAnswerIsWrong(false)
    setAnswerIsCorrect(false)
    generateQuizFromLexicalChunks(lexicalChunkData, currentNumberOfAnswers)
    setIsLoading(false)
  }

  const handleChangeNumberOfAnswers = (event: any, value: { id: number, label: string } | null) => {

    if (value === null) {
      setCurrentNumberOfAnswers(DEFAULT_NUMBER_OF_ANSWERS)
      generateQuizFromLexicalChunks(lexicalChunkData, DEFAULT_NUMBER_OF_ANSWERS)
      return
    }

    setIsLoading(true)
    const newNumber = +value.id
    setCurrentNumberOfAnswers(newNumber)
    generateQuizFromLexicalChunks(lexicalChunkData, newNumber)
    setIsLoading(false)
  }

  return (
    <main className="flex flex-col p-4 justify-center items-center min-h-[80vh]">
      <Typography className="mb-4" level="h2">
        How do I say this in Japanese?
      </Typography>
      <Autocomplete
        className="mb-4 min-w-52"
        disablePortal
        value={optionsForNumberOfAnswers[currentNumberOfAnswers - 1]}
        onChange={handleChangeNumberOfAnswers}
        options={optionsForNumberOfAnswers}
        renderInput={(params) => <TextField {...params} label="Number of choices..." />}
      />
      {!isLoading ? (
        <FormCard>
          <QuizForm
            question={lexicalChunkData[currentQuizIndices.questionIdx].english_translation}
            handleSubmit={handleQuizSubmit}
            options={currentAnswerOptions}
          />
        </FormCard>
      ) : (
        <CircularProgress />          
      )}
      {answerIsWrong ? (
        <Alert className="mt-4" variant="outlined" severity="error">
          Your answer is wrong!!
        </Alert>
      ) : (
        answerIsCorrect && (
          <div className="flex flex-col items-center">
            <Alert className="mt-4" variant="outlined" severity="success">
              <strong>Correct!</strong> 
              <p>Kana: {!isLoading && lexicalChunkData[currentQuizIndices.questionIdx].kana}</p>
            </Alert>
            <Button className="flex justify-center mt-4" onClick={handleNextQuestion} variant="outlined" color="success">
              Next <CheckCircleOutlineIcon />
            </Button>
          </div>
        )
      )}
    </main> 
  )
}

export default HomePage
