"use client";

import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useSearchParams } from "next/navigation";

import Pagination from "./Pagination";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";


type Column = {
  key: string;
  label: string;
  width?: string;
  render?: (
    value: any,
    row: Record<string, any>
  ) => React.ReactNode;
};


type GenericTableProps = {
  columns: Column[];
  data: Record<string, any>[];
};



export default function GenericTable({
  columns,
  data,
}: GenericTableProps) {


  const searchParams = useSearchParams();

  const urlSearch =
    searchParams.get("q") ?? "";


  const [search, setSearch] =
    useState(urlSearch);

  const [pageSize, setPageSize] =
    useState(10);

  const [currentPage, setCurrentPage] =
    useState(1);



  useEffect(() => {

    setSearch(urlSearch);
    setCurrentPage(1);

  }, [urlSearch]);




  const filteredData = useMemo(() => {

    const keyword =
      search.toLowerCase().trim();


    if (!keyword) {
      return data;
    }


    return data.filter((row) =>
      columns.some((column) => {

        if (column.key === "aksi") {
          return false;
        }


        return String(
          row[column.key] ?? ""
        )
          .toLowerCase()
          .includes(keyword);

      })
    );


  }, [
    search,
    data,
    columns,
  ]);





  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredData.length / pageSize
    )
  );




  useEffect(() => {

    setCurrentPage(1);

  }, [
    search,
    pageSize,
  ]);




  useEffect(() => {

    if (
      currentPage > totalPages
    ) {
      setCurrentPage(totalPages);
    }

  }, [
    currentPage,
    totalPages,
  ]);





  const paginatedData = useMemo(() => {

    const start =
      (currentPage - 1) * pageSize;


    return filteredData.slice(
      start,
      start + pageSize
    );


  }, [
    filteredData,
    currentPage,
    pageSize,
  ]);





  const defaultColumnWidth =
    "220px";



  const getColumnWidthNumber = (
    width?: string
  ) => {

    const parsedWidth =
      Number(
        (
          width ??
          defaultColumnWidth
        )
          .replace("px", "")
      );


    return Number.isNaN(parsedWidth)
      ? 220
      : parsedWidth;

  };





  const tableMinWidth =
    columns
      .map((column) =>
        getColumnWidthNumber(
          column.width
        )
      )
      .reduce(
        (total, width) =>
          total + width,
        0
      );





  const startEntry =
    filteredData.length === 0
      ? 0
      : (currentPage - 1) *
          pageSize +
        1;



  const endEntry =
    Math.min(
      currentPage * pageSize,
      filteredData.length
    );





  return (

    <div
      className="
        overflow-hidden
        rounded-xl
        border
        border-gray-200
        bg-white
        dark:border-white/[0.05]
        dark:bg-white/[0.03]
      "
    >


      {/* SEARCH HEADER */}

      <div
        className="
          flex
          flex-col
          gap-3
          p-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >

        <div
          className="
            flex
            items-center
            gap-2
            text-sm
            text-gray-600
            dark:text-gray-400
          "
        >

          <span>
            Menampilkan
          </span>


          <select
            value={pageSize}
            onChange={(e) =>
              setPageSize(
                Number(
                  e.target.value
                )
              )
            }
            className="
              rounded-lg
              border
              border-gray-300
              bg-white
              px-2
              py-1
              text-gray-700
              dark:border-gray-700
              dark:bg-gray-900
              dark:text-gray-300
            "
          >

            <option value={10}>
              10
            </option>

            <option value={25}>
              25
            </option>

            <option value={50}>
              50
            </option>

            <option value={100}>
              100
            </option>

          </select>


          <span>
            data
          </span>

        </div>




        <input

          type="text"

          placeholder="Cari..."

          value={search}

          onChange={(e) => {

            setSearch(
              e.target.value
            );

            setCurrentPage(1);

          }}

          className="
            w-full
            rounded-lg
            border
            border-gray-300
            bg-white
            px-3
            py-2
            text-sm
            text-gray-700
            outline-none
            focus:border-blue-500
            dark:border-gray-700
            dark:bg-gray-900
            dark:text-gray-300
            sm:w-72
          "

        />


      </div>





      {/* DESKTOP TABLE */}

      <div
        className="
          hidden
          w-full
          md:block
        "
      >

        <div
          className="
            w-full
            overflow-x-auto
            border-t
            border-gray-200
            dark:border-white/[0.05]
          "
        >


          <Table

            className="
              table-fixed
              bg-white
              dark:bg-transparent
            "

            style={{

              minWidth:
                `${tableMinWidth}px`,

              tableLayout:
                "fixed",

            }}

          >



            <colgroup>

              {columns.map(
                (column) => (

                  <col

                    key={
                      column.key
                    }

                    style={{

                      width:
                        column.width ??
                        `${100 / columns.length}%`

                    }}

                  />

                )
              )}

            </colgroup>





            <TableHeader
              className="
                border-b
                border-gray-100
                dark:border-white/[0.05]
              "
            >

              <TableRow>


                {columns.map(
                  (column) => (

                    <TableCell

                      key={
                        column.key
                      }

                      isHeader

                      className="
                        px-5
                        py-3
                        text-start
                        text-theme-xs
                        font-medium
                        text-gray-500
                        dark:text-gray-400
                      "

                    >

                      <div
                        className="
                          truncate
                        "
                      >

                        {column.label}

                      </div>


                    </TableCell>

                  )
                )}


              </TableRow>


            </TableHeader>





            <TableBody
              className="
                divide-y
                divide-gray-100
                dark:divide-white/[0.05]
              "
            >


              {
                paginatedData.length === 0 ? (

                  <TableRow>

                    <TableCell

                      colSpan={
                        columns.length
                      }

                      className="
                        px-5
                        py-6
                        text-center
                        text-gray-500
                        dark:text-gray-400
                      "

                    >

                      Data tidak ditemukan.

                    </TableCell>


                  </TableRow>


                ) : (


                  paginatedData.map(
                    (row,index)=>(

                      <TableRow
                        key={index}
                      >


                        {columns.map(
                          (column)=>(

                            <TableCell

                              key={
                                column.key
                              }

                              className="
                                px-5
                                py-4
                                align-top
                                text-theme-sm
                                text-gray-500
                                dark:text-gray-400
                              "

                            >


                              {
                                column.render
                                ?

                                column.render(
                                  row[column.key],
                                  row
                                )

                                :

                                <div
                                  className="
                                    line-clamp-3
                                    break-words
                                    [overflow-wrap:anywhere]
                                  "
                                >

                                  {
                                    row[column.key]
                                    ??
                                    "-"
                                  }

                                </div>

                              }


                            </TableCell>


                          )
                        )}


                      </TableRow>


                    )
                  )


                )
              }



            </TableBody>



          </Table>


        </div>


      </div>





      {/* MOBILE */}

      <div
        className="
          space-y-3
          p-4
          md:hidden
        "
      >

        {
          paginatedData.map(
            (row,index)=>(

              <div

                key={index}

                className="
                  rounded-lg
                  border
                  border-gray-200
                  p-4
                  dark:border-white/[0.05]
                "

              >

                {
                  columns.map(
                    (column)=>(

                      <div
                        key={
                          column.key
                        }
                        className="
                          mb-3
                        "
                      >

                        <p
                          className="
                            text-xs
                            font-medium
                            text-gray-500
                            dark:text-gray-400
                          "
                        >

                          {column.label}

                        </p>


                        <div
                          className="
                            text-sm
                            text-gray-800
                            dark:text-white/90
                          "
                        >

                          {
                            column.render
                            ?

                            column.render(
                              row[column.key],
                              row
                            )

                            :

                            row[column.key]
                            ??
                            "-"

                          }

                        </div>


                      </div>

                    )
                  )
                }


              </div>

            )
          )
        }


      </div>





      {/* PAGINATION */}

      <div
        className="
          flex
          flex-col
          gap-3
          border-t
          border-gray-200
          p-4
          dark:border-white/[0.05]
          md:flex-row
          md:items-center
          md:justify-between
        "
      >

        <span
          className="
            text-sm
            text-gray-500
            dark:text-gray-400
          "
        >

          Menampilkan {startEntry}-{endEntry}
          {" "}
          dari {filteredData.length} data

        </span>



        <Pagination

          currentPage={
            currentPage
          }

          totalPages={
            totalPages
          }

          onPageChange={
            setCurrentPage
          }

        />


      </div>



    </div>

  );

}