import React from "react";
import { Document, Font, Page, Text, StyleSheet } from "@react-pdf/renderer";

import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    fontFamily: "Roboto",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  footer: {
    padding: "100px",
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

const Invoice = ({ order }) => (
  <Document>
    <Page style={styles.body}>
      <Text style={styles.header} fixed>
        {new Date().toLocaleString()}
      </Text>
      <Text style={styles.title}>Hóa đơn Happy Tea</Text>
      <Text style={styles.author}>Đơn vị bán hàng: Happy Tea</Text>

      <Text style={styles.text}>
        <Text>
          Mã đơn hàng {"             "}: {order.paymentIntent.id}
        </Text>
        {"\n"}
        <Text>
          Ngày đặt hàng {"          "}:{" "}
          {new Date(order.paymentIntent.created * 1000).toLocaleString()}
        </Text>
        {"\n"}
        <Text>Trạng thái đơn hàng : {order.orderStatus}</Text>
      </Text>

      <Table>
        <TableHeader>
          <TableCell>Sản phẩm</TableCell>
          <TableCell>Topping</TableCell>
          <TableCell>Số lượng</TableCell>
          <TableCell>Tạm tính</TableCell>
        </TableHeader>
      </Table>

      <Table data={order.products}>
        <TableBody>
          <DataTableCell getContent={(x) => x.product.title} />
          <DataTableCell getContent={(x) => x.product.topping} />
          <DataTableCell getContent={(x) => x.count} />
          <DataTableCell getContent={(x) => `${x.product.price * x.count} đ`} />
        </TableBody>
      </Table>

      <Text style={styles.text}>
        <Text>
          Tạm tính {"           "}: {order.cartTotal} đ
        </Text>
        {"\n"}
        <Text>Phí vận chuyển : 0 đ</Text>
        {"\n"}
        <Text>
          Tổng cộng {"        "}: {order.paymentIntent.amount / 100} đ
        </Text>
      </Text>

      <Text style={styles.footer}>
        Cảm ơn bạn đã tin tưởng và mua hàng tại Happy Tea ^^!
      </Text>
    </Page>
  </Document>
);

export default Invoice;
