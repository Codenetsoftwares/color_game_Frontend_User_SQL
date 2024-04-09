export function getUserInitialState(body = {}) {
  return {
    accessToken: body.accessToken ?? '',
    isLogin: body.isLogin ?? false,
    userName: body.userName ?? '',
    email: body.email ?? '',
    id: body.id ?? '',
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

export function getbiddingInitialState(body = {}) {
  return {
    rate: '',
    amount: '',
  };
}
