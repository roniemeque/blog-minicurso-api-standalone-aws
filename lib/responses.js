const generateResponse = (data, statusCode) => ({
  statusCode,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  },
  body: JSON.stringify(data)
});

export const success = data => generateResponse(data);

export const fail = data => generateResponse({ error: data }, 500);
