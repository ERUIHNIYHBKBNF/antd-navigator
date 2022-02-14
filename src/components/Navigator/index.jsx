import style from './navigator.module.scss';
import { useState, useEffect } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import EditModal from './EditModal';
import NavigatorBox from './NavigatorBox';

// 从本地读取用户的快捷站点列表
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
  // 添加一个add标识作为新增快捷站点的入口
  navigators.push({
    isAdd: true,
  });
  return navigators; 
}

// 获取上次退出时的页码
function getPage() {
  return parseInt(localStorage.getItem('page')) || 0;
}

// 切换页面时，切分数组，取对应最多8个展示
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

export default function Navigator(props) {
  // 当前第几页
  const [page, setPage] = useState(getPage());
  // 当前的最多8个导航格
  const [activeNavs, setActiveNavs] = useState([]);
  // 所有的导航格
  const [navigators, setNavigators] = useState(getNavigators());
  // 对话框可见
  const [modalVisiable, setModalVisiable] = useState(false);

  useEffect(() => {
    changePage(0, page, setPage, navigators, setActiveNavs);
  }, [navigators, page]);
  return (
    <div className={ style['navigator-container'] }>
      <EditModal
        visible={ modalVisiable }
        setVisible={ setModalVisiable }
        getNavigators={ getNavigators }
      />
      <span className={ style['arrow'] }>
        <LeftOutlined
          onClick={ () => changePage(-1, page, setPage, navigators, setActiveNavs) }
        />
      </span>
      <ul className={ style['main-container'] }>
        {
          activeNavs.map((item) =>
            <NavigatorBox
              item={ item }
              setModalVisiable={ setModalVisiable }
            />)
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