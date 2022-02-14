import { useEffect, useState } from 'react';
import style from './timer.module.scss';

function formatTime(date) {
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  // const second = String(date.getSeconds()).padStart(2, '0');
  return `${hour}:${minute}`;
}

export default function Timer(props) {
  const [date, setDate] = useState(new Date());
  // did-mounted, will-unmounted
  useEffect(() => {
    let timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <span
      className={ style['timer'] }
      // 父组件切换搜索框与导航栏显示
      onClick={ () => props.change() }
    >
      { formatTime(date) }
    </span>
  );
}