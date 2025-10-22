/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "*.css";

declare global {
  // ───────────────────────────────
  // AUTH TYPES
  // ───────────────────────────────
  type SignInFormData = {
    email: string;
    password: string;
  };

  type SignUpFormData = {
    fullName: string;
    email: string;
    password: string;
    country: string;
    investmentGoals: string;
    riskTolerance: string;
    preferredIndustry: string;
  };

  type User = {
    id: string;
    name: string;
    email: string;
  };

  type UserForNewsEmail = {
    id: string;
    email: string;
    name: string;
    country: string;
    investmentGoals?: string;
    riskTolerance?: string;
    preferredIndustry?: string;
  };

  type WelcomeEmailData = {
    email: string;
    name: string;
    intro: string;
  };

  // ───────────────────────────────
  // FORM TYPES
  // ───────────────────────────────
  type CountrySelectProps = {
    name: string;
    label: string;
    control: Control<any>;
    error?: FieldError;
    required?: boolean;
  };

  type FormInputProps = {
    name: string;
    label: string;
    placeholder: string;
    type?: string;
    register: UseFormRegister<any>;
    error?: FieldError;
    validation?: RegisterOptions;
    disabled?: boolean;
    value?: string;
  };

  type Option = {
    value: string;
    label: string;
  };

  type SelectFieldProps = {
    name: string;
    label: string;
    placeholder: string;
    options: readonly Option[];
    control: Control<any>;
    error?: FieldError;
    required?: boolean;
  };

  type FooterLinkProps = {
    text: string;
    linkText: string;
    href: string;
  };

  // ───────────────────────────────
  // STOCK TYPES
  // ───────────────────────────────
  type Stock = {
    symbol: string;
    name: string;
    exchange: string;
    type: string;
  };

  type StockWithWatchlistStatus = Stock & {
    isInWatchlist: boolean;
  };

  type StockData = {
    symbol: string;
    company: string;
    price: string;
    change: string;
    marketCap: string;
    peRatio: string;
    eps: string;
    sentiment: string;
  };

  type SelectedStock = {
    symbol: string;
    company: string;
    currentPrice?: number;
  };

  type StockWithData = {
    _id?: string;
    userId: string;
    symbol: string;
    company: string;
    addedAt: Date;
    currentPrice?: number;
    changePercent?: number;
    changeAmount?: number;
    priceFormatted?: string;
    changeFormatted?: string;
    changeAmountFormatted?: string;
    marketCap?: string;
    peRatio?: string;
    tradingViewSymbol?: string;
  };

  type StockDetailsData = {
    // Basic Information
    symbol: string;
    company: string;
    exchange: string;
    currency: string;
    country: string;

    // Price Information
    currentPrice: number;
    previousClose: number;
    dayHigh: number;
    dayLow: number;
    openPrice: number;

    // Calculated Metrics
    changeAmount: number;
    changePercent: number;
    priceFormatted: string;
    changeFormatted: string;
    changeAmountFormatted: string;

    // Company Information
    marketCap: number;
    marketCapFormatted: string;
    sharesOutstanding: number;

    // Additional Data
    industry: string;
    website: string;
    logo: string;
    ipo: string;
    phone: string;

    // Financial Metrics
    peRatio: string;
    eps: string;
    sentiment: string;

    // Metadata
    lastUpdated: string;
  };

  type StockDetailsProps = {
    symbol: string | null;
    onClose: () => void;
    open: boolean;
  };

  // ───────────────────────────────
  // NEWS TYPES
  // ───────────────────────────────
  type MarketNewsArticle = {
    id: number;
    headline: string;
    summary: string;
    source: string;
    url: string;
    datetime: number;
    category: string;
    related: string;
    image?: string;
  };

  type RawNewsArticle = {
    id: number;
    headline?: string;
    summary?: string;
    source?: string;
    url?: string;
    datetime?: number;
    image?: string;
    category?: string;
    related?: string;
  };

  type WatchlistNewsProps = {
    watchlistSymbols?: string[];
    watchlistStocks?: StockWithData[];
    articlesPerStock?: number;
    initialNews?: MarketNewsArticle[];
    news?: MarketNewsArticle[];
  };

  // ───────────────────────────────
  // ALERT TYPES
  // ───────────────────────────────
  type AlertFormData = {
    alertName: string;
    alertType: "price" | "volume";
    condition: "greater" | "less";
    threshold: string;
  };

  type AlertData = {
    alertName: string;
    symbol: string;
    alertType: "price" | "volume";
    condition: "greater" | "less";
    threshold: number;
  };

  type Alert = {
    id: string;
    symbol: string;
    company: string;
    alertName: string;
    currentPrice: number;
    alertType: "upper" | "lower" | "volume";
    threshold: number;
    changePercent?: number;
    frequency?: string;
  };

  type AlertsListProps = {
    alertData: Alert[] | undefined;
  };

  type AlertModalProps = {
    isOpen: boolean;
    onClose: () => void;
    symbol: string;
    company: string;
    currentPrice?: number;
    alertId?: string;
    onCreateAlert?: (alertData: AlertData) => Promise<void>;
    initialValues?: {
      alertName?: string;
      alertType?: "price" | "volume";
      condition?: "greater" | "less";
      threshold?: number;
    };
    action?: string;
  };

  // ───────────────────────────────
  // MISCELLANEOUS
  // ───────────────────────────────
  type QuoteData = {
    c?: number;
    dp?: number;
  };

  type ProfileData = {
    name?: string;
    marketCapitalization?: number;
  };

  type FinancialsData = {
    metric?: { [key: string]: number };
  };

  type PaginationInfo = {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };

  type StocksResponse = {
    data: StockData[];
    pagination: PaginationInfo;
  };

  type RecommendationData = {
    strongBuy: number;
    buy: number;
    hold: number;
    sell: number;
    strongSell: number;
    period: string;
    symbol: string;
  };

  // ───────────────────────────────
  // SEARCH TYPES
  // ───────────────────────────────
  type FinnhubSearchResult = {
    symbol: string;
    description: string;
    displaySymbol?: string;
    type: string;
  };

  type FinnhubSearchResponse = {
    count: number;
    result: FinnhubSearchResult[];
  };

  type SearchCommandProps = {
    open?: boolean;
    setOpen?: (open: boolean) => void;
    renderAs?: "button" | "text";
    buttonLabel?: string;
    buttonVariant?: "primary" | "secondary";
    className?: string;
    label?: string;
    initialStocks?: StockWithWatchlistStatus[];
  };

  // ───────────────────────────────
  // WATCHLIST TYPES
  // ───────────────────────────────
  type WatchlistButtonProps = {
    symbol: string;
    company: string;
    isInWatchlist: boolean;
    showTrashIcon?: boolean;
    type?: "button" | "icon";
    onWatchlistChange?: (symbol: string, isAdded: boolean) => void;
  };

  type WatchlistTableProps = {
    watchlist: StockWithData[];
  };
}

export {};
