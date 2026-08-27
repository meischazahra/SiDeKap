"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type DetailItem = {
  label: string;
  value: string;
};

type SearchResult = {
  id: string;
  kode: string;
  judul: string;
  deskripsi: string;
  kategori: string;
  detailTitle: string;
  detail: DetailItem[];
};

export default function GlobalSearch() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedItem, setSelectedItem] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }

      if (event.key === "Escape") {
        handleCloseSearch();
        setSelectedItem(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const q = keyword.trim();

    if (q.length < 2) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setIsLoading(true);

        const response = await fetch(
          `/api/global-search?q=${encodeURIComponent(q)}&limit=50`
        );

        const data = await response.json();

        setResults(data.results ?? []);
      } catch (error) {
        console.error("GLOBAL SEARCH ERROR:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [keyword]);

  const groupedResults = useMemo(() => {
    return results.reduce<Record<string, SearchResult[]>>((acc, item) => {
      if (!acc[item.kategori]) {
        acc[item.kategori] = [];
      }

      acc[item.kategori].push(item);

      return acc;
    }, {});
  }, [results]);

  const orderedCategories = [
    "Data Prioritas",
    "Standar Data Statistik",
    "Kode Referensi",
    "Kode DSSD",
  ];

  const visibleCategories = orderedCategories.filter(
    (category) => groupedResults[category]?.length > 0
  );

  const handleCloseSearch = () => {
    setKeyword("");
    setResults([]);
    setIsLoading(false);
    inputRef.current?.blur();
  };

  const handleOpenDetail = (item: SearchResult) => {
    setSelectedItem(item);
    setKeyword("");
    setResults([]);
    setIsLoading(false);
  };

  return (
    <>
      <div className="w-full space-y-5">
        <div className="relative w-full">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
            <svg
              className="fill-gray-500 dark:fill-gray-400"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
              />
            </svg>
          </span>

          <input
            ref={inputRef}
            type="text"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="Cari kode, nama data, indikator, atau definisi..."
            className="dark:bg-dark-900 h-12 w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-12 pr-24 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
          />

          {keyword && (
            <button
              type="button"
              onClick={handleCloseSearch}
              className="absolute right-14 top-1/2 -translate-y-1/2 text-xl leading-none text-gray-400 hover:text-gray-700 dark:hover:text-white"
              aria-label="Clear search"
            >
              ×
            </button>
          )}

          <button
            type="button"
            onClick={() => inputRef.current?.focus()}
            className="absolute right-2.5 top-1/2 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-[7px] py-[4.5px] text-xs -tracking-[0.2px] text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400"
          >
            <span>⌘</span>
            <span>K</span>
          </button>
        </div>

        {keyword.trim().length >= 2 && (
          <div className="flex max-h-[560px] w-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="shrink-0 border-b border-gray-100 p-5 dark:border-gray-800">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Hasil Pencarian
                  </h2>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Menampilkan hasil untuk kata kunci:{" "}
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {keyword}
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {results.length} hasil ditemukan
                  </p>

                  <button
                    type="button"
                    onClick={handleCloseSearch}
                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/[0.03]"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-5">
              {isLoading ? (
                <div className="rounded-xl border border-gray-200 p-6 text-center text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
                  Mencari data...
                </div>
              ) : results.length === 0 ? (
                <div className="rounded-xl border border-gray-200 p-6 text-center text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
                  Data tidak ditemukan.
                </div>
              ) : (
                <div className="space-y-6">
                  {visibleCategories.map((category) => (
                    <section key={category}>
                      <div className="mb-4 flex items-center gap-3">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {category}
                        </h3>

                        <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-white/[0.06] dark:text-gray-300">
                          {groupedResults[category].length} data
                        </span>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        {(
                          expandedCategory[category]
                            ? groupedResults[category]
                            : groupedResults[category].slice(0, 8)
                        ).map((item) => (
                          <button
                            key={`${item.kategori}-${item.id}`}
                            type="button"
                            onClick={() => handleOpenDetail(item)}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-left transition hover:border-blue-300 hover:bg-blue-50/60 dark:border-gray-800 dark:bg-white/[0.03] dark:hover:border-blue-500/50 dark:hover:bg-blue-500/10"
                          >
                            <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                              <div>
                                <p className="text-sm font-bold text-gray-900 dark:text-white">
                                  {item.judul}
                                </p>

                                <p className="mt-1 text-xs font-medium text-blue-600 dark:text-blue-400">
                                  {item.kode}
                                </p>
                              </div>

                              <span className="w-fit rounded-full bg-white px-2.5 py-1 text-xs font-medium text-gray-600 shadow-sm dark:bg-gray-800 dark:text-gray-300">
                                {item.kategori}
                              </span>
                            </div>

                            <p className="line-clamp-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                              {item.deskripsi}
                            </p>
                          </button>
                        ))}
                      </div>
                     {groupedResults[category].length > 8 && (
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedCategory((prev) => ({
                            ...prev,
                            [category]: !prev[category],
                          }))
                        }
                        className="
                          mt-4
                          w-full
                          rounded-xl
                          border
                          border-blue-200
                          bg-blue-50
                          px-4
                          py-2
                          text-sm
                          font-semibold
                          text-blue-600
                          transition
                          hover:bg-blue-100

                          dark:border-blue-800
                          dark:bg-blue-950/30
                          dark:text-blue-400
                          dark:hover:bg-blue-900/40
                        "
                      >
                        {expandedCategory[category]
                          ? "Tampilkan lebih sedikit"
                          : `Tampilkan semua ${groupedResults[category].length} data`}
                      </button>
                    )}

                    </section>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {selectedItem && (
        <GlobalSearchDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  );
}

type GlobalSearchDetailModalProps = {
  item: SearchResult;
  onClose: () => void;
};

function GlobalSearchDetailModal({
  item,
  onClose,
}: GlobalSearchDetailModalProps) {
  return (
    <div
      className="fixed inset-0 z-[999999] flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-[1px]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl overflow-hidden rounded-xl bg-white shadow-xl dark:bg-gray-900"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5 dark:border-gray-800">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {item.detailTitle}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-3xl leading-none text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
          >
            ×
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
          {item.detail.map((detail) => (
            <div key={detail.label} className="mb-4">
              <h3 className="mb-1 text-base font-semibold text-gray-900 dark:text-white">
                {detail.label}
              </h3>

              <p className="whitespace-pre-line text-base leading-relaxed text-gray-700 dark:text-gray-300">
                {detail.value || "-"}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-end border-t border-gray-200 px-6 py-4 dark:border-gray-800">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-gray-900 px-5 py-2 text-sm font-semibold text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}