import { useState } from 'react';
import { getCharacters } from './charactersApi';

export function useCharacters({ search }) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchCharacters = async () => {
    try {
      setLoading(true);
      setError(null);
      const sCharacters = await getCharacters({ search });
      setCharacters(sCharacters);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { characters,loading, searchCharacters };
}
