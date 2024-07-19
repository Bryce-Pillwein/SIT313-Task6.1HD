// Padding Block tsx

interface PaddingBlockProps {
  pad: number;
}

const PaddingBlock: React.FC<PaddingBlockProps> = ({ pad }) => {
  return (
    <div style={{ paddingBlock: `${pad}rem` }}></div>
  );
}

export default PaddingBlock;