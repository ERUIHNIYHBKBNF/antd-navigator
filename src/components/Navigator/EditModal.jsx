import { Modal, Form, Input } from "antd";
import { useEffect } from "react";

// 从本地读取用户的快捷站点列表
function getNavigators() {
  return JSON.parse(localStorage.getItem('navigators')) || [];
}

// 纯前端实现有点蠢谁让垃圾后端不给接口呢qwq
function getNavById(id) {
  const navigators = getNavigators();
  for (let i = 0; i < navigators.length; i++) {
    if (navigators[i].id === id) {
      return navigators[i];
    }
  }
  return undefined;
}

// 保存修改
function setNavigator(title, url, icon, id, setVisible, setFatherNavs) {
  let navigators = getNavigators();
  if (id === -1) {
    id = (parseInt(localStorage.getItem('navIdCounter')) || 0) + 1;
    localStorage.setItem('navIdCounter', id);
    navigators.push({
      title, url, icon, id,
      isAdd: false,
    });
  } else {
    for (let i = 0; i < navigators.length; i++) {
      if (navigators[i].id === id) {
        Object.assign(navigators[i], { title, url, icon });
        break;
      }
    }
  }
  localStorage.setItem('navigators', JSON.stringify(navigators));
  navigators.push({
    isAdd: true,
  });
  setFatherNavs(navigators);
  setVisible(false);
}

export default function EditModal(props) {
  // 用于Modal触发表单验证
  const [form] = Form.useForm();

  useEffect(() => {
    // 默认id传-1为新增，否则为修改
    if (props.id !== -1) {
      let activeNav = getNavById(props.id);
      activeNav && form.setFieldsValue({
        title: activeNav.title,
        url: activeNav.url,
        icon: activeNav.icon,
      });
    } else {
      form.setFieldsValue({
        icon: 'https://cdn.jsdelivr.net/gh/ERUIHNIYHBKBNF/picapica@main/common/chinochann.3kjx7u46s9g0.jpg',
      });
    }
  }, [form, props]);

  const onConfirm = async () => {
    try {
      const info = await form.validateFields();
      setNavigator(info.title, info.url, info.icon, props.id, props.setVisible, props.setNavigators);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      title="编辑站点信息"
      visible={ props.visible }
      destroyOnClose={ true }
      onOk={ onConfirm }
      onCancel={ () => props.setVisible(false) }
    >
      <Form
        name="edit-navigator"
        form={ form }
        autoComplete="off"
      >
        <Form.Item
          label="网站标题"
          name="title"
          rules={[{ required: true, message: '请输入网站名称' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="网站地址"
          name="url"
          rules={[{ required: true, message: '请输入网站地址' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="图标地址"
          name="icon"
          rules={[{ required: true, message: '请输入图标地址' }]}
        >
          <Input />
        </Form.Item>

      </Form>
    </Modal>
  );
}