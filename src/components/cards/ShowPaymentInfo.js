import React from "react";
import { Col, Row } from "antd";
import { PDFDownloadLink } from "@react-pdf/renderer";

import PriceFormat from "../price/PriceFormat";
import Invoice from "../../components/order/Invoice";

const ShowPaymentInfo = ({ order }) => {
  const showDownloadLink = (order) => (
    <PDFDownloadLink
      document={<Invoice order={order} />}
      fileName={`hoadon_${order.paymentIntent.id}.pdf`}
    >
      Xuất hóa đơn
    </PDFDownloadLink>
  );

  return (
    <Row>
      <Col span={12}>
        <Row>
          <span className="mr-1 card-title-history">Mã đơn hàng:</span>
          <span className="card-id-history">{order.paymentIntent.id}</span>
        </Row>

        <Row>
          <p className="mr-1 card-title-history m-0">Email khách hàng:</p>

          <span className="card-id-history">{order.email}</span>
        </Row>
        <Row>
          <p className="mr-1 card-title-history m-0">Tổng tiền:</p>

          <span className="text-success" style={{ fontWeight: "bold" }}>
            <PriceFormat price={order.paymentIntent.amount / 100} />
          </span>
        </Row>
      </Col>

      <Col span={12} className="d-flex flex-column justify-content-between">
        <Row className="d-flex justify-content-end">
          <span className="mr-1 card-title-history">Ngày đặt hàng:</span>
          <span>
            {new Date(order.paymentIntent.created * 1000).toLocaleString()}
          </span>
        </Row>

        <Row className="d-flex justify-content-end">
          <div>{showDownloadLink(order)}</div>
        </Row>
      </Col>
    </Row>
  );
};

export default ShowPaymentInfo;
