# Snyct AI Document Extraction SDK

Snyct is an AI-powered document extraction SDK that allows developers to
automatically extract structured data from documents such as invoices,
identity cards, forms, and PDFs.

The SDK analyzes uploaded files and returns clean JSON data based on
fields defined by the developer.

------------------------------------------------------------------------

# Features

-   AI powered document data extraction
-   High accuracy structured data output
-   Supports multiple document formats (PDF, JPG, PNG, TIFF)
-   Field-level extraction instructions
-   Global extraction rules
-   Batch processing (up to 10 files)
-   Real-time processing
-   JSON response ready for integration

------------------------------------------------------------------------

# How It Works

1.  Define fields to extract
2.  Upload document files
3.  Receive structured JSON data

Example flow:

Define fields → Upload document → Get structured JSON output

------------------------------------------------------------------------

# Installation

## Install via npm

    npm install snyct-ai



------------------------------------------------------------------------

# Import SDK

### ES Modules

    import Snyct from "snyct-ai";

### CommonJS

    const Snyct = require("snyct-ai").default;

------------------------------------------------------------------------

# Quick Start Example

``` javascript
import Snyct from "snyct-ai";

const data = await Snyct.extract({
  apiKey: "YOUR_API_KEY",
  fields: {
    name: "",
    dob: "ISO format",
    aadharNumber: "Return only 12 digits without spaces",
    address: ""
  },
  instructions: "Return all names in Title Case format",
  files: [file1, file2]
});
```

------------------------------------------------------------------------

# Example Response

``` json
{
  "name": "Rahul Sharma",
  "dob": "2000-02-01T00:00:00Z",
  "aadharNumber": "123456789012",
  "address": "123 Main Street, Mumbai",
  "credits": {
    "deducted": 0.10,
    "remaining": 1.90
  },
  "usageId": "67c4213b8d4f2a1b3c5e7f9a"
}
```

------------------------------------------------------------------------

# API Endpoint

    POST https://api.snyct.com/api/extract

------------------------------------------------------------------------

# Request Parameters

  Parameter      Type           Required   Description
  -------------- -------------- ---------- ---------------------------------------
  apiKey         String         Yes        API key used for authentication
  fields         Object         Yes        Fields to extract from document
  files          File / Array   Yes        Files to process (max 10 files)
  instructions   String         No         Global instructions applied to fields

------------------------------------------------------------------------

# Field Instruction Examples

### Date Fields

    dob: "Return date in ISO UTC format like 2026-02-28T14:30:00Z"
    issueDate: "Return as YYYY-MM-DD only"
    expiryDate: "Return as DD/MM/YYYY"

### Identity Fields

    aadharNumber: "Return only the 12 digit number without spaces"
    panNumber: "Return in uppercase format ABCDE1234F"
    passportNumber: "Return alphanumeric without spaces"

### Financial Fields

    totalAmount: "Return as number with 2 decimal places"
    gstNumber: "Return GST format 22AAAAA0000A1Z5"

------------------------------------------------------------------------

# Node.js / Express Example

``` javascript
const express = require("express");
const multer = require("multer");
const Snyct = require("snyct-ai").default;

const app = express();
const upload = multer({ dest: "uploads/" });

app.post("/extract", upload.single("document"), async (req, res) => {
  try {
    const result = await Snyct.extract({
      apiKey: process.env.SNYCT_API_KEY,
      fields: {
        name: "",
        documentNumber: "",
        date: ""
      },
      files: req.files,
      instructions: "Extract all text fields"
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000);
```

------------------------------------------------------------------------

# Error Codes

  Error Code             Status   Description
  ---------------------- -------- -----------------------------
  API_KEY_REQUIRED       401      API key missing
  INVALID_API_KEY        403      Invalid API key
  INSUFFICIENT_CREDITS   403      Not enough credits
  INVALID_FIELDS         400      Invalid fields object
  FILE_TOO_LARGE         400      File exceeds size limit
  TOO_MANY_FILES         400      More than 10 files uploaded

------------------------------------------------------------------------

# Supported Use Cases

-   KYC verification
-   Invoice data extraction
-   Identity document processing
-   Healthcare forms
-   Educational certificates
-   Application forms

------------------------------------------------------------------------

# Best Practices

-   Specify exact formatting instructions
-   Use field-level instructions for better accuracy
-   Use global instructions for common formatting rules
-   Test with multiple document samples

------------------------------------------------------------------------

# Version

    SDK Version: v1.0.7

------------------------------------------------------------------------

# repositories


Documentation: https://github.com/bangeradeepu/snyct-documentation
Dashboard: https://github.com/bangeradeepu/snyct-docs
SDK: https://github.com/bangeradeepu/snyct-sdk
