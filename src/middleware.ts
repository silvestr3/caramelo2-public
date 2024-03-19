export { default } from "next-auth/middleware";

export const config = {
	matcher: [
		"/customers/:path*",
		"/dashboard/:path*",
		"/employees/:path*",
		"/inventory/:path*",
		"/sales/:path*",
		"/storage/:path*",
	],
};
