import { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import QuizCard from '../components/QuizCard';
import type { Quiz, QuizState } from '../types';
import data from '../data/dentalQuizData.json';

const quizzes: Quiz[] = data.quizzes as Quiz[];

const BG = styled.div`
  width: 100vw;
  height: 100vh;
  background: #0052CC;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
`;

const SliderArea = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProgressBar = styled.div`
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  width: 280px;
  height: 8px;
  background: rgba(255,255,255,0.3);
  border-radius: 4px;
  z-index: 20;

  @media (min-width: 768px) {
    width: 500px;
  }
`;

const ProgressFill = styled.div<{ pct: number }>`
  height: 100%;
  width: ${({ pct }) => pct}%;
  background: white;
  border-radius: 4px;
  transition: width 0.4s ease;
`;

interface CardState {
  state: QuizState;
  isCorrect: boolean | null;
}

export default function DentalQuizPage() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [cardStates, setCardStates] = useState<CardState[]>(
    quizzes.map(() => ({ state: 'question', isCorrect: null }))
  );

  const handleAnswer = (choice: number) => {
    const quiz = quizzes[currentIndex];
    const correct = choice === quiz.correct_answer;

    setCardStates(prev => {
      const next = [...prev];
      next[currentIndex] = { state: 'result', isCorrect: correct };
      return next;
    });

    if (correct) setTotalScore(s => s + quiz.weight);
  };

  const handleNext = () => {
    if (currentIndex >= quizzes.length - 1) {
      navigate('/result', { state: { score: totalScore } });
      return;
    }
    setCurrentIndex(i => i + 1);
  };

  const pct = ((currentIndex) / quizzes.length) * 100;

  return (
    <BG>
      <SliderArea>
        {quizzes.map((quiz, i) => (
          <QuizCard
            key={quiz.id}
            quiz={quiz}
            index={i}
            currentIndex={currentIndex}
            state={cardStates[i].state}
            isCorrect={cardStates[i].isCorrect}
            onAnswer={handleAnswer}
            onNext={handleNext}
          />
        ))}
      </SliderArea>
      <ProgressBar>
        <ProgressFill pct={pct} />
      </ProgressBar>
    </BG>
  );
}
