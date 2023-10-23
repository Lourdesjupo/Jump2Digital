export const getCharacters = async ({ search }) => {
  if (search === '') {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character`);
      const json = await response.json();
      const responseCharacters = json.results;
      return responseCharacters?.map((chara) => ({
        id: chara.id,
        image: chara.image,
        name: chara.name,
        species: chara.species,
        status: chara.status,
      }));
    } catch (e) {
      throw new Error('Error searching characters');
    }
  }
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?name=${search}`
    );
    const json = await response.json();
    const responseCharacters = json.results;
    return responseCharacters?.map((chara) => ({
      id: chara.id,
      image: chara.image,
      name: chara.name,
      species: chara.species,
      status: chara.status,
    }));
  } catch (e) {
    throw new Error('Error searching characters');
  }
};
