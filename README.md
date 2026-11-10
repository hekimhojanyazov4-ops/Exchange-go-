
# Exchange Go

A modern, responsive currency converter built with React and Vite. Exchange Go allows users to convert amounts between multiple international currencies using exchange-rate data from an API.

## Features

- Convert between multiple international currencies.
- Fetch exchange rates from an API using Axios.
- Swap source and target currencies instantly.
- Display currency-specific icons.
- Validate user input before conversion.
- Handle API errors gracefully.
- Responsive user interface.
- Fast development experience powered by Vite.

## Technologies

| Technology | Purpose |
|---|---|
| React | User interface |
| Vite | Development server and build tool |
| JavaScript (ES6+) | Application logic |
| Axios | API requests |
| Lucide React | Icons |
| CSS3 | Styling |
| JSON Server | Local API development |

## Project Structure

```text
exchange-go/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   └── Currency.jsx
│   │
│   ├── css/
│   │   └── Currency.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/exchange-go.git
```

### 2. Navigate to the project

```bash
cd exchange-go
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```

## API Configuration

Exchange Go uses exchange-rate data with USD as the base currency.

Example API response:

```json
{
  "data": {
    "USD": 1,
    "EUR": 0.92,
    "GBP": 0.78,
    "TRY": 32.5,
    "JPY": 150.2
  }
}
```

The application supports both nested and direct currency-rate objects.

For local development, JSON Server can provide the exchange-rate data.

Example endpoint:

```text
https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_ymGs4zySDeLtA5VdGlC5Z5Za0SAwoy41K1joo4dw
```

## Currency Conversion Formula

Exchange Go uses USD-based exchange rates.

```javascript
const convertedAmount =
    amount * rates[toCurrency] / rates[fromCurrency];
```

Where:

- `amount` — original amount.
- `fromCurrency` — source currency.
- `toCurrency` — target currency.
- `rates` — exchange rates relative to USD.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## Production Build

To generate an optimized production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

The production files will be generated inside the `dist/` directory.

## Error Handling

The application handles:

- Invalid or empty amounts.
- Missing exchange-rate data.
- API connection errors.
- Unsupported currencies.

## Future Improvements

- Live exchange-rate updates.
- Currency search functionality.
- Conversion history.
- Favorite currencies.
- More detailed currency information.
- Improved accessibility.
- Unit and integration tests.

## Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push your branch.
5. Open a Pull Request.

## License

This project is available under the MIT License.

---

**Exchange Go** — Simple, fast, and convenient currency conversion.
