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

export const getGift = async (gift_id: number) => {
  "use server";
  const response = await authorizedFetch(
    `${process.env.API_URL}/gifts/${gift_id}/`,
    {
      next: {
        tags: ["getGift", `${gift_id}`],
        revalidate: 0,
      },
    }
  );

  return response;
};
