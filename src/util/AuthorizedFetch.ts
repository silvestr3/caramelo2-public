import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./AuthOptions";

export const authorizedFetch = async (url: string, options: RequestInit) => {
	const session = await getServerSession(authOptions);
	const backendToken = session?.user.accessToken;

	if (!session) {
		return;
	}

	let newHeaders = {
		...options.headers,
		Authorization: `Bearer ${backendToken}`,
	};

	return fetch(url, { ...options, headers: newHeaders }).then((res) => {
		if (res.status === 401) {
			redirect("/login");
		} else {
			return res;
		}
	});
};
