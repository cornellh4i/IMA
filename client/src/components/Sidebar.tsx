import * as React from "react";
import "../styles/Sidebar.css";
import { useEffect, useRef, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ChevronRight, User, Star, LogOut } from "lucide-react";
import { Alumni, transformSupabaseAlumni } from "../types/member.ts";
import { supabase, supabaseHelpers } from "../lib/supabaseClient.ts";
import { useNavigate } from "react-router-dom";
// @ts-ignore - image modules declared in custom.d.ts
import imaLogo from "../assets/ima_h4i.png";

interface SidebarProps {
    alumni: Alumni[];
    setAlumni: (alumni: any) => void;
}

type CategoryKeys = "major" | "year" | "location" | "role" | "chapter" | "interests";

//defining the categories and subcategories: hardcoded values
const categories: Record<CategoryKeys, string[]> = {
    interests: [
        "Product Design",
        "Software Engineering",
        "Product Management",
        "Data Science",
        "Research",
        "AI",
        "ML",
    ],
    major: [
        "Computer Science",
        "Information Science",
        "Economics",
        "Electrical and Computer Engineering",
        "Other",
    ],
    year: ["2028", "2027", "2026", "2025", "2024", "Other"],
    location: ["San Francisco", "New York City", "Chicago", "Austin", "Other"],
    role: ["Developer", "Designer", "PM", "Tech Lead", "Engineering Chair", "Co-Director", "Maintenance Lead", "DEI Lead", "Community Lead", "NME Instructor", "Design Lead"],
    chapter: ["Boston University", "Cal Poly, San Luis Obispo", "Carleton College", "Cornell University", "Drexel University", "Emory University", "Georgia Tech", "McGill University", "Rutgers University, New Brunswick", "University of Illinois, Urbana-Champaign", "University of Maryland, College Park", "University of Pennsylvania", "University of Tennessee, Knoxville"],
};

