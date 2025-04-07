'use client'

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {ColumnDef, getCoreRowModel} from "@tanstack/table-core";
import {Notice} from "@/lib/types";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {DownloadCloud, FileText, RefreshCw, EyeIcon, MoreVertical, Calendar} from "lucide-react";
import {formatDate} from "@/lib/utils";
import {useEffect, useState} from "react";
import {flexRender, useReactTable} from "@tanstack/react-table";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export const columns: ColumnDef<Notice>[] = [
    {
        accessorKey: "title",
        header: "Title",
        cell: ({row}) => (
            <div className="flex items-center gap-3 max-w-[250px] truncate">
                <FileText className="w-5 h-5 text-primary/70 flex-shrink-0" />
                <span className="font-medium truncate text-sm">{row.original.title}</span>
            </div>
        ),
        enableSorting: true,
    },
    {
        accessorKey: "action",
        header: "Actions",
        cell: ({row}) => (
            <div className="flex justify-end">
                <NoticeActions notice={row.original} />
            </div>
        )
    }
];

const NoticeActions = ({notice}: { notice: Notice }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                    <MoreVertical className="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[250px]">
                {/* View Details */}
                <NoticeModal notice={notice}>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <EyeIcon className="w-4 h-4 mr-2" /> View Details
                    </DropdownMenuItem>
                </NoticeModal>

                {/* Attachment Download */}
                {notice.file && (
                    <DropdownMenuItem asChild>
                        <Link 
                            href={notice.file} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            download
                            className="flex items-center"
                        >
                            <DownloadCloud className="w-4 h-4 mr-2" /> Download Attachment
                        </Link>
                    </DropdownMenuItem>
                )}

                {/* Date Information */}
                <DropdownMenuItem disabled className="text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" /> 
                    Published: {formatDate(notice.created_at)}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const NoticeModal = ({notice, children}: { notice: Notice, children?: React.ReactNode }) => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children || (
                    <Button variant="outline" size="sm" className="hover:bg-primary/10 border-primary/30">
                        <EyeIcon className="w-4 h-4 mr-2" /> View Details
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-md sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-primary flex items-center gap-3">
                        <FileText className="w-6 h-6" />
                        <span className="truncate">{notice.title}</span>
                    </DialogTitle>
                    <div className="mt-2 space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <div className="text-gray-700 text-sm">
                                {notice.details || 'No additional details provided.'}
                            </div>
                        </div>
                        {notice.file && (
                            <div className="flex items-center justify-between bg-primary/5 p-3 rounded-lg border border-primary/10">
                                <div className="flex items-center gap-3">
                                    <DownloadCloud className="w-5 h-5 text-primary" />
                                    <span className="text-xs text-gray-700">Attachment Available</span>
                                </div>
                                <Button 
                                    asChild 
                                    size="sm" 
                                    variant="outline" 
                                    className="border-primary/50 hover:bg-primary/10"
                                >
                                    <Link 
                                        href={notice.file} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        download
                                    >
                                        Download
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="mt-4 text-right">
                        <span className="text-xs text-muted-foreground">
                            Published: {formatDate(notice.created_at)}
                        </span>
                    </div>
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
        <Card className="rounded-xl shadow-lg border-none">
            <CardHeader className="p-4 pb-0">
                <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary" />
                        <span className="text-base">Club Notices</span>
                    </div>
                    {total > 0 && (
                        <Badge variant="secondary" className="text-xs">
                            Total: {total}
                        </Badge>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-2">
                <div className="w-full overflow-x-auto">
                    <Table className="w-full">
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead
                                            key={header.id}
                                            className={`
                                                ${header.column.id === "action" ? "text-right w-16" : ""}
                                                ${header.column.id === "created_at" ? "w-24" : ""}
                                                text-muted-foreground font-medium text-xs
                                            `}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow 
                                        key={row.id} 
                                        className="hover:bg-primary/5 transition-colors"
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id} className="py-2">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="p-4 text-center">
                                        <div className="flex flex-col items-center justify-center space-y-4">
                                            {loading ? (
                                                <RefreshCw className="animate-spin text-primary w-6 h-6" />
                                            ) : (
                                                <>
                                                    <FileText className="w-8 h-8 text-muted-foreground" />
                                                    <p className="text-muted-foreground text-sm">No notices available</p>
                                                </>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {(total > 0) && (
                    <div className="flex items-center justify-between mt-4 px-2">
                        <div className="text-xs text-muted-foreground">
                            Page {page} of {Math.ceil(total / pageSize)}
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setPage((p) => Math.max(p - 1, 1))} 
                                disabled={page === 1}
                                className="hover:bg-primary/10 h-8 text-xs"
                            >
                                Previous
                            </Button>
                            <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setPage((p) => (p < Math.ceil(total / pageSize) ? p + 1 : p))}
                                disabled={page * pageSize >= total}
                                className="hover:bg-primary/10 h-8 text-xs"
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}