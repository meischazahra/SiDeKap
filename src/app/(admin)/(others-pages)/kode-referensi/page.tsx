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
      parent_kode: true,
      parentChild: true,
    },
  });
  console.log("DATA DARI DATABASE:", data);

  const mappedData = data.map((item) => ({
    kode_indikator: item.kode_indikator ?? "",
    nama_indikator: item.nama_indikator ?? "",
    definisi: item.definisi ?? "-",
    satuan: item.satuan ?? "-",
    klasifikasi: item.klasifikasi ?? "-",
    parent_kode: item.parent_kode ?? "-",
    parentChild: item.parentChild ?? "-",
  }));

return (
    <div>
      <PageBreadcrumb pageTitle="Kode Referensi" />

      <div className="space-y-6">
        <ComponentCard title="Kode Referensi">
          <KodeReferensiClient data={mappedData} />
        </ComponentCard>
      </div>
    </div>
  );
}