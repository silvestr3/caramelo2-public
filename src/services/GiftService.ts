"use server";

import { authorizedFetch } from "@/util/AuthorizedFetch";

export const getGifts = async () => {
  "use server";
  const response = await authorizedFetch(`${process.env.API_URL}/gifts`, {
    next: {
      revalidate: 0,
    },
  }).then((res) => res?.json());

  return response;
};
