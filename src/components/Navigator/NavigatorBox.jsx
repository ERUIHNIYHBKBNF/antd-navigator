import style from './navigator.module.scss';
import { PlusCircleFilled } from '@ant-design/icons';

// 新增快捷站点入口
function RenderAdd(props) {
  return (
    <li
      className={ style['navigator-box'] }
      key={ 'add' }
    >
      <div className={ style['center'] }>
        <div className={ style['href'] }>
          <div className={ style['icon'] }>
            <span
              className={ style['add'] }
              onClick={ async () => {
                await props.setModalId(-1);
                props.setModalVisiable(true);
              } }
            >
              <PlusCircleFilled />
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}

// 编辑/删除操作按钮
function DropdownList() {
  return <div></div>
}

// 每个小格的内容
export default function NavigatorBox(props) {
  return props.item.isAdd ?
    <RenderAdd
      setModalVisiable={ props.setModalVisiable } 
      setModalId={ props.setModalId }
    /> :
    (<li
        className={ style['navigator-box'] }
        key={ props.item.id }
      >
        <div className={ style['center'] }>
          <div
            className={ style['nav-bg'] }
            onClick={ () => { window.open(props.item.url) } }
          >
            <div className={ style['href'] }>
              <div className={ style['icon'] }>
                <img src={ props.item.icon } alt="icon" />
              </div>
              <div className={ style['title'] }>
                <span> { props.item.title } </span>
              </div>
            </div>
          </div>
          <DropdownList/>
        </div>
      </li>);
}