# LaundryMate Frontend

LaundryMate is a mobile application designed to streamline laundry service management. It provides features for managing orders, customer profiles, and service offerings, making it easier for users to handle their laundry business efficiently.

## Features

- User authentication (login, registration, OTP verification)
- Manage customer profiles and orders
- Add and edit services and cloth types
- Multi-language support (English and Gujarati)
- Intuitive user interface with a customizable theme
- Responsive design for mobile devices

## Installation

To set up the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/AbhayMalsatar/LaundryMateFrontend.git
   cd LaundryMateFrontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Usage

To run the application, use the following command:
```bash
npm start
```
This will start the Expo development server. You can then open the app in the Expo Go app on your mobile device or in an emulator.

### Basic Usage Examples

- **Login**: Users can log in using their credentials.
- **Register**: New users can register and receive an OTP for verification.
- **Manage Orders**: Users can add, edit, and view orders.
- **Add Services**: Users can add new services to their offerings.

## Project Structure

```
├── src
│   ├── api
│   ├── components
│   ├── localization
│   ├── screens
│   ├── theme
│   └── data
├── App.tsx
├── index.ts
└── babel.config.js
```

## Configuration

The application uses environment variables for API configuration. The base URL for the API is set in `src/api/api.ts`:
```javascript
export const baseUrl = "http://192.168.29.62:8000/api";
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
