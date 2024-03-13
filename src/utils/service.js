import { toast } from 'react-toastify';
import urls from '../global/constant/UrlConstant';
import strings from '../global/constant/stringConstant';
import history from '../utils/history';

// getNoAuthCallParams public api call
export function getNoAuthCallParams(methodType, body) {
  const params = {
    method: methodType,
    headers: strings.applicationJSON,
  };
  switch (methodType) {
    case 'GET':
      return params;
    case 'POST':
      return { ...params, body: JSON.stringify(body) };
    default:
      return false;
  }
}

export async function getHeaderObject(accessToken, contentType) {
  try {
    if (accessToken) {
      return {
        ...contentType,
        token: accessToken,
      };
    }
    history.push(urls.landingViewPath);
    return null;
  } catch (error) {
    throw error;
  }
}

// getNoAuthCallParams private api call
export const getCallParams = async (methodType, body) => {
  const store = JSON.parse(localStorage.getItem(strings.LOCAL_STORAGE_KEY));
  const accessToken = store.user.accessToken;
  const params = {
    method: methodType,
    headers: await getHeaderObject(accessToken, strings.applicationJSON),
  };
  switch (methodType) {
    case 'GET':
      return params;
    case 'POST':
      return { ...params, body: JSON.stringify(body) };
    case 'PUT':
      return { ...params, body: JSON.stringify(body) };

    default:
      return false;
  }
};

export async function makeCall(callName, callParams, isToast) {
  try {
    let call = await fetch(callName, callParams);
    let timeout = getTimeoutPromise();

    const response = await Promise.race([timeout, call]).catch((err) => {
      throw err;
    });

    const json = await response.json();
    
    if(json.success === false) {
      toast.error(json.message)
      return null
    } else if(isToast && (json.success === true || json.code === 200)) { // will update after backend api will provide proper response structure
      toast.success(json.message)
    }
    // if (response && response.ok) {
    //   return json;
    // }
    //  else {
    //   throw new Error('Something went wrong');
    // }
    return json
  } catch (error) {
    // if (await checkStatus(error)) {
    //   // throw notifiers.LOGGEDOUT;
    // }
    toast.error(error.message);
    return null
  }
}

export function getTimeoutPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject({ error: true, message: 'Timeout', success: false }), 5000);
  });
}

export const checkStatus = async (error) => {
  if (error.status === 403 || error.status === 401) {
    localStorage.clear();
    history.push(urls.landingViewPath);
    return true;
  } else return false;
};