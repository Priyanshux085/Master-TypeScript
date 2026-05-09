# Exercise: Factory Pattern - Advanced

## Question Length: 10-15 sentences

## Topic: Factory Pattern

# Question: 
The Factory Pattern is a creational design pattern that provides an interface for creating objects in a superclass but allows subclasses to alter the type of objects that will be created. Imagine you are tasked with building a design system for a large-scale application that supports multiple themes (e.g., light, dark, high contrast). How would you use the Factory Pattern to dynamically generate theme-specific components (e.g., buttons, cards, modals) while ensuring consistency and scalability? Your solution should demonstrate how the Factory Pattern can simplify the creation of theme-aware components, adhere to the Open/Closed Principle, and allow for the seamless addition of new themes in the future. Provide a TypeScript code example to illustrate your approach.

# Requirements:
- Use the Factory Pattern to create theme-specific components.
- Create a centralized factory that can generate components based on the selected theme.
- Make a `createComponent` method that takes the component type (e.g., "button", "card", "modal") and theme (e.g., "light", "dark", "high contrast") as parameters and returns the appropriate component instance.

# Example from the client:
Imagine a scenario where a design system needs to support a new "high contrast" theme in addition to existing "light" and "dark" themes. The Factory Pattern should allow for the seamless integration of this new theme without modifying existing code for the other themes. For instance, a `ButtonFactory` could dynamically create `LightButton`, `DarkButton`, or `HighContrastButton` instances based on the selected theme. Each button type should have its own unique styles and behaviors, but the creation logic should remain centralized in the factory.

## Answer:

### Thinking Process:
Use bottom-up approach to design the components first, then create the factory to generate them based on the theme.

[Answer](./answer.ts)