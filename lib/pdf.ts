// import fs from "fs";
// import path from "path";
// import PDFDocument from "pdfkit";

// export async function buildPaymentSlipPDF(order: any): Promise<Buffer> {
//   const chunks: Buffer[] = [];

//   const fontPath = path.join(process.cwd(), "public/fonts/Roboto-Regular.ttf");
//   if (!fs.existsSync(fontPath)) throw new Error("Font file not found: " + fontPath);

//   const doc = new PDFDocument({ size: "A4", margin: 50, font: fontPath });

//   return new Promise((resolve, reject) => {
//     doc.on("data", (chunk) => chunks.push(chunk as Buffer));
//     doc.on("end", () => resolve(Buffer.concat(chunks)));
//     doc.on("error", (err) => reject(err));

//     // --- HEADER ---
//     doc.font(fontPath).fontSize(26).text("Payment Slip", { align: "center" });
//     doc.moveDown(1);

//     // --- CUSTOMER INFO ---
//     doc.font(fontPath).fontSize(12);
//     doc.text(`Order ID: ${order.orderId}`);
//     doc.text(`Customer: ${order.customerName || "N/A"}`);
//     doc.text(`Email: ${order.customerEmail || "N/A"}`);
//     doc.text(`Payment Status: ${order.paymentStatus}`);
//     doc.text(`Total Amount: ${order.amountTotal} ${order.currency?.toUpperCase()}`);
//     doc.text(`Created At: ${new Date(order.createdAt).toLocaleString()}`);
//     doc.moveDown(1);

//     // --- ORDER SUMMARY ---
//     doc.font(fontPath).fontSize(14).text("Order Summary", { underline: true });
//     doc.moveDown(0.5);

//     const itemX = 50;
//     const qtyX = 300;
//     const priceX = 370;

//     doc.font(fontPath).fontSize(12);
//     doc.text("Item", itemX, doc.y);
//     doc.text("Qty", qtyX, doc.y);
//     doc.text("Price", priceX, doc.y);
//     doc.moveDown(0.5);

//     order.items.forEach((item: any) => {
//       doc.text(item.name, itemX, doc.y);
//       doc.text(item.quantity.toString(), qtyX, doc.y);
//       doc.text(`${item.price} ${order.currency?.toUpperCase()}`, priceX, doc.y);
//       doc.moveDown(0.5);
//     });

//     doc.moveDown(1);
//     doc.text(`Subtotal: ${order.amountSubtotal} ${order.currency?.toUpperCase()}`, { align: "right" });
//     doc.text(`Total: ${order.amountTotal} ${order.currency?.toUpperCase()}`, { align: "right" });

//     doc.end();
//   });
// }

// import fs from "fs";
// import path from "path";
// import PDFDocument from "pdfkit";

// // --- Configuration Constants ---
// const PRIMARY_COLOR = "#0047AB"; // A professional blue
// const SECONDARY_COLOR = "#EEEEEE"; // Light gray for table headers
// const TEXT_COLOR = "#333333";
// const FONT_SIZE_NORMAL = 10;
// const FONT_SIZE_LARGE = 14;

// /**
//  * Helper function to format currency strings.
//  * Note: In a production environment, you would use Intl.NumberFormat.
//  */
// function formatCurrency(amount: number | string, currencyCode: string): string {
//     const value = typeof amount === 'string' ? parseFloat(amount) : amount;
//     // Simple formatting for demonstration
//     return `${value?.toFixed(2)} ${currencyCode?.toUpperCase()}`;
// }

// /**
//  * Builds a professional-looking payment slip PDF from order data.
//  * @param order - The order object containing details, items, and amounts.
//  * @returns A Promise that resolves to the generated PDF Buffer.
//  */
// export async function buildPaymentSlipPDF(order: any): Promise<Buffer> {
//     const chunks: Buffer[] = [];

//     // Assuming the font is available in the public/fonts directory
//     const fontPath = path.join(process.cwd(), "public/fonts/Roboto-Regular.ttf");
//     if (!fs.existsSync(fontPath)) {
//         // Fallback to a standard font if the custom one is missing
//         console.warn("Custom font not found. Using standard Helvetica.");
//     }
//     const regularFont = fs.existsSync(fontPath) ? fontPath : "Helvetica";
//     const boldFont = fs.existsSync(fontPath) ? path.join(path.dirname(fontPath), "Roboto-Bold.ttf") : "Helvetica-Bold"; // Assuming a Roboto-Bold exists in the same directory, or fallback

