import styled from "@emotion/styled";
import type { Quiz } from "../types";

const AGE_KEYS = ["10대", "20대", "30대", "40대"];

interface Props {
  quiz: Quiz;
  isCorrect: boolean;
  onNext: () => void;
}

export default function ResultOverlay({ quiz, onNext }: Props) {
  const maxRate = Math.max(...Object.values(quiz.rates));

  return (
    <Overlay>
      <AnswerBox>{quiz.custom_message}</AnswerBox>

      <RateContainer>
        <RateLabel>정답률</RateLabel>
        <RateValueContainer>
          {AGE_KEYS.map((age) => (
            <RateValue key={age} isHighest={quiz.rates[age] === maxRate}>
              {age}: {quiz.rates[age]}%
            </RateValue>
          ))}
        </RateValueContainer>
      </RateContainer>

      <NextBtn onClick={onNext}>
        <svg viewBox="0 0 45 39" fill="none">
          <path
            d="M22.5 2 L2 37 L43 37 Z"
            fill="#F3F5FF"
            stroke="#0063B2"
            strokeWidth="3"
          />
        </svg>
      </NextBtn>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(252, 248, 245, 0.97);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: inherit;
  z-index: 10;
  box-sizing: border-box;
`;

const AnswerBox = styled.div`
  width: calc(100% - 40px);
  margin: 60px 20px 40px;
  margin-bottom: 0px;
  font-family: "SUIT-ExtraBold", sans-serif;
  color: #0063b2;
  font-size: 18px;
  line-height: 28px;
  text-align: center;
  padding: 24px 10px;
  /* border-top: 2px solid #0063b2;
  border-bottom: 2px solid #0063b2; */
  border: 1.5px solid #0063b2;
  border-radius: 10px;

  @media (min-width: 768px) {
    width: calc(100% - 132px);
    margin: 108px 66px 0;
    font-size: 30px;
    line-height: 1.4;
    padding: 36px 0;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: none;
    border-right: none;
    border-radius: 20px;
    border: solid 2px;
    margin-bottom: 20px;
  }
`;

const RateContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 40px);
  margin: 0 20px;
  padding: 12px 0;
  border-bottom: 1px solid #0063b2;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    width: calc(100% - 132px);
    margin: 0 66px;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    height: 58px;
    padding: 0;
    border-width: 1.5px;
  }
`;

const RateLabel = styled.span`
  font-family: "SUIT-ExtraBold", sans-serif;
  font-size: 20px;
  color: #0063b2;
  margin-top: 0px;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    font-size: 20px;
    margin-right: 80px;
    margin-bottom: 0;
  }
`;
const RateValueContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (min-width: 768px) {
    display: contents;
  }
`;
const RateValue = styled.span<{ isHighest: boolean }>`
  font-family:
    ${({ isHighest }) => (isHighest ? "'SUIT-ExtraBold'" : "'SUIT-Regular'")},
    sans-serif;
  font-size: 15px;
  color: #0063b2;
  box-sizing: border-box;

  @media (min-width: 768px) {
    font-size: 18px;
    margin-right: 67px;
  }
`;

const NextBtn = styled.button`
  position: absolute;
  bottom: 50px;
  width: 180px;
  height: 64px;
  background: #f3f5ff;
  border: 2px solid #0063b2;
  border-radius: 100px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 32px;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #dce5ff;
    transform: translateY(-2px);
  }
  &:active {
    background: #afc5ff;
    transform: translateY(0);
  }

  @media (min-width: 768px) {
    width: 300px;
    height: 112px;
    margin-top: 60px;
    border-width: 3px;
  }

  svg {
    width: 28px;
    height: 24px;
    transform: rotate(90deg);

    @media (min-width: 768px) {
      width: 45px;
      height: 39px;
    }
  }
`;
