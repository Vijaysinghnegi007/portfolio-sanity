# Importing Data into Sanity CMS

Follow the steps below to import an `.ndjson` file into your Sanity dataset.

## Prerequisites

- Run the command from your **Sanity Studio** project directory.
- Place your `.ndjson` file inside the `data` folder of your Next.js project (or update the path accordingly).
- Replace the placeholders in the command below:

  - `<project-folder>` → Your project folder name.
  - `<file-name>.ndjson` → The data file you want to import.
  - `<dataset-name>` → Your Sanity dataset (`production`, `development`, etc.).

## Import Command

```bash
npx sanity dataset import ../<project-folder>/data/<file-name>.ndjson --dataset <dataset-name>
```

### Example

```bash
npx sanity dataset import ../portfolio-sanity/data/achievements.ndjson --dataset development
```

```bash
npx sanity dataset import ../portfolio-sanity/data/profile.ndjson --dataset production
```

## NDJSON File Format (Important)

Sanity imports **NDJSON (Newline Delimited JSON)**, **not a JSON array**.

### Rules

- Each line must contain **exactly one complete JSON object**.
- **Do not** wrap the objects inside `[` and `]`.
- **Do not** add commas between objects.
- **Do not** split a single object across multiple lines.
- **Do not** leave blank lines between objects.
- Each object must start on a new line immediately after the previous object ends.

### Correct Format

```ndjson
{"_id":"item-1","_type":"example","title":"First Item"}
{"_id":"item-2","_type":"example","title":"Second Item"}
{"_id":"item-3","_type":"example","title":"Third Item"}
```

### Incorrect Format (Blank Lines Between Objects)

```ndjson
{"_id":"item-1","_type":"example","title":"First Item"}

{"_id":"item-2","_type":"example","title":"Second Item"}

{"_id":"item-3","_type":"example","title":"Third Item"}
```

### Incorrect Format (JSON Array)

```json
[
  {
    "_id": "item-1",
    "_type": "example"
  },
  {
    "_id": "item-2",
    "_type": "example"
  }
]
```

## Common Errors

### `Unexpected end of JSON input`

This usually means:

- A JSON object is incomplete.
- A quotation mark (`"`) or closing brace (`}`) is missing.
- A JSON object is split across multiple lines.
- The file contains blank or malformed lines.

### `Document already exists`

The document already exists in your dataset. Delete the existing document or overwrite it before importing again.

## Notes

- Save the file using **UTF-8** encoding.
- Ensure every object has a unique `_id`.
- Verify that the dataset name is correct before importing.
- Always validate your `.ndjson` file before importing to avoid parsing errors.
