interface Header {
    key: string;
    value: string;
  }
  
  export const sendRequest = async (
    method: string,
    url: string,
    body?: any,
    headers: Header[] = []
  ) => {
    const startTime = Date.now();
  
    const headerObject = headers.reduce((acc, curr) => {
      if (curr.key) acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);
  
    const response = await fetch(url, {
      method,
      headers: headerObject,
      body: method !== "GET" && body ? JSON.stringify(body) : undefined,
    });
  
    const text = await response.text();
    const time = Date.now() - startTime;
    const size = `${new Blob([text]).size} bytes`;
  
    return {
      status: response.status,
      time,
      size,
      body: text,
    };
  };
  