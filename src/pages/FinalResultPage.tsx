import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';
import data from '../data/dentalQuizData.json';
import type { ResultRange } from '../types';

const ranges: ResultRange[] = data.resultRanges as ResultRange[];

const BG = styled.div`
  width: 100vw;
  height: 100vh;
  background: #0052CC;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  width: 340px;
  background: #FCF8F5;
  border-radius: 56px;
  padding: 48px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 8px 30px rgba(0,0,0,0.2);

  @media (min-width: 768px) {
    width: 600px;
    padding: 64px 48px;
    border-radius: 80px;
  }
`;

const Label = styled.p`
  font-family: 'SUIT-Regular', sans-serif;
  font-size: 1rem;
  color: #888;
  margin: 0 0 8px;
`;

const ResultType = styled.h2`
  font-family: 'SUIT-ExtraBold', sans-serif;
  font-size: 3rem;
  color: #0063B2;
  margin: 0 0 16px;

  @media (min-width: 768px) {
    font-size: 4rem;
  }
`;

const Message = styled.p`
  font-family: 'SUIT-Regular', sans-serif;
  font-size: 1.1rem;
  color: #444;
  text-align: center;
  line-height: 1.6;
  margin: 0 0 40px;
`;

const RetryBtn = styled.button`
  padding: 16px 48px;
  background: #0063B2;
  color: white;
  border: none;
  border-radius: 40px;
  font-family: 'SUIT-ExtraBold', sans-serif;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover { background: #004f90; transform: translateY(-2px); }
`;

export default function FinalResultPage() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: { score: number } };
  const score = state?.score ?? 0;

  const result = ranges.find(r => score >= r.min && score <= r.max) ?? ranges[0];

  return (
    <BG>
      <Card>
        <Label>당신의 치아 상태는</Label>
        <ResultType>{result.type}</ResultType>
        <Message>{result.message}</Message>
        <Label style={{ marginBottom: 24 }}>총점: {score}점</Label>
        <RetryBtn onClick={() => navigate('/')}>다시 하기</RetryBtn>
      </Card>
    </BG>
  );
}