//     const doc = new PDFDocument({ size: "A4", margin: 50 });
//     doc.font(regularFont);
//     doc.fillColor(TEXT_COLOR);

//     return new Promise((resolve, reject) => {
//         doc.on("data", (chunk: any) => chunks.push(chunk as Buffer));
//         doc.on("end", () => resolve(Buffer.concat(chunks)));
//         doc.on("error", (err: any) => reject(err));

//         // --- 1. HEADER (Invoice Title & Logo Placeholder) ---
//         const startY = doc.y;
//         doc.fillColor(PRIMARY_COLOR)
//             .font(boldFont)
//             .fontSize(28)
//             .text("PAYMENT SLIP", 50, startY, { align: "left" });

//         // Placeholder for company details/logo (right side)
//         doc.font(regularFont)
//             .fontSize(FONT_SIZE_NORMAL)
//             .fillColor(TEXT_COLOR)
//             .text("Your Company Name", 400, startY, { align: "right" })
//             .text("123 Business Lane, City, Country", { align: "right" });

//         doc.moveDown(2); // Move down after the header section

//         // --- 2. ORDER DETAILS (Two-Column Layout) ---
//         const detailY = doc.y;

//         // Left Column: Customer Details
//         doc.font(boldFont).fontSize(FONT_SIZE_LARGE).text("CUSTOMER DETAILS", 50, detailY);
//         doc.font(regularFont).fontSize(FONT_SIZE_NORMAL).moveDown(0.5);
//         doc.text(`Name:`, { continued: true }).font(regularFont).text(` ${order.customerName || "N/A"}`);
//         doc.text(`Email:`, { continued: true }).text(` ${order.customerEmail || "N/A"}`);

//         // Right Column: Payment & Order Status
//         const rightColX = 350;
//         doc.font(boldFont).fontSize(FONT_SIZE_LARGE).text("ORDER SUMMARY", rightColX, detailY);
//         doc.font(regularFont).fontSize(FONT_SIZE_NORMAL).moveDown(0.5);

//         const currentY = doc.y; // Capture the current Y after the left column moved
//         doc.text(`Order ID:`, rightColX, currentY, { continued: true })
//            .font(regularFont).text(` ${order.orderId}`, rightColX + 80);

//         doc.text(`Date:`, rightColX, doc.y, { continued: true })
//            .text(` ${new Date(order.createdAt).toLocaleDateString()}`, rightColX + 80);

//         doc.text(`Payment Status:`, rightColX, doc.y, { continued: true })
//            .font(boldFont).fillColor(PRIMARY_COLOR).text(` ${order.paymentStatus}`, rightColX + 80);

//         doc.moveDown(2);

//         // --- 3. ITEMS TABLE ---
//         doc.fillColor(TEXT_COLOR).font(boldFont).fontSize(FONT_SIZE_LARGE).text("LINE ITEMS");
//         doc.moveDown(0.5);

//         // Define Table Coordinates and Widths
//         const tableTop = doc.y;
//         const colX = {
//             item: 50,
//             description: 250,
//             qty: 390,
//             unitPrice: 440,
//             total: 500,
//         };

//         // Table Header Background
//         doc.fillColor(SECONDARY_COLOR)
//             .rect(50, tableTop, 510, 20)
//             .fill();

//         // Table Header Text
//         doc.fillColor(TEXT_COLOR)
//             .font(boldFont).fontSize(FONT_SIZE_NORMAL);
//         doc.text("ITEM NAME", colX.item, tableTop + 5, { width: 180 });
//         doc.text("QTY", colX.qty, tableTop + 5, { width: 40 });
//         doc.text("UNIT PRICE", colX.unitPrice, tableTop + 5, { width: 60 });
//         doc.text("TOTAL", colX.total, tableTop + 5, { width: 60, align: 'right' });

//         let currentItemY = tableTop + 25;

//         // Table Rows
//         doc.font(regularFont).fontSize(FONT_SIZE_NORMAL).fillColor(TEXT_COLOR);

//         order.items.forEach((item: any, index: number) => {
//             if (currentItemY > doc.page.height - 100) {
//                 // Check for page break
//                 doc.addPage();
//                 currentItemY = 50; // Restart Y for new page
//             }

