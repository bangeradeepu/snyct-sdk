const extract = async ({
  apiKey,
  fields,
  file, // single file
  files, // multiple files
  instructions = "",
  apiUrl = "https://autofill-backend-production.up.railway.app/api/extract",
}) => {
  const formData = new FormData();

  // ✅ Single File Support
  if (file) {
    formData.append("file", file);
  }

  // ✅ Multiple File Support
  if (files && Array.isArray(files)) {
    files.forEach((f) => {
      formData.append("file", f);
    });
  }

  formData.append("fields", JSON.stringify(fields));

  formData.append("instructions", instructions);

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
