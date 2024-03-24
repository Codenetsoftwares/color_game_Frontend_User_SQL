import urls from '../utils/constant/UrlConstant';
import strings from '../utils/constant/stringConstant';

import { getNoAuthCallParams, makeCall } from './service';

export async function login(body, isToast = false) {
  try {
    const callParams = getNoAuthCallParams(strings.POST, body, isToast);
    const response = await makeCall(urls.login, callParams, isToast);
    return response;
  } catch (error) {
    throw error;
  }
}

// user api call

export async function user_getAllGames_api(body = {}, isToast = false) {
  try {
    const callParams = getNoAuthCallParams(strings.GET, body, isToast);
    const response = await makeCall(urls.userGames, callParams);
    return response;
  } catch (error) {
    throw error;
  }
}

// export async function name(body, isToast = false) {
//   try {
//     const callParams = getNoAuthCallParams(strings.POST, body, isToast);
//     const response = await makeCall(urls.name, callParams);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// }

// export async function getAnnouncement(body, isToast = false) {
//   try {
//     const callParams = getNoAuthCallParams(strings.GET, body, isToast);
//     const response = await makeCall(urls.announcement, callParams);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// }

// export async function getcarrousel(body, isToast = false) {
//   try {
//     const callParams = getNoAuthCallParams(strings.GET, body, isToast);
//     const response = await makeCall(urls.carrousel, callParams);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// }

// export async function gethitgame(body, isToast = false) {
//   try {
//     const callParams = getNoAuthCallParams(strings.GET, body, isToast);
//     const response = await makeCall(urls.hitgames, callParams);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// }

// export async function gifholder(body, isToast = false) {
//   try {
//     const callParams = getNoAuthCallParams(strings.GET, body, isToast);
//     const response = await makeCall(urls.gifholder, callParams);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// }

// export async function marketdata(body, isToast = false) {
//   try {
//     const callParams = getNoAuthCallParams(strings.GET, body, isToast);
//     const response = await makeCall(urls.marketdata, callParams);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// }

// export async function footer(body, isToast = false) {
//   try {
//     const callParams = getNoAuthCallParams(strings.GET, body, isToast);
//     const response = await makeCall(urls.footer, callParams);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// }

// export async function footerwarning(body, isToast = false) {
//   try {
//     const callParams = getNoAuthCallParams(strings.GET, body, isToast);
//     const response = await makeCall(urls.footerwarning, callParams);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// }

// export async function AllGames(body, isToast = false) {
//   try {
//     const callParams = getNoAuthCallParams(strings.GET, body, isToast);
//     const response = await makeCall(urls.AllGames, callParams);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// }
