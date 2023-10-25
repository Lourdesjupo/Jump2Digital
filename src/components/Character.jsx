export function Character({ chara }) {
  return (
    <li className='card'>
      <img className='card_img' src={chara.image} alt={chara.name} />
      <h3 className='card_name'>{chara.name}</h3>
      <p className='card_species'>{chara.species}</p>
      <p className='card_status'>{chara.status}</p>
    </li>
  );
}
