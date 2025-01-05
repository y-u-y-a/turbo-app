import type { Pokemon } from "@/features/pokemon/types"
import { Card, CardSection, Grid, GridCol, Image, Text } from "@mantine/core"
import Link from "next/link"

interface Props {
  pokemons: Pokemon[]
}

export function PokemonList({ pokemons }: Props) {
  return (
    <>
      <Grid>
        {pokemons.map((pokemon) => (
          <GridCol span={{ base: 6, xs: 3, sm: 2, md: 1.5 }} key={pokemon.id}>
            <Card py={0} component={Link} href={pokemon.image} target="_blank" withBorder>
              <CardSection>
                <Image src={pokemon.image} alt={pokemon.name} />
              </CardSection>
            </Card>
            <Text fw="bold" ta="center" children={pokemon.name} lineClamp={2} />
          </GridCol>
        ))}
      </Grid>
    </>
  )
}
