"use client";

import { useState } from "react";
import GenericTable from "@/components/tables/GenericTable";

type DataPrioritas = {
  id_ddp: string;
  sumber_referensi: string;
  indikator: string;
  nama_data: string;
  jenis_data: string;
  jenis_pengajuan: string;
  indikator_variabel: string;
  standar_data: string;
  instansi_produsen: string;
  unit_kerja_produsen: string;
  definisi: string;
  satuan: string;
  klasifikasi_resiko: string;
  klasifikasi_penyajian: string;
  jadwal_pemutakhiran: string;
  tag_rad: string;
  butuh_dukungan_daerah: boolean;
  level_produsen: string;
  catatan: string;
  tahun_2025: boolean;
  tahun_2026: boolean;
  tahun_2027: boolean;
  tahun_2028: boolean;
  tahun_2029: boolean;
};

type Props = {
  data: DataPrioritas[];
};

export default function DataPrioritasClient({ data }: Props) {
  const [selectedItem, setSelectedItem] =
    useState<DataPrioritas | null>(null);

const columns = [
  {
    key: "id_ddp",
    label: "ID DDP",
    width: "10%",
  },
  {
    key: "sumber_referensi",
    label: "Sumber Referensi",
    width: "14%",
  },
  {
    key: "indikator",
    label: "Indikator",
    width: "16%",
  },
  {
    key: "nama_data",
    label: "Nama Data",
    width: "16%",
  },
  {
    key: "definisi",
    label: "Definisi",
    width: "30%",
  },
  {
    key: "aksi",
    label: "Aksi",
    width: "14%",
    render: (_: unknown, row: DataPrioritas) => (
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
        <DetailDataPrioritasModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  );
}

type DetailDataPrioritasModalProps = {
  item: DataPrioritas;
  onClose: () => void;
};

function DetailDataPrioritasModal({
  item,
  onClose,
}: DetailDataPrioritasModalProps) {
  const renderBoolean = (value: boolean) =>
    value ? "Ya" : "Tidak";

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
            Detail Data Prioritas
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
            title="ID DDP"
            content={item.id_ddp}
          />

          <DetailSection
            title="Sumber Referensi"
            content={item.sumber_referensi}
          />

          <DetailSection
            title="Indikator"
            content={item.indikator}
          />

          <DetailSection
            title="Nama Data"
            content={item.nama_data}
          />

          <DetailSection
            title="Jenis Data"
            content={item.jenis_data}
          />

          <DetailSection
            title="Jenis Pengajuan"
            content={item.jenis_pengajuan}
          />

          <DetailSection
            title="Indikator Variabel"
            content={item.indikator_variabel}
          />

          <DetailSection
            title="Standar Data"
            content={item.standar_data}
          />

          <DetailSection
            title="Instansi Produsen Data"
            content={item.instansi_produsen}
          />

          <DetailSection
            title="Unit Kerja Produsen"
            content={item.unit_kerja_produsen}
          />

          <DetailSection
            title="Definisi"
            content={item.definisi}
          />

          <DetailSection
            title="Satuan"
            content={item.satuan}
          />

          <DetailSection
            title="Klasifikasi Data Sesuai Risiko"
            content={item.klasifikasi_resiko}
          />

          <DetailSection
            title="Klasifikasi Penyajian"
            content={item.klasifikasi_penyajian}
          />

          <DetailSection
            title="Jadwal Pemutakhiran"
            content={item.jadwal_pemutakhiran}
          />

          <DetailSection
            title="Tag RAD"
            content={item.tag_rad}
          />

          <DetailSection
            title="Apakah Membutuhkan Dukungan Data Daerah?"
            content={renderBoolean(item.butuh_dukungan_daerah)}
          />

          <DetailSection
            title="Level Instansi Produsen Data Daerah"
            content={item.level_produsen}
          />

          <DetailSection
            title="Catatan Kebutuhan Dukungan Data Daerah"
            content={item.catatan}
          />

          {/* PERIODE PENGEMBANGAN */}
          <div className="mt-5">
            <h3 className="mb-3 text-base font-semibold text-gray-900 dark:text-white">
              Periode Pengembangan
            </h3>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              <YearBadge
                year="2025"
                value={item.tahun_2025}
              />

              <YearBadge
                year="2026"
                value={item.tahun_2026}
              />

              <YearBadge
                year="2027"
                value={item.tahun_2027}
              />

              <YearBadge
                year="2028"
                value={item.tahun_2028}
              />

              <YearBadge
                year="2029"
                value={item.tahun_2029}
              />
            </div>
          </div>
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

type YearBadgeProps = {
  year: string;
  value: boolean;
};

function YearBadge({
  year,
  value,
}: YearBadgeProps) {
  return (
    <div className="rounded-lg border border-gray-200 px-3 py-2 text-center dark:border-gray-800">
      <p className="text-sm font-semibold text-gray-900 dark:text-white">
        {year}
      </p>

      <p
        className={`mt-1 text-sm font-medium ${
          value
            ? "text-green-600 dark:text-green-400"
            : "text-gray-400 dark:text-gray-500"
        }`}
      >
        {value ? "Ya" : "Tidak"}
      </p>
    </div>
  );
}