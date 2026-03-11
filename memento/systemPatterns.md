# System Patterns: Password Vault

## 1. Architecture

The application will follow a simple client-side architecture using React.

- **Component-Based Structure:** The UI will be broken down into reusable components (e.g., `PasswordForm`, `PasswordList`, `PasswordItem`).
- **State Management:** The primary state, which is the list of passwords, will be managed at the top level of the application (e.g., in the `App` component) using React's `useState` hook. State and state-updating functions will be passed down to child components as props.
- **Data Flow:** The application will use a unidirectional data flow. Actions from the UI (like adding or deleting a password) will trigger state updates in the `App` component, which will then re-render the UI with the new data.

## 2. Key Technical Decisions

- **Data Persistence:** Browser `localStorage` will be used for storing the password data. This is a simple, synchronous key-value store available in all modern browsers. The password array will be serialized to a JSON string before being stored.
- **No Backend:** The application is entirely self-contained and does not require a server. All logic and data storage are handled on the client side.

## 3. Design Patterns

- **Container/Presentational Components:**
    - The `App` component will act as a "container" component, managing the application's state and logic.
    - Components like `PasswordList` and `PasswordForm` will be "presentational" components, receiving data and functions via props and rendering the UI.
- **Lifting State Up:** To share the password list and modification logic between sibling components (like the form and the list), the state will be "lifted up" to their closest common ancestor, the `App` component.
