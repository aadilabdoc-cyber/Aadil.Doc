/**
 * Aadil.Doc contact form -> Google Sheets bridge.
 *
 * Setup:
 * 1. Create (or open) the Google Sheet you want enquiries saved to.
 * 2. Extensions > Apps Script, delete any starter code, and paste this file in.
 * 3. Deploy > New deployment > type "Web app".
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 4. Copy the resulting web app URL (ends in /exec) into this project's
 *    .env.local as GOOGLE_SHEETS_WEBHOOK_URL, then restart `pnpm dev`.
 * 5. Every submit from the site's Contact form appends one row here.
 *
 * If you edit this script after the first deploy, use
 * Deploy > Manage deployments > Edit (pencil) > New version, otherwise the
 * live URL keeps running the old code.
 */

const SHEET_NAME = "Enquiries";

const COLUMNS = [
  "Timestamp",
  "Name",
  "Email",
  "Country",
  "Phone",
  "Event Location",
  "Event Date",
  "Event Details",
];

function doPost(e) {
  const sheet = getOrCreateSheet_();
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.name || "",
    data.email || "",
    data.country || "",
    data.phone || "",
    data.eventLocation || "",
    data.eventDate || "",
    data.eventDetails || "",
  ]);

  return ContentService.createTextOutput(
    JSON.stringify({ success: true }),
  ).setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS);
  }

  return sheet;
}
