import Image from "next/image";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ReactNode} from "react";

export default function ImageCard({src, title, description, children}: {
    src: string,
    title: string,
    description: string,
    children?: ReactNode
}) {
    return (
        <Card className={'rounded-sm shadow-sm'}>
            <Image
                src={src}
                width={500}
                height={500}
                alt={title}/>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            {children}
        </Card>
    )
}