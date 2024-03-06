import { Badge } from "@chakra-ui/react";

type Props = {
  score: number | undefined;
};

const CriticScore = ({ score }: Props) => {
  if (!score) return;
  let color = score > 75 ? "green" : score > 60 ? "yellow" : "";
  return (
    <Badge fontSize={14} paddingX={2} borderRadius="4px" colorScheme={color}>
      {score}
    </Badge>
  );
};
export default CriticScore;
