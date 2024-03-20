import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				username: {
					label: "username",
					type: "text",
				},
				password: {
					label: "password",
					type: "password",
				},
			},

			async authorize(credentials, req) {
				"use server";
				const response = await fetch(`${process.env.API_URL}/auth/token/`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						username: credentials?.username,
						password: credentials?.password,
					}),
				});

				if (response.ok) {
					const { access } = await response.json();
					const info = JSON.parse(atob(access.split(".")[1]));
					const user = {
						id: info.user_id,
						username: info.username,
						name: info.name,
						role: info.role,
						accessToken: access,
					};

					return user;
				}
				return null;
			},
		}),
	],
	pages: {
		signIn: "/login",
	},
	session: {
		strategy: "jwt",
		maxAge: 60 * 60 * 12, // 12 hours
	},
	callbacks: {
		async jwt({ token, user }) {
			return { ...token, ...user };
		},
		async session({ session, token }) {
			session.user = token as any;
			return session;
		},
	},
};