//             const itemTotal = (item.quantity * item.price);
//             const formattedTotal = formatCurrency(itemTotal, order.currency);
//             const formattedPrice = formatCurrency(item.price, order.currency);

//             doc.text(item.name, colX.item, currentItemY, { width: 190 });
//             doc.text(item.quantity.toString(), colX.qty, currentItemY, { width: 40 });
//             doc.text(formattedPrice, colX.unitPrice, currentItemY, { width: 60 });
//             doc.text(formattedTotal, colX.total, currentItemY, { width: 60, align: 'right' });

//             // Draw thin line separator
//             doc.strokeColor("#DDDDDD").lineWidth(0.5).moveTo(50, currentItemY + 15).lineTo(560, currentItemY + 15).stroke();

//             currentItemY += 20;
//         });

//         // Move doc cursor past the table
//         doc.y = currentItemY;
//         doc.moveDown(1);

//         // --- 4. TOTALS SECTION ---
//         const totalX = 400;
//         const totalAmountX = 560; // Right edge of the page

//         // Subtotal
//         doc.font(regularFont).text("Subtotal:", totalX, doc.y, { width: 100, align: 'left' });
//         doc.text(formatCurrency(order.amountSubtotal, order.currency), totalX, doc.y, { width: totalAmountX - totalX, align: 'right' });
//         doc.moveDown(0.5);

//         // Separator Line
//         doc.strokeColor(TEXT_COLOR).lineWidth(1).moveTo(totalX, doc.y).lineTo(560, doc.y).stroke();
//         doc.moveDown(0.2);

//         // GRAND TOTAL
//         doc.font(boldFont).fontSize(FONT_SIZE_LARGE).fillColor(PRIMARY_COLOR);
//         doc.text("TOTAL:", totalX, doc.y, { width: 100, align: 'left' });
//         doc.text(formatCurrency(order.amountTotal, order.currency), totalX, doc.y, { width: totalAmountX - totalX, align: 'right' });

//         doc.moveDown(2);

//         // --- 5. FOOTER / Notes ---
//         doc.fillColor(TEXT_COLOR).font(regularFont).fontSize(8).text(
//             "Thank you for your business. All payments are processed securely.",
//             50, doc.page.height - 50, { align: "center" }
//         );

//         doc.end();
//     });
// }



import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

// --- Configuration Constants ---
const PRIMARY_COLOR = "#0047AB"; // Professional blue
const SECONDARY_COLOR = "#EEEEEE"; // Light gray for table headers
const TEXT_COLOR = "#333333";
const FONT_SIZE_NORMAL = 10;
const FONT_SIZE_LARGE = 14;

function formatCurrency(amount: number | string, currencyCode: string): string {
  const value = typeof amount === "string" ? parseFloat(amount) : amount;
  return `${value?.toFixed(2)} ${currencyCode?.toUpperCase()}`;
}

