import urls from '../utils/constant/UrlConstant';
import strings from '../utils/constant/stringConstant';

import { getCallParams, getNoAuthCallParams, makeCall } from './service';

export async function login(body, isToast = false) {
  try {
    const callParams = getNoAuthCallParams(strings.POST, body, isToast);
    const response = await makeCall(urls.login, callParams, isToast);
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

export async function user_getAllGamesWithMarketData_api(body = {}, isToast = false) {
  try {
    const callParams = getNoAuthCallParams(strings.GET, body, isToast);
    const response = await makeCall(urls.userAllGamesDetails, callParams);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function user_getGameWithMarketData_api(body = {}, isToast = false) {
  try {
    const callParams = getNoAuthCallParams(strings.GET, body, isToast);
    const response = await makeCall(`${urls.userGameDetailById}/${body.gameId}`, callParams);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function user_getMarketWithRunnerData_api(body = {}, isToast = false) {
  try {
    const callParams = getNoAuthCallParams(strings.GET, body, isToast);
    const response = await makeCall(`${urls.userMarketDetailById}/${body.marketId}`, callParams);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function changePassword(body = {}, isToast = false) {
  try {
    const callParams = getNoAuthCallParams(strings.POST, body, isToast);

    const response = await makeCall(urls.changePassword, callParams, isToast);
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
      callParams,
    );
    return response;
  } catch (error) {
    throw error;
  }
}