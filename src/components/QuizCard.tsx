import styled from '@emotion/styled';
import type { Quiz, QuizState } from '../types';
import ResultOverlay from './ResultOverlay';
import OptionBtnContainer from './OptionBtnContainer';

interface Props {
  quiz: Quiz;
  index: number;
  currentIndex: number;
  state: QuizState;
  onAnswer: (choice: number) => void;
  onNext: () => void;
  isCorrect: boolean | null;
}

const getOffset = (diff: number) => {
  if (diff === 0) return 'translateX(-50%)';
  if (diff === -1) return 'translateX(calc(-50% - 120%))';
  if (diff === 1) return 'translateX(calc(-50% + 120%))';
  return diff < 0 ? 'translateX(-250%)' : 'translateX(250%)';
};

const getOpacity = (diff: number) => {
  if (diff === 0) return 1;
  if (Math.abs(diff) === 1) return 0.3;
  return 0;
};

const Wrapper = styled.div<{ diff: number }>`
  position: absolute;
  left: 50%;
  width: 358px;
  transition: all 0.5s ease;
  transform: ${({ diff }) => getOffset(diff)};
  opacity: ${({ diff }) => getOpacity(diff)};
  z-index: ${({ diff }) => (diff === 0 ? 2 : 1)};
  pointer-events: ${({ diff }) => (diff === 0 ? 'auto' : 'none')};

  @media (min-width: 768px) {
    width: 960px;
  }
`;

const CardBody = styled.div`
  background: #FCF8F5;
  border-radius: 56px 56px 28px 28px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1), 0 8px 15px rgba(0,0,0,0.15), 0 12px 30px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    border-radius: 80px;
  }
`;

const QBadge = styled.div<{ answered: boolean; correct: boolean | null }>`
  position: absolute;
  top: -34px;
  left: -34px;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: ${({ answered, correct }) =>
    !answered ? '#FFD600' : correct ? '#FFD600' : '#FF4E00'};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 11;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);

  @media (min-width: 768px) {
    width: 108px;
    height: 108px;
    top: -34px;
    left: -34px;
  }
`;

const BadgeText = styled.span`
  color: white;
  font-size: 28px;
  font-weight: 900;
  font-family: 'SUIT-ExtraBold', sans-serif;

  @media (min-width: 768px) {
    font-size: 44px;
  }
`;

const QuestionText = styled.p`
  width: 298px;
  margin: 54px 0 25px;
  color: #0063B2;
  font-family: 'SUIT-ExtraBold', sans-serif;
  font-size: 24px;
  line-height: 32px;
  text-align: center;

  @media (min-width: 768px) {
    width: 464px;
    font-size: 40px;
    line-height: 50px;
    text-align: left;
    margin: 70px 0 0 66px;
  }
`;

const ImageBox = styled.div`
  width: 318px;
  height: 252px;
  border: 2px solid #0063B2;
  border-radius: 46px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin: 0 auto;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media (min-width: 768px) {
    width: 496px;
    height: 334px;
    border-width: 3px;
    border-radius: 60px;
    margin: 46px 46px 0 0;
  }
`;

export default function QuizCard({ quiz, index, currentIndex, state, onAnswer, onNext, isCorrect }: Props) {
  const diff = index - currentIndex;

  return (
    <Wrapper diff={diff}>
      <QBadge answered={state === 'result'} correct={isCorrect}>
        <BadgeText>{state === 'result' ? (isCorrect ? 'O' : 'X') : 'Q'}</BadgeText>
      </QBadge>

      <CardBody>
        <QuestionText>{quiz.question_text}</QuestionText>
        {quiz.question_image && (
          <ImageBox>
            <img src={quiz.question_image} alt="quiz" />
          </ImageBox>
        )}

        {state === 'question' ? (
          <OptionBtnContainer options={quiz.options} onAnswer={onAnswer} />
        ) : (
          <ResultOverlay quiz={quiz} isCorrect={isCorrect!} onNext={onNext} />
        )}
      </CardBody>
    </Wrapper>
  );
}
