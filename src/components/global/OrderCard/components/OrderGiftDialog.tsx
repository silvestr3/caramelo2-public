"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderContext } from "@/context/OrderContext";
import { getGifts } from "@/services/GiftService";
import { Gift, OrderGift } from "@/types/Gift";

import React, { ReactNode, useContext, useEffect, useState } from "react";

interface OrderGiftDialogProps {
  children: ReactNode;
  gift?: OrderGift;
}

const OrderGiftDialog = ({ children, gift }: OrderGiftDialogProps) => {
  const { addOrderGift, editOrderGift } = useContext(OrderContext);

  const [allGifts, setAllGifts] = useState<Gift[]>([]);

  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  async function fetchGiftsStock() {
    const gifts: Gift[] = await getGifts();
    setAllGifts(gifts);
  }

  useEffect(() => {
    if (gift) {
      setId(gift.id.toString());
      setName(gift.name);
      setAmount(gift.amount);
    }
  }, [gift]);

  useEffect(() => {
    fetchGiftsStock();
  }, []);

  useEffect(() => {
    const giftName = allGifts.find((gift) => gift.id.toString() === id);
    setName(giftName ? giftName.name : "");
  }, [id, allGifts]);

  function handleAddOrderGift() {
    const orderGift = {
      id: Number(id),
      name,
      amount,
    };

    addOrderGift(orderGift);
    setId("");
    setName("");
    setAmount(0);
  }

  function handleEditOrderGift() {
    if (gift) {
      const editGift = {
        id: gift.id,
        name: gift.name,
        amount,
      };

      editOrderGift(editGift);
    }
    setId("");
    setName("");
    setAmount(0);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{gift ? "Edit" : "Add new"} gift</DialogTitle>
          <DialogDescription>
            <div className="mt-2 flex justify-between">
              {gift ? (
                <span className="font-black text-xl">{gift.name}</span>
              ) : (
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Select value={id} onValueChange={(e) => setId(e)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select gift" />
                    </SelectTrigger>
                    <SelectContent>
                      {allGifts.map((gift) => (
                        <SelectItem key={gift.id} value={gift.id.toString()}>
                          {gift.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  value={amount}
                  type="number"
                  onChange={(e) => setAmount(parseFloat(e.target.value))}
                  id="amount"
                />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            {!gift ? (
              <Button onClick={handleAddOrderGift}>Add</Button>
            ) : (
              <Button onClick={handleEditOrderGift}>Edit</Button>
            )}
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderGiftDialog;
