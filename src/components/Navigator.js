import style from '../style.module.scss';
import { useState, useEffect } from 'react';
import { LeftOutlined, RightOutlined, PlusCircleFilled } from '@ant-design/icons';

function getNavigators() {
  // loaclStiorage.getItem('navigators')
  let navigators = new Array(14).fill(0).map((item, index) => {
    return {
      icon: 'https://cdn.jsdelivr.net/gh/ERUIHNIYHBKBNF/picapica@main/common/chinochann.3kjx7u46s9g0.jpg',
      title: 'title',
      url: 'https://baidu.com',
      index: index,
      isAdd: false,
    }
  });
  navigators.push({
    isAdd: true,
  });
  return navigators; 
}

function getPage() {
  return parseInt(localStorage.getItem('page')) || 0;
  // return 0;
}

function changePage(offset, page, setPage, navigators, setActiveNavs) {
  let totalPage = Math.ceil((navigators.length + 1) / 8);
  if (0 <= page + offset && page + offset < totalPage) {
    setPage(page + offset);
    page = page + offset;
    localStorage.setItem('page', page);
  }
  let activeNavs = [];
  for (let i = page * 8; i < (page + 1) * 8; i++) {
    if (i < navigators.length) {
      activeNavs.push(navigators[i]);
    }
  }
  setActiveNavs(activeNavs);
}

// 新增快捷站点入口
function renderAdd() {
  return (
    <li
      className={ style['navigator-box'] }
      key={ 'add' }
    >
      <div className={ style['center'] }>
        <div className={ style['icon'] }>
          <span className={ style['add'] }>
            <PlusCircleFilled />
          </span>
        </div>
      </div>
    </li>
  );
}

// 每个小格的内容
function renderNavigatorBox(item) {
  return item.isAdd ?
    renderAdd() :
    (<li
        className={ style['navigator-box'] }
        key={ item.index }
      >
        <div className={ style['center'] }>
          <a href={ item.url }>
            <div className={ style['icon'] }>
              <img src={ item.icon } alt="icon" />
            </div>
            <div className={ style['title'] }>
              <span> { item.title } </span>
            </div>
          </a>
        </div>
      </li>);
}

export default function Navigator(props) {
  // 当前第几页
  const [page, setPage] = useState(getPage());
  // 当前的8个导航格
  const [activeNavs, setActiveNavs] = useState([]);
  // 所有的导航格
  const [navigators, setNavigators] = useState(getNavigators());
  useEffect(() => { changePage(0, page, setPage, navigators, setActiveNavs); }, [navigators, page]);
  return (
    <div className={ style['navigator-container'] }>
      <span className={ style['arrow'] }>
        <LeftOutlined
          onClick={ () => changePage(-1, page, setPage, navigators, setActiveNavs) }
        />
      </span>
      <ul className={ style['main-container'] }>
        {
          activeNavs.map((item) => renderNavigatorBox(item))
        }
      </ul>
      <span className={ style['arrow'] } >
        <RightOutlined
          onClick={ () => changePage(1, page, setPage, navigators, setActiveNavs) }
        />
      </span>
    </div>
  );
}