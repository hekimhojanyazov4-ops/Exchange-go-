
import React, { useState, useEffect } from "react";
import axios from "axios";

import {
    DollarSign,
    Euro,
    JapaneseYen,
    IndianRupee,
    PoundSterling,
    RussianRuble,
    SwissFranc,
    Banknote,
    ArrowLeftRight,
    RefreshCw,
    AlertCircle,
    X,
} from "lucide-react";

import "../css/Currency.css";

// const BASE_URL = "http://localhost:3005/data/";

// const BASE_URL =
//     "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_ymGs4zySDeLtA5VdGlC5Z5Za0SAwoy41K1joo4dw";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY

const BASE_URL = `${API_URL}?apikey=${API_KEY}`;

const currencyIcons = {
    USD: DollarSign,
    EUR: Euro,
    GBP: PoundSterling,
    JPY: JapaneseYen,
    INR: IndianRupee,
    RUB: RussianRuble,
    CHF: SwissFranc,

    AUD: Banknote,
    BGN: Banknote,
    BRL: Banknote,
    CAD: Banknote,
    CNY: Banknote,
    CZK: Banknote,
    DKK: Banknote,
    HKD: Banknote,
    HRK: Banknote,
    HUF: Banknote,
    IDR: Banknote,
    ILS: Banknote,
    ISK: Banknote,
    KRW: Banknote,
    MXN: Banknote,
    MYR: Banknote,
    NOK: Banknote,
    NZD: Banknote,
    PHP: Banknote,
    PLN: Banknote,
    RON: Banknote,
    SEK: Banknote,
    SGD: Banknote,
    THB: Banknote,
    TRY: Banknote,
    ZAR: Banknote,
};

// =====================================
// CURRENCY ICON COMPONENT
// =====================================

const CurrencyIcon = ({ code, size = 22 }) => {
    const Icon = currencyIcons[code] || Banknote;

    return <Icon size={size} className="currency-icon" />;
};



const Currency = () => {
    // Currency states
    const [amount, setAmount] = useState("0");
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("TRY");
    const [result, setResult] = useState("0");

    const [currencies, setCurrencies] = useState([]);
    const [rates, setRates] = useState({});


    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCurrencies = async () => {
            try {
                setError("");

                const response = await axios.get(BASE_URL);

              
                const currencyData = response.data?.data ?? response.data;

                if (
                    !currencyData ||
                    typeof currencyData !== "object" ||
                    Array.isArray(currencyData)
                ) {
                    throw new Error("Invalid currency API response.");
                }

               
                const currencyList = Object.entries(currencyData).map(
                    ([code, rate]) => ({
                        code,
                        rate,
                    }),
                );

             
                if (
                    currencyList.length === 0 ||
                    currencyList.some(
                        ({ rate }) =>
                            typeof rate !== "number" ||
                            !Number.isFinite(rate) ||
                            rate <= 0,
                    )
                ) {
                    throw new Error("Invalid currency rates.");
                }

               
                setCurrencies(currencyList);
                setRates(currencyData);
            } catch (error) {
                console.error("Currency loading error:", error);

                if (axios.isAxiosError(error) && !error.response) {
                    setError(
                        "Unable to connect. Please check your API server.",
                    );
                } else {
                    setError(
                        error.response?.data?.message ||
                            error.message ||
                            "Unable to load currencies.",
                    );
                }
            } finally {
                setLoading(false);
            }
        };

        getCurrencies();
    }, []);

    
    const exchange = () => {
        try {
            setError("");

            const numericAmount = Number(amount);

            if (
                amount.trim() === "" ||
                !Number.isFinite(numericAmount) ||
                numericAmount < 0
            ) {
                throw new Error("Please enter a valid amount.");
            }

            if (rates[fromCurrency] == null || rates[toCurrency] == null) {
                throw new Error("Currency rates are unavailable.");
            }

           
            const convertedResult = (
                (numericAmount * rates[toCurrency]) /
                rates[fromCurrency]
            ).toFixed(2);

            setResult(convertedResult);
        } catch (error) {
            console.error("Conversion error:", error);

            setError(error.message);
        }
    };

   

    const swapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);

        setResult("0");
        setError("");
    };

    

    return (
        <div className="container">
            <div className="currency-box">
                <h2 className="title">Exchange go</h2>

              

                {error && (
                    <div className="error-message" role="alert">
                        <AlertCircle size={20} className="error-icon" />

                        <p className="error-text">{error}</p>

                        <button
                            className="close-error"
                            onClick={() => setError("")}
                            aria-label="Close error"
                        >
                            <X size={18} />
                        </button>
                    </div>
                )}

               

                <div className="currency-container">
                  

                    <div className="from-currency">
                        <CurrencyIcon code={fromCurrency} />

                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            id="from-currency-input"
                            min="0"
                        />

                        <select
                            value={fromCurrency}
                            onChange={(e) => setFromCurrency(e.target.value)}
                            className="fromCurrency-option"
                            disabled={loading}
                        >
                            {currencies.map((currency) => (
                                <option
                                    key={currency.code}
                                    value={currency.code}
                                >
                                    {currency.code}
                                </option>
                            ))}
                        </select>
                    </div>

                  

                    <button
                        className="swap-btn"
                        onClick={swapCurrencies}
                        aria-label="Swap currencies"
                        disabled={loading}
                    >
                        <ArrowLeftRight size={22} />
                    </button>

                   

                    <div className="to-currency">
                        <CurrencyIcon code={toCurrency} />

                        <input
                            type="number"
                            id="to-currency-input"
                            value={result}
                            readOnly
                        />

                        <select
                            value={toCurrency}
                            onChange={(e) => setToCurrency(e.target.value)}
                            className="toCurrency-option"
                            disabled={loading}
                        >
                            {currencies.map((currency) => (
                                <option
                                    key={currency.code}
                                    value={currency.code}
                                >
                                    {currency.code}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

             

                <button
                    onClick={exchange}
                    className="currency-change-btn"
                    disabled={loading || currencies.length === 0}
                >
                    <RefreshCw size={18} className={loading ? "spin" : ""} />

                    {loading ? "Loading currencies..." : "Exchange"}
                </button>
            </div>
        </div>
    );
};

export default Currency;
