export interface Image {
    id: number;
    title: string;
    image: string;
    created_at: string;
    updated_at: string;
}

export interface Result {
    next: string | null;
    previous: string | null;
    count: number;
    results: Image[];
}

export interface Notice {
    id: number;
    title: string;
    details: string;
    file: string;
    created_at: string;
}