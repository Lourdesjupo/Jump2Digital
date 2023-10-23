import { useEffect, useState } from 'react';
import './App.css';
import { Characters } from './components/Characters';
import { useCharacters } from './hooks/useCharacters';
import { Loader } from './components/loader';

function App() {
  const [search, setSearch] = useState('');
  const [error, setError] = useState();
  const { characters,loading, searchCharacters} = useCharacters({search});

  useEffect(()=>{
    searchCharacters()
  }, [])

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (search === '') {
      setError('Indique el nombre del personaje');
      return;
    }
    searchCharacters()
    console.log('estoy llamando')
  };

  const handleChange = (ev) => {
    const searchElement = ev.target.value;
    setSearch(searchElement);
    setError();

    if (searchElement.length < 3) {
      setError('Indique al menos tres caracteres');
      return;
    }
  };

  return (
    <div className='page'>
      <header>
        <h1>Buscador Rick and Morty</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent',
            }}
            onChange={handleChange}
            placeholder='Rick, Morty, xx...'
            type='text'
          />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p>{error}</p>}
      </header>
      <main>
        {
          loading ? <Loader/> : <Characters characters={characters} />
        }
        
      </main>
    </div>
  );
}

export default App;
