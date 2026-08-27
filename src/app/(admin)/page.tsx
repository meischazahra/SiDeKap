import type { Metadata } from "next";
import Image from "next/image";
import GlobalSearch from "@/components/header/GlobalSearch";

export const metadata: Metadata = {
  title: "SiDeKap",
  description: "Sistem Informasi Kode Sektoral Kapuas",
};

const sumberData = [
  {
    title: "SDS",
    description: "Standar Data Statistik",
    href: "https://ms-sds.web.bps.go.id/sds",
  },
  {
    title: "Kode Referensi",
    description: "Indikator pembangunan",
    href: "https://data.go.id/",
  },
  {
    title: "Data Prioritas",
    description: "Daftar data pengembangan",
    href: "https://perencanaan.data.go.id/renduk",
  },
  {
    title: "Kode DSSD",
    description: "Kode data sektoral",
    href: "https://sipd.go.id/",
  },
];

export default function Ecommerce() {
  return (
    <div className="min-h-[calc(100vh-120px)]">
      <div
        className="
          min-h-[calc(100vh-160px)]
          rounded-2xl
          border border-gray-200
          bg-white
          p-6
          shadow-sm
          dark:border-gray-800
          dark:bg-white/[0.03]
          lg:p-8
        "
      >
        
      {/* =========================
          LOGO
      ========================== */}
      <div className="flex justify-center">
        {/* LIGHT MODE */}
        <Image
          src="/images/logo/logo_sidekap.png"
          alt="SiDeKap"
          width={320}
          height={120}
          priority
          className="
            h-auto
            w-[240px]
            object-contain
            sm:w-[300px]
            lg:w-[360px]
            dark:hidden
          "
        />

        {/* DARK MODE */}
        <Image
          src="/images/logo/logo_sidekap_bm.png"
          alt="SiDeKap"
          width={320}
          height={120}
          priority
          className="
            hidden
            h-auto
            w-[240px]
            object-contain
            sm:w-[300px]
            lg:w-[360px]
            dark:block
          "
        />
      </div>

        {/* =========================
            HEADER
        ========================== */}
        <div className="mt-5">
          <h1
            className="
              text-2xl
              font-semibold
              text-gray-900
              dark:text-white
              lg:text-3xl
            "
          >
            Pencarian Data Terpadu
          </h1>

          <p
            className="
              mt-2
              max-w-3xl
              text-sm
              leading-6
              text-gray-500
              dark:text-gray-400
            "
          >
            Cari data dari Standar Data Statistik, Kode Referensi Indikator,
            Data Prioritas, dan Kode DSSD dalam satu tempat.
          </p>
        </div>

        {/* =========================
            SEARCH
        ========================== */}
        <div
          className="
            mx-auto
            mt-7
            w-full
            rounded-2xl
            border border-gray-200
            bg-gray-50
            px-5
            py-6
            dark:border-gray-800
            dark:bg-gray-900/50
            sm:px-8
            lg:px-12
          "
        >
          <div className="mx-auto w-full max-w-5xl">
            <GlobalSearch />
          </div>
        </div>

        {/* =========================
            SUMBER DATA
        ========================== */}
        <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {sumberData.map((item) => (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                flex min-h-[180px]
                cursor-pointer
                flex-col
                justify-between
                rounded-2xl
                border border-gray-200
                bg-white
                p-6
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:border-blue-300
                hover:shadow-md

                dark:border-gray-800
                dark:bg-gray-900/50
                dark:hover:border-blue-700
              "
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p
                      className="
                        text-xs
                        font-medium
                        uppercase
                        tracking-wide
                        text-gray-400
                        dark:text-gray-500
                      "
                    >
                      Sumber Data
                    </p>

                    <h3
                      className="
                        mt-3
                        text-xl
                        font-semibold
                        text-gray-900
                        transition-colors
                        group-hover:text-blue-600
                        dark:text-white
                        dark:group-hover:text-blue-400
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-3
                        text-sm
                        leading-6
                        text-gray-500
                        dark:text-gray-400
                      "
                    >
                      {item.description}
                    </p>
                  </div>

                  {/* ICON */}
                  <div
                    className="
                      flex h-10 w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border border-gray-200
                      text-gray-400
                      transition
                      group-hover:border-blue-200
                      group-hover:bg-blue-50
                      group-hover:text-blue-600

                      dark:border-gray-700
                      dark:group-hover:border-blue-800
                      dark:group-hover:bg-blue-950/30
                      dark:group-hover:text-blue-400
                    "
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 17L17 7M9 7H17V15"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <div
                  className="
                    h-1
                    w-12
                    rounded-full
                    bg-blue-500
                    transition-all
                    duration-200
                    group-hover:w-20
                  "
                />

                <p
                  className="
                    mt-3
                    text-xs
                    font-medium
                    text-gray-400
                    transition
                    group-hover:text-blue-500
                    dark:text-gray-500
                  "
                >
                  Buka portal →
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}