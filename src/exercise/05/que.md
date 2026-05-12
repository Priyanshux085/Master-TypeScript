# Exercise: Decorator Pattern - Intermediate

## Topic: Decorator Pattern

# Question:
The Decorator Pattern is a structural design pattern that allows you to attach new behaviors to objects by placing these objects inside special wrapper objects that contain the behaviors. Imagine you are developing a notification system for an e-commerce application. The base requirement is to notify users via email. As the platform grows, you need to add more notification channels like SMS and push notifications, as well as cross-cutting concerns like logging and message encryption, without altering the existing notification code. How would you leverage the Decorator Pattern to create a flexible and scalable notification system where functionalities can be dynamically added and combined?

# Problem Statement:
You are tasked with building a notification module. The core component must be able to send a simple email. However, for different scenarios, you need to extend its functionality. For example, a standard order confirmation might just be an email. A password reset link should be an email with logging. A critical "payment failed" alert must be sent via email, SMS, and a push notification, with the entire process logged for auditing. Your design must allow you to "stack" these functionalities at runtime without creating a complex class hierarchy.

# Instructions:
1. Define a core `INotifier` interface with a `send(message: string): void` method.
2. Implement a concrete component `EmailNotifier` that implements `INotifier`.
3. Create an abstract `NotifierDecorator` class that also implements `INotifier` and holds a reference to a notifier object.
4. Implement at least three concrete decorators: `SMSNotifierDecorator`, `PushNotifierDecorator`, and `LoggingNotifierDecorator`.
5. The decorators should add their specific functionality (sending an SMS, sending a push notification, logging) before or after delegating the call to the wrapped notifier.
6. Provide a client-side example demonstrating how to:
   - Send a simple email.
   - Send an email and an SMS.
   - Send a critical alert via email, SMS, and push notification, with logging enabled.

# Requirements:
- Use the Decorator Pattern to add responsibilities to objects dynamically.
- Strictly adhere to the Open/Closed Principle, allowing for new decorators to be added without modifying existing classes.
- The solution must be implemented in TypeScript.
- The final output should demonstrate how decorators are composed to build complex notification behaviors.

# Example from the client:
"Our current system is a mess. We have classes like `EmailAndSmsNotifier` and `LoggedEmailNotifier`. Every time marketing wants a new combination, we have to write a new class. We need a system where we can just stack notification channels and features like building blocks. For a critical alert, I want to create a notifier on the fly that does email, SMS, push, and logging, without us having to pre-define a `CriticalAlertNotifier` class."

## Answer:
[Answer](./answer.ts)
