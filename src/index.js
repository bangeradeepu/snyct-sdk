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
  const formData = isBrowser ? new FormData() : new FormDataNode();

  const appendFile = (f) => {
    if (isBrowser) {
      // Browser File object
      formData.append("file", f);
    } else {
      // Node (multer file object OR buffer)
      if (f.buffer) {
        formData.append("file", f.buffer, {
          filename: f.originalname || "file",
          contentType: f.mimetype || "application/octet-stream",
        });
      } else {
        // raw buffer fallback
        formData.append("file", f, {
          filename: "file",
        });
      }
    }
  };

  if (file) {
    appendFile(file);
  }

  if (files && Array.isArray(files)) {
    files.forEach((f) => appendFile(f));
  }

  formData.append("fields", JSON.stringify(fields));
  formData.append("instructions", instructions);

  const response = await axios.post(apiUrl, formData, {
    headers: {
      "x-api-key": apiKey,
      ...(formData.getHeaders ? formData.getHeaders() : {}),
    },
    maxBodyLength: Infinity,
  });

  return response.data;
};

export default { extract };