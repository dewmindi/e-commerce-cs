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
