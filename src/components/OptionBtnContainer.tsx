import styled from '@emotion/styled';
import OptionBtn from './OptionBtn';

interface Props {
  options: string[];
  onAnswer: (choice: number) => void;
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 358px;
  margin-top: auto;

  @media (min-width: 768px) {
    gap: 16px;
    width: calc(100% - 92px);
    margin: 0 46px 46px;
  }
`;

export default function OptionBtnContainer({ options, onAnswer }: Props) {
  return (
    <Grid>
      {options.map((opt, i) => (
        <OptionBtn key={i} pos={i} onClick={() => onAnswer(i + 1)}>
          {opt}
        </OptionBtn>
      ))}
    </Grid>
  );
}
