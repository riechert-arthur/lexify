export function shuffle<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function computeRandomArrayIdx(lowerBound: number, upperBound: number) {
  if (!Number.isInteger(lowerBound) || !Number.isInteger(upperBound)) {
    throw new Error("The lower and upper bound must be an integer!")
  }

  if (upperBound <= lowerBound) {
    throw new Error("The lower bound must not exceed the upper bound!")
  }

  return Math.floor(Math.random() * (upperBound - lowerBound)) + lowerBound 
}

export function computeRandomQuestionAndAnswers<T>(arr: T[], numOfAnswers: number): {questionIdx: number, answerIndices: number[]} {
  const questionIdx = computeRandomArrayIdx(0, arr.length) 
  const answerIndices: number[] = [] 
  for (let i = 0; i < numOfAnswers - 1; ++i) {
    const randomIdx = computeRandomArrayIdx(0, arr.length)
    if (randomIdx === questionIdx || answerIndices.includes(randomIdx)) {
      i--
    } else {
      answerIndices.push(randomIdx) 
    }
  }
  return { questionIdx, answerIndices: [questionIdx, ...answerIndices] }
}


