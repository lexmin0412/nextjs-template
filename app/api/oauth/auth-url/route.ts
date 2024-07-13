import { getEnvConfig } from "@/app/oauth/actions";
import { NextResponse } from "next/server";

export async function GET() {
	const redirect_uri = await getEnvConfig('GITHUB_OAUTH_APP_REDRECT_URI') as string
	const oauthClientID = await getEnvConfig('GITHUB_OAUTH_APP_CLIENT_ID');
	console.log("oauthClientID", oauthClientID);
	const oauthScope = await getEnvConfig("GITHUB_OAUTH_APP_SCOPE");
	const authURL = `https://github.com/login/oauth/authorize?client_id=${oauthClientID}&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=${oauthScope}`;
	console.log("即将返回 authURL???", authURL);

	return NextResponse.json({
		code: 0,
		data: {
			authURL
		},
		message: null
	})
}
