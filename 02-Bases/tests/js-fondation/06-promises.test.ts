import { getPokemonById } from '../../src/js-foundation/06-promises';

describe('js-foundation/06-promises', () => {

  test('getPokemonById should return a pokemon', async () => {
    const pokemonId = 1;

    const pokemonName = await getPokemonById(pokemonId);

    expect(pokemonName).toBe('bulbasaur');

  });

  test('Should return an error if pokemon does not exists', async () => {
    const pokemonId = 100000;
    
    try {
      await getPokemonById(pokemonId);
      expect( true ).toBeFalsy();

    } catch (error) {
      expect( error ).toBe(`Pokemon not found with id ${ pokemonId }`);
    }

    // expect(pokemonName).toBe('Pokemon no existe');



  });
});