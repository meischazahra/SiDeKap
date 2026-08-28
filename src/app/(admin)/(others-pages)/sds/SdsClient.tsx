"use client";

import { useState } from "react";
import GenericTable from "@/components/tables/GenericTable";

type Sds = {
  kode_sds: string;
  konsep: string;
  penyajian: string;
};

type Props = {
  data: Sds[];
};

export default function SdsClient({ data }: Props) {
  const [selectedItem, setSelectedItem] = useState<Sds | null>(null);

  const columns = [
  {
    key: "kode_sds",
    label: "Kode SDS",
    width: "10%",
  },
  {
    key: "nama_data",
    label: "Nama Data",
    width: "24%",
  },
  {
    key: "definisi",
    label: "Definisi",
    width: "50%",
  },
  {
    key: "aksi",
    label: "Aksi",
    width: "14%",
    render: (_: unknown, row: Sds) => (
      <button
        type="button"
        onClick={() => setSelectedItem(row)}
        className="whitespace-nowrap rounded-lg bg-blue-500 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-blue-600"
      >
        Detail
      </button>
    ),
  },
];

  return (
    <>
      <GenericTable columns={columns} data={data} />

      {selectedItem && (
        <SdsDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  );
}

type SdsDetailModalProps = {
  item: Sds;
  onClose: () => void;
};

function SdsDetailModal({
  item,
  onClose,
}: SdsDetailModalProps) {
  return (
    <div
      className="fixed inset-0 z-[999999] flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-[1px]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl overflow-hidden rounded-xl bg-white shadow-xl dark:bg-gray-900"
        onClick={(event) => event.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5 dark:border-gray-800">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Detail Standar Data Statistik
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-3xl leading-none text-gray-500 transition hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
            aria-label="Tutup"
          >
            ×
          </button>
        </div>

        {/* CONTENT */}
        <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
          <DetailSection
            title="Kode SDS"
            content={item.kode_sds}
          />

          <DetailSection
            title="Nama Data"
            content={item.konsep}
          />

          <DetailSection
            title="Konsep"
            content={item.konsep}
          />

          <DetailSection
            title="Definisi"
            content={item.penyajian}
          />

          <DetailSection
            title="Penyajian"
            content={item.penyajian}
          />

          <DetailSection
            title="Isian"
            content={item.isian}
          />

          <DetailSection
            title="Ukuran"
            content={item.ukuran}
          />

          <DetailSection
            title="Satuan"
          content={item.satuan}
          />
        </div>

        {/* FOOTER */}
        <div className="flex justify-end border-t border-gray-200 px-6 py-4 dark:border-gray-800">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-gray-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-gray-900"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

type DetailSectionProps = {
  title: string;
  content: string;
};

function DetailSection({
  title,
  content,
}: DetailSectionProps) {
  return (
    <div className="mb-4">
      <h3 className="mb-1 text-base font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>

      <p className="whitespace-pre-line text-base leading-relaxed text-gray-700 dark:text-gray-300">
        {content || "-"}
      </p>
    </div>
  );
}