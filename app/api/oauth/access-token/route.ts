import { NextResponse } from "next/server";

/**
 * 通过 oauth code 获取 github access token
 */
async function getToken(code: string) {

	// 组装请求参数
	var urlencoded = new URLSearchParams();
	urlencoded.append("client_id", process.env.GITHUB_OAUTH_APP_CLIENT_ID as string);
	urlencoded.append("client_secret", process.env.GITHUB_OAUTH_APP_CLIENT_SECRET as string);
	urlencoded.append("code", code);
	urlencoded.append("redirect_uri", process.env.GITHUB_OAUTH_APP_REDRECT_URI as string);

	return fetch('https://github.com/login/oauth/access_token', {
		method: 'POST',
		body: urlencoded,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded'
		},
	}).then((res) => {
		return res.json()
	})
}

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const code = searchParams.get('code') as string
	console.log('request', code)
	const data = await getToken(code)
	if (data.error) {
		return NextResponse.json({
			code: 1,
			data: null,
			message: data.error_description
		})
	}
	return NextResponse.json({
		code: 0,
		data,
		message: null
	})
}
