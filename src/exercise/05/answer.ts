// 1. Component Interface: Defines the interface for objects that can have responsibilities added to them dynamically.
interface INotifier {
  send(message: string): void;
}

// 2. Concrete Component: A class of objects to which additional responsibilities can be attached.
class EmailNotifier implements INotifier {
  send(message: string): void {
    console.log(`Sending email with message: "${message}"`);
  }
}

// 3. Base Decorator: This abstract class maintains a reference to a Notifier component and delegates requests to it.
// It conforms to the Notifier interface, which allows decorators to be transparently nested.
abstract class NotifierDecorator implements INotifier {
  constructor(protected wrappee: INotifier) {}

  send(message: string): void {
    this.wrappee.send(message);
  }
}

// 4. Concrete Decorators: These classes add new responsibilities to the component.
class SMSNotifierDecorator extends NotifierDecorator {
  override send(message: string): void {
    super.send(message); // First, call the original send method
    console.log(`Sending SMS with message: "${message}"`); // Then, add the new functionality
  }
}

class PushNotifierDecorator extends NotifierDecorator {
  override send(message: string): void {
    super.send(message);
    console.log(`Sending push notification with message: "${message}"`);
  }
}

class LoggingNotifierDecorator extends NotifierDecorator {
  override send(message: string): void {
    console.log(`[LOG] Attempting to send message: "${message}"`);
    super.send(message);
    console.log(`[LOG] Finished sending message.`);
  }
}

// --- 5. Client Code ---
// The client can compose decorators dynamically at runtime.

console.log("--- Scenario 1: Standard order confirmation (Email only) ---");
const simpleNotifier: INotifier = new EmailNotifier();
simpleNotifier.send("Your order #12345 has been confirmed.");
console.log("
");


console.log("--- Scenario 2: Password reset link (Email + Logging) ---");
let passwordResetNotifier: INotifier = new EmailNotifier();
passwordResetNotifier = new LoggingNotifierDecorator(passwordResetNotifier);
passwordResetNotifier.send("Here is your password reset link: http://example.com/reset?token=xyz");
console.log("
");


console.log("--- Scenario 3: Critical payment failure alert (Email + SMS + Push + Logging) ---");
// Create the base component
let criticalAlertNotifier: INotifier = new EmailNotifier();
// Wrap it with decorators
criticalAlertNotifier = new SMSNotifierDecorator(criticalAlertNotifier);
criticalAlertNotifier = new PushNotifierDecorator(criticalAlertNotifier);
criticalAlertNotifier = new LoggingNotifierDecorator(criticalAlertNotifier);

criticalAlertNotifier.send("Critical Alert: Your monthly subscription payment has failed.");
console.log("
");
