import {Baseurl} from './BaseUrl';
import axios from 'axios';

export const PostFunction = async (data, url) => {
  const config = {
    method: 'post',
    url: `${Baseurl}${url}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  };

  try {
    const result = await axios(config);
    // console.log('response >>>>>>>>>>>>>>>>>>>>>>>', result);
    if (result.status === 200 || result.status === 201) {
      return {
        success: true,
        data: result.data,
      };
    } else {
      // console.log(result, '1');
      return {
        success: false,
        data: result,
      };
    }
  } catch (err) {
    // console.log(err, '2');
    return {
      success: false,
      data: err,
    };
  }
};

export const GetFunction = async (url, token) => {
  const config = {
    method: 'get',
    url: `${Baseurl}${url}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const result = await axios(config);
    // console.log('response >>>>>>>>>>>>>>>>>>>>>>>', result);
    if (result.status === 200 || result.status === 201) {
      return {
        success: true,
        data: result.data,
      };
    } else {
      // console.log(result, '1');
      return {
        success: false,
        data: result,
      };
    }
  } catch (err) {
    // console.log(err, '2');
    return {
      success: false,
      data: err,
    };
  }
};

export const LogoutFunction = async (url, token) => {
  const config = {
    method: 'post',
    url: `${Baseurl}${url}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const result = await axios(config);
    // console.log('response >>>>>>>>>>>>>>>>>>>>>>>', result.status);
    if (result.status === 200 || result.status === 201) {
      return {
        success: true,
        data: result.data,
      };
    } else {
      // console.log(result, '1');
      return {
        success: false,
        data: result,
      };
    }
  } catch (err) {
    // console.log(err, '2');
    return {
      success: false,
      data: err,
    };
  }
};
export const UpdateFunction = async (data, url, token, headers) => {
  const config = {
    method: 'post',
    url: `${Baseurl}${url}`,
    headers: {
      'Content-Type': headers || 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
    data,
  };

  try {
    const result = await axios(config);
    console.log('response >>>>>>>>>>>>>>>>>>>>>>>', result);
    if (result.status === 200 || result.status === 201) {
      return {
        success: true,
        data: result.data,
      };
    } else {
      // console.log(result, '1');
      return {
        success: false,
        data: result,
      };
    }
  } catch (err) {
    // console.log(err, '2');
    return {
      success: false,
      data: err,
    };
  }
};
////linked login function ////
export const GetLinbkedFunction = async (url, token) => {
  const config = {
    method: 'get',
    url: `${url}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const result = await axios(config);
    // console.log('response >>>>>>>>>>>>>>>>>>>>>>>', result);
    if (result.status === 200 || result.status === 201) {
      return {
        success: true,
        data: result.data,
      };
    } else {
      // console.log(result, '1');
      return {
        success: false,
        data: result,
      };
    }
  } catch (err) {
    // console.log(err, '2');
    return {
      success: false,
      data: err,
    };
  }
};
export const GetKey = async url => {
  const config = {
    method: 'get',
    url: `${Baseurl}${url}`,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const result = await axios(config);
    // console.log('response >>>>>>>>>>>>>>>>>>>>>>>', result);
    if (result.status === 200 || result.status === 201) {
      return {
        success: true,
        data: result.data,
      };
    } else {
      // console.log(result, '1');
      return {
        success: false,
        data: result,
      };
    }
  } catch (err) {
    // console.log(err, '2');
    return {
      success: false,
      data: err,
    };
  }
};

/////// Strip Create Card Token///
export const Create_Token = async data => {
  const config = {
    method: 'post',
    url: `https://api.stripe.com/v1/tokens`,
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`,
    },
    data,
  };

  try {
    const result = await axios(config);
    // console.log('response >>>>>>>>>>>>>>>>>>>>>>>', payment);
    if (result.status === 200 || result.status === 201) {
      return {
        success: true,
        data: result.data,
      };
    } else {
      // console.log(result, '1');
      return {
        success: false,
        data: result,
      };
    }
  } catch (err) {
    // console.log(err, '2');
    return {
      success: false,
      data: err,
    };
  }
};
