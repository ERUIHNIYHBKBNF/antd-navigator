import { Modal } from "antd";
import { useState, useEffect } from "react";

export default function EditModal(props) {
  const addNavigator = () => {
    console.log('qwq');
    props.setVisible(false);
  };
  return (
    <Modal
      title="编辑站点信息"
      visible={ props.visible }
      onOk={ addNavigator }
      onCancel={ () => { props.setVisible(false) } }
    >
      qwq
    </Modal>
  );
}