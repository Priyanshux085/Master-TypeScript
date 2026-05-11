# Exercise: SaaS Architecture Design - Hard

## Topic: Strategic System Design, Design Principles, and Design Patterns

# Question: 
You are the lead architect for "OmniContent," a new greenfield SaaS platform for a global media conglomerate. This platform will manage and deliver various types of content (articles, videos, podcasts) to different front-ends, including websites, mobile apps, and third-party partner APIs.

The executive mandate is to build a system that is the antithesis of their current legacy platform, which was built with **tactical programming** and now suffers from all four symptoms of **design rot**: Rigidity, Fragility, Immobility, and Viscosity.

Your task is to create a high-level, **strategic design** for the OmniContent platform. The core of your design must be the definition and justification of its modular architecture.

# Requirements:
Your architectural proposal must be presented through a combination of explanations and TypeScript interface definitions.

1.  **Modular Architecture:** Define an architecture composed of exactly **8 modules**.
    -   **5 Deep Modules:** These should provide powerful, complex functionality behind a simple, elegant interface.
    -   **3 Shallow Modules:** These may have simpler functionality or act as facades.

2.  **Module Justification:** For each of the 8 modules, you must:
    -   Provide a high-level description of its responsibilities.
    -   Classify it as either a **"Deep Module"** or a **"Shallow Module"**.
    -   Justify this classification by explaining how its interface-to-functionality ratio aligns with the principles of deep/shallow modules.

3.  **Pattern Implementation:** Demonstrate how key design patterns will be used to ensure the system is robust and scalable.
    -   **Bridge Pattern:** For one of your deep modules (e.g., an Access Control module), show how you would use the Bridge Pattern to separate the abstraction (checking permissions) from various implementations (e.g., Role-Based vs. Attribute-Based access control).
    -   **Factory Pattern:** For another deep module (e.g., a Content Ingestion module), use a Factory Pattern to create different types of content processors (`VideoProcessor`, `AudioProcessor`, `ArticleProcessor`).
    -   **Observer Pattern:** Show how the Observer Pattern can be used to decouple modules. For instance, how a `Search` module could subscribe to updates from the `Content Ingestion` module to re-index content automatically.
    -   **Repository Pattern:** Explain how implementing the Repository Pattern within one of your modules (e.g., Metadata Management) helps to prevent design **viscosity** when the underlying data schema evolves.

4.  **Strategic Conclusion:** Write a concluding paragraph explaining how your proposed **strategic design** directly combats the four symptoms of **design rot**, leading to a system that is maintainable, scalable, and adaptable for future needs.

5.  **Code Definitions:** Provide clear TypeScript interfaces for all 8 of your proposed modules to illustrate their public API contracts.

## Note:
-   Focus on the high-level design and architectural principles rather than low-level implementation details.
-   Ensure that your design is forward-thinking and can accommodate future features without significant refactoring, thus avoiding the pitfalls of tactical programming.

# Example from the client:
"We need a system where we can add a new content type, like 'Interactive Polls,' without rewriting our search or delivery logic. We also need to be able to experiment with a new, fine-grained 'Subscription Tier' access model without breaking existing user permissions. The system must be built for the long term, not just for the next quarter's features."

## Steps to implement: 
- Use bottom-up design to define the modules and their interfaces first, then explain how they fit together strategically.
- lets start by defining the 8 modules and their interfaces, then we will justify their classifications and demonstrate the design patterns.
- first module: Content Ingestion (Deep Module), is responsible for *processing and normalizing incoming content* from various sources. It will use the *Factory Pattern* to create different content processors based on the type of content being ingested.
- Second module: Access Control (Deep Module), manages *user permissions and access levels*. It will implement the *Bridge Pattern to separate the abstraction of permission* checking from the various implementations of access control.
- Third module: Search (Shallow Module), provides *search functionality* across all content types. It will subscribe to updates from the Content Ingestion module using the *Observer Pattern to ensure that search indexes are always up to date*.
- Fourth module: Metadata Management (Deep Module), handles the *storage and retrieval of content metadata*. It will implement the *Repository Pattern to abstract away the underlying data storage* and prevent design viscosity as the data schema evolves.
- Fifth module: Content Delivery (Shallow Module), is responsible for *delivering content to various front-ends*. It will act as a facade, providing a simple *interface for content delivery while hiding the complexities* of the underlying delivery mechanisms.
- Sixth module: User Management (Shallow Module), manages *user accounts and profiles*. It will provide a *straightforward interface for user-related operations*, such as registration, authentication, and profile updates.
- Seventh module: Analytics (Deep Module), *collects and analyzes data on content performance and user interactions*. It will provide insights and reports to help inform content strategy and platform improvements.
- Eighth module: Notification System (Shallow Module), handles the *sending of notifications to users* based on certain triggers, such as new content being published or user interactions.