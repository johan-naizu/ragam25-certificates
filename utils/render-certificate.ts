import * as QRCode from "qrcode";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const renderCertificate = async (
  data: data,
  templateParams: templateParams,
  certificatePath: string = "/certificate.png",
  isCa = false,
) => {
  try {
    const qrUrl = `${"https://certificates.ragam.co.in"}/user?email=${
      data.user.email
    }`;

    const qr = await QRCode.toDataURL(qrUrl);

    const doc = await PDFDocument.create();

    const page = doc.addPage([3300, 2550]);
    const { width, height } = page.getSize();
    const fontSize = 30;
    const helvaticaBoldFont = await doc.embedFont(StandardFonts.HelveticaBold);

    const timesRomanFont = await doc.embedFont(StandardFonts.TimesRoman);

    const certificate = await fetch(certificatePath).then((res) =>
      res.arrayBuffer(),
    );

    const certificateEmbedded = await doc.embedPng(certificate);
    const qrEmbedded = await doc.embedPng(qr);

    page.drawImage(certificateEmbedded);

    page.drawText(data.user.name, {
      x: width / 2 - 150,
      y: height / 2 - 450,
      size: fontSize * 2.5,
      font: helvaticaBoldFont,
    });

    if (!isCa) {
      page.drawText(data.event.name, {
        x: width / 2 + 200,
        y: height / 2 - 620,
        size: fontSize * 1.9,
        font: timesRomanFont,
      });
    }

    page.drawImage(qrEmbedded, {
      x: width - 500,
      y: height / 2 - 50,
    });

    const pdfBytes = await doc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "certificate.pdf";
    link.click();
  } catch (error) {
    console.log(error);
  }
};

export default renderCertificate;

export interface data {
  user: {
    name: string;
    email?: string;
  };
  event: {
    name: string;
  };
}
export type templateParams = any;
