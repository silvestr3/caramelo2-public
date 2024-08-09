import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Pencil } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Gift } from "@/types/Gift";
import Link from "next/link";

const GiftRowButton = ({ gift }: { gift: Gift }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Link href={`/gifts/${gift.id}`}>
          <DropdownMenuItem className="flex justify-between">
            <Eye className="opacity-60" />
            ดู
          </DropdownMenuItem>
        </Link>
        <Link href={`/gifts/${gift.id}/edit`}>
          <DropdownMenuItem className="flex justify-between">
            <Pencil className="opacity-60" />
            แก้ไข
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GiftRowButton;
