import { SimpleGrid, Text } from "@chakra-ui/react";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";
import { Genre } from "../hooks/useGenres";

type Props = {
  selectedGenre: Genre | null;
};

const GameGrid = ({ selectedGenre }: Props) => {
  const { data, error, isLoading } = useGames(selectedGenre);
  //const skeletons = [1, 2, 3, 4, 5, 6];

  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid
        columns={{ sm: 2, md: 3, lg: 4, xl: 5 }}
        padding="10px"
        spacing={3}
      >
        {/* {isLoading &&
          skeletons.map((skeleton) => (
            <GameCardContainer key={skeleton}>
              <GameCardSkeleton />
            </GameCardContainer>
          ))} */}

        {/* {isLoading &&
          (() => {
            const replay = 15;
            let arr = [];
            for (let i = 0; i < replay; i++) {
              arr.push(
                <GameCardContainer key={i}>
                  <GameCardSkeleton />
                </GameCardContainer>
              );
            }
            return arr;
          })()} */}
        {isLoading &&
          Array.from({ length: 15 }, (_, index) => (
            <GameCardContainer key={index}>
              <GameCardSkeleton />
            </GameCardContainer>
          ))}

        {data.map((game) => (
          <GameCardContainer key={game.id}>
            <GameCard game={game} />
          </GameCardContainer>
        ))}
      </SimpleGrid>
    </>
  );
};
export default GameGrid;
