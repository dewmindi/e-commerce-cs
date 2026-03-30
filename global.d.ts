declare const grecaptcha: {
  ready: (cb: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

declare module "jspdf/dist/jspdf.umd.min.js" {
  export const jsPDF: any;
}
