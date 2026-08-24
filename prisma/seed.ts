import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

import { PrismaClient } from "@prisma/client";
import { parse } from "csv-parse/sync";
import fs from "fs";
import path from "path";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });
console.log(prisma);

const kodeReferensiPath = path.join(
  __dirname,
  "data",
  "Kode Referensi Indikator Pembangunan 2.csv"
);

const sdsPath = path.join(
  __dirname,
  "data",
  "Standar Data Statistik.csv"
);

const dataPrioritasPath = path.join(
  __dirname,
  "data",
  "data_prioritas.csv"
);

function clean(value) {
  if (value === undefined || value === null) return null;

  const result = String(value).trim();

  if (result === "" || result === "-") return null;

  return result;
}

function readCsv(filePath) {
  const file = fs.readFileSync(filePath, "utf8");

  return parse(file, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    bom: true,
  });
}

async function seedKodeReferensi() {
  const rows = readCsv(kodeReferensiPath);

  const data = rows
    .map((row) => ({
      kode_indikator: clean(row["Kode Indikator"]),
      nama_indikator: clean(row["Nama Indikator"]),
      parent_kode: clean(row["ID Parent"]),
      parentChild: clean(row["Parent/Child"]),
      definisi: clean(row["Definisi"]),
      rumus_perhitungan: clean(row["Rumus Perhitungan"]),
      klasifikasi: clean(row["Klasifikasi"]),
      satuan: clean(row["Satuan"]),
      indikator_rpjpn: clean(row["Indikator RPJPN"]),
      indikator_rpjmn: clean(row["Indikator RPJMN"]),
      indikator_sdgs: clean(row["Indikator SDGS"]),
      indikator_sipd: clean(row["Indikator SIPD"]),
      tagging_rad: clean(row["Tagging RAD"]),
    }))
    .filter((item) => item.kode_indikator && item.nama_indikator);

  console.log("Data siap masuk KodeReferensi:", data.length);
  console.log("Contoh data siap masuk:", data[0]);

  // HAPUS DATA LAMA DULU
  const deleted = await prisma.kodeReferensi.deleteMany();
  console.log(`Data lama KodeReferensi terhapus: ${deleted.count} data`);

  const batchSize = 100;
  let totalMasuk = 0;

  for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize);

    const result = await prisma.kodeReferensi.createMany({
      data: batch,
      skipDuplicates: true,
    });

    totalMasuk += result.count;

    console.log(`Batch ${i / batchSize + 1} berhasil: ${result.count} data`);
  }

  console.log(`KodeReferensi berhasil masuk total: ${totalMasuk} data`);
}

async function seedSDS() {
  const rows = readCsv(sdsPath);

  const data = rows
    .map((row) => ({
      kode_sds: clean(row["Kode SDS"]),
      nama_data: clean(row["Nama Data"]),
      konsep: clean(row["Konsep"]),
      definisi: clean(row["Definisi"]),
      penyajian: clean(row["Penyajian"]),
      isian: clean(row["Isian"]),
      ukuran: clean(row["Ukuran"]),
      satuan: clean(row["Satuan"]),
    }))
    .filter((item) => item.kode_sds && item.nama_data);

  await prisma.sds.createMany({
    data,
    skipDuplicates: true,
  });

  console.log(`SDS berhasil masuk: ${data.length} data`);
}

async function seedDataPrioritas() {
  const rows = readCsv(dataPrioritasPath);

  const data = rows
    .map((row) => ({
      id_ddp: clean(row["ID DDP"]),
      sumber_referensi: clean(row["Sumber Referensi"]),
      indikator: clean(row["Indikator"]),
      nama_data: clean(row["Nama Data"]),
      jenis_data: clean(row["Jenis Data"]),
      jenis_pengajuan: clean(row["Jenis Pengajuan"]),
      indikator_variabel: clean(row["Indikator Variabel"]),
      standar_data: clean(row["Standar Data"]),
      instansi_produsen: clean(row["Instansi Produsen Data"]),
      unit_kerja_produsen: clean(row["Unit Kerja Produsen"]),
      definisi: clean(row["Definisi"]),
      satuan: clean(row["Satuan"]),
      klasifikasi_resiko: clean(row["Klasifikasi Data Sesuai Resiko"]),
      klasifikasi_penyajian: clean(row["Klasifikasi Penyajian"]),
      jadwal_pemutakhiran: clean(row["Jadwal Pemutakhiran"]),
      tag_rad: clean(row["Tag RAD"]),
      butuh_dukungan_daerah: clean(row["Apakah membutuhkan dukungan Data Daerah?"])=== "Ya",
      level_produsen: clean(row["Level Instansi Produsen Data Daerah"]),
      catatan: clean(row["Catatan kebutuhan dukungan Data Daerah"]),
      tahun_2025: clean(row["2025"]) === "Ya",
      tahun_2026: clean(row["2026"]) === "Ya",
      tahun_2027: clean(row["2027"]) === "Ya",
      tahun_2028: clean(row["2028"]) === "Ya",
      tahun_2029: clean(row["2029"]) === "Ya",
    }))
    .filter((item) => item.id_ddp);

 console.log("Data siap masuk Data Prioritas:", data.length);
  console.log("Contoh data siap masuk:", data[0]);

  // HAPUS DATA LAMA DULU
  const deleted = await prisma.data_prioritas.deleteMany();
  console.log(`Data lama Data Prioritas terhapus: ${deleted.count} data`);

  const batchSize = 100;
  let totalMasuk = 0;

  for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize);

    const result = await prisma.data_prioritas.createMany({
      data: batch,
      skipDuplicates: true,
    });

    totalMasuk += result.count;

    console.log(`Batch ${i / batchSize + 1} berhasil: ${result.count} data`);
  }

  console.log(`Data Prioritas berhasil masuk total: ${totalMasuk} data`);
}


async function main() {
  console.log("Mulai seeding data...");

  await seedKodeReferensi();
  await seedSDS();
  await seedDataPrioritas();

  console.log("Seeding selesai.");
}

main()
  .catch((error) => {
    console.error("Seeding gagal:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });