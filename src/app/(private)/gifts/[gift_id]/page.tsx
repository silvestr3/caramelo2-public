import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { getGift } from "@/services/GiftService";
import { Gift } from "@/types/Gift";
import { Frown } from "lucide-react";
import Link from "next/link";
import React from "react";
import AddProducts from "./AddProducts";
import ChangePrice from "./ChangePrice";

interface ViewGiftProps {
  params: {
    gift_id: string;
  };
}

const ViewGift = async ({ params }: ViewGiftProps) => {
  const gift = (await getGift(parseInt(params.gift_id)).then((res) => {
    if (!res?.ok) {
      return null;
    }
    return res.json();
  })) as Gift;

  if (gift === null) {
    return (
      <div className="grid place-items-center h-full w-full">
        <div className="flex items-center justify-center flex-col gap-3">
          <Frown size={"6rem"} opacity={"60%"} />
          <h1>This gift was not found</h1>
          <Link href={"/gifts"}>
            <Button>Back</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/gifts">Gifts</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{gift.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Separator className="my-2" />

      <div className="py-2 grid grid-cols-2 gap-x-5">
        <div className="col-span-1">
          <h2 className="text-3xl font-semibold prompt flex flex-col">
            {gift.name}
          </h2>
          <span className="block">Amount in stock: {gift.stock}</span>
          <span className="block">Price: {gift.price}</span>
        </div>

        <div className="flex flex-col gap-2">
          <AddProducts gift={gift} />
          <ChangePrice gift={gift} />
        </div>
      </div>
    </>
  );
};

export default ViewGift;
