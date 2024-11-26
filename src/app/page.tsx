"use client"

import type { FC } from "react"
import { QuizForm, QuizFormProps } from "@/components/quiz/QuizForm"
import { QuizFormCard } from "@/components/quiz/QuizFormCard"

interface HomePageProps {}

const testData: QuizFormProps = {
  question: "What is the name of the sky?",
  handleSubmit: () => {}, 
  options: ["blue", "sora", "caelum", "cielo"]
} 

const HomePage: FC<HomePageProps> = () => {
  return (
    <main className="flex justify-center items-center min-h-screen">
      <QuizFormCard>
        <QuizForm {...testData} />
      </QuizFormCard>
    </main> 
  )
}

export default HomePage
