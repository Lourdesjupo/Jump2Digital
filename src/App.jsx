import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import { Characters } from './components/Characters';
import { useCharacters } from './hooks/useCharacters';
import { Loader } from './components/loader';
import debounce from 'just-debounce-it';

function App() {
  const [searchTerm, setSearchTerm] =useState('')
  const [error, setError] = useState();
  const [endPage, setEndPage] = useState(false);
  const { characters, loading, searchCharacters } = useCharacters({
    endPage,
    searchTerm
  });

  const posRef = useRef();
  const screen = window.screen.height;

  const debouncedGetMovies = useCallback(
    debounce((searchTerm) => {
      console.log('hello', searchTerm);
      searchCharacters(searchTerm);
    }, 500)
    ,[]
  );

  useEffect(() => {
    searchCharacters('');
    window.addEventListener('scroll', location);
  }, []);

  const handleChange = (ev) => {
    const searchElement = ev.target.value;
    setError();
    debouncedGetMovies(searchElement);
    setSearchTerm(searchElement)
  };
  //calculates if the end position is displayed on the screen: true - fetch launch
  const location = () => {
    if (!posRef.current) return;
    const actualPosition = posRef.current.getBoundingClientRect();
    console.log('estoy dentro', actualPosition.bottom, screen, loading)
    if (actualPosition.top < screen && !loading) {
      setEndPage(true);
    } else {
      setEndPage(false);
    }
  };

  return (
    <div className='page'>
      <header>
        <img className='banner' src='./banner.png' />
        <form className='form'onSubmit={(ev)=>{ev.preventDefault()}}>
          <input
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent',
            }}
            onChange={handleChange}
            placeholder='Rick, Morty, Alien...'
            type='text'
          />
        </form>
        {error && <p>{error}</p>}
      </header>
      <main>
        <Characters characters={characters} />
        {loading ? <Loader /> : undefined}
      </main>
      <footer>
        <p ref={posRef} className='footer_desc'>
          2023- Lourdes Juárez to Jump2Digital test
        </p>
      </footer>
    </div>
  );
}

export default App;
