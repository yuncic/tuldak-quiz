import styled from '@emotion/styled';

const OptionBtn = styled.button<{ pos: number }>`
  width: 178px;
  height: 83px;
  background: #2A90EF;
  border: 1px solid #0063B2;
  color: #FCF6F5;
  font-family: 'SUIT-ExtraBold', sans-serif;
  font-size: 20px;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: ${({ pos }) =>
    pos === 2 ? '0 0 0 28px' :
    pos === 3 ? '0 0 28px 0' :
    '0'};

  &:hover { background: #1a78d4; }
  &:active { background: #0f5fa8; }

  @media (min-width: 768px) {
    width: 100%;
    height: 82px;
    background: #F3F5FF;
    border-radius: 46px;
    color: #0063B2;
    font-size: 34px;
    border: 1px solid #0063B2;

    &:hover { background: #DCE5FF; }
    &:active { background: #AFC5FF; }
  }
`;

export default OptionBtn;
