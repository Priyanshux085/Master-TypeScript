interface Exporter {
  exportContent(content: string): string;
}

interface IReport {
  generate(): string;
  setExporter(exporter: Exporter): void;
}

abstract class Report implements IReport {
  constructor(protected exporter: Exporter) {}

  generate(): string {
    const content = this.buildContent();
    return this.exporter.exportContent(content);
  }

  setExporter(exporter: Exporter): void {
    this.exporter = exporter;
  }

  protected abstract buildContent(): string;
}

class SummaryReport extends Report {
  protected buildContent(): string {
    return "Summary Report Content";
  }
}

class DetailedReport extends Report {
  protected buildContent(): string {
    return "Detailed Report Content";
  }
}

class HtmlExporter implements Exporter {
  exportContent(content: string): string {
    return `<html><body><h1>${content}</h1></body></html>`;
  }
}

class PdfExporter implements Exporter {
  exportContent(content: string): string {
    return `PDF Format: ${content}`;
  }
}

// Bridge avoids subclass explosion when reports and exporters multiply.

// Example usage:
const htmlExporter = new HtmlExporter();
const pdfExporter = new PdfExporter();

const summaryReport = new SummaryReport(htmlExporter);
console.log(summaryReport.generate());

summaryReport.setExporter(pdfExporter);
console.log(summaryReport.generate());

const detailedReport = new DetailedReport(pdfExporter);
console.log(detailedReport.generate());