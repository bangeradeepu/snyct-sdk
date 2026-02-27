const extract = async ({
  apiKey,
  fields,
  file,
  apiUrl = "https://autofill-backend-production.up.railway.app",
}) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("fields", JSON.stringify(fields));

  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
    },
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw {
      error: data.error || "Request failed",
      errorCode: data.errorCode || "UNKNOWN_ERROR",
      status: res.status,
    };
  }

  return data;
};

export default {
  extract,
};
