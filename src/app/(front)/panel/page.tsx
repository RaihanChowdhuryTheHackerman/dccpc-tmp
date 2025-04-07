'use client'

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Fade } from "react-awesome-reveal";
import { Facebook, Github, Linkedin, Users, AlertCircle } from "lucide-react";
import { CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImageCard from "@/components/image-card";

interface Member {
    id: number;
    name: string;
    image: string;
    designation: string;
    linkedin: string | null;
    github: string | null;
    facebook: string | null;
    category: string;
    category_display: string;
    ordering: number;
}


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const PANEL_ENDPOINT = `${API_BASE_URL}/club/panel-members/`;

const categories = [
    { key: 'panel', label: 'Panel Members' },
    { key: 'teachers', label: 'Teachers Advisory Panel' },
    { key: 'alumni', label: 'Alumni Advisory Panel' }
] as const;

type CategoryKey = typeof categories[number]['key'];

export default function PanelPage() {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState<CategoryKey>(categories[0].key);

    useEffect(() => {
        const fetchMembers = async () => {
            setLoading(true);
            setError(null);

            try {
                console.log(`Fetching members for category: ${activeCategory} from ${PANEL_ENDPOINT}?category=${activeCategory}`);
                const response = await fetch(`${PANEL_ENDPOINT}?category=${activeCategory}`);

                if (!response.ok) {
                    let errorBody = null;
                    try { errorBody = await response.json(); } catch (e) { console.log("Failed to parse error body:", e); }
                    console.error("API Error Response:", response.status, errorBody);
                    throw new Error(`Failed to fetch members: ${response.status} ${response.statusText}${errorBody?.detail ? ` - ${errorBody.detail}` : ''}`);
                }

                // Check for empty response body which can happen with 204 No Content
                const textData = await response.text();
                if (!textData) {
                     console.log("Received empty response body.");
                     setMembers([]); // Set to empty array if response is empty
                     setError(null); // Ensure no previous error is shown
                     return; // Exit early
                }

                const data = JSON.parse(textData); // Parse text data into JSON

                if (data && Array.isArray(data.results)) {
                    // Set members state with the results array
                    setMembers(data.results as Member[]);
                    setError(null); // Clear any previous error on success
                } else if (Array.isArray(data)) {
                     // Handle less common case where API returns just the array
                     console.warn("API returned a direct array, expected paginated object with 'results'. Processing array directly.");
                     setMembers(data as Member[]);
                     setError(null); // Clear any previous error on success
                 }
                else {
                    // Handle unexpected data structure
                    console.error("Unexpected API response structure. Expected object with 'results' array or a direct array. Received:", data);
                    throw new Error("Received unexpected data format from API.");
                }
                // --- END: Correction ---

            } catch (err) {
                console.error("Error in fetchMembers:", err);
                setError(err instanceof Error ? err.message : "An unknown error occurred during fetching.");
                setMembers([]); // Clear members on error
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, [activeCategory]); // Re-fetch when activeCategory changes

    // --- Helper Components ---

    const SocialLink = ({ href, label, Icon, available }: { href: string | null, label: string, Icon: React.ElementType, available: boolean }) => (
        <Link
            href={href || '#'}
            target={available ? "_blank" : "_self"}
            rel={available ? "noopener noreferrer" : undefined}
            onClick={(e) => !available && e.preventDefault()}
            className={`p-2 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                available
                    ? "bg-primary/10 text-primary hover:bg-primary hover:text-white"
                    : "bg-gray-100 text-gray-400 cursor-default opacity-60"
            }`}
            aria-label={`${label}${!available ? ' (Not Available)' : ''}`}
            aria-disabled={!available}
            tabIndex={!available ? -1 : 0} // Prevent tabbing to disabled links
        >
            <Icon className="h-5 w-5" />
        </Link>
    );

    // --- Render Logic ---

    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex justify-center items-center py-20 min-h-[300px]">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span className="sr-only">Loading members...</span>
                </div>
            );
        }

        // Display error message IF error state is set
        if (error) {
            return (
                <div className="flex flex-col items-center justify-center text-center py-16 min-h-[300px] bg-red-50 border border-red-200 rounded-lg px-4">
                    <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                    <p className="text-red-700 font-medium mb-2">Failed to load members</p>
                    <p className="text-red-600 text-sm">{error}</p>
                </div>
            );
        }

        // Display 'No members found' only if NOT loading and NO error and members array IS empty
        if (!loading && !error && members.length === 0) {
            return (
                <div className="text-center py-16 min-h-[300px]">
                    <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No members found in the &quot;{categories.find(c => c.key === activeCategory)?.label}&quot; category.</p>
                </div>
            );
        }

        // Render the grid only if NOT loading, NO error, and members array HAS items
        if (members.length > 0) {
            return (
                <Fade cascade damping={0.05} triggerOnce={true}>
                    <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {members.map((member) => (
                            <ImageCard
                                key={member.id}
                                src={member.image}
                                alt={`Photo of ${member.name}`} // Important for accessibility
                                title={member.name}
                                description={member.designation}
                            >
                                <CardFooter className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0 flex justify-start gap-3 sm:gap-4">
                                    <SocialLink href={member.linkedin} label={`LinkedIn profile of ${member.name}`} Icon={Linkedin} available={!!member.linkedin} />
                                    <SocialLink href={member.github} label={`GitHub profile of ${member.name}`} Icon={Github} available={!!member.github} />
                                    <SocialLink href={member.facebook} label={`Facebook profile of ${member.name}`} Icon={Facebook} available={!!member.facebook} />
                                </CardFooter>
                            </ImageCard>
                        ))}
                    </div>
                </Fade>
            );
        }

        return null;
    };

    return (
        <div className="py-12 md:py-20 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header Section */}
                <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
                    <span className="inline-flex items-center bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
                        <Users className="w-4 h-4 mr-2" />
                        <span>Our Team</span>
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 tracking-tight">
                        Meet Our <span className="text-primary">Team</span>
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
                        Our dedicated panels guide the DCC Programming Club, fostering innovation and growth. Explore the members of each advisory group.
                    </p>
                </div>

                {/* Tabs Navigation */}
                <Tabs value={activeCategory} onValueChange={(value) => setActiveCategory(value as CategoryKey)} className="mb-8 md:mb-12">
                    <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-1 sm:grid-cols-3 h-auto sm:h-11 shadow-sm">
                        {categories.map((cat) => (
                            <TabsTrigger
                                key={cat.key}
                                value={cat.key}
                                className="whitespace-normal sm:whitespace-nowrap text-xs sm:text-sm py-2.5 sm:py-1.5 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md rounded-md sm:rounded-none sm:first:rounded-l-md sm:last:rounded-r-md transition-all duration-200"
                                disabled={loading}
                            >
                                {cat.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>

                {/* Content Display Area */}
                <div className="mt-8 md:mt-10">
                    {renderContent()}
                </div>

            </div>
        </div>
    );
}