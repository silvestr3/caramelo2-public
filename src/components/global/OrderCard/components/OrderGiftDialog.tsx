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
  const { addOrderGift, editOrderGift, orderGifts } = useContext(OrderContext);

  const [allGifts, setAllGifts] = useState<Gift[]>([]);
  const [orderGiftsIds, setOrderGiftsIds] = useState<number[]>([]);

  const [canAddGift, setCanAddGift] = useState<boolean>(true);

  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  const [selectedGiftAvailableStock, setSelectedGiftAvailableStock] = useState<
    number | undefined
  >(undefined);

  async function fetchGiftsStock() {
    const gifts: Gift[] = await getGifts();
    setAllGifts(gifts);
  }

  useEffect(() => {
    if (!selectedGiftAvailableStock) {
      setCanAddGift(false);
      return;
    }

    if (amount > selectedGiftAvailableStock) {
      setCanAddGift(false);
    } else {
      setCanAddGift(true);
    }
  }, [amount, selectedGiftAvailableStock, id]);

  useEffect(() => {
    if (gift) {
      setId(gift.id.toString());
      setName(gift.name);
      setAmount(gift.amount);
    }
  }, [gift]);

  useEffect(() => {
    setOrderGiftsIds(orderGifts.map((item) => item.id));
  }, [orderGifts]);

  useEffect(() => {
    fetchGiftsStock();
  }, []);

  useEffect(() => {
    const giftName = allGifts.find((gift) => gift.id.toString() === id);
    setName(giftName ? giftName.name : "");
    setSelectedGiftAvailableStock(
      id ? allGifts.find((item) => item.id === Number(id))?.stock : undefined
    );
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
                        <>
                          {!orderGiftsIds.includes(gift.id) && (
                            <SelectItem
                              key={gift.id}
                              value={gift.id.toString()}
                            >
                              {gift.name}
                            </SelectItem>
                          )}
                        </>
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
                {selectedGiftAvailableStock && (
                  <span>Available: {selectedGiftAvailableStock}</span>
                )}
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex items-center">
          {!canAddGift && id && (
            <>
              <span className="text-red-500">Amount unavailable</span>
            </>
          )}
          <DialogClose asChild>
            {!gift ? (
              <Button disabled={!canAddGift} onClick={handleAddOrderGift}>
                Add
              </Button>
            ) : (
              <Button disabled={!canAddGift} onClick={handleEditOrderGift}>
                Edit
              </Button>
            )}
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderGiftDialog;
