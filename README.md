# MultiTimerApp

This React Native application allows users to create, manage, and interact with multiple customizable timers, grouped by categories. It emphasizes clean UI/UX and minimal third-party dependencies.

## Table of Contents

-   [Project Description](#project-description)
-   [Setup Instructions](#setup-instructions)
-   [Assumptions](#assumptions)
-   [Dependencies](#dependencies)
-   [Project Structure](#project-structure)
-   [Usage](#usage)
-   [Contributing](#contributing)
-   [License](#license)

## Project Description

This application provides a comprehensive timer management solution. Users can create timers with names, durations, and categories. Timers are displayed in a categorized list with progress visualization, and users can perform bulk actions on categories. A history log of completed timers is maintained, and optional halfway alerts can be set.

## Setup Instructions

1.  **Prerequisites:**
    * Node.js (version >= 18)
    * npm or yarn
    * React Native CLI or Expo CLI
    * Xcode (for iOS development) or Android Studio (for Android development)

2.  **Clone the Repository:**
    ```bash
    git clone [your-repository-url]
    cd MultiTimerApp
    ```

3.  **Install Dependencies:**
    * Using npm:
        ```bash
        npm install
        ```
    * Using yarn:
        ```bash
        yarn install
        ```

4.  **Install Pods (iOS only):**
    ```bash
    cd ios
    pod install
    cd ..
    ```

5.  **Run the Application:**
    * **iOS:**
        ```bash
        npx react-native run-ios
        ```
    * **Android:**
        ```bash
        npx react-native run-android
        ```
    * **Expo:**
        ```bash
        npx expo start
        ```

## Assumptions

* **Development Environment:**
    * It is assumed that the developer has a working React Native development environment set up, including Node.js, npm/yarn, and either Xcode or Android Studio.
    * It is assumed that the developer has a working simulator or device to test the application.
* **Data Persistence:**
    * The application uses `AsyncStorage` for local data persistence. It is assumed that this is sufficient for the application's data storage needs.
* **Time Management:**
    * Timers are managed using `setInterval`. It is assumed that this provides adequate accuracy for the application's use case.
* **UI/UX:**
    * The UI is designed to be responsive and functional across different screen sizes, adhering to clean UI/UX principles.
    * The user is assumed to understand basic timer concepts.
* **Navigation:**
    * React Navigation is used, featuring two screens: a Home Screen for timer management and a History Screen for viewing completed timers.
* **State management:**
    * The application uses react hooks such as `useState`, and `useEffect` for state management.
* **Error Handling:**
    * Basic error handling is implemented, but more robust error handling may be required for production use.
* **Halfway Alerts:**
    * Halfway alerts are displayed as on-screen messages or notifications.

## Dependencies

* `react-native`
* `react-navigation`
* `@react-native-async-storage/async-storage`

## Project Structure
MultiTimerApp/
├── App.js
├── src/
│   ├── components/
│   │   ├── TimerItem.js
│   │   ├── CategorySection.js
│   │   └── ...
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── HistoryScreen.js
│   │   └── ...
│   ├── utils/
│   │   └── ...
│   └── ...
├── ios/
├── android/
├── package.json
├── README.md
└── ...


## Usage

1.  **Creating Timers:**
    * Navigate to the timer creation section on the Home Screen.
    * Enter the timer name, duration (in seconds), and select a category.
    * Save the timer.

2.  **Managing Timers:**
    * View timers grouped by categories in expandable sections on the Home Screen.
    * Use the start, pause, and reset controls for individual timers.
    * Use the "Start All," "Pause All," and "Reset All" buttons at the category level for bulk actions.
    * View the progress of each timer through a progress bar or percentage.
    * When a timer reaches zero, a congratulatory modal is displayed.

3.  **Viewing History:**
    * Navigate to the History Screen to view a log of completed timers, including timer names and completion times.

4.  **Setting Alerts:**
    * Set optional halfway alerts for timers during creation or editing.

