# Exercise: Strategy and Repository Pattern - H

## Topic: Strategy and Repository Pattern

# Question: 
Design a TypeScript application that demonstrates the integration of the Strategy Pattern with the Repository Pattern. The application should simulate a data management system where different strategies can be applied to handle data retrieval and storage. For example, you might have strategies for handling data in-memory, from a database, or from an external API. The repository should act as an abstraction layer, and the strategies should be interchangeable at runtime. Ensure that the design adheres to SOLID principles, particularly the Open/Closed Principle and Dependency Inversion Principle.

# Problem Statement:
You are tasked with creating a data management system that can switch between different data handling strategies without modifying the repository code. The system should be flexible enough to allow for new strategies to be added in the future without changing existing code. The repository should depend on abstractions rather than concrete implementations, allowing for easy integration of new strategies.

# Instructions:
1. Define TypeScript interfaces for the data handling strategies and the repository.
2. Implement at least three different strategies for data handling (e.g., InMemoryStrategy, DatabaseStrategy, APIDataStrategy).
3. Implement a repository that uses the defined strategies to manage data retrieval and storage.
4. Demonstrate the ability to switch between strategies at runtime without modifying the repository code.
5. Ensure that your design adheres to SOLID principles, particularly the Open/Closed Principle and Dependency Inversion Principle.

# Requirements:
- Implement the Strategy Pattern for data handling strategies.
- Implement the Repository Pattern as an abstraction layer.
- Ensure strategies are interchangeable at runtime.
- Adhere to SOLID principles, especially Open/Closed and Dependency Inversion.
- Provide clear TypeScript interfaces and classes.

# Example from the client:
The client requires a system where they can switch between different data handling strategies (e.g., in-memory, database, API) without modifying the repository code. For instance, during testing, the client might use an in-memory strategy, while in production, they might switch to a database strategy. The solution should allow seamless switching and ensure that the repository remains unaware of the specific strategy being used.
