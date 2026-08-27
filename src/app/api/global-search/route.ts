import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const toText = (value: unknown) => {
  if (value === null || value === undefined || value === "") return "-";
  if (typeof value === "boolean") return value ? "Ya" : "Tidak";
  return String(value);
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim() ?? "";
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? Number(limitParam) : 8;

  if (!q) {
    return NextResponse.json({
      results: [],
    });
  }

  try {
    const [kodeReferensi, dataPrioritas, sds] = await Promise.all([
      // =====================
      // KODE REFERENSI
      // =====================
      prisma.kodeReferensi.findMany({
        take: limit,
        where: {
          OR: [
            { kode_indikator: { contains: q, mode: "insensitive" } },
            { nama_indikator: { contains: q, mode: "insensitive" } },
            { definisi: { contains: q, mode: "insensitive" } },
            { satuan: { contains: q, mode: "insensitive" } },
            { klasifikasi: { contains: q, mode: "insensitive" } },
            { parent_kode: { contains: q, mode: "insensitive" } },
            { parentChild: { contains: q, mode: "insensitive" } },
          ],
        },
        select: {
          kode_indikator: true,
          nama_indikator: true,
          parent_kode: true,
          parentChild: true,
          definisi: true,
          rumus_perhitungan: true,
          klasifikasi: true,
          satuan: true,
          indikator_rpjpn: true,
          indikator_rpjmn: true,
          indikator_sdgs: true,
          indikator_sipd: true,
          tagging_rad: true,
        },
      }),

      // =====================
      // DATA PRIORITAS
      // =====================
      prisma.data_prioritas.findMany({
        take: limit,
        where: {
          OR: [
            { id_ddp: { contains: q, mode: "insensitive" } },
            { sumber_referensi: { contains: q, mode: "insensitive" } },
            { indikator: { contains: q, mode: "insensitive" } },
            { nama_data: { contains: q, mode: "insensitive" } },
            { jenis_data: { contains: q, mode: "insensitive" } },
            { jenis_pengajuan: { contains: q, mode: "insensitive" } },
            { indikator_variabel: { contains: q, mode: "insensitive" } },
            { standar_data: { contains: q, mode: "insensitive" } },
            { instansi_produsen: { contains: q, mode: "insensitive" } },
            { unit_kerja_produsen: { contains: q, mode: "insensitive" } },
            { definisi: { contains: q, mode: "insensitive" } },
            { satuan: { contains: q, mode: "insensitive" } },
            { klasifikasi_resiko: { contains: q, mode: "insensitive" } },
            { klasifikasi_penyajian: { contains: q, mode: "insensitive" } },
            { jadwal_pemutakhiran: { contains: q, mode: "insensitive" } },
            { tag_rad: { contains: q, mode: "insensitive" } },
            { level_produsen: { contains: q, mode: "insensitive" } },
            { catatan: { contains: q, mode: "insensitive" } },
          ],
        },
        select: {
          id_ddp: true,
          sumber_referensi: true,
          indikator: true,
          nama_data: true,
          prioritas_pengembangan: true,
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
          catatan: true,
          tahun_2025: true,
          tahun_2026: true,
          tahun_2027: true,
          tahun_2028: true,
          tahun_2029: true,
        },
      }),

      // =====================
      // SDS
      // =====================
      prisma.sds.findMany({
        take: limit,
        where: {
          OR: [
            { kode_sds: { contains: q, mode: "insensitive" } },
            { nama_data: { contains: q, mode: "insensitive" } },
            { konsep: { contains: q, mode: "insensitive" } },
            { definisi: { contains: q, mode: "insensitive" } },
            { penyajian: { contains: q, mode: "insensitive" } },
            { isian: { contains: q, mode: "insensitive" } },
            { ukuran: { contains: q, mode: "insensitive" } },
            { satuan: { contains: q, mode: "insensitive" } },
          ],
        },
        select: {
          kode_sds: true,
          nama_data: true,
          konsep: true,
          definisi: true,
          penyajian: true,
          isian: true,
          ukuran: true,
          satuan: true,
        },
      }),
    ]);

    const results = [
      ...kodeReferensi.map((item) => ({
        id: item.kode_indikator,
        kode: item.kode_indikator,
        judul: item.nama_indikator,
        deskripsi: item.definisi ?? "-",
        kategori: "Kode Referensi",
        detailTitle: "Detail Kode Referensi",
        detail: [
          {
            label: "Kode Indikator",
            value: toText(item.kode_indikator),
          },
          {
            label: "Nama Indikator",
            value: toText(item.nama_indikator),
          },
          {
            label: "Definisi",
            value: toText(item.definisi),
          },
          {
            label: "Satuan",
            value: toText(item.satuan),
          },
        ],
      })),

      ...dataPrioritas.map((item) => ({
        id: item.id_ddp,
        kode: item.id_ddp,
        judul: item.nama_data ?? item.indikator ?? "-",
        deskripsi: item.definisi ?? "-",
        kategori: "Data Prioritas",
        detailTitle: "Detail Data Prioritas",
        detail: [
          {
            label: "ID DDP",
            value: toText(item.id_ddp),
          },
          {
            label: "Sumber Referensi",
            value: toText(item.sumber_referensi),
          },
          {
            label: "Indikator",
            value: toText(item.indikator),
          },
          {
            label: "Nama Data",
            value: toText(item.nama_data),
          },
          {
            label: "Instansi Produsen Data",
            value: toText(item.instansi_produsen),
          },
          {
            label: "Definisi",
            value: toText(item.definisi),
          },
        ],
      })),

      ...sds.map((item) => ({
        id: item.kode_sds,
        kode: item.kode_sds,
        judul: item.nama_data,
        deskripsi: item.definisi ?? "-",
        kategori: "Standar Data Statistik",
        detailTitle: "Detail SDS",
        detail: [
          {
            label: "Kode SDS",
            value: toText(item.kode_sds),
          },
          {
            label: "Nama Data",
            value: toText(item.nama_data),
          },
          {
            label: "Definisi",
            value: toText(item.definisi),
          },
        ],
      })),
    ];

    return NextResponse.json({
      results,
    });
  } catch (error) {
    console.error("GLOBAL SEARCH ERROR:", error);

    return NextResponse.json(
      {
        results: [],
        message: "Gagal melakukan pencarian.",
      },
      {
        status: 500,
      }
    );
  }
}