import { Menu, Dropdown, Input } from "antd";
import { useState, useEffect } from "react";
import style from "./search.module.scss";
import request from "../../utils/request";

// 下拉菜单
function renderMenu(sugs) {
  return (
    sugs.length ?
    <Menu>
      { sugs.map((sug) => {
        return ( typeof sug === 'string' ?
          <Menu.Item key={ sug }>
            <a
              href={ `https://www.baidu.com/s?wd=${sug}` }
              target="_blank"
            >
              { sug }
            </a>
          </Menu.Item> :
          <Menu.Item key={ sug.keyword }>
            <a
              href={ `https://fanyi.baidu.com/#en/zh/${sug.keyword}` }
              target="_blank"
            >
              { 'translate: ' + sug.keyword }
            </a>
          </Menu.Item>
        );
      }) }
    </Menu> :
    <div></div>
  );
}

// 获取菜单候选项
async function getKeywords(keyword, setSug) {
  const res = await request({
    url: '/baidu/5a1Fazu8AA54nxGko9WTAnF6hhy/su',
    method: 'GET',
    params: {
      wd: keyword,
      action: "opensearch",
    }
  });
  let sug = res[1];
  // 很粗糙地鉴定英文qwq
  if (keyword.match(/^[a-zA-Z0-9\s]+$/)) {
    sug.unshift({
      mode: 'translate',
      keyword,
    });
  }
  console.log(window.innerHeight);
  if (window.innerHeight < 650) {
    sug = sug.slice(0, 9);
  }
  setSug(sug);
}

// 输入框文本变化时
function onInputChange(e, setSug) {
  const keyword = e.target.value;
  getKeywords(keyword, setSug);
}

export default function Search(props) {
  // 候选项，是否获取焦点
  const [sug, setSug] = useState([]);
  const [isFocus, setFocus] = useState(false);
  useEffect(() => {

  }, [isFocus]);
  return (
    <div className={ `${style['search-box']} ${isFocus && style['search-box-trigged']}` }>
      <Dropdown
        overlay={ renderMenu(sug) }
        trigger={['click']}
      >
        <Input
          placeholder="搜索"
          size="large"
          onFocus={() => { props.change(true); setFocus(true); }}
          onBlur={() => { props.change(false); setFocus(false); }}
          onChange={(e) => { onInputChange(e, setSug); }}
          onPressEnter={(e) => { window.open(`https://www.baidu.com/s?wd=${e.target.value}`); }}
        ></Input>
      </Dropdown>
    </div>
  );
}