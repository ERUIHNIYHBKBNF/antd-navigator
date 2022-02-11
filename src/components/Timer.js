import { useEffect, useState } from 'react';
import style from '../style.module.scss';

function formatTime(date) {
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  // const second = String(date.getSeconds()).padStart(2, '0');
  return `${hour}:${minute}`;
}

export default function Timer(props) {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    let timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <span
      className={ style['timer'] }
      onClick={ () => props.change() }
    >
      { formatTime(date) }
    </span>
  );
}