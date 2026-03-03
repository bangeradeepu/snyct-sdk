import axios from "axios";
import FormDataNode from "form-data";

const isBrowser = typeof window !== "undefined";

const extract = async ({
  apiKey,
  fields,
  file,
  files,
  instructions = "",
  apiUrl = "https://autofill-backend-production.up.railway.app/api/extract",
}) => {

  if (!apiKey) {
    throw {
      status: 401,
      success: false,
      error: "API key is missing",
      errorCode: "API_KEY_REQUIRED",
    };
  }

  const formData = isBrowser ? new FormData() : new FormDataNode();

  const appendFile = (f) => {
    if (isBrowser) {
      formData.append("file", f);
    } else {
      if (f.buffer) {
        formData.append("file", f.buffer, {
          filename: f.originalname || "file",
          contentType: f.mimetype || "application/octet-stream",
        });
      } else {
        formData.append("file", f, { filename: "file" });
      }
    }
  };

  if (file) appendFile(file);
  if (files && Array.isArray(files)) files.forEach(appendFile);

  formData.append("fields", JSON.stringify(fields || {}));
  formData.append("instructions", instructions);

  try {
    const response = await axios.post(apiUrl, formData, {
      headers: {
        "x-api-key": apiKey,
        ...(formData.getHeaders ? formData.getHeaders() : {}),
      },
      maxBodyLength: Infinity,
      timeout: 30000,
    });

    return response.data;

  } catch (error) {

    if (error.response) {
      const { status, data } = error.response;

      throw {
        status,
        success: false,
        error: data?.error || "Request failed",
        errorCode: data?.errorCode || "UNKNOWN_ERROR",
      };
    }

    throw {
      status: 500,
      success: false,
      error: "Network error",
      errorCode: "NETWORK_ERROR",
    };
  }
};

export default { extract };