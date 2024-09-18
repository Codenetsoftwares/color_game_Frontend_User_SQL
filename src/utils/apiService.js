import urls from "../utils/constant/UrlConstant";
import strings from "../utils/constant/stringConstant";

import { getCallParams, getNoAuthCallParams, makeCall } from "./service";

export async function login(body, isToast = false) {
  try {
    const callParams = getNoAuthCallParams(strings.POST, body, isToast);
    const response = await makeCall(urls.login, callParams, isToast);
    return response;
  } catch (error) {
    throw error;
  }
}


// Logout function
export async function logout(body, isToast = false) {
  try {
    const callParams = getNoAuthCallParams(strings.POST, body, isToast);
    const response = await makeCall(urls.userLogout, callParams, isToast);
    return response;
  } catch (error) {
    throw error;
  }
}

/*======================
  user api call
=======================*/
export async function user_getAllGames_api(body = {}, isToast = false) {
  try {
    const callParams = getNoAuthCallParams(strings.GET, body, isToast);
    const response = await makeCall(urls.userGames, callParams);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function user_getAllGamesWithMarketData_api(
  body = {},
  isToast = false
) {
  try {
    const callParams = getNoAuthCallParams(strings.GET, body, isToast);
    const response = await makeCall(urls.userAllGamesDetails, callParams);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function user_getGameWithMarketData_api(
  body = {},
  isToast = false
) {
  try {
    const callParams = getNoAuthCallParams(strings.GET, body, isToast);
    const response = await makeCall(
      `${urls.userGameDetailById}/${body.gameId}`,
      callParams
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function user_getMarketWithRunnerData_api(
  body = {},
  isToast = false
) {
  try {
    const callParams = getNoAuthCallParams(strings.POST, body, isToast);
    const response = await makeCall(
      `${urls.userMarketDetailById}/${body.marketId}`,
      callParams
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function changePassword(body = {}, isToast = false) {
  try {
    const callParams = await getCallParams(strings.POST, body, isToast);
    const response = await makeCall(urls.changePassword, callParams, isToast);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function user_getBetHistory_api(body = {}, isToast = false) {
  try {
    const callParams = await getCallParams(strings.GET, body, isToast);
    const response = await makeCall(
      `${urls.userBetHistoryById}/${body.marketId}?page=${body.pageNumber}&limit=${body.dataLimit}&startDate=${body.startDate}&endDate=${body.endDate}`,
      callParams,
      isToast
    );

    return response;
  } catch (error) {
    throw error;
  }
}

// export async function user_getOpenBetmarket_api(body = {}, isToast = false) {
//   console.log(body);
//   try {
//     const callParams = await getCallParams(strings.GET, body, isToast);

//     const response = await makeCall(urls.userGetOpenBet, callParams, isToast);

//     return response;
//   } catch (error) {
//     throw error;
//   }
// }

export async function user_getBackLayData_api(body = {}, isToast = false) {
  console.log(body);
  try {
    const callParams = await getCallParams(strings.GET, body, isToast);
    const response = await makeCall(
      `${urls.userBackLayData}/${body.marketId}`,
      callParams,
      isToast
    );

    return response;
  } catch (error) {
    throw error;
  }
}

// dummy data api for open bet and selection
export async function getDataFromHistoryLandingPage(
  body = {},
  isToast = false
) {
  try {
    const callParams = await getCallParams(strings.GET, body, isToast);
    const response = await makeCall(
      urls.getDataFromHistoryLandingPage,
      callParams,
      isToast
    );

    return response;
  } catch (error) {
    throw error;
  }
}

export async function userWallet(userId, isToast = false, dispatch) {
  try {
    const callParams = await getCallParams(strings.GET, isToast);
    const response = await makeCall(`${urls.userWallet}/${userId}`, callParams);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function userBidding(body = {}, isToast = false) {
  try {
    const callParams = await getCallParams(strings.POST, body, isToast);
    const response = await makeCall(urls.userBidding, callParams, isToast);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function betHistory(body = {}, isToast = false) {
  try {
    const callParams = await getCallParams(strings.GET, body, isToast);
    const response = await makeCall(
      `${urls.betHistory}/${body.userId}/${body.gameId}?page=${body.pageNumber}&limit=${body.dataLimit}`,
      callParams
    );

    return response;
  } catch (error) {
    throw error;
  }
}

export async function profitAndLoss_Api(body = {}, isToast = false) {
  try {
    const callParams = await getCallParams(strings.GET, body, isToast);
    const response = await makeCall(
      `${urls.profitAndLoss}?startDate=${body.startDate}&endDate=${body.endDate}&page=${body.pageNumber}&limit=${body.dataLimit}`,
      callParams
      // isToast,
    );

    return response;
  } catch (error) {
    throw error;
  }
}

export async function profitAndLossMarket_Api(body = {}, isToast = false) {
  console.log("body", body);
  try {
    const callParams = await getCallParams(strings.GET, body, isToast);
    const response = await makeCall(
      `${urls.profitAndLossMarket}/${body.gameId}?startDate=${body.startDate}&endDate=${body.endDate}&page=${body.pageNumber}&limit=${body.dataLimit}`,
      callParams
      // isToast,
    );

    return response;
  } catch (error) {
    throw error;
  }
}

export async function profitAndLossRunner_Api(body = {}, isToast = false) {
  try {
    const callParams = await getCallParams(strings.GET, body, isToast);
    const response = await makeCall(
      `${urls.profitAndLossRunner}/${body.marketId}?startDate=${body.startDate}&endDate=${body.endDate}&page=${body.pageNumber}&limit=${body.dataLimit}`,callParams);

    return response;
  } catch (error) {
    throw error;
  }
};


export async function user_carrouselImageDynamic_api(body = {}, isToast = false) {
  try {
    const callParams = getNoAuthCallParams(strings.GET, body, isToast);
    const response = await makeCall(urls.user_carrouselImageDynamic, callParams);
   return response;
  } catch (error) {
    throw error;
  }
};

export async function ResetUserPassword(body = {}, isToast = false) {
  try {
    const callParams =  getNoAuthCallParams(strings.POST, body, isToast);
    const response = await makeCall(urls.resetPassword, callParams, isToast);
    return response;
  } catch (error) {
    throw error;
  }
};

export async function Get_Lotteries(body = {}, isToast = false) {
  try {
    const callParams = getNoAuthCallParams(strings.GET, body, isToast);
    const response = await makeCall(
      `${urls.getLotteries}?page=${body.page}&pageSize=${body.totalPages}&totalItems=${body.totalItems}&pagelimit=${body.pageLimit}`, 
      callParams, 
      isToast);
    return response;
  } catch (error) {
    throw error;
  }
};


export async function Purchase_lottery(body = {}, isToast = false) {
  try {
    const callParams = await getCallParams(strings.POST, body, isToast);
    const response = await makeCall(urls.purchaseTicket, callParams, isToast);
    return response;
  } catch (error) {
    throw error;
  }
};



export async function Get_Purchase_Lotteries_History(body = {}, isToast = false) {
  try {
    const callParams = await getCallParams(strings.GET, body, isToast);
    const response = await makeCall(
      
      `${urls.historyTicket}?page=${body.page}&limitPerPage=${body.limit}&totalPages=${body.totalPages}&totalData=${body.totalItems}`, 
      
      callParams, 
      
      isToast);
    return response;
  } catch (error) {
    throw error;
  }
};