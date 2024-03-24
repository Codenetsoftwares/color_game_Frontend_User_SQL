export function getUserInitialState(body = {}) {
	return {
		accessToken: body.accessToken ?? '',
		isLogin: body.isLogin ?? false,
		userName: body.userName ?? '',
		email: body.email ?? '',
	};
}

export function getGameWithMarketDataInitialState(body = {}) {
	return {
		isBlink: false,
		gameId: '',
		gameName: '',
		Description: '',
		markets: [],
	};
}
