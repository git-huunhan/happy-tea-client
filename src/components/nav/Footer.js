import React from "react";
import { Row, Col } from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  MailOutlined,
} from "@ant-design/icons";

const Footer = () => {
  return (
    <div className="main-background-color">
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
            <p>Vận Chuyển</p>
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
            <p>Chương Trình Tiếp Thị Liên Kết</p>
            <p>Liên Hệ Với Truyền Thông</p>
          </Col>
          <Col span={6}>
            <h6>THANH TOÁN</h6>
            <Row>
              <Col className="mr-3">
                <div>
                  <img
                    className="payment"
                    src="https://firebasestorage.googleapis.com/v0/b/happy-tea-1a89b.appspot.com/o/visa.svg?alt=media&token=ff667433-d0fd-4dfd-a7af-7e4d8ecff15d"
                    alt="visa"
                    draggable="false"
                  />
                </div>
              </Col>
              <Col className="mr-3">
                <div>
                  <img
                    className="payment"
                    src="https://firebasestorage.googleapis.com/v0/b/happy-tea-1a89b.appspot.com/o/mastercard.svg?alt=media&token=0b32a8c9-e3fd-4f84-9b1c-90d8f5ebbca3"
                    alt="visa"
                    draggable="false"
                  />
                </div>
              </Col>
              <Col>
                <div>
                  <img
                    className="payment"
                    src="https://firebasestorage.googleapis.com/v0/b/happy-tea-1a89b.appspot.com/o/airpay.svg?alt=media&token=a0e943be-4f52-412b-bd3a-2cc531d8a81f"
                    alt="visa"
                    draggable="false"
                  />
                </div>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col className="mr-2">
                <div>
                  <img
                    className="payment"
                    src="https://firebasestorage.googleapis.com/v0/b/happy-tea-1a89b.appspot.com/o/momo.svg?alt=media&token=b3ba40f8-67f6-4007-8e5e-36601a22ff79"
                    alt="visa"
                    draggable="false"
                  />
                </div>
              </Col>
              <Col>
                <div>
                  <img
                    className="payment"
                    src="https://firebasestorage.googleapis.com/v0/b/happy-tea-1a89b.appspot.com/o/cod.svg?alt=media&token=244bac39-0d7a-453f-899d-307815b7b8d2"
                    alt="visa"
                    draggable="false"
                  />
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={6}>
            <h6>THEO DÕI CHÚNG TÔI TRÊN</h6>
            <p>
              <FacebookOutlined className="mr-2" />
              Facebook
            </p>
            <p>
              <InstagramOutlined className="mr-2" />
              Instagram
            </p>
            <p>
              <LinkedinOutlined className="mr-2" />
              LinkedIn
            </p>
            <p>
              <MailOutlined className="mr-2" />
              happytea@gmail.com
            </p>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Footer;
