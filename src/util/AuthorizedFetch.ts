//import { authOptions } from "@/app/api/auth/[...nextauth]/route";
//import { getServerSession } from "next-auth";

export const authorizedFetch = async (url: string, options: RequestInit) => {
	// const session = await getServerSession(authOptions);
	// const backendToken = session?.user.accessToken;

	// if (!session) {
	// 	return;
	// }

	// let newHeaders = {
	// 	...options.headers,
	// 	Authorization: `Bearer ${backendToken}`,
	// };

	return fetch(url, { ...options });
};
