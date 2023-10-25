//return [{character},{character}]
export const getPage = async (actualP, search) => {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${actualP}&name=${search}`
    );
    const json = await response.json();
    const responseCharacters = json.results;
    const responsePages = json.info.pages

  const characterList =  responseCharacters?.map((chara) => ({
      id: chara.id,
      image: chara.image,
      name: chara.name,
      species: chara.species,
      status: chara.status,
    }));
    return {characterList, responsePages}
  } catch (e) {
    throw new Error('Error searching next page');
  }
};
