import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import DataPrioritasClient from "./DataPrioritasClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Data Prioritas",
  description: "Halaman Data Prioritas",
};

export default async function DataPrioritasPage() {
  const dataPrioritas = await prisma.data_prioritas.findMany({
    select: {
      id_ddp: true,
      sumber_referensi: true,
      indikator: true,
      nama_data: true,
      jenis_data: true,
      jenis_pengajuan: true,
      indikator_variabel: true,
      standar_data: true,
      instansi_produsen: true,
      unit_kerja_produsen: true,
      definisi: true,
      satuan: true,
      klasifikasi_resiko: true,
      klasifikasi_penyajian: true,
      jadwal_pemutakhiran: true,
      tag_rad: true,
      butuh_dukungan_daerah: true,
      level_produsen: true,
      catatan: true
    },
    orderBy: {
      id_ddp: "asc",
    },
  });

  const mappedData = dataPrioritas.map((item) => ({
    id_ddp: item.id_ddp ?? "",
    sumber_referensi: item.sumber_referensi ?? "-",
    indikator: item.indikator ?? "-",
    nama_data: item.nama_data ?? "-",
    jenis_data: item.jenis_data ?? "-",
    jenis_pengajuan: item.jenis_pengajuan ?? "-",
    indikator_variabel: item.indikator_variabel ?? "-",
    standar_data: item.standar_data ?? "-",
    instansi_produsen: item.instansi_produsen ?? "-",
    unit_kerja_produsen: item.unit_kerja_produsen ?? "-",
    definisi: item.definisi ?? "-",
    satuan: item.satuan ?? "-",
    klasifikasi_resiko: item.klasifikasi_resiko ?? "-",
    klasifikasi_penyajian: item.klasifikasi_penyajian ?? "-",
    jadwal_pemutakhiran: item.jadwal_pemutakhiran ?? "-",
    tag_rad: item.tag_rad ?? "-",
    butuh_dukungan_daerah: item.butuh_dukungan_daerah ?? false,
    level_produsen: item.level_produsen ?? "-",
    catatan: item.catatan ?? "-"
  }));

  return (
    <div>
      <PageBreadcrumb pageTitle="Data Prioritas" />

      <div className="space-y-6">
        <ComponentCard title="Data Prioritas Jangka Menengah 2025-2029" description="Berisi daftar data prioritas jangka menengah yang digunakan dalam sistem.">
          <DataPrioritasClient data={mappedData} />
        </ComponentCard>
      </div>
    </div>
  );
}