export async function buildPaymentSlipPDF(order: any): Promise<Buffer> {
  const chunks: Buffer[] = [];

  // --- Load Fonts (Roboto only) ---
  const fontPathRegular = path.join(process.cwd(), "public/fonts/Roboto-Regular.ttf");
  const fontPathBold = path.join(process.cwd(), "public/fonts//Roboto-Regular.ttf");

  if (!fs.existsSync(fontPathRegular) || !fs.existsSync(fontPathBold)) {
    throw new Error("Roboto fonts missing. Please add Roboto-Regular.ttf and Roboto-Bold.ttf to /public/fonts/");
  }

//   const doc = new PDFDocument({ size: "A4", margin: 50 });
const doc = new PDFDocument({
  size: "A4",
  margin: 30,
  font: fontPathRegular,   // 👈 start with Roboto, not Helvetica
});
  doc.font(fontPathRegular).fillColor(TEXT_COLOR);

  return new Promise((resolve, reject) => {
    doc.on("data", (chunk: any) => chunks.push(chunk as Buffer));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", (err: any) => reject(err));

    // --- HEADER ---
    const startY = doc.y;
    doc.fillColor(PRIMARY_COLOR)
      .font(fontPathBold)
      .fontSize(28)
      .text("PAYMENT SLIP", 50, startY, { align: "left" });

    doc.font(fontPathRegular)
      .fontSize(FONT_SIZE_NORMAL)
      .fillColor(TEXT_COLOR)
      .text("CS Graphic Meta", 400, startY, { align: "right" })
      .text("Unit 3/2 Adam Ave, Hallam VIC 3803, Australia", { align: "right" });

    doc.moveDown(2);

    // --- CUSTOMER DETAILS ---
    const detailY = doc.y;

    doc.font(fontPathBold).fontSize(FONT_SIZE_LARGE).text("CUSTOMER DETAILS", 50, detailY);
    doc.font(fontPathRegular).fontSize(FONT_SIZE_NORMAL).moveDown(0.5);
    doc.text(`Name: ${order.customerName || "N/A"}`);
    doc.text(`Email: ${order.customerEmail || "N/A"}`);

    // --- ORDER SUMMARY ---
    const rightColX = 350;
    doc.font(fontPathBold).fontSize(FONT_SIZE_LARGE).text("ORDER SUMMARY", rightColX, detailY);
    doc.font(fontPathRegular).fontSize(FONT_SIZE_NORMAL).moveDown(0.5);

    const currentY = doc.y;
    doc.text(`Order ID: ${order.orderId}`, rightColX, currentY);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, rightColX, doc.y);
    doc.fillColor(PRIMARY_COLOR).font(fontPathBold).text(`Payment Status: ${order.paymentStatus}`, rightColX, doc.y);
    doc.fillColor(TEXT_COLOR).font(fontPathRegular);

    doc.moveDown(2);

    // --- LINE ITEMS TABLE ---
    doc.font(fontPathBold).fontSize(FONT_SIZE_LARGE).text("LINE ITEMS");
    doc.moveDown(0.5);

    const tableTop = doc.y;
    const colX = { item: 50, qty: 300, unitPrice: 370, total: 470 };

    // Table Header
    doc.fillColor(SECONDARY_COLOR).rect(50, tableTop, 510, 20).fill();
    doc.fillColor(TEXT_COLOR).font(fontPathBold).fontSize(FONT_SIZE_NORMAL);
    doc.text("ITEM", colX.item, tableTop + 5);
    doc.text("QTY", colX.qty, tableTop + 5);
    doc.text("UNIT PRICE", colX.unitPrice, tableTop + 5);
    doc.text("TOTAL", colX.total, tableTop + 5, { align: "right" });

    let currentItemY = tableTop + 25;
    doc.font(fontPathRegular).fillColor(TEXT_COLOR);

    order.items.forEach((item: any) => {
      if (currentItemY > doc.page.height - 100) {
        doc.addPage();
        currentItemY = 50;
      }

      const itemTotal = item.quantity * item.price;
      doc.text(item.name, colX.item, currentItemY);
      doc.text(item.quantity.toString(), colX.qty, currentItemY);
      doc.text(formatCurrency(item.price, order.currency), colX.unitPrice, currentItemY);
      doc.text(formatCurrency(itemTotal, order.currency), colX.total, currentItemY, { align: "right" });

      doc.strokeColor("#DDDDDD").lineWidth(0.5).moveTo(50, currentItemY + 15).lineTo(560, currentItemY + 15).stroke();
      currentItemY += 20;
    });

    doc.y = currentItemY;
    doc.moveDown(1);

    // --- TOTALS ---
    const totalX = 400;
    const totalAmountX = 560;

    doc.text("Subtotal:", totalX, doc.y, { width: 100, align: "left" });
    doc.text(formatCurrency(order.amountSubtotal, order.currency), totalX, doc.y, { width: totalAmountX - totalX, align: "right" });

    doc.moveDown(0.5);
    doc.strokeColor(TEXT_COLOR).lineWidth(1).moveTo(totalX, doc.y).lineTo(560, doc.y).stroke();
    doc.moveDown(0.2);

    doc.font(fontPathBold).fontSize(FONT_SIZE_LARGE).fillColor(PRIMARY_COLOR);
    doc.text("TOTAL:", totalX, doc.y, { width: 100, align: "left" });
    doc.text(formatCurrency(order.amountTotal, order.currency), totalX, doc.y, { width: totalAmountX - totalX, align: "right" });

    doc.moveDown(2);

    // --- FOOTER ---
    doc.fillColor(TEXT_COLOR).font(fontPathRegular).fontSize(8).text(
      "Thank you for your business. All payments are processed securely.",
      50, doc.page.height - 50, { align: "center" }
    );

    doc.end();
  });
}
