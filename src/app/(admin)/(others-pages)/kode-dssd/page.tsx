import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import KodeDssdClient from "./KodeDssdClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "DSSD",
  description: "Halaman DSSD",
};


export default async function DssdPage() {

const dssd = await prisma.dssd.findMany({
  select: {
    id: true,
    kode_dssd: true,
    uraian_dssd: true,
    satuan: true,
    definisi_operasional: true,
    produsen_data: true,
    sheet_asal: true,
  },
  orderBy: {
    kode_dssd: "asc",
  },
});

console.log("DSSD PERTAMA:", dssd[0]);



  const mappedData = dssd.map((item) => ({
    id: item.id,
    kode_dssd: item.kode_dssd ?? "-",
    uraian_dssd: item.uraian_dssd ?? "-",
    satuan: item.satuan ?? "-",
    definisi_operasional:
      item.definisi_operasional ?? "-",
    produsen_data:
      item.produsen_data ?? "-",

    // nama di frontend jadi kategori
    kategori:
      item.sheet_asal ?? "-",
  }));



  return (
    <div>

      <PageBreadcrumb pageTitle="Data Statistik Sektoral Daerah" />


      <div className="space-y-6">

        <ComponentCard title="Data Statistik Sektoral Daerah">

          <KodeDssdClient
            data={mappedData}
          />

        </ComponentCard>

      </div>

    </div>
  );
}