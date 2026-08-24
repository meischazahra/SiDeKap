import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

type KodeReferensi = {
  kode_indikator: string;
  nama_indikator: string;
  definisi: string | null;
};

type TabelKodeReferensiProps = {
  data: KodeReferensi[];
};

export default function TabelKodeReferensi({
  data,
}: TabelKodeReferensiProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Kode Indikator
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Nama Indikator
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Definisi
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Aksi
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {data.length === 0 ? (
                <TableRow>
                  <TableCell className="px-5 py-4 text-center text-gray-500 text-theme-sm dark:text-gray-400">
                    Data belum tersedia.
                  </TableCell>
                  <TableCell className="px-5 py-4"></TableCell>
                  <TableCell className="px-5 py-4"></TableCell>
                  <TableCell className="px-5 py-4"></TableCell>
                </TableRow>
              ) : (
                data.map((item) => (
                  <TableRow key={item.kode_indikator}>
                    <TableCell className="px-5 py-4 sm:px-6 text-start text-gray-800 text-theme-sm dark:text-white/90">
                      {item.kode_indikator}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {item.nama_indikator}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {item.definisi ?? "-"}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-start">
                      <button className="rounded-lg bg-blue-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-600">
                        Detail
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}