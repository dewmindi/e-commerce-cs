import { SelectedProduct } from "@/types/quoate";

export interface QuotationEmailData {
  customerName: string;
  contactNumber: string;
  email: string;
  address: string;
  quoteRef: string;
  quoteDate: string;
  totalPrice: number;
  selectedProducts: SelectedProduct[];
}

export function buildQuotationHtml(data: QuotationEmailData): string {
  const { customerName, contactNumber, email, address, quoteRef, quoteDate, totalPrice, selectedProducts } = data;

  const blue = "#499ce2";
  const lightGrey = "#f2f2f2";
  const darkText = "#1a1a1a";
  const mutedText = "#666666";

  // ── Product rows ────────────────────────────────────────────────────────────
  const productRows = selectedProducts.map((p, idx) => {
    const q = p.quotation;
    let sections = "";

    if (q) {
      // Summary items
      if (q.summary?.items?.length) {
        sections += `<p style="margin:8px 0 4px;font-weight:bold;font-size:13px;color:#444;">Quotation Summary</p>`;
        q.summary.items.forEach((item) => {
          const amount = typeof item.amount === "number" ? item.amount.toFixed(2) : "0.00";
          const optional = item.optional ? " <em>(Optional)</em>" : "";
          sections += `<p style="margin:2px 0 2px 12px;font-size:12px;color:${mutedText};">• ${item.title}${optional} &mdash; AUD ${amount}</p>`;
          if (item.description) {
            sections += `<p style="margin:0 0 2px 20px;font-size:11px;color:#999;font-style:italic;">${item.description}</p>`;
          }
        });
        if (q.summary.total_label || typeof q.summary.total_amount === "number") {
          sections += `<p style="margin:4px 0 2px 12px;font-size:12px;font-weight:bold;color:#444;">${q.summary.total_label ?? "Total"}: AUD ${(q.summary.total_amount ?? 0).toFixed(2)}</p>`;
        }
        if (q.summary.note) {
          sections += `<p style="margin:2px 0 4px 12px;font-size:11px;color:#999;font-style:italic;">Note: ${q.summary.note}</p>`;
        }
      }

      // Deliverables
      if (q.deliverables?.length) {
        sections += `<p style="margin:8px 0 4px;font-weight:bold;font-size:13px;color:#444;">Deliverables</p>`;
        q.deliverables.forEach((d) => {
          sections += `<p style="margin:2px 0 2px 12px;font-size:12px;color:${mutedText};">• ${d}</p>`;
        });
      }

      // Timeline
      if (q.timeline?.length) {
        sections += `<p style="margin:8px 0 4px;font-weight:bold;font-size:13px;color:#444;">Timeline</p>`;
        q.timeline.forEach((step) => {
          sections += `<p style="margin:2px 0 2px 12px;font-size:12px;color:${mutedText};">• <strong>${step.week}:</strong> ${step.tasks}</p>`;
        });
      }

      // Payment Schedule
      if (q.payment_schedule?.length) {
        sections += `<p style="margin:8px 0 4px;font-weight:bold;font-size:13px;color:#444;">Payment Schedule</p>`;
        q.payment_schedule.forEach((stage) => {
          sections += `<p style="margin:2px 0 2px 12px;font-size:12px;color:${mutedText};">• ${stage.label}: AUD ${stage.amount.toFixed(2)}</p>`;
        });
      }

      // Exclusions
      if (q.exclusions?.length) {
        sections += `<p style="margin:8px 0 4px;font-weight:bold;font-size:13px;color:#444;">Exclusions</p>`;
        q.exclusions.forEach((ex) => {
          sections += `<p style="margin:2px 0 2px 12px;font-size:12px;color:${mutedText};">• ${ex}</p>`;
        });
      }
    } else if (p.uiFeatures.length > 0) {
      // Fallback: key features
      sections += `<p style="margin:8px 0 4px;font-weight:bold;font-size:13px;color:#444;">Key Features</p>`;
      p.uiFeatures.forEach((f) => {
        sections += `<p style="margin:2px 0 2px 12px;font-size:12px;color:${mutedText};">• ${f}</p>`;
      });
    }

    const separator = idx < selectedProducts.length - 1
      ? `<tr><td colspan="3"><hr style="border:none;border-top:1px solid #e0e0e0;margin:4px 0;"></td></tr>`
      : "";

    return `
      <tr>
        <td style="padding:12px 8px;vertical-align:top;font-size:13px;color:${mutedText};">${idx + 1}</td>
        <td style="padding:12px 8px;vertical-align:top;">
          <p style="margin:0 0 4px;font-size:14px;font-weight:bold;color:${darkText};">${p.subcategoryName} &mdash; ${p.productName}</p>
          ${sections}
        </td>
        <td style="padding:12px 8px;vertical-align:top;text-align:right;white-space:nowrap;font-size:13px;font-weight:bold;color:${darkText};">AUD ${p.price.toFixed(2)}</td>
      </tr>
      ${separator}
    `;
  }).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Quotation – ${quoteRef}</title>
  <style>
    body { margin:0; padding:0; background:#f5f5f5; font-family:Helvetica,Arial,sans-serif; }
    .wrapper { background:#ffffff; max-width:640px; margin:24px auto; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.08); }
    @media (max-width:600px) {
      .wrapper { margin:0; border-radius:0; }
      .header-table td { display:block !important; text-align:left !important; }
      .info-table td { display:block !important; }
      .products-table td { display:block !important; text-align:left !important; }
      .products-table .price-col { text-align:left !important; padding-top:0 !important; }
    }
  </style>
</head>
<body>
  <div class="wrapper">

    <!-- ── Header ── -->
    <table class="header-table" width="100%" cellpadding="0" cellspacing="0"
           style="background:#ffffff;border-bottom:1px solid #e0e0e0;padding:20px 24px;">
      <tr>
        <td style="vertical-align:middle;">
          <img src="https://csgraphicmeta.com.au/cs-logo.jpg" alt="CS Graphic Meta" width="80"
               style="display:block;max-width:80px;" />
        </td>
        <td style="vertical-align:top;text-align:right;font-size:12px;color:${mutedText};">
          <strong style="font-size:16px;color:${darkText};">CS Graphic Meta</strong><br>
          Unit 3/2 Adam Ave, Hallam VIC 3803, Australia<br>
          Phone: +61 405 455 273<br>
          info@csgraphicmeta.com.au<br>
          <span style="font-size:20px;font-weight:bold;color:${darkText};letter-spacing:1px;">QUOTATION</span>
        </td>
      </tr>
    </table>

    <!-- ── Customer / Quote Info ── -->
    <table class="info-table" width="100%" cellpadding="0" cellspacing="0"
           style="background:${lightGrey};padding:16px 24px;margin:0;">
      <tr>
        <td style="vertical-align:top;font-size:13px;color:${darkText};width:55%;">
          <table cellpadding="0" cellspacing="0">
            <tr><td style="padding:3px 12px 3px 0;font-weight:bold;white-space:nowrap;">Customer Name:</td><td style="padding:3px 0;">${customerName}</td></tr>
            <tr><td style="padding:3px 12px 3px 0;font-weight:bold;white-space:nowrap;">Contact Number:</td><td style="padding:3px 0;">${contactNumber}</td></tr>
            <tr><td style="padding:3px 12px 3px 0;font-weight:bold;white-space:nowrap;">Email:</td><td style="padding:3px 0;">${email}</td></tr>
            <tr><td style="padding:3px 12px 3px 0;font-weight:bold;white-space:nowrap;">Address:</td><td style="padding:3px 0;">${address || "—"}</td></tr>
          </table>
        </td>
        <td style="vertical-align:top;text-align:right;font-size:13px;color:${darkText};">
          <table cellpadding="0" cellspacing="0" style="margin-left:auto;">
            <tr><td style="padding:3px 12px 3px 0;font-weight:bold;white-space:nowrap;">Quotation Date:</td><td style="padding:3px 0;">${quoteDate}</td></tr>
            <tr><td style="padding:3px 12px 3px 0;font-weight:bold;white-space:nowrap;">Quote Ref:</td><td style="padding:3px 0;">${quoteRef}</td></tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- ── Products Table ── -->
    <div style="padding:0 24px 24px;">
      <table class="products-table" width="100%" cellpadding="0" cellspacing="0"
             style="border-collapse:collapse;margin-top:16px;">
        <!-- Table header -->
        <thead>
          <tr style="background:${blue};">
            <th style="padding:10px 8px;text-align:left;color:#fff;font-size:13px;width:32px;">No.</th>
            <th style="padding:10px 8px;text-align:left;color:#fff;font-size:13px;">Product / Service Description</th>
            <th class="price-col" style="padding:10px 8px;text-align:right;color:#fff;font-size:13px;white-space:nowrap;">Price (AUD)</th>
          </tr>
        </thead>
        <tbody>
          ${productRows}
        </tbody>
        <!-- Total row -->
        <tfoot>
          <tr>
            <td colspan="2"
                style="padding:14px 8px;text-align:right;font-size:15px;font-weight:bold;color:${darkText};border-top:2px solid ${darkText};">
              TOTAL (AUD):
            </td>
            <td class="price-col"
                style="padding:14px 8px;text-align:right;font-size:15px;font-weight:bold;color:${darkText};border-top:2px solid ${darkText};white-space:nowrap;">
              ${totalPrice.toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>

    <!-- ── Footer ── -->
    <div style="background:${lightGrey};padding:14px 24px;border-top:1px solid #e0e0e0;">
      <p style="margin:0;font-size:11px;color:#999;font-style:italic;">
        Note: Prices are inclusive of GST unless otherwise stated. This quotation is valid for 30 days from the date of issue.
      </p>
      <p style="margin:6px 0 0;font-size:11px;color:#bbb;">Graphic Meta Solutions &mdash; ABN 98 765 432 109</p>
    </div>

  </div>
</body>
</html>`;
}
