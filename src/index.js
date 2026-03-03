import axios from "axios";

let FormDataClass;

if (typeof window === "undefined") {
  // Node environment
  FormDataClass = require("form-data");
} else {
  // Browser environment
  FormDataClass = FormData;
}

const extract = async ({
  apiKey,
  fields,
  file,
  files,
  instructions = "",
  apiUrl = "https://autofill-backend-production.up.railway.app/api/extract",
}) => {
  const formData = new FormDataClass();

  if (file) {
    formData.append("file", file);
  }

  if (files && Array.isArray(files)) {
    files.forEach((f) => {
      formData.append("file", f);
    });
  }

  formData.append("fields", JSON.stringify(fields));
  formData.append("instructions", instructions);

  const response = await axios.post(apiUrl, formData, {
    headers: {
      "x-api-key": apiKey,
      ...(formData.getHeaders ? formData.getHeaders() : {}),
    },
  });

  return response.data;
};

export default { extract };