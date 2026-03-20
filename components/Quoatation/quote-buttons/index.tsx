"use client";

import { useState } from "react";
import { SelectedProduct } from "@/types/quoate";
import { useCart } from "@/app/context/CartContext";
import type { jsPDF as JsPDFType } from "jspdf";

/**
 * Buttons (summary)
 */
interface ButtonsProps {
  totalPrice: number;
  selectedProducts: SelectedProduct[];
}

const QuoteButtons: React.FC<ButtonsProps> = ({ totalPrice, selectedProducts }) => {
  const { addToCart } = useCart();

  const [showForm, setShowForm] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const handleAddToCart = () => {
    selectedProducts.forEach((plan) => {
      addToCart({
        id: plan.productId,
        title: `${plan.subcategoryName}`,
        price: plan.price,
        quantity: 1,
        image: "/cs-logo.png",
        category: plan.productName,
      });
    });
  };

  const generateRandomString = (length = 6) =>
    Math.random().toString(36).substring(2, length + 2).toUpperCase();

  const generateInvoiceNumber = () => {
    const now = new Date();

    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");

    const hh = String(now.getHours()).padStart(2, "0");
    const min = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");

    return `${yyyy}${mm}${dd}-${hh}${min}${ss}`;
  };


  const fetchLogoBase64 = async (url: string) => {
    const res = await fetch(url);
    const blob = await res.blob();
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  };


  const downloadQuotation = async (customerName: string, contactNumber: string, email: string, address: string) => {
    if (selectedProducts.length === 0) return;

    const { jsPDF } = await import("jspdf/dist/jspdf.umd.min.js");

    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
      compress: true,
    }) as JsPDFType;
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();
    const marginX = 15;
    const contentWidth = pageWidth - (2 * marginX);

    // --- Company Info ---
    const companyLogo = await fetchLogoBase64("/cs-logo.jpg");
    const companyName = "CS Graphic Meta";
    const companyAddress = "Unit 3/2 Adam Ave, Hallam VIC 3803, Australia";
    const companyPhone = "+61 405 455 273";
    const companyEmail = "info@csgraphicmeta.com.au";
    const quoteTitle = "QUOTATION";
    const currentYear = new Date().getFullYear();
    const quoteDate = new Date().toLocaleDateString("en-AU");
    const quoteRef = `${generateInvoiceNumber()}`;

    let currentY = 0;

    // --- Helper: Add Header ---
    const addHeader = (
      doc: JsPDFType,
      logoData: string,
      company: string,
      address: string,
      phone: string,
      email: string,
      title: string
    ) => {
      const headerHeight = 50;
      const headerY = 15;

      doc.setFillColor(255, 255, 255);
      doc.rect(0, 0, pageWidth, headerHeight, "F");

      // Bottom border line
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.2);

      doc.line(0, headerHeight + 5, pageWidth, headerHeight + 5);

      // Logo
      if (logoData) {
        try {
          doc.addImage(logoData, "JPEG", marginX, headerY, 35, 35);
        } catch {
          doc.setFontSize(14);
          doc.setFont("helvetica", "bold");
          doc.setTextColor(50, 50, 50);
          doc.text(company, marginX, headerY + 10);
        }
      }

      // Company Info (right-aligned)
      const infoX = pageWidth - marginX;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(50, 50, 50);
      doc.text(address, infoX, headerY + 2, { align: "right" });
      doc.text(`Phone: ${phone}`, infoX, headerY + 7, { align: "right" });
      doc.text(`Email: ${email}`, infoX, headerY + 12, { align: "right" });

      // Quote title
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(20, 20, 20);
      doc.text(title, infoX, headerY + 25, { align: "right" });

      return headerHeight + 10;
    };

    const addFooter = (doc: JsPDFType, pageNum: number, totalPages: number) => {
      const footerY = pageHeight - 10;
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(150, 150, 150);
      doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - marginX, footerY, { align: "right" });
      doc.text("Graphic Meta Solutions - ABN 98 765 432 109", marginX, footerY);
    };

    // --- Helper: Check Page Break ---
    const checkPageBreak = (heightNeeded: number) => {
      if (currentY + heightNeeded > pageHeight - 15) { // 15mm bottom margin
        doc.addPage();
        currentY = addHeader(doc, companyLogo, companyName, companyAddress, companyPhone, companyEmail, quoteTitle);

        // Redraw table header on new page
        doc.setFillColor(34, 49, 63);
        doc.rect(marginX, currentY, pageWidth - 2 * marginX, 7, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.text("No.", marginX + 2, currentY + 5);
        doc.text("Product / Service Description", marginX + 20, currentY + 5);
        doc.text("Price (AUD)", pageWidth - marginX, currentY + 5, { align: "right" });
        currentY += 10;
        return true;
      }
      return false;
    };

    // --- Initial Header ---
    currentY = addHeader(
      doc,
      companyLogo,
      companyName,
      companyAddress,
      companyPhone,
      companyEmail,
      quoteTitle
    );

    // --- Customer & Quote Info Box ---
    doc.setFillColor(240, 240, 240);
    doc.roundedRect(marginX, currentY, pageWidth - 2 * marginX, 35, 2, 2, "F");

    // Left Side: Customer Info
    const boxLeftX = marginX + 4;
    const boxRightX = marginX + 60; // Labels width
    let boxY = currentY + 6;

    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);

    const printInfoRow = (label: string, value: string) => {
      doc.setFont("helvetica", "bold");
      doc.text(label, boxLeftX, boxY);
      doc.setFont("helvetica", "normal");
      doc.text(value, boxRightX, boxY);
      boxY += 6;
    };

    printInfoRow("Customer Name:", customerName);
    printInfoRow("Contact Number:", contactNumber);
    printInfoRow("Email:", email);
    printInfoRow("Address:", address);

    // Right Side: Date & Ref
    boxY = currentY + 6;
    const rightAlignX = pageWidth - marginX - 4;

    doc.setFont("helvetica", "bold");
    doc.text("Quotation Date:", rightAlignX - 40, boxY, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.text(quoteDate, rightAlignX, boxY, { align: "right" });

    boxY += 6;
    doc.setFont("helvetica", "bold");
    doc.text("Quote Ref:", rightAlignX - 40, boxY, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.text(quoteRef, rightAlignX, boxY, { align: "right" });

    currentY += 40; // Move past info box

    // --- Table Header ---
    const colNo = marginX;
    const colProduct = marginX + 15;
    const colPrice = pageWidth - 20;
    const productColWidth = colPrice - colProduct - 30; // Max width for product text

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.setFillColor(70, 156, 226); // dark modern header
    doc.rect(marginX, currentY, pageWidth - 2 * marginX, 8, "F");

    doc.text("No.", colNo + 2, currentY + 5.5);
    doc.text("Product / Service Description", colProduct, currentY + 5.5);
    doc.text("Price (AUD)", colPrice, currentY + 5.5, { align: "right" });

    currentY += 8; // Header height

    // --- Table Content ---
    let index = 0;
    for (const p of selectedProducts) {
      index++;
      currentY += 4; // Padding top

      // 1. Product Name Line
      const productTitle = `${p.subcategoryName} - ${p.productName}`;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(30, 30, 30);

      // Calculate wrapped text height
      const titleLines = doc.splitTextToSize(productTitle, productColWidth);
      const titleHeight = titleLines.length * 5; // Approx 5mm per line

      // Check if product title alone fits
      checkPageBreak(titleHeight + 5);

      // Print No
      doc.setFont("helvetica", "normal");
      doc.text(`${index}`, colNo + 2, currentY + 3);

      // Print Price
      doc.setFont("helvetica", "bold");
      doc.text(p.price.toFixed(2), colPrice, currentY + 3, { align: "right" });

      // Print Title
      doc.setFont("helvetica", "bold");
      doc.text(titleLines, colProduct, currentY + 3);
      currentY += titleHeight + 2; // Move past title

      // 2. Features
      if (p.features && p.features.length > 0) {
        for (const feature of p.features) {
          const featureTitle = feature.title || feature.name;

          // Feature Title
          if (featureTitle) {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(9);
            doc.setTextColor(100, 100, 100); // Dark Gray

            const featTitleLines = doc.splitTextToSize(featureTitle, productColWidth - 5);
            const featTitleHeight = featTitleLines.length * 4;

            checkPageBreak(featTitleHeight);
            doc.text(featTitleLines, colProduct + 2, currentY + 3);
            currentY += featTitleHeight + 1;
          }

          // Feature Items
          if (feature.items && feature.items.length > 0) {
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            doc.setTextColor(80, 80, 80); // Lighter Gray

            for (const item of feature.items) {
              const bulletText = `• ${item.text}`;
              const itemLines = doc.splitTextToSize(bulletText, productColWidth - 10);
              const itemHeight = itemLines.length * 4;

              checkPageBreak(itemHeight);
              doc.text(itemLines, colProduct + 6, currentY + 3);
              currentY += itemHeight; // Spacing between items
            }
            currentY += 2; // Extra space after a feature group
          }
        }
      }

      currentY += 2; // Padding bottom

      // Separator Line
      doc.setDrawColor(220, 220, 220);
      doc.setLineWidth(0.1);
      doc.line(marginX, currentY, pageWidth - marginX, currentY);
    }

    // --- Total Section ---
    currentY += 5;
    checkPageBreak(25); // Ensure total fits

    const colPriceStart = pageWidth - marginX - 60;

    doc.setLineWidth(0.3);
    doc.setDrawColor(0, 0, 0);
    // doc.line(colPriceStart, currentY, pageWidth - marginX, currentY); 

    currentY += 5;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`TOTAL (AUD):`, colPriceStart, currentY);
    doc.text(`${totalPrice.toFixed(2)}`, pageWidth - 20, currentY, { align: "right" });

    // --- Terms & Notes ---
    currentY += 15;
    checkPageBreak(15);

    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text("Note: Prices are inclusive of GST unless otherwise stated.", marginX, currentY);
    currentY += 5;
    doc.text("This quotation is valid for 30 days from the date of issue.", marginX, currentY);

    // --- Footer Numbers ---
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      addFooter(doc, i, pageCount);
    }

    doc.save(`Quotation-${quoteRef}.pdf`);
  };

  return (
    <>
      <div className="flex justify-end items-center mt-8 pt-4 border-t border-gray-200">
        <span className="mr-6 text-xl font-bold text-white">AUD {totalPrice.toLocaleString()}</span>

        <button
          onClick={() => setShowForm(true)}
          disabled={selectedProducts.length === 0}
          className="px-6 py-3 mr-3 font-semibold text-white bg-[#a87f03] rounded-lg hover:bg-black hover:border  transition"
        >
          Download Quotation
        </button>

        <button
          onClick={handleAddToCart}
          className="px-6 py-3 font-semibold text-white bg-[#a87f03] rounded-lg hover:bg-black hover:border transition"
        >
          Add All to Cart
        </button>
      </div>

      {/* Customer Info Form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Enter Your Details</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowForm(false);
                downloadQuotation(customerName, contactNumber, email, address);
              }}
            >
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Name / Business Name <span className="text-red-500">*</span></label>
                <input
                  required
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Your Name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Contact Number <span className="text-red-500">*</span></label>
                <input
                  required
                  type="text"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Contact Number"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email <span className="text-red-500">*</span></label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Address"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-[#a87f03] text-white hover:bg-black"
                >
                  Download PDF
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default QuoteButtons;
