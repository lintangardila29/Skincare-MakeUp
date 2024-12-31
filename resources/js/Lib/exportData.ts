import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import jsonAsXlsx from "json-as-xlsx";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { columnTitles } from "@/Constants/data";
import { Table } from "@tanstack/react-table";
import { formatDate } from "./utils";

export const exportData = <TData>(
    table: Table<TData>,
    title: string,
    fileType: "pdf" | "excel" | "csv",
    exportType: "all" | "selected" | "filtered"
) => {
    const originalRows =
        exportType === "selected"
            ? table.getSelectedRowModel()
            : exportType === "filtered"
            ? table.getFilteredRowModel()
            : table.getFilteredRowModel();

    const originalHeaders = table
        .getAllColumns()
        .filter(
            (column: any): any =>
                column.getIsVisible() &&
                column.id !== "select" &&
                column.id !== "actions_start" &&
                column.id !== "actions_end" &&
                column.id !== "user_avatar" &&
                column.id !== "image" &&
                column.id !== "logo"
        )
        .map((column: any): any => column.id);

    const head = originalHeaders.map((col: any): any => {
        return columnTitles.find((column) => column.id === col)?.title;
    });

    const rows = originalRows.rows.map((row: any, index: number) => {
        const rowData = row.original;
        const formatRow: { [key: string]: string } = {};
        formatRow["No"] = (index + 1).toString();
        originalHeaders.forEach((col: any) => {
            if (col === "user_name") formatRow["Nama"] = rowData.user.name;
            if (col === "product_name")
                formatRow["Product"] = rowData.product.name;
            if (col === "brand_name")
                formatRow["Brand"] = rowData.brand.name;
            if (col === "category_name")
                formatRow["Kategori"] = rowData.category.name;
            if (col === "created_at")
                formatRow["Tanggal Dibuat"] = formatDate(new Date(rowData.created_at));
            if (col === "name") formatRow["Nama"] = rowData.name;
            if (col === "product_count") formatRow["Jumlah Produk"] = rowData.product_count;
            if (col === "website") formatRow["Website"] = rowData.website;
            if (col === "price") formatRow["Harga"] = `IDR ${rowData.price}`;
            if (col === "description")
                formatRow["Deskripsi"] = rowData.description;
        });
        return formatRow;
    });

    const body = rows.map((row: any) => {
        row = Object.values(row);
        return row;
    });
    switch (fileType) {
        case "pdf":
            const doc = new jsPDF("l");

            doc.setFontSize(18);
            doc.text("SKINCARE - " + title, 14, 22);
            doc.setFontSize(11);
            doc.setTextColor(100);

            const columnCount = head.length - 1;
            const columnWidth = 200 / columnCount;
            const columnStyles: { [key: string]: { cellWidth: number } } = {};
            for (let i = 0; i < columnCount; i++) {
                if (i === 0) columnStyles[i] = { cellWidth: 10 };
                else columnStyles[i] = { cellWidth: columnWidth };
            }

            autoTable(doc, {
                head: [["No", ...head]],
                body: body,
                headStyles: {
                    halign: "center",
                    valign: "middle",
                    lineColor: [156, 163, 175],
                    lineWidth: 0.1,
                },
                bodyStyles: {
                    halign: "center",
                    valign: "middle",
                    lineColor: [156, 163, 175],
                    lineWidth: 0.1,
                },
                columnStyles: columnStyles,
                horizontalPageBreak: true,
                horizontalPageBreakRepeat: 0,
                startY: 30,
            });
            return doc.save("SKINCARE - " + title + ".pdf");
        case "csv":
            const csvConfig = mkConfig({
                fieldSeparator: ",",
                filename: "SKINCARE - " + title,
                useKeysAsHeaders: true,
            });
            const csv = generateCsv(csvConfig)(rows);
            return download(csvConfig)(csv);
        case "excel":
            const data = [
                {
                    sheet: "SKINCARE - " + title,
                    columns: head.map((col: any): any => {
                        return { label: col, value: col };
                    }),
                    content: rows,
                },
            ];
            const settings = {
                fileName: "SKINCARE - " + title,
            };

            return jsonAsXlsx(data, settings);
        default:
            break;
    }
};
