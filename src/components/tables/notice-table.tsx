'use client'

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {ColumnDef, getCoreRowModel} from "@tanstack/table-core";
import {Notice} from "@/lib/types";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {DownloadIcon, RefreshCw, ViewIcon} from "lucide-react";
import {formatDate} from "@/lib/utils";
import {useEffect, useState} from "react";
import {flexRender, useReactTable} from "@tanstack/react-table";
import {Card} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";

export const columns: ColumnDef<Notice>[] = [
    {
        accessorKey: "title",
        header: "Title",
        enableSorting: true,
    },
    {
        accessorKey: "file",
        header: "File",
        cell: ({row}) => {
            return row.original.file ? (
                <Button asChild={true} variant={'link'}>
                    <Link href={row.original.file} download={true}>
                        <DownloadIcon/>
                    </Link>
                </Button>
            ) : <p>N/A</p>
        }
    },
    {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({row}) => {
            return formatDate(row.original.created_at);
        }
    },
    {
        accessorKey: "action",
        header: "Action",
        cell: ({row}) => (
            <div className={'text-right'}>
                <NoticeModal notice={row.original}/>
            </div>
        )
    }
];

const NoticeModal = ({notice}: { notice: Notice }) => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={'ghost'} size="sm">
                    <ViewIcon/>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{notice.title}</DialogTitle>
                    <DialogDescription>
                        <span className="mt-2">{notice.details}</span>
                        {notice.file && (
                            <span className="mt-2">
                                <a href={notice.file} target="_blank" rel="noopener noreferrer"
                                   className="text-blue-500 underline">
                                    Download File
                                </a>
                            </span>
                        )}
                    </DialogDescription>
                    <DialogFooter>
                        <span className="text-gray-500 text-sm mt-2">Created
                            at: {formatDate(notice.created_at)}</span>
                    </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

interface Result {
    next: string | null;
    previous: string | null;
    count: number;
    results: Notice[]
}

export default function NoticeTable() {
    const [data, setData] = useState<Notice[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const pageSize = 15;

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/club/notices/?page=${page}`);

            if (res.ok) {
                const result = await res.json() as Result;

                setData(result.results);
                setTotal(result.count);
            }
        };

        fetchData().finally(() => setLoading(false));
    }, [page]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true
    });

    return (
        <Card className={'p-4 rounded-md'}>
            <div className="">
                <Table className={'w-full'}>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            className={header.column.id === "action" ? "text-right" : header.column.id === "created_at" ? "max-w-xs" : ""}
                                            key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="p-6">
                                    <div className="flex justify-center">
                                        {loading ? <RefreshCw className={'animate-spin'}/> : 'No results.'}
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {(total > 0) && <div className="flex items-center justify-end space-x-2 py-4">
                <Button variant={'outline'} onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
                    Previous
                </Button>
                <span>Page {page} of {Math.ceil(total / pageSize)}</span>
                <Button variant={'outline'} onClick={() => setPage((p) => (p < Math.ceil(total / pageSize) ? p + 1 : p))}
                        disabled={page * pageSize >= total}>
                    Next
                </Button>
            </div>}
        </Card>
    );
}