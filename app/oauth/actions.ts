export async function getTokenByCode(code: string) {
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

/**
 * 获取环境变量
 */
export async function getEnvConfig(key: string) {
	console.log('process.env', process.env)
	return process.env[key]
}

export const getAuthURL = async (currentHref: string)=> {
	const oauthClientID = await getEnvConfig('GITHUB_OAUTH_APP_CLIENT_ID');
	console.log("oauthClientID", oauthClientID);
	const oauthScope = await getEnvConfig("GITHUB_OAUTH_APP_SCOPE");
	const authURL = `https://github.com/login/oauth/authorize?client_id=${oauthClientID}&redirect_uri=${encodeURIComponent(
		currentHref as string
	)}&scope=${oauthScope}`;
	console.log("即将返回 authURL???", authURL);
	return authURL
}
