"use client";

import { useState } from "react";
import GenericTable from "@/components/tables/GenericTable";

type KodeReferensi = {
  kode_indikator: string;
  nama_indikator: string;
  definisi: string;
  rumus_perhitungan: string;
  klasifikasi: string;
  parent_kode: string;
  parentChild: string;
};

type Props = {
  data: KodeReferensi[];
};

export default function KodeReferensiClient({ data }: Props) {
  const [selectedItem, setSelectedItem] =
    useState<KodeReferensi | null>(null);

const columns = [
  {
    key: "kode_indikator",
    label: "Kode Indikator",
    width: "14%",
  },
  {
    key: "nama_indikator",
    label: "Nama Indikator",
    width: "22%",
  },
  {
    key: "definisi",
    label: "Definisi",
    width: "34%",
  },
  {
    key: "satuan",
    label: "Satuan",
    width: "10%",
  },
  {
    key: "klasifikasi",
    label: "Klasifikasi",
    width: "12%",
  },
  {
    key: "aksi",
    label: "Aksi",
    width: "12%",
    render: (_: unknown, row: KodeReferensi) => (
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
        <KodeReferensiDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  );
}

type KodeReferensiDetailModalProps = {
  item: KodeReferensi;
  onClose: () => void;
};

function KodeReferensiDetailModal({
  item,
  onClose,
}: KodeReferensiDetailModalProps) {
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
            Detail Kode Referensi
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
            title="Kode Indikator"
            content={item.kode_indikator}
          />

          <DetailSection
            title="Nama Indikator"
            content={item.nama_indikator}
          />

          <DetailSection
            title="Definisi"
            content={item.definisi}
          />

          <DetailSection
            title="Rumus Perhitungan"
            content={item.rumus_perhitungan}
          />

          <DetailSection
            title="Klasifikasi"
            content={item.klasifikasi}
          />

          <DetailSection
            title="Satuan"
            content={item.satuan}
          />

          <DetailSection
            title="Indikator RPJPN"
            content={item.indikator_rpjpn}
          />

          <DetailSection
            title="Indikator RPJMN"
            content={item.indikator_rpjmn}
          />

          <DetailSection
            title="Indikator SDGS"
            content={item.indikator_sdgs}
          />

          <DetailSection
            title="Indikator SIPD"
            content={item.indikator_sipd}
          />

          <DetailSection
            title="Tagging RAD"
            content={item.tagging_rad}
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