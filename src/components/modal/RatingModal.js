import React, { useState } from "react";
import { Modal, Button } from "antd";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";

import Notification from "../notification/Notification";

const RatingModal = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [modalVisible, setModalVisible] = useState(false);

  const handleModal = () => {
    if (user && user.token) {
      setModalVisible(true);
    } else {
      Notification("info", "Vui lòng đăng nhập để đánh giá!");
    }
  };

  return (
    <>
      <Button
        className="btn-wishlist ml-3"
        size="large"
        onClick={handleModal}
        icon={<StarOutlined />}
      />

      <Modal
        title="Đánh giá sản phẩm"
        centered
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
          Notification("success", "Thanks for your review");
        }}
        onCancel={() => setModalVisible(false)}
        okText="Đồng ý"
        cancelText="Thoát"
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
