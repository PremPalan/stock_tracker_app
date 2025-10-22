"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Loader2, TrendingUp } from "lucide-react";
import Link from "next/link";
import { searchStocks } from "@/lib/actions/finnhub.actions";
import { useDebounce } from "../hooks/useDebouce";

export default function SearchCommand({
  renderAs = "button",
  label = "Add stock",
  initialStocks,
}: SearchCommandProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [stocks, setStocks] = useState<StockWithWatchlistStatus[]>(
    initialStocks ?? []
  );

  const isSearchMode = !!searchTerm.trim();
  const displayStocks = isSearchMode ? stocks : stocks?.slice(0, 10);

  // Deduplicate stocks by symbol+exchange so React keys are unique
  const uniqueDisplayStocks = useMemo(() => {
    const seen = new Set<string>();
    const result: StockWithWatchlistStatus[] = [];
    (displayStocks || []).forEach((s) => {
      const id = `${s.symbol}-${s.exchange}`;
      if (!seen.has(id)) {
        seen.add(id);
        result.push(s);
      }
    });
    return result;
  }, [displayStocks]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleSearch = async () => {
    if (!isSearchMode) return setStocks(initialStocks ?? []);

    setLoading(true);
    try {
      const results = await searchStocks(searchTerm.trim());
      setStocks(results);
    } catch {
      setStocks([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useDebounce(handleSearch, 300);

  useEffect(() => {
    debouncedSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const handleSelectStock = () => {
    setOpen(false);
    setSearchTerm("");
    setStocks(initialStocks ?? []);
  };

  return (
    <>
      {renderAs === "text" ? (
        <span onClick={() => setOpen(true)} className="search-text">
          {label}
        </span>
      ) : (
        <Button onClick={() => setOpen(true)} className="search-btn">
          {label}
        </Button>
      )}

      <CommandDialog open={open} onOpenChange={setOpen} className="search-dialog">
        <div className="search-field">
          <CommandInput
            value={searchTerm}
            onValueChange={setSearchTerm}
            placeholder="Search stocks..."
            className="search-input"
          />
          {loading && <Loader2 className="search-loader" />}
        </div>

        <CommandList className="search-list">
          {loading ? (
            <CommandEmpty className="search-list-empty">
              Loading stocks...
            </CommandEmpty>
          ) : (uniqueDisplayStocks?.length ?? 0) === 0 ? (
            <div className="search-list-indicator">
              {isSearchMode ? "No results found" : "No stocks available"}
            </div>
          ) : (
            <>
              <div className="search-count">
                {isSearchMode ? "Search results" : "Popular stocks"} (
                {uniqueDisplayStocks?.length || 0})
              </div>

              <ul>
                {uniqueDisplayStocks.map((stock) => {
                  const key = `${stock.symbol}-${stock.exchange}`;
                  return (
                    <li key={key} className="search-item">
                      <Link
                        href={`/stocks/${encodeURIComponent(stock.symbol)}`}
                        onClick={handleSelectStock}
                        className="search-item-link"
                      >
                        <TrendingUp className="h-4 w-4 text-gray-500" />
                        <div className="flex-1">
                          <div className="search-item-name">{stock.name}</div>
                          <div className="text-sm text-gray-500">
                            {stock.symbol} | {stock.exchange} | {stock.type}
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
