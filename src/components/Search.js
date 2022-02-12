import { Menu, Dropdown, Input } from "antd";
import { useState } from "react";
import style from "../style.module.scss";

const items = [];

function renderMenu(items) {
  return (items ?
    <div></div> :
    <Menu>
      { items.map((item) => {
        return (
          <Menu.Item key={ item.key }>
            { item.title }
          </Menu.Item>
        );
      }) }
    </Menu>);
}

export default function Search(props) {
  // const [value, setValue] = useState('');
  const [isFocus, setFocus] = useState(false);
  return (
    <div className={ `${style['search-box']} ${isFocus && style['search-box-trigged']}` }>
      <Dropdown
        overlay={ renderMenu(items) }
        trigger={['click']}
      >
          <Input
            placeholder="搜索"
            size="large"
            onFocus={() => { props.change(true); setFocus(true); }}
            onBlur={() => { props.change(false); setFocus(false); }}
          ></Input>
      </Dropdown>
    </div>
  );
}




// CheckboxGroup.jsx
// (props) => {
//   <form>
//     {
//       for(let i = 0; i < props.options.length; i++) {
//         <input type="checkbox" value={ props.value ? props.value[i] : false } />
//         <label> props.options[i] </label>
//       }
//     }
//   </form>
// }