"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Receipt } from "lucide-react";
import Link from "next/link";
import { getDate } from "@/util/GetDateString";
import { IBike } from "@/types/Bike";
import { IStorage } from "@/types/Storage";

interface TransferHistoryItem {
  id: number;
  transfer_date: Date | string;
  bikes: IBike[];
  origin: IStorage;
  destination: IStorage;
}

export const TransferHistoryColumns: ColumnDef<TransferHistoryItem>[] = [
  {
    accessorKey: "transfer_date",
    header: "Transfer date",
    cell: ({ row }) => {
      const item = row.original;
      //@ts-expect-error
      const date = getDate(item.transfer_date);

      return <div>{date}</div>;
    },
  },
  {
    accessorKey: "origin",
    header: "Origin",
    cell: ({ row }) => {
      const item = row.original;

      return <div>{item.origin?.storage_name}</div>;
    },
  },
  {
    accessorKey: "destination",
    header: "Destination",
    cell: ({ row }) => {
      const item = row.original;

      return <div>{item.destination?.storage_name}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;

      return (
        <Link href={`/storage/transfer/receipt/${item.id}`}>
          <Button variant={"outline"}>
            <Receipt size={"1.2rem"} opacity={"60%"} />
          </Button>
        </Link>
      );
    },
  },
];
