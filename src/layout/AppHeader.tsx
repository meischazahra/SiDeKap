"use client";

import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import { useSidebar } from "@/context/SidebarContext";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

const AppHeader: React.FC = () => {
  const pathname = usePathname();

  const {
    isMobileOpen,
    toggleSidebar,
    toggleMobileSidebar,
  } = useSidebar();

  // Logo header tidak ditampilkan di halaman beranda
  const isHome = pathname === "/";

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  return (
    <header
      className="
        sticky top-0 z-99999
        flex w-full
        border-b border-gray-200
        bg-white
        dark:border-gray-800
        dark:bg-gray-900
      "
    >
      <div
        className="
          relative
          flex w-full
          items-center
          justify-between
          px-4 py-3
          lg:px-6 lg:py-4
        "
      >
        {/* =========================
            KIRI - TOGGLE SIDEBAR
        ========================== */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={handleToggle}
            aria-label="Toggle Sidebar"
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-lg
              border border-gray-200
              text-gray-500
              transition
              hover:bg-gray-50
              dark:border-gray-800
              dark:text-gray-400
              dark:hover:bg-gray-800
              lg:h-11 lg:w-11
            "
          >
            {isMobileOpen ? (
              /* X ICON */
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              /* HAMBURGER ICON */
              <svg
                width="20"
                height="20"
                viewBox="0 0 16 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.583252 1C0.583252 0.585788 0.919038 0.25 1.33325 0.25H14.6666C15.0808 0.25 15.4166 0.585786 15.4166 1C15.4166 1.41421 15.0808 1.75 14.6666 1.75H1.33325C0.919038 1.75 0.583252 1.41421 0.583252 1ZM0.583252 6C0.583252 5.58579 0.919038 5.25 1.33325 5.25H8C8.41421 5.25 8.75 5.58579 8.75 6C8.75 6.41421 8.41421 6.75 8 6.75H1.33325C0.919038 6.75 0.583252 6.41421 0.583252 6ZM0.583252 11C0.583252 10.5858 0.919038 10.25 1.33325 10.25H14.6666C15.0808 10.25 15.4166 10.5858 15.4166 11C15.4166 11.4142 15.0808 11.75 14.6666 11.75H1.33325C0.919038 11.75 0.583252 11.4142 0.583252 11Z"
                  fill="currentColor"
                />
              </svg>
            )}
          </button>
        </div>

        {/* =========================
            TENGAH - LOGO SIDEKAP
            Tidak tampil di beranda
        ========================== */}
{!isHome && (
  <div
    className="
      absolute
      left-1/2 top-1/2
      -translate-x-1/2
      -translate-y-1/2
    "
  >
    {/* LIGHT MODE */}
    <Image
      src="/images/logo/logo_sidekap.png"
      alt="SiDeKap"
      width={180}
      height={60}
      priority
      className="
        h-auto
        w-[110px]
        object-contain
        sm:w-[130px]
        lg:w-[150px]
        dark:hidden
      "
    />

    {/* DARK MODE */}
    <Image
      src="/images/logo/logo_sidekap_bm.png"
      alt="SiDeKap"
      width={180}
      height={60}
      priority
      className="
        hidden
        h-auto
        w-[110px]
        object-contain
        sm:w-[130px]
        lg:w-[150px]
        dark:block
      "
    />
  </div>
)}

        {/* =========================
            KANAN - THEME TOGGLE
        ========================== */}
        <div className="flex items-center">
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;