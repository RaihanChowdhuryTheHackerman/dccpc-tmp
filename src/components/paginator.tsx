'use client'

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import {Suspense, useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
function PaginatorComp({totalPages, url, callback}: { totalPages: number, url: string, callback: Function }) {
    const [page, setPage] = useState<number>(1);
    const searchParams = useSearchParams();

    useEffect(() => {
        setPage(() => {
            const curr = parseInt(searchParams.get('page') ?? '1');
            callback(curr);
            return curr;
        });
    }, [searchParams, callback]);

    return (
        <Pagination>
            <PaginationContent>
                {
                    page <= 1 ?
                        <PaginationPrevious href="#"/> :
                        <PaginationPrevious href={'?page=' + (page - 1)}/>
                }
                {Array.from({length: totalPages}).map((_, i) => (
                    <PaginationItem key={i}>
                        <PaginationLink isActive={page == i + 1}
                                        href={url + '?page=' + (i + 1)}>{i + 1}</PaginationLink>
                    </PaginationItem>
                ))}
                {
                    page >= totalPages ?
                        <PaginationNext href="#"/> :
                        <PaginationNext href={url + '?page=' + (page + 1)}/>
                }
            </PaginationContent>
        </Pagination>
    )
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export default function Paginator({dataCount, url, callback}: { dataCount: number, url: string, callback: Function }) {
    return (
        <Suspense>
            <PaginatorComp totalPages={Math.ceil(dataCount / 15)} url={url} callback={callback}/>
        </Suspense>
    )
}