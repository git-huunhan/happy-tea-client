import React, { useState } from "react";
import "../../App.scss";
import { Row, Col } from "antd";
import { FacebookOutlined, InstagramOutlined, LinkedinOutlined, MailOutlined } from "@ant-design/icons";

const Footer = () => {
  return (
    <div className="container pt-5 pb-5">
      <Row>
      <Col span={6}>
        <h6>CHĂM SÓC KHÁCH HÀNG</h6>
        <p>Trung Tâm Trợ Giúp</p>
        <p>Happy Tea Blog</p>
        <p>Happy Tea Mall</p>
        <p>Hướng Dẫn Mua Hàng</p>
        <p>Hướng Dẫn Bán Hàng</p>
        <p>Thanh Toán</p>
        <p>ận Chuyển</p>
        <p>Trả Hàng & Hoàn Tiền</p>
        <p>Chăm Sóc Khách Hàng</p>
        <p>Chính Sách Bảo Hành</p>
      </Col>
      <Col span={6}>
        <h6>VỀ HAPPY TEA</h6>
        <p>Giới Thiệu Về Happy Tea Việt Nam</p>
        <p>Tuyển Dụng</p>
        <p>Điều Khoản Happy Tea</p>
        <p>Chính Sách Bảo Mật</p>
        <p>Chính Hãng</p>
        <p>Kênh Người Bán</p>
        <p>Flash Sales</p>
        <p>Chương Trình Tiếp Thị Liên Kết Shopee</p>
        <p>Liên Hệ Với Truyền Thông</p>
      </Col>
      <Col span={6}>
        <h6>THANH TOÁN</h6>
        <p>VISA</p>
        <p>Master Card</p>
        <p>AirPay</p>
        <p>Momo</p>
        <p>COD</p>
      </Col>
      <Col span={6}>
        <h6>THEO DÕI CHÚNG TÔI TRÊN</h6>
        <p><FacebookOutlined className="mr-2"/>Facebook</p>
        <p><InstagramOutlined className="mr-2"/>Instagram</p>
        <p><LinkedinOutlined className="mr-2"/>LinkedIn</p>
        <p><MailOutlined className="mr-2"/>happytea@gmail.com</p>
      </Col>
    </Row>
    </div>
  );
};

export default Footer;
