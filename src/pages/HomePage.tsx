import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const BG = styled.div`
  width: 100vw;
  height: 100vh;
  background: #0052CC url('/Frame2.png') center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  width: 90vw;
  max-width: 600px;
  background: white;
  border-radius: 50px;
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 10px 20px rgba(0,0,0,0.15);
`;

const Emoji = styled.div`
  font-size: 4rem;
  margin-bottom: 16px;
`;

const Title = styled.h1`
  font-family: 'SUIT-ExtraBold', sans-serif;
  font-size: 2.4rem;
  color: #0063B2;
  margin: 0 0 12px;
`;

const Desc = styled.p`
  font-family: 'SUIT-Regular', sans-serif;
  font-size: 1.1rem;
  color: #555;
  text-align: center;
  line-height: 1.6;
  margin: 0 0 40px;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
`;

const QuizBtn = styled.button`
  width: 160px;
  height: 160px;
  background: #FCF6F5;
  border: 2px solid #0063B2;
  border-radius: 40px;
  font-family: 'SUIT-ExtraBold', sans-serif;
  font-size: 1.2rem;
  color: #0063B2;
  cursor: pointer;
  transition: all 0.25s ease;
  line-height: 1.5;

  &:hover {
    background: #0063B2;
    color: #FCF6F5;
    transform: translateY(-4px);
  }
`;

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <BG>
      <Card>
        <Emoji>👵🏻</Emoji>
        <Title>틀딱퀴즈</Title>
        <Desc>
          당신의 틀딱력은 얼마나 될까요?<br />
          재미있는 퀴즈를 통해 알아보세요!
        </Desc>
        <ButtonRow>
          <QuizBtn onClick={() => navigate('/quiz/dental')}>
            치아 상태<br />테스트
          </QuizBtn>
        </ButtonRow>
      </Card>
    </BG>
  );
}
