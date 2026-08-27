import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import XLSX from "xlsx";
import path from "path";

// Prisma otomatis membaca DATABASE_URL dari file .env (Supabase)
const prisma = new PrismaClient();


const excelPath = path.join(
  __dirname,
  "data",
  "Usulan Daftar Data.xlsx"
);


function clean(value: any) {
  if (value === undefined || value === null) {
    return null;
  }

  const result = String(value).trim();

  if (result === "" || result === "-") {
    return null;
  }

  return result;
}



async function seedDssd() {

  console.log("Mulai hapus data DSSD lama...");

  await prisma.dssd.deleteMany();

  console.log("Data DSSD lama berhasil dihapus");


  console.log("Membaca file Excel...");

  const workbook = XLSX.readFile(excelPath);


  console.log(
    "Sheet ditemukan:",
    workbook.SheetNames.length
  );


  let totalMasuk = 0;



  for (const sheetName of workbook.SheetNames) {


    console.log(`\nProses sheet: ${sheetName}`);


    const sheet = workbook.Sheets[sheetName];


    const rows: any[] =
    XLSX.utils.sheet_to_json(sheet, {
        defval: "",
    });

console.log("ROW PERTAMA:", rows[0]);
console.log("KEY ROW:", Object.keys(rows[0] ?? {}));


    const data = rows
      .map((row) => ({

        kode_dssd: clean(
          row["Kode DSSD"]
        ),

        uraian_dssd: clean(
          row["Uraian DSSD"]
        ),

        satuan: clean(
          row["Satuan"]
        ),

        definisi_operasional: clean(
          row["Definisi Operasional"]
        ),

        produsen_data: clean(
          row["Produsen Data"]
        ),

        sheet_asal: sheetName,

      }))
      .filter(
        (item) => item.kode_dssd
      );



    if (data.length === 0) {

      console.log(
        `Tidak ada data di ${sheetName}`
      );

      continue;

    }



    console.log(
      "Contoh:",
      data[0]
    );



    const batchSize = 100;


    for (
      let i = 0;
      i < data.length;
      i += batchSize
    ) {


      const batch =
        data.slice(
          i,
          i + batchSize
        );



      const result =
        await prisma.dssd.createMany({
          data: batch,
        });



      totalMasuk += result.count;



      console.log(
        `Batch ${
          i / batchSize + 1
        }: ${result.count} masuk`
      );

    }


  }



  console.log(
    `TOTAL DSSD MASUK: ${totalMasuk}`
  );

}




async function main() {

  console.log(
    "Mulai import DSSD..."
  );


  await seedDssd();


  console.log(
    "Import DSSD selesai"
  );

}



main()
  .catch((error)=>{

    console.error(
      "Seed DSSD gagal:",
      error
    );

    process.exit(1);

  })
  .finally(async()=>{

    await prisma.$disconnect();

  });