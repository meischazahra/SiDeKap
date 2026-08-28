import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import SdsClient from "./SdsClient";

export const metadata: Metadata = {
  title: "Standar Data Statistik",
  description: "Halaman Standar Data Statistik",
};

export const dynamic = "force-dynamic";

export default async function SdsPage() {
  const data = await prisma.sds.findMany({
    orderBy: {
      kode_sds: "asc",
    },
    select: {
      kode_sds: true,
      nama_data: true,
      konsep: true,
      definisi: true,
      penyajian: true,
      isian: true,
      ukuran: true,
      satuan: true
    },
  });

  const mappedData = data.map((item) => ({
    kode_sds: item.kode_sds ?? "",
    nama_data: item.nama_data ?? "",
    definisi: item.definisi ?? "-",
  }));

  return (
    <div>
      <PageBreadcrumb pageTitle="Standar Data Statistik" />

      <div className="space-y-6">
        <ComponentCard title="Standar Data Statistik">
          <SdsClient data={mappedData} />
        </ComponentCard>
      </div>
    </div>
  );
}