import { useState } from "react";
import { Dashboard } from "./pages/Dashboard";
import { InvoicesProvider } from "./contexts/invoices";
import { IntitalInvoiceData } from "./constants";
import "./styles.css";

export default function App() {
  const [invoices, setInvoices] = useState(IntitalInvoiceData);
  return (
    <div className="App">
      <InvoicesProvider setInvoices={setInvoices} invoices={invoices}>
        <Dashboard />
      </InvoicesProvider>
    </div>
  );
}

// form

// Craft Demo Question: Interactive Bill Generation UI

// Design and implement a user-friendly, interactive front-end interface for generating and managing invoices within an online accounting platform like QuickBooks. The UI should:
// Intuitive Invoice Creation:
// Provide a clear form for users to input invoice details (customer, date, line items, taxes, discounts). Done
// Allow for easy addition, editing, and removal of line items. Done
// Display real-time calculations of line item totals, subtotal, taxes, discounts, and the final invoice total as the user makes changes.
// Customer Selection:
// Offer a way to search and select existing customers or create new customer records directly within the invoice form. Done
// Pre-populate customer information (billing address, etc.) when a customer is selected. Done
// Preview and Save:
// Generate a visually appealing invoice preview based on the entered data and a customizable template.
// Enable users to save invoice drafts and finalized invoices. Done
// Data Persistence:
// (Optional, but demonstrates understanding) Show how you would interact with backend APIs to store and retrieve invoice data.

// Design Considerations (for the Candidate)
// UI Framework:
// Choose a modern front-end framework like React (as mentioned in the job description), Angular, or Vue.js.
// Demonstrate proficiency in component-based architecture, state management, and UI rendering.
// User Experience (UX):
// Design an intuitive and visually appealing layout.
// Prioritize ease of use and error prevention through clear instructions, validation, and helpful feedback messages.
// State Management:
// Implement a way to manage the state of the invoice form (customer details, line items, calculations) to ensure smooth updates and prevent data loss.
// Component Design:
// Break down the UI into reusable components (e.g., customer selector, line item input, invoice preview).
// Ensure components are modular, testable, and follow best practices for styling and accessibility.
// API Interaction:
// If time permits, showcase how you would fetch customer data from the backend (GET /customers) and send invoice data for saving (POST /invoices). You can use a mock backend or make assumptions about API endpoints.
// Data Validation:
// Implement client-side validation for required fields, valid input formats (e.g., currency, dates), and calculations.
// Non-Functional Requirements (NFRs)
// Responsiveness: UI should adapt well to different screen sizes and devices.
// Performance: Minimize loading times and ensure a smooth user experience.
// Accessibility: Design with accessibility in mind, following WCAG guidelines.
// Offline Support: (Optional) Explore how to handle scenarios where the user might have intermittent connectivity.
// Error Handling: Provide clear error messages and graceful recovery mechanisms.
// Coding
// Focus on building:
// Core Components: Invoice form, line item input, customer selector.
// State Management: Implement logic to manage form state and updates.
// Real-time Calculations: Show totals updating as the user interacts with the form.
// API Interaction (optional): Fetch/save data (using mocks or assumptions).
// Basic UI Testing: Write unit or end-to-end tests (if time allows).
