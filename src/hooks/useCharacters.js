import { useState } from 'react';
import { getCharacters } from './charactersApi';
import { getPage } from './CharactersApiPage';

export function useCharacters({ endPage, searchTerm }) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [actualP, setActualP] = useState(2);
  const [pagesApi, setPagesApi] = useState();

  const getCharactersByPage = async () => {
    if (pagesApi !== undefined && actualP > pagesApi) return;
    try {
      setLoading(true);
      setError(null);
      const { characterList: getChara, responsePages: pages } = await getPage(
        actualP,
        searchTerm
      );
      setCharacters([...characters, ...getChara]);
      setPagesApi(pages);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
      setActualP(actualP + 1);
    }
  };

  //check for new page request
  if (endPage && !loading) {
    getCharactersByPage();
  }

  //search the character entered in input
  //by default displays page 1
  const searchCharacters = async (search) => {
    try {
      setLoading(true);
      setError(null);
      const sCharacters = await getCharacters({ search });
      setCharacters(sCharacters);
      setActualP(2);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  return { characters, loading, error, searchCharacters };
}
