import style from './navigator.module.scss';
import { useState, useEffect } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import EditModal from './EditModal';
import NavigatorBox from './NavigatorBox';

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

export default function Navigator() {
  // 从本地获取用户的快捷站点列表
  const getNavigators = () => JSON.parse(localStorage.getItem('navigators')) || [];

  // 当前第几页，获取上次退出时的页码
  const [page, setPage] = useState(() => parseInt(localStorage.getItem('page')) || 0);
  // 当前的最多8个导航格
  const [activeNavs, setActiveNavs] = useState([]);
  // 对话框可见
  const [modalVisiable, setModalVisiable] = useState(false);
  // 对话框要处理的标签
  const [modalId, setModalId] = useState(-1);
  // 所有的导航格
  const [navigators, setNavigators] = useState(() => {
    let navigators = getNavigators();
    // 添加一个add标识作为新增快捷站点的入口
    navigators.push({
      isAdd: true,
    });
    return navigators;
  });
  
  useEffect(() => {
    changePage(0, page, setPage, navigators, setActiveNavs);
  }, [navigators, page]);

  return (
    <div className={ style['navigator-container'] }>
      { // 对话框关闭时直接销毁组件清空内容
        modalVisiable && <EditModal
        visible={ modalVisiable }
        setVisible={ setModalVisiable }
        setNavigators = { setNavigators }
        id = { modalId }
      />}
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
              setModalId={ setModalId }
              setNavigators={ setNavigators }
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