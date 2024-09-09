"use client";
import { ICustomer } from "@/types/Customer";
import { IOrder } from "@/types/Order";

import { getReceiptData } from "@/services/OrderService";
import {
  Page,
  Text,
  View,
  Document,
  Font,
  StyleSheet,
} from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

import React, { useEffect, useState } from "react";
import { getDate } from "@/util/GetDateString";

interface SaleReceiptTemplateProps {
  order: IOrder;
}

type ReceiptData = {
  customer: ICustomer;
  order: IOrder;
  amount_text: string;
};

const SaleReceiptTemplate = ({ order }: SaleReceiptTemplateProps) => {
  Font.register({
    family: "Sarabun",
    format: "truetype",
    src: "/fonts/Sarabun-Regular.ttf",
  });

  const tw = createTw({});

  const [receiptDisplay, setReceiptDisplay] = useState<ReceiptData>(
    {} as ReceiptData
  );

  const styles = StyleSheet.create({
    general: {
      fontFamily: "Sarabun",
    },
    headerTitle: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    headerTitleLeft: {
      margin: "4px",
      marginHorizontal: "8px",
    },
  });

  const fetchReceiptData = async () => {
    const receipt_data = await getReceiptData(order.id);
    setReceiptDisplay(receipt_data);
  };

  useEffect(() => {
    fetchReceiptData();
  }, []);

  const dateString = getDate(order.sale_date);

  const documentID = `${order.id}`.padStart(8, "0");

  const totalValue = order.total + order.discount;

  return (
    <Document>
      <Page style={styles.general} size={"A5"} orientation="landscape">
        <View style={styles.headerTitle}>
          <View style={styles.headerTitleLeft}>
            <Text>NPG</Text>
          </View>
          <View style={tw("text-sm flex flex-col items-center")}>
            <Text style={tw("border p-2")}>
              ใบเสร็จรับเงิน/ไม่ใช่ใบกํากับภาษี
            </Text>
            <Text>เลขที PH-{documentID}</Text>
          </View>
        </View>

        <View style={tw("w-full flex items-center justify-center")}>
          <Text>นพดลมอเตอร์กรุ้ป</Text>
          <Text style={tw("text-sm")}>
            359/2 หมู่ 6 ตําบลร้องเข็ม อําเภอร้องกวาง จังหวัดแพร่
          </Text>
          <Text style={tw("text-sm")}>โทร. 099-376-888</Text>
        </View>

        <View style={tw("p-0 w-full flex justify-center items-center mt-5")}>
          <View style={tw("flex items-end w-[90%] justify-end")}>
            <Text style={tw("text-sm")}>{dateString}</Text>
          </View>
          <View style={tw("border w-[90%] p-2")}>
            <Text style={tw("text-sm m-1")}>
              ได้รับเงินจาก: {receiptDisplay?.customer?.name}
            </Text>
            <Text style={tw("text-sm m-1")}>
              ทีอยู่: {receiptDisplay?.customer?.address}{" "}
              {receiptDisplay?.customer?.district}{" "}
              {receiptDisplay?.customer?.subdistrict}{" "}
              {receiptDisplay?.customer?.province}{" "}
            </Text>
            <View style={tw("flex flex-row justify-between")}>
              <Text style={tw("text-sm m-1")}>
                หมายเลขบัตรประชาชน: {receiptDisplay?.customer?.id_card_number}
              </Text>

              <Text style={tw("text-sm m-1")}>
                เบอร์โทรศัพท์: {receiptDisplay?.customer?.phone}
              </Text>
            </View>
          </View>

          <View style={tw("border w-[90%] p-0 mt-2")}>
            <View style={tw("flex flex-row justify-between")}>
              <View style={tw("flex w-[80%]  items-center border-r")}>
                <Text style={tw("text-sm")}>รายการ</Text>
              </View>
              <View style={tw("flex w-[20%] items-center")}>
                <Text style={tw("text-sm")}>จํานวนเงิน</Text>
              </View>
            </View>

            <View style={tw("flex flex-row justify-between")}>
              <View
                style={tw("flex justify-between border-t border-r w-[80%] p-2")}
              >
                {receiptDisplay?.order?.bikes?.map((bike, index) => (
                  <Text key={index} style={tw("text-xs my-1")}>
                    รถจักรยานยนต์ใหม่: {bike.brand} รุ่น: {bike.model_code} สี:
                    {bike.color} เลขตัวเครือง: {bike.engine} เลขตัวถัง:
                    {bike.chassi}
                  </Text>
                ))}

                {receiptDisplay?.order?.additional_fees?.map((fee, index) => (
                  <Text key={index} style={tw("text-xs my-1")}>
                    {fee.description}
                  </Text>
                ))}
              </View>

              <View style={tw("flex justify-between w-[20%] border-t p-2")}>
                {receiptDisplay?.order?.bikes?.map((bike, index) => (
                  <Text key={index} style={tw("text-xs my-1")}>
                    {bike.sale_price}
                  </Text>
                ))}

                {receiptDisplay?.order?.additional_fees?.map((fee, index) => (
                  <Text key={index} style={tw("text-xs my-1")}>
                    {fee.amount}
                  </Text>
                ))}
              </View>
            </View>

            <View style={tw("flex flex-row justify-between")}>
              <View
                style={tw(
                  "flex flex-row justify-between border-t border-r w-[80%] p-2"
                )}
              >
                <View style={tw("flex")}>
                  <Text style={tw("text-xs")}>ของแถม:</Text>
                  {receiptDisplay?.order?.gifts?.map((gift) => (
                    <Text style={tw("text-xs my-1")} key={gift.id}>
                      {gift.name}: {gift.quantity}
                    </Text>
                  ))}
                </View>

                <View style={tw("flex")}>
                  <Text style={tw("text-xs my-1")}>ยอดชําระเงิน</Text>
                  <Text style={tw("text-xs my-1")}>ส่วนลด</Text>
                  <Text style={tw("text-xs my-1")}>รวมทังสิน</Text>
                </View>
              </View>

              <View style={tw("flex justify-between border-t w-[20%] p-2")}>
                <Text style={tw("text-xs my-1")}>{totalValue}</Text>
                <Text style={tw("text-xs my-1")}>
                  {receiptDisplay?.order?.discount}
                </Text>
                <Text style={tw("text-xs my-1")}>
                  {receiptDisplay?.order?.total}
                </Text>
              </View>
            </View>
          </View>

          <View style={tw("border w-[90%] p-0 mt-2 flex items-center")}>
            <Text style={tw("text-sm")}>{receiptDisplay?.amount_text}</Text>
          </View>

          <View style={tw("flex w-[90%] flex-row justify-between mt-2")}>
            <View style={tw("flex gap-2")}>
              <View style={tw("flex flex-row items-center gap-2")}>
                <View style={tw("h-3 w-3 border")} />
                <Text style={tw("text-xs")}>เงินสด</Text>

                <View style={tw("h-3 w-3 border")} />
                <Text style={tw("text-xs")}>ชําระเปนเงินสด</Text>
              </View>

              <View style={tw("flex flex-row items-center gap-2")}>
                <View style={tw("h-3 w-3 border")} />
                <Text style={tw("text-xs")}>
                  โอน ธ. ___________ ref no. _ _ _ _ _{" "}
                </Text>
              </View>
            </View>
            <Text style={tw("text-sm")}>
              {" "}
              ลงชือ ______________________ ผู้รับเงิน
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default SaleReceiptTemplate;
