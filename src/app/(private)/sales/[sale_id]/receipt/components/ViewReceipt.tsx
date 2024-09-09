"use client";
import React from "react";
import SaleReceiptTemplate from "@/components/pdf/SaleReceiptTemplate";
import { IOrder } from "@/types/Order";
import dynamic from "next/dynamic";
import PdfLoading from "@/components/pdf/PdfLoading";

interface ViewReceiptProps {
  order: IOrder;
}

const ViewReceipt = ({ order }: ViewReceiptProps) => {
  const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    {
      ssr: false,
      loading: () => <PdfLoading />,
    }
  );

  return (
    <PDFViewer className="h-full w-full">
      <SaleReceiptTemplate order={order} />
    </PDFViewer>
  );
};

export default ViewReceipt;
