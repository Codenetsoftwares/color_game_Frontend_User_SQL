export function getUserInitialState(body = {}) {
  return {
    accessToken: body.accessToken ?? '',
    isLogin: body.isLogin ?? false,
    userName: body.userName ?? '',
    email: body.email ?? '',
    id: body.id ?? '',
    wallet: {
      balance: body?.wallet?.balance ?? 0,
      exposure: body?.wallet?.exposure ?? 0,
      walletId: body?.wallet?.walletId ?? '',
      profit_loss: body.profit_loss ?? '',
      marketListExposure: body?.wallet?.marketListExposure ?? [],
    },
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

export function getUserWalletInitialState(body = {}) {
  return {
    balance: body.balance ?? 0,
    exposure: body.exposure ?? 0,
    walletId: body.walletId ?? '',
  };
}

export function getMarketWithRunnerDataInitialState(body = {}) {
  return {
    marketId: '',
    marketName: '',
    participants: null,
    timeSpan: '',
    status: null,
    runners: [
      {
        runnerName: {
          runnerId: '',
          name: '',
        },
        rate: [
          {
            Back: null,
            Lay: null,
            _id: '',
          },
        ],
        _id: '',
      },
    ],
    _id: '',
  };
}

export function getAllGameDataInitialState(body = {}) {
  return [
    {
      gameId: '',
      gameName: '',
      Description: '',
      isBlink: false,
      _id: '',
      markets: [
        {
          marketId: '',
          marketName: '',
          participants: null,
          status: false,
          _id: '',
          runners: [
            {
              runnerName: {
                runnerId: '',
                name: '',
              },
              rate: [
                {
                  Back: null,
                  Lay: null,
                  _id: '',
                },
              ],
            },
          ],
        },
      ],
    },
  ];
}

export function getUserPlaceBidding(body = {}) {
  return {
    gameId: body.gameId ?? '',
    marketId: body.marketId ?? '',
    runnerId: body.runnerId ?? '',
  };
}

export function getbiddingInitialState(body = {}) {
  return {
    rate: '',
    amount: '',
  };
}
