import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import React from "react";
import CustomerForm from "./components/CustomerForm";
import { getStorages } from "@/services/StorageService";
import Link from "next/link";

const CreateCustomer = async () => {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/customers">ลูกค้า</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Register new customer</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Separator className="my-2" />

      <div className="py-2 grid grid-cols-2 place-content-start gap-x-5 h-full">
        <div className="col-span-2 max-h-[20%]">
          <h2 className="text-3xl font-semibold prompt">New customer</h2>
        </div>

        <CustomerForm />
      </div>
    </>
  );
};

export default CreateCustomer;
