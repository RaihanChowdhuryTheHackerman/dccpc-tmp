// src/app/(front)/notices/page.tsx
import NoticeTable from "@/components/tables/notice-table";
import { Fade } from "react-awesome-reveal";

export default function Page() {
    return (
        <div className="py-12 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <Fade direction="up" triggerOnce>
                    <div className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
                            <span className="relative inline-block">
                                Notices
                                <span className="absolute bottom-0 left-0 w-full h-1 bg-primary opacity-30 rounded-full"></span>
                            </span>
                        </h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Stay updated with all the latest announcements, events, and important information from the DCC Programming Club
                        </p>
                    </div>
                </Fade>

                <Fade direction="up" delay={300} triggerOnce>
                    <NoticeTable />
                </Fade>
            </div>
        </div>
    );
}