"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createGift } from "@/services/GiftService";
import { getDate } from "@/util/GetDateString";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const createGiftFormSchema = z.object({
  name: z.string(),
  price: z.coerce.number(),
  stock: z.coerce.number(),
});

type FormDataType = z.infer<typeof createGiftFormSchema>;

const GiftForm = () => {
  const form = useForm<FormDataType>({
    defaultValues: {
      name: "",
      price: 0,
      stock: 0,
    },
    resolver: zodResolver(createGiftFormSchema),
  });

  const router = useRouter();

  const gift_info = [
    {
      label: "Gift name",
      name: "name",
      placeholder: "Gift name",
    },
    {
      label: "Gift price",
      name: "price",
      placeholder: "Gift price",
    },
    {
      label: "Amount in stock",
      name: "stock",
      placeholder: "Amount in stock",
    },
  ];

  const onSubmit = async (values: any) => {
    const req = await createGift(values);

    if (req.status === "success") {
      toast.success(`Gift ${values.name} created successfully`, {
        description: getDate(new Date()),
      });
      router.push("/gifts");
      return;
    }

    const error = await req.data;
    toast.error(error.message);
    return;
  };

  return (
    <Form {...form}>
      <form
        id="giftform"
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-5"
      >
        {gift_info.map((item) => (
          <FormField
            control={form.control}
            //@ts-expect-error
            name={item.name}
            key={item.name}
            render={({ field }) => (
              <FormItem className="flex items-center justify-between gap-5">
                <FormLabel>{item.label}</FormLabel>
                <FormControl className="max-w-[70%]">
                  <div className="flex flex-col w-full relative">
                    <Input
                      className="w-full placeholder:opacity-40"
                      placeholder={item.placeholder}
                      type={item.name === "name" ? "text" : "number"}
                      {...field}
                    />
                    <FormMessage className="absolute -top-4 right-0" />
                  </div>
                </FormControl>
              </FormItem>
            )}
          ></FormField>
        ))}
        <div className="flex justify-end gap-1 mt-5">
          <Button
            onClick={() => router.push("/gifts")}
            variant={"outline"}
            type="button"
          >
            Cancel
          </Button>
          <Button form="giftform" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default GiftForm;
