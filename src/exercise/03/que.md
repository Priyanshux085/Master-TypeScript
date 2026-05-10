# Exercise: Bridge Pattern - H

## Topic: structural-pattern/bridge-pattern

#Question: You are preparing a short technical article for your team about avoiding class explosion when reports must support multiple output formats. The product already has two report types and two exporters, and the team wants to add more of each without multiplying subclasses. Your task is to design a Bridge Pattern solution in TypeScript that clearly separates the report abstraction from the export implementation. Define the abstraction side as an abstract `Report` that holds an `Exporter` reference and exposes a `generate()` method. Create at least two refined abstractions named `SummaryReport` and `DetailedReport`. Define the implementor side as an `Exporter` interface with a required method `exportContent(content: string): string`. Implement two concrete exporters named `HtmlExporter` and `PdfExporter`. Ensure `Report.generate()` calls a protected `buildContent()` hook and passes its result to the exporter. Demonstrate that exporters can be swapped at runtime without creating new report subclasses. Provide a small usage example that produces at least two different report/exporter combinations. Include one brief comment that explains why Bridge is preferred over inheritance for this scenario. Only use the described Bridge approach and do not create classes like `HtmlSummaryReport` or `PdfDetailedReport`.

# Requirements:
- Use TypeScript.
- Create an `Exporter` interface with `exportContent(content: string): string`.
- Create an abstract `Report` class with `generate(): string` and a protected `buildContent(): string`.
- The `Report` constructor must accept an `Exporter` instance.
- Implement `SummaryReport` and `DetailedReport` as refined abstractions.
- Implement `HtmlExporter` and `PdfExporter` as concrete implementors.
- Show at least two runtime combinations in a usage example.
- Add one short comment explaining the Bridge decision.

# Example from the client:
```
- We have weekly analytics reports and end-of-month compliance reports. Right now each report class knows how to export itself, and every new format forces us to duplicate logic. We need HTML for dashboards and PDF for stakeholders, and next quarter we might add Markdown. We want to swap formats without changing the report classes.

- The Bridge Pattern allows us to separate the report generation logic from the export format, enabling us to add new formats without modifying existing report classes. This promotes flexibility and reduces code duplication.

- You have to create an `Exporter` interface that defines the method for exporting content, and an abstract `Report` class that uses an `Exporter` to generate the final output. 

- By implementing concrete `SummaryReport` and `DetailedReport` classes, we can focus on the content generation while the exporters handle the formatting. This way, we can easily swap exporters at runtime without needing to create new report subclasses for each format.
```
