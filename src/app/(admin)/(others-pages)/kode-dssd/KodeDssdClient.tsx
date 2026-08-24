"use client";

import { useState } from "react";
import GenericTable from "@/components/tables/GenericTable";

type Dssd = {
  id: number;
  kode_dssd: string;
  uraian_dssd: string;
  satuan: string;
  definisi_operasional: string;
  produsen_data: string;
  kategori: string;
};

type Props = {
  data: Dssd[];
};

export default function KodeDssdClient({ data }: Props) {
  const [selectedItem, setSelectedItem] =
    useState<Dssd | null>(null);

  const columns = [
    {
      key: "kode_dssd",
      label: "Kode DSSD",
      width: "15%",
    },
    {
      key: "uraian_dssd",
      label: "Uraian DSSD",
      width: "30%",
    },
    {
      key: "satuan",
      label: "Satuan",
      width: "15%",
    },
    {
      key: "definisi_operasional",
      label: "Definisi Operasional",
      width: "30%",
    },
    {
      key: "aksi",
      label: "Aksi",
      width: "10%",
      render: (_: unknown, row: Dssd) => (
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
      <GenericTable
        columns={columns}
        data={data}
      />

      {selectedItem && (
        <DetailDssdModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  );
}


type DetailDssdModalProps = {
  item: Dssd;
  onClose: () => void;
};


function DetailDssdModal({
  item,
  onClose,
}: DetailDssdModalProps) {

  return (
    <div
      className="fixed inset-0 z-[999999] flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-[1px]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl overflow-hidden rounded-xl bg-white shadow-xl dark:bg-gray-900"
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5 dark:border-gray-800">

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Detail DSSD
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
            title="Kode DSSD"
            content={item.kode_dssd}
          />

          <DetailSection
            title="Uraian DSSD"
            content={item.uraian_dssd}
          />

          <DetailSection
            title="Produsen Data"
            content={item.produsen_data}
          />

          <DetailSection
            title="Kategori"
            content={item.kategori}
          />

          <DetailSection
            title="Satuan"
            content={item.satuan}
          />

          <DetailSection
            title="Definisi Operasional"
            content={item.definisi_operasional}
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
  content: string | null;
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