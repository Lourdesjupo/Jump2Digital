import { Character } from '/character';

export function Characters({ characters }) {
  const foundChara = characters?.length > 0;
  if (!foundChara) {
    return <p>No se ha encontrado ningún personaje</p>;
  }
  return (
    <ul className='characters'>
      {characters.map((chara) => (
        <Character key={chara.id} chara={chara} />
      ))}
    </ul>
  );
}
