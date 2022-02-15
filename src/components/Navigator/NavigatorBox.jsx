import style from './navigator.module.scss';
import { PlusCircleFilled, EditOutlined, DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Modal } from 'antd';
import { useState } from 'react';

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
function DropdownList(props) {
  const [modalVisible, setModalVisible] = useState(false);
  // 确认删除对话框
  const modal =
    <Modal
      visible={ modalVisible } 
      onOk={ () => {
        let navigators = JSON.parse(localStorage.getItem('navigators')) || [];
        navigators = navigators.filter(nav => nav.id !== props.id);
        localStorage.setItem('navigators', JSON.stringify(navigators));
        navigators.push({
          isAdd: true,
        });
        props.setNavigators(navigators);
        setModalVisible(false);
      } }
      onCancel={ () => setModalVisible(false) }
    >
      <p> 确认删除? </p>
    </Modal>;
  const menu = 
    <Menu>
      <Menu.Item
        className={ style['menu-icon'] }
        onClick={ async () => {
          await props.setModalId(props.id);
          props.setModalVisiable(true);
        } }
      >
        <EditOutlined />
      </Menu.Item>
      <Menu.Item
        className={ style['menu-icon'] }
        onClick={ async () => {
          setModalVisible(true);
        } }
      >
        <DeleteOutlined />
      </Menu.Item>
    </Menu>
  ;
  return (<Dropdown
    overlay={ menu }
  >
    <div className={ style['edit'] }>
      { modal }
      <MoreOutlined />
    </div>
  </Dropdown>);
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
          <DropdownList
              id={ props.item.id }
              setModalId={ props.setModalId }
              setModalVisiable={ props.setModalVisiable }
              setNavigators={ props.setNavigators }
            />
        </div>
      </li>);
}