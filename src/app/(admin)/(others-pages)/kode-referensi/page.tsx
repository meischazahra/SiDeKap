import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import KodeReferensiClient from "./KodeReferensiClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kode Referensi",
  description: "Halaman Kode Referensi",
};

export default async function KodeReferensiPage() {
  const data = await prisma.kodeReferensi.findMany({
    orderBy: {
      kode_indikator: "asc",
    },
    select: {
      kode_indikator: true,
      nama_indikator: true,
      definisi: true,
      satuan: true,
      klasifikasi: true,
      rumus_perhitungan : true,
      indikator_rpjpn: true,
      indikator_rpjmn: true,
      indikator_sdgs: true,
      indikator_sipd: true,
      tagging_rad: true
    },
  });
  console.log("DATA DARI DATABASE:", data);

  const mappedData = data.map((item) => ({
    kode_indikator: item.kode_indikator ?? "",
    nama_indikator: item.nama_indikator ?? "",
    definisi: item.definisi ?? "-",
    satuan: item.satuan ?? "-",
    klasifikasi: item.klasifikasi ?? "-",
    rumus_perhitungan: item.rumus_perhitungan ?? "-",
    indikator_rpjpn: item.indikator_rpjpn ?? "-",
    indikator_rpjmn: item.indikator_rpjmn ?? "-",
    indikator_sdgs: item.indikator_sdgs ?? "-",
    indikator_sipd: item.indikator_sipd ?? "-",
    tagging_rad: item.tagging_rad ?? "-"
  }));

return (
    <div>
      <PageBreadcrumb pageTitle="Kode Referensi Indikator Pembangunan" />

      <div className="space-y-6">
        <ComponentCard title="Kode Referensi Indikator Pembangunan" description="Berisi daftar kode referensi indikator pembangunan yang digunakan dalam sistem.">
          <KodeReferensiClient data={mappedData} />
        </ComponentCard>
      </div>
    </div>
  );
}