const Sidebar: React.FC<SidebarProps> = ({ setAlumni }) => {
    const navigate = useNavigate();
    //state to keep track of categories
    const [openCategories, setOpenCategories] = useState<
        Record<CategoryKeys, boolean>
    >({
        interests: false,
        major: false,
        year: false,
        location: false,
        role: false,
        chapter: false
    });
    const [openKeywords, setOpenKeywords] = useState<boolean>(true);

    //states for the checkboxes
    const [checkedState, setCheckedState] = useState<
        Record<CategoryKeys, Record<string, boolean>>
    >({
        interests: {},
        major: {},
        year: {},
        location: {},
        role: {},
        chapter: {}
    });

    //function to toggle the categories
    const toggleCategories = (
        category: CategoryKeys,
        event: React.MouseEvent,
    ) => {
        event.nativeEvent.stopImmediatePropagation();

        setOpenCategories((prevOpenCategories) => ({
            ...prevOpenCategories,
            [category]: !prevOpenCategories[category],
        }));
    };

    const applyFiltersFromState = async (
        state: Record<CategoryKeys, Record<string, boolean>>,
    ) => {
        const query = Object.entries(state).reduce<Record<string, string[]>>(
            (acc, [category, values]) => {
                const checkedItems = Object.entries(values)
                    .filter(([_, isChecked]) => isChecked)
                    .map(([key]) => key);
                if (checkedItems.length) acc[category] = checkedItems;
                return acc;
            },
            {},
        );

        try {
            // If no filters selected, get all alumni
            if (Object.keys(query).length === 0) {
                const supabaseAlumni = await supabaseHelpers.getAlumni();
                const transformedAlumni = supabaseAlumni.map((row: any) =>
                    transformSupabaseAlumni(row),
                );
                setAlumni(transformedAlumni);
            } else {
                const supabaseAlumni = await supabaseHelpers.filterAlumni(query);
                const transformedAlumni = supabaseAlumni.map((row: any) =>
                    transformSupabaseAlumni(row),
                );
                setAlumni(transformedAlumni);
            }
        } catch (err) {
            console.error("Failed to filter alumni:", err);
        }
    };

    // function to toggle checkbox states
    const toggleCheckBoxChange = (
        category: CategoryKeys,
        value: string,
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        event.nativeEvent.stopImmediatePropagation();

        setCheckedState((prev) => {
            const newCheckedState = {
                ...prev,
                [category]: {
                    ...prev[category],
                    [value]: !prev[category][value],
                },
            };

            applyFiltersFromState(newCheckedState);
            return newCheckedState;
        });
    };

    // chips derived from checkedState
    const keywordChips = React.useMemo(() => {
        const chips: { category: CategoryKeys; value: string }[] = [];
        (Object.keys(checkedState) as CategoryKeys[]).forEach((cat) => {
            Object.entries(checkedState[cat]).forEach(([val, isChecked]) => {
                if (isChecked) chips.push({ category: cat, value: val });
            });
        });
        return chips;
    }, [checkedState]);

    const removeChip = (category: CategoryKeys, value: string) => {
        setCheckedState((prev) => {
            const newCheckedState = {
                ...prev,
                [category]: {
                    ...prev[category],
                    [value]: false,
                },
            };
            applyFiltersFromState(newCheckedState);
            return newCheckedState;
        });
    };

    const [user, setUser] = useState<any>(null);
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
        });
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });
        return () => subscription.unsubscribe();
    }, []);

    const [profileOpen, setProfileOpen] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [popoverRef]);

    return (
        <div className="sidebar">
            <img src={imaLogo} alt="IMA Logo" className="imaLogo" />
            <h3 className="filterTitle">Filter</h3>
            {/* Keywords as first section under Filter */}
            <div className="component">
                <div
                    className="filterRow"
                    onClick={() => setOpenKeywords(!openKeywords)}
                >
                    <h2>Keywords</h2>
                    <ChevronRight className={openKeywords ? "open" : ""} />
                </div>
                {openKeywords && (
                    <div className="chipsContainer">
                        {keywordChips.length === 0 && (
                            <div style={{ color: "#6b7280", fontSize: 14, paddingBottom: 8 }}>
                                No keywords selected
                            </div>
                        )}
                        {keywordChips.map(({ category, value }) => (
                            <button
                                key={`${category}:${value}`}
                                className="chip"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeChip(category, value);
                                }}
                                aria-label={`Remove ${value}`}
                            >
                                <span className="chipLabel">{value}</span>
                                <span className="chipClose">×</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
            {Object.entries(categories).map(([key, values]) => {
                const categoryKey = key as CategoryKeys;
                return (
                    <div key={categoryKey} className="component">
                        <div className="filterRow">
                            <h2>
                                {categoryKey === "interests"
                                    ? "Professional Interests"
                                    : categoryKey.charAt(0).toUpperCase() +
                                    categoryKey.slice(1).replace("Year", " Year")}
                            </h2>
                            <ChevronRight
                                className={openCategories[categoryKey] ? "open" : ""}
                                onClick={(e) => toggleCategories(categoryKey, e)}
                            />
                        </div>

                        {openCategories[categoryKey] && (
                            <FormGroup className="dropdown">
                                {values.map((value, index) => (
                                    <FormControlLabel
                                        key={index}
                                        control={
                                            <Checkbox
                                                checked={!!checkedState[categoryKey][value]}
                                                onChange={(e) =>
                                                    toggleCheckBoxChange(categoryKey, value, e)
                                                }
                                                name={value}
                                            />
                                        }
                                        label={value}
                                    />
                                ))}
                            </FormGroup>
                        )}
                    </div>
                );
            })}
            <div className="profile-bar" ref={popoverRef} onClick={() => setProfileOpen(!profileOpen)}>
                <div className="avatar avatar-small">
                    {(() => {
                        const name = user?.user_metadata?.full_name;
                        if (name) {
                            const parts = name.trim().split(" ");
                            return parts.length >= 2
                                ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
                                : parts[0][0].toUpperCase();
                        }
                        return user?.email?.charAt(0).toUpperCase() ?? "?";
                    })()}
                </div>
                <span className="profile-bar-name">{user?.user_metadata?.full_name ?? user?.email}</span>

                {profileOpen && (
                    <div className="popover">
                        <div className="popover-header">
                            <div className="avatar avatar-large">
                                {(() => {
                                    const name = user?.user_metadata?.full_name;
                                    if (name) {
                                        const parts = name.trim().split(" ");
                                        return parts.length >= 2
                                            ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
                                            : parts[0][0].toUpperCase();
                                    }
                                    return user?.email?.charAt(0).toUpperCase() ?? "?";
                                })()}
                            </div>
                            <span className="popover-name">{user?.user_metadata?.full_name}</span>
                            <span className="popover-email">{user?.email}</span>
                        </div>
                        <hr className="popover-divider" />
                        <button className="popover-button">
                            <User size={18} /> Profile
                        </button>
                        <button className="popover-button" onClick={(e) => { e.stopPropagation(); navigate("/saved"); setProfileOpen(false); }}>
                            <Star size={18} /> Saved
                        </button>
                        <hr className="popover-divider" />
                        <button className="popover-button" onClick={async (e) => { e.stopPropagation(); await supabase.auth.signOut(); navigate("/"); }}>
                            <LogOut size={18} /> Log out
                        </button>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Sidebar;
