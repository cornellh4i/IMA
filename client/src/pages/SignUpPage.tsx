import React, { useEffect, useState } from "react";
import { supabase, supabaseHelpers } from "../lib/supabaseClient.ts";
import type { Session } from "@supabase/supabase-js";

import Header from "../components/HeaderIMA.tsx";
import "../App.css";
import "../styles/SignUpPage.css";

// Enums for major, hack role, project, semester, and employment type
const majors = [
  "Information Science",
  "Computer Science",
  "Electrical and Computer Engineering",
  "Mechanical Engineering",
  "Operations Research and Engineering",
  "Business",
  "Economics",
  "Other",
];
const hackRoles = [
  "Designer",
  "PM",
  "Developer",
  "Tech Lead",
  "Design Lead",
  "Engineering Chair",
  "DEI Lead",
  "Maintenance Lead",
  "NME Instructor",
];
const projects = [
  "MedSimAI",
  "OKB Hope",
  "Rethink Food",
  "Greenzone",
  "IMA",
  "ACT",
  "CHEM",
  "Recovery",
  "Lagos",
  "MedExplain",
];
const semesters = [
  "Spring '22",
  "Fall '22",
  "Spring '23",
  "Fall '23",
  "Spring '24",
  "Fall '24",
  "Spring '25",
  "Fall '25",
];

const employmentTypes = [
  "Full-time",
  "Part-time",
  "Intern",
  "Contract",
  "Freelance",
];

const monthEnum = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const FormInput: React.FC<{
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  id?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, type, required, placeholder, id, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="text-sm text-gray-600 font-semibold">{`${label}${
        required ? "*" : ""
      }`}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full mt-1 px-2 py-1 border border-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

const SignUpPage: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [responses, setResponses] = useState<{ [key: string]: string }>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    graduationYear: "",
    linkedin: "",
    instagram: "",
  });

  // Alumni object to be inserted once bio is done
  const [alumniData, setAlumniData] = useState<{
    full_name: string | null;
    emails: string[] | null;
    phone: string | null;
    linkedin_url: string | null;
    instagram_url: string | null;
    graduation_year: number | null;
    major: string | null;
    location: string | null;
    skills: string[] | null;
    interests: string[] | null;
    bio: string | null;
  }>({
    full_name: null,
    emails: null,
    phone: null,
    linkedin_url: null,
    instagram_url: null,
    graduation_year: null,
    major: null,
    location: null,
    skills: null,
    interests: null,
    bio: null,
  });
  
  const [step, setStep] = useState<
    "basic" | "picture" | "academic" | "involvement" | "job" | "more" | "end"
  >("basic");
  const [validationError, setValidationError] = useState("");
  const [selectedMajors, setSelectedMajors] = useState<string[]>([]);
  const [roles, setRoles] = useState<
    {
      selectedRoles: string[];
      selectedProjects: string[];
      startSemester: string;
      endSemester: string;
      description: string;
    }[]
  >([
    {
      selectedRoles: [],
      selectedProjects: [],
      startSemester: "",
      endSemester: "",
      description: "",
    },
  ]);
  const [jobExperiences, setJobExperiences] = useState<{
    title: string;
    employmmentType: string | null;
    company: string;
    location: string | null;
    startMonth: string | null;
    startYear: number | null;
    endMonth: string | null;
    endYear: number | null;
    description: string | null;
  }[]>([
    {
      title: "",
      employmmentType: null,
      company: "",
      location: null,
      startMonth: null,
      startYear: null,
      endMonth: null,
      endYear: null,
      description: null,
    }
  ]);

  function validateJobExperiences() {
    return jobExperiences.every(job => {
      return job.title && job.employmmentType && job.company && job.startMonth && job.startYear && job.endMonth && job.endYear;
    });
  }

  const addRole = () => {
    setRoles([
      ...roles,
      {
        selectedRoles: [],
        selectedProjects: [],
        startSemester: "",
        endSemester: "",
        description: "",
      },
    ]);
  };

  const removeRole = (index: number) => {
    setRoles(roles.filter((_, i) => i !== index));
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function insertAlumniData() {
    // Insert data into Alumni table
    const result = await supabaseHelpers.insertAlumni(alumniData);
    if (result.error) {
      throw new Error(`Failed to insert alumni: ${result.error.message}`);
    }

    const alumniId = result.data?.id;
    
    // Insert data into Job Experiences table
    const jobExperiencesResult = await supabaseHelpers.insertJobExperience(alumniId, jobExperiences);

    // Insert data into Hack Involvements table
    const hackInvolvementsResult = await supabaseHelpers.insertHackInvolvement(alumniId, roles);

    if (result.error || jobExperiencesResult.length === 0 || hackInvolvementsResult.length === 0) {
      throw new Error(`Failed to insert data: ${result.error?.message || jobExperiencesResult.length === 0 ? 'Failed to insert job experiences' : 'Failed to insert hack involvements'}`);
    }

    return {
      alumni: result.data,
      jobExperiences: jobExperiencesResult,
      hackInvolvements: hackInvolvementsResult,
    };
  }

  return (
    <>
      <div className="w-screen h-screen bg-gray-100">
        <Header onAddMemberClick={() => {}} />
        <div className="container mx-auto">
          {step === "basic" && (
            <>
              <div className="text-center mt-8 text-3xl font-bold text-blue-900">
                Welcome, tell us who you are
              </div>
              <div className="mx-auto w-2/5 mt-4 rounded-xl bg-gray-300 h-2">
                <div className="w-1/6 h-full bg-blue-700 rounded-xl"></div>
              </div>
              <div className="text-center mt-4 text-gray-500">
                This will be the name displayed on your profile across the
                platform.
              </div>
              <div className="flex justify-center mt-8 w-2/5 bg-white mx-auto rounded-lg p-4 shadow-md">
                <div className="w-full">
                  <FormInput
                    label="First Name"
                    type="text"
                    required
                    value={responses.firstName}
                    onChange={(e) =>
                      setResponses({ ...responses, firstName: e.target.value })
                    }
                  />
                  <FormInput
                    label="Last Name"
                    type="text"
                    required
                    value={responses.lastName}
                    onChange={(e) =>
                      setResponses({ ...responses, lastName: e.target.value })
                    }
                  />
                  <FormInput
                    label="Email"
                    type="email"
                    required
                    value={responses.email}
                    onChange={(e) =>
                      setResponses({ ...responses, email: e.target.value })
                    }
                  />
                  <FormInput
                    label="Phone"
                    type="phone"
                    value={responses.phone}
                    onChange={(e) =>
                      setResponses({ ...responses, phone: e.target.value })
                    }
                  />
                  {validationError && (
                    <div className="text-red-600 text-sm mt-2">
                      {validationError}
                    </div>
                  )}
                  <button
                    onClick={() => {
                      if (
                        !responses.firstName ||
                        !responses.lastName ||
                        !responses.email
                      ) {
                        setValidationError(
                          "Must answer all required questions"
                        );
                        return;
                      }
                      setValidationError("");
                      setStep("academic");
                    }}
                    className="w-full bg-blue-900 mt-4 text-white py-2 rounded-3xl hover:bg-blue-800 transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </>
          )}

          {step === "academic" && (
            <>
              <div className="text-center mt-8 text-3xl font-bold text-blue-900">
                Academic Information
              </div>
              <div className="mx-auto w-2/5 mt-4 rounded-xl bg-gray-300 h-2">
                <div className="w-1/3 h-full bg-blue-700 rounded-xl"></div>
              </div>
              <div className="text-center mt-4 text-gray-500">
                Show your academic journey.
              </div>
              <div className="flex justify-center mt-8 w-2/5 bg-white mx-auto rounded-lg p-4 shadow-md">
                <div className="w-full">
                  <div className="mb-4">
                    <label className="text-sm text-gray-600 font-semibold">
                      Major*
                    </label>
                    <div
                      className="relative border border-gray-600 rounded-sm mt-1 min-h-[44px] cursor-pointer"
                      onClick={(e) => {
                        const select = e.currentTarget.querySelector("select");
                        const target = e.target as HTMLElement;
                        if (select && target.tagName !== "BUTTON") {
                          select.focus();
                          const mouseEvent = new MouseEvent("mousedown", {
                            view: window,
                            bubbles: true,
                            cancelable: true,
                          });
                          select.dispatchEvent(mouseEvent);
                        }
                      }}
                    >
                      {selectedMajors.length > 0 && (
                        <div className="flex flex-wrap gap-2 p-2 pointer-events-none relative z-10">
                          {selectedMajors.map((m) => (
                            <span
                              key={m}
                              className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-2 pointer-events-auto"
                            >
                              <span>{m}</span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedMajors((prev) =>
                                    prev.filter((x) => x !== m)
                                  );
                                }}
                                className="text-gray-600 hover:text-gray-800"
                                aria-label={`Remove ${m}`}
                              >
                                ✕
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                      <select
                        value=""
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value && !selectedMajors.includes(value)) {
                            setSelectedMajors([...selectedMajors, value]);
                          }
                        }}
                        className="w-full px-2 py-1 border-none outline-none focus:ring-0 bg-transparent appearance-none cursor-pointer absolute inset-0"
                      >
                        <option value=""></option>
                        {majors
                          .filter((m) => !selectedMajors.includes(m))
                          .map((m) => (
                            <option key={m} value={m}>
                              {m}
                            </option>
                          ))}
                      </select>
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                        <svg
                          width="12"
                          height="8"
                          viewBox="0 0 12 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1L6 6L11 1"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <FormInput
                    label="Graduation Year"
                    type="text"
                    required
                    id="graduationYear"
                    value={responses.graduationYear}
                    onChange={(e) =>
                      setResponses({
                        ...responses,
                        graduationYear: e.target.value,
                      })
                    }
                  />
                  <FormInput
                    label="LinkedIn"
                    type="phone"
                    required
                    id="linkedin"
                    value={responses.linkedin}
                    onChange={(e) =>
                      setResponses({ ...responses, linkedin: e.target.value })
                    }
                  />
                  <FormInput
                    label="Instagram"
                    type="text"
                    value={responses.instagram}
                    onChange={(e) =>
                      setResponses({ ...responses, instagram: e.target.value })
                    }
                  />
                  {validationError && (
                    <div className="text-red-600 text-sm mt-2">
                      {validationError}
                    </div>
                  )}
                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={() => {
                        setValidationError("");
                        setStep("basic");
                      }}
                      className="flex-1 mt-4 bg-white text-blue-900 py-2 border border-blue-900 rounded-3xl hover:bg-blue-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => {
                        if (
                          selectedMajors.length === 0 ||
                          !responses.graduationYear ||
                          !responses.linkedin
                        ) {
                          setValidationError(
                            "Must answer all required questions"
                          );
                          return;
                        }

                        // set alumni data
                        setAlumniData({
                          full_name: `${responses.firstName} ${responses.lastName}`,
                          emails: [responses.email],
                          phone: responses.phone,
                          linkedin_url: responses.linkedin,
                          instagram_url: responses.instagram,
                          graduation_year:
                            parseInt(responses.graduationYear) || null,
                          major: selectedMajors.join(", "),
                          location: "",
                          skills: [],
                          interests: [],
                          bio: "",
                        });

                        setValidationError("");
                        setStep("involvement");
                      }}
                      className="flex-1 mt-4 bg-blue-900 text-white py-2 rounded-3xl hover:bg-blue-800 transition-colors"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {step === "involvement" && (
            <>
              <div className="text-center mt-8 text-3xl font-bold text-blue-900">
                Hack4Impact Involvement
              </div>
              <div className="mx-auto w-2/5 mt-4 rounded-xl bg-gray-300 h-2">
                <div className="w-1/2 h-full bg-blue-700 rounded-xl"></div>
              </div>
              <div className="text-center mt-4 text-gray-500">
                Highlight your contributions.
              </div>
              <div className="flex justify-center mt-8 w-2/5 bg-white mx-auto rounded-lg p-4 shadow-md">
                <div className="w-full">
                  {roles.map((role, index) => (
                    <div
                      key={index}
                      className={
                        index > 0 ? "mt-6 pt-6 border-t border-gray-200" : ""
                      }
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-md text-gray-600 font-semibold">
                          Role {index + 1}
                        </div>
                        {index > 0 && (
                          <button
                            onClick={() => removeRole(index)}
                            className="text-red-600 text-sm hover:text-red-800 transition-colors"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="mb-4">
                        <label className="text-sm text-gray-600 font-semibold">
                          Role in Hack4Impact*
                        </label>
                        <div
                          className="relative border border-gray-600 rounded-sm mt-1 min-h-[44px] cursor-pointer"
                          onClick={(e) => {
                            const select =
                              e.currentTarget.querySelector("select");
                            const target = e.target as HTMLElement;
                            if (select && target.tagName !== "BUTTON") {
                              select.focus();
                              const mouseEvent = new MouseEvent("mousedown", {
                                view: window,
                                bubbles: true,
                                cancelable: true,
                              });
                              select.dispatchEvent(mouseEvent);
                            }
                          }}
                        >
                          {roles[index].selectedRoles.length > 0 && (
                            <div className="flex flex-wrap gap-2 p-2 pointer-events-none relative z-10">
                              {roles[index].selectedRoles.map((r) => (
                                <span
                                  key={r}
                                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-2 pointer-events-auto"
                                >
                                  <span>{r}</span>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const newRoles = [...roles];
                                      newRoles[index].selectedRoles = newRoles[
                                        index
                                      ].selectedRoles.filter((x) => x !== r);
                                      setRoles(newRoles);
                                    }}
                                    className="text-gray-600 hover:text-gray-800"
                                    aria-label={`Remove ${r}`}
                                  >
                                    ✕
                                  </button>
                                </span>
                              ))}
                            </div>
                          )}
                          <select
                            value=""
                            onChange={(e) => {
                              const value = e.target.value;
                              if (
                                value &&
                                !roles[index].selectedRoles.includes(value)
                              ) {
                                const newRoles = [...roles];
                                newRoles[index].selectedRoles = [
                                  ...newRoles[index].selectedRoles,
                                  value,
                                ];
                                setRoles(newRoles);
                              }
                            }}
                            className="w-full px-2 py-1 border-none outline-none focus:ring-0 bg-transparent appearance-none cursor-pointer absolute inset-0"
                          >
                            <option value=""></option>
                            {hackRoles
                              .filter(
                                (r) => !roles[index].selectedRoles.includes(r)
                              )
                              .map((r) => (
                                <option key={r} value={r}>
                                  {r}
                                </option>
                              ))}
                          </select>
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                            <svg
                              width="12"
                              height="8"
                              viewBox="0 0 12 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 1L6 6L11 1"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="text-sm text-gray-600 font-semibold">
                          Projects related to the role(s) you selected above
                        </label>
                        <div
                          className="relative border border-gray-600 rounded-sm mt-1 min-h-[44px] cursor-pointer"
                          onClick={(e) => {
                            const select =
                              e.currentTarget.querySelector("select");
                            const target = e.target as HTMLElement;
                            if (select && target.tagName !== "BUTTON") {
                              select.focus();
                              const mouseEvent = new MouseEvent("mousedown", {
                                view: window,
                                bubbles: true,
                                cancelable: true,
                              });
                              select.dispatchEvent(mouseEvent);
                            }
                          }}
                        >
                          {roles[index].selectedProjects.length > 0 && (
                            <div className="flex flex-wrap gap-2 p-2 pointer-events-none relative z-10">
                              {roles[index].selectedProjects.map((p) => (
                                <span
                                  key={p}
                                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-2 pointer-events-auto"
                                >
                                  <span>{p}</span>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const newRoles = [...roles];
                                      newRoles[index].selectedProjects =
                                        newRoles[index].selectedProjects.filter(
                                          (x) => x !== p
                                        );
                                      setRoles(newRoles);
                                    }}
                                    className="text-gray-600 hover:text-gray-800"
                                    aria-label={`Remove ${p}`}
                                  >
                                    ✕
                                  </button>
                                </span>
                              ))}
                            </div>
                          )}
                          <select
                            value=""
                            onChange={(e) => {
                              const value = e.target.value;
                              if (
                                value &&
                                !roles[index].selectedProjects.includes(value)
                              ) {
                                const newRoles = [...roles];
                                newRoles[index].selectedProjects = [
                                  ...newRoles[index].selectedProjects,
                                  value,
                                ];
                                setRoles(newRoles);
                              }
                            }}
                            className="w-full px-2 py-1 border-none outline-none focus:ring-0 bg-transparent appearance-none cursor-pointer absolute inset-0"
                          >
                            <option value=""></option>
                            {projects
                              .filter(
                                (p) =>
                                  !roles[index].selectedProjects.includes(p)
                              )
                              .map((p) => (
                                <option key={p} value={p}>
                                  {p}
                                </option>
                              ))}
                          </select>
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                            <svg
                              width="12"
                              height="8"
                              viewBox="0 0 12 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 1L6 6L11 1"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex-1 mb-4">
                          <label className="text-sm text-gray-600 font-semibold">
                            Start Semester
                          </label>
                          <div className="relative border border-gray-600 rounded-sm mt-1">
                            <select
                              value={roles[index].startSemester}
                              onChange={(e) => {
                                const newRoles = [...roles];
                                newRoles[index].startSemester = e.target.value;
                                setRoles(newRoles);
                              }}
                              className="w-full px-2 py-1 border-none outline-none focus:ring-0 bg-transparent appearance-none cursor-pointer"
                            >
                              <option value=""></option>
                              {semesters.map((s) => (
                                <option key={s} value={s}>
                                  {s}
                                </option>
                              ))}
                            </select>
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                              <svg
                                width="12"
                                height="8"
                                viewBox="0 0 12 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M1 1L6 6L11 1"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 mb-4">
                          <label className="text-sm text-gray-600 font-semibold">
                            End Semester
                          </label>
                          <div className="relative border border-gray-600 rounded-sm mt-1">
                            <select
                              value={roles[index].endSemester}
                              onChange={(e) => {
                                const newRoles = [...roles];
                                newRoles[index].endSemester = e.target.value;
                                setRoles(newRoles);
                              }}
                              className="w-full px-2 py-1 border-none outline-none focus:ring-0 bg-transparent appearance-none cursor-pointer"
                            >
                              <option value=""></option>
                              {semesters
                                .slice(
                                  roles[index].startSemester
                                    ? semesters.indexOf(
                                        roles[index].startSemester
                                      )
                                    : 0
                                )
                                .map((s) => (
                                  <option key={s} value={s}>
                                    {s}
                                  </option>
                                ))}
                            </select>
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                              <svg
                                width="12"
                                height="8"
                                viewBox="0 0 12 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M1 1L6 6L11 1"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <FormInput
                        label="Description"
                        type="text"
                        placeholder="What did you do"
                      />
                    </div>
                  ))}

                  <button
                    onClick={addRole}
                    className="mt-2 mb-2 text-gray-600 underline hover:text-gray-800 transition-colors"
                  >
                    Add Another Role
                  </button>

                  {validationError && (
                    <div className="text-red-600 text-sm mt-2">
                      {validationError}
                    </div>
                  )}

                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={() => {
                        setValidationError("");
                        setStep("academic");
                      }}
                      className="flex-1 bg-white text-blue-900 py-2 border border-blue-900 rounded-3xl hover:bg-blue-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => {
                        const hasInvalidRole = roles.some(
                          (role) => role.selectedRoles.length === 0
                        );
                        if (hasInvalidRole) {
                          setValidationError(
                            "Must answer all required questions"
                          );
                          return;
                        }

                        // Data is stored in roles state array
                        // Will be inserted into Alumni Hack Involvements table
                        // after Alumni record is created (when short bio is submitted)

                        setValidationError("");
                        setStep("job");
                      }}
                      className="flex-1 bg-blue-900 text-white py-2 rounded-3xl hover:bg-blue-800 transition-colors"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {step === 'job' && (
            <>
              <div className="text-center mt-8 text-3xl font-bold text-blue-900">
                Job Information
              </div>

              <div className="mx-auto w-2/5 mt-4 rounded-xl bg-gray-300 h-2">
                <div className="w-2/3 h-full bg-blue-700 rounded-xl"></div>
              </div>

              <div className="text-center mt-4 text-gray-500">
                Add your job experience here to help people know more about you.
              </div>

              <div className="flex justify-center mt-8 w-2/5 bg-white mx-auto rounded-lg p-4 shadow-md">
                
              <div className="w-full">
                <div className="flex flex-col items-start mb-4">
                  <div className="text-md text-gray-700 mb-2">
                    New member and no experience before
                  </div>
                  <button
                    className="w-full border border-blue-900 rounded-3xl px-6 py-1 font-medium text-blue-900 hover:bg-blue-50 transition-colors"
                    onClick={() => {
                      setJobExperiences([
                        {
                          title: "",
                          employmmentType: "",
                          company: "",
                          location: "",
                          startMonth: "",
                          startYear: NaN as number,
                          endMonth: "",
                          endYear: NaN as number,
                          description: "",
                        }
                      ]);
                      setStep("more");
                    }}
                  >
                    Skip for now
                  </button>
                </div>

                {jobExperiences.map((job, index) => (
                  <div
                    key={index}
                    className={index > 0 ? "mt-6 pt-6 border-t border-gray-200" : ""}
                  >
                    <div className="mb-3">
                      <label className="text-sm text-gray-600 font-semibold">
                        Title*
                      </label>
                      <select
                        className="w-full border border-gray-400 rounded-md mt-1 p-2"
                        value={job.title}
                        onChange={e => {
                          const newJobs = [...jobExperiences];
                          newJobs[index].title = e.target.value;
                          setJobExperiences(newJobs);
                        }}
                        required
                      >
                        <option value="">Select Title</option>
                        <option value="Product Designer">Product Designer</option>
                        <option value="Software Engineer">Software Engineer</option>
                        <option value="Product Manager">Product Manager</option>
                        <option value="Data Scientist">Data Scientist</option>
                        <option value="Researcher">Researcher</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <span className="text-sm text-gray-600 font-semibold">Experience {index + 1}</span>
                    </div>

                    <div className="mb-3">
                      <label className="text-sm text-gray-600 font-semibold">
                        Employment type*
                      </label>
                      <select
                        className="w-full border border-gray-400 rounded-md mt-1 p-2"
                        value={job.employmmentType ?? ""}
                        onChange={e => {
                          const newJobs = [...jobExperiences];
                          newJobs[index].employmmentType = e.target.value ?? null;
                          setJobExperiences(newJobs);
                        }}
                        required
                      >
                        <option value="">Select Employment Type</option>
                        {employmentTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="text-sm text-gray-600 font-semibold">
                        Company or organization*
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-400 rounded-md mt-1 p-2"
                        value={job.company}
                        onChange={e => {
                          const newJobs = [...jobExperiences];
                          newJobs[index].company = e.target.value;
                          setJobExperiences(newJobs);
                        }}
                        required
                        placeholder="e.g. Amazon"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="text-sm text-gray-600 font-semibold">
                        Location
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-400 rounded-md mt-1 p-2"
                        value={job.location ?? ""}
                        onChange={e => {
                          const newJobs = [...jobExperiences];
                          newJobs[index].location = e.target.value ?? null;
                          setJobExperiences(newJobs);
                        }}
                        placeholder="e.g. New York City"
                      />
                    </div>

                    {/* Start Time Fields */}
                    <div className="mb-3 flex gap-2 items-end">
                      <div className="flex-1">
                        <label className="text-sm text-gray-600 font-semibold">
                          Start Time*
                        </label>
                        <select
                          className="w-full border border-gray-400 rounded-md mt-1 p-2"
                          value={job.startMonth ?? ""}
                          onChange={e => {
                            const newJobs = [...jobExperiences];
                            newJobs[index].startMonth = e.target.value ?? null;
                            setJobExperiences(newJobs);
                          }}
                          required
                        >
                          <option value="">Month</option>
                          {monthEnum.map(month => (
                            <option key={month} value={month}>{month}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex-1">
                        <label className="text-white text-xs">{/* spacer */}</label>
                        <select
                          className="w-full border border-gray-400 rounded-md mt-1 p-2"
                          value={job.startYear ?? ""}
                          onChange={e => {
                            const newJobs = [...jobExperiences];
                            newJobs[index].startYear = e.target.value ? parseInt(e.target.value) : null;
                            setJobExperiences(newJobs);
                          }}
                          required
                        >
                          <option value="">Year</option>
                          {Array.from({length: 70}, (_, i) => {
                            const year = new Date().getFullYear() - i;
                            return <option key={year} value={year}>{year}</option>
                          })}
                        </select>
                      </div>
                    </div>

                    {/* End Time Fields */}
                    <div className="mb-3 flex gap-2 items-end">
                      <div className="flex-1">
                        <label className="text-sm text-gray-600 font-semibold">
                          End Time
                        </label>
                        <select
                          className="w-full border border-gray-400 rounded-md mt-1 p-2"
                          value={job.endMonth ?? ""}
                          onChange={e => {
                            const newJobs = [...jobExperiences];
                            newJobs[index].endMonth = e.target.value ?? null;
                            setJobExperiences(newJobs);
                          }}
                        >
                          <option value="">Month</option>
                          {monthEnum.map(month => (
                            <option key={month} value={month}>{month}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex-1">
                        <label className="text-white text-xs">{/* spacer */}</label>
                        <select
                          className="w-full border border-gray-400 rounded-md mt-1 p-2"
                          value={job.endYear ?? ""}
                          onChange={e => {
                            const newJobs = [...jobExperiences];
                            newJobs[index].endYear = e.target.value ? parseInt(e.target.value) : null;
                            setJobExperiences(newJobs);
                          }}
                          required
                        >
                          <option value="">Year</option>
                          {Array.from({length: 70}, (_, i) => {
                            const year = new Date().getFullYear() - i;
                            return <option key={year} value={year}>{year}</option>
                          })}
                        </select>
                      </div>
                    </div>

                    <button
                      className="mb-2 text-gray-600 underline hover:text-gray-800 transition-colors"
                      type="button"
                      style={{ width: 'auto', background: 'none', border: 'none', padding: 0, marginBottom: '12px', textAlign: 'left', display: 'block' }}
                      onClick={() => {
                        setJobExperiences([
                          ...jobExperiences,
                          {
                            title: "",
                            employmmentType: "",
                            company: "",
                            location: "",
                            startMonth: "",
                            startYear: NaN as number,
                            endMonth: "",
                            endYear: NaN as number,
                            description: "",
                          }
                        ]);
                      }}
                    >
                      Add Another Experience
                    </button>
                    <button
                      className="mb-2 text-gray-600 underline hover:text-gray-800 transition-colors"
                      type="button"
                      style={{ 
                        width: 'auto', 
                        background: 'none', 
                        border: 'none', 
                        padding: 0, 
                        marginBottom: '12px',
                        marginTop: '0px',
                        textAlign: 'left', 
                        display: 'block' 
                      }}
                      onClick={() => {
                        if (jobExperiences.length > 1) {
                          setJobExperiences(jobExperiences.filter((_, i) => i !== index));
                        }
                      }}
                      disabled={jobExperiences.length === 1}
                    >
                      Remove
                    </button>
                    <button
                      className="w-full bg-blue-900 text-white rounded-3xl px-6 py-2 font-medium hover:bg-blue-800 transition-colors"
                      onClick={() => {
                        // Add logic to insert job experiences into database
                        if (validateJobExperiences()) {
                          // Approve job experiences to be inserted into database
                          setValidationError("");
                          
                          // Continue to next step
                          setStep("more");
                        } else {
                          setValidationError("Must answer all required questions");
                        }
                      }}
                    >
                      Continue
                    </button>
                    <div className="text-red-500 text-sm mt-2">{validationError}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
          )}

          {step === 'more' && (
            <>
              <div className="text-center mt-8 text-3xl font-bold text-blue-900">
                More information about you
              </div>
              <div className="mx-auto w-2/5 mt-4 rounded-xl bg-gray-300 h-2">
                <div className="w-full h-full bg-blue-700 rounded-xl" style={{ width: '100%' }}></div>
              </div>
              <div className="text-center mt-4 text-gray-500">
                This will be the name displayed on your profile to help people know more about you
              </div>
              <div className="flex justify-center mt-8">
                <div className="bg-white rounded-xl shadow-md w-full max-w-xl p-6 flex flex-col gap-4 items-stretch">
                  <div className="flex flex-col mb-4">
                    <label className="text-sm font-semibold text-gray-700 mb-1" htmlFor="short-bio">
                      Short Bio
                    </label>
                    <span className="text-xs text-gray-500 mb-1">
                      Optionally include your skills and interests here
                    </span>
                    <textarea
                      id="short-bio"
                      className="border border-gray-400 rounded-md p-3 w-full min-h-[80px] resize-vertical"
                      placeholder="Tell us about yourself, your skills, and your interests..."
                      value={responses.bio ?? ""}
                      onChange={e => setResponses({ ...responses, bio: e.target.value })}
                      maxLength={500}
                      required
                    />
                  </div>
                  <button
                    className="w-full bg-blue-900 text-white rounded-3xl px-6 py-2 font-medium hover:bg-blue-800 transition-colors"
                    onClick={() => {
                      setAlumniData({
                        ...alumniData,
                        bio: responses.bio,
                      });
                      insertAlumniData();
                      setValidationError("");
                      setStep("end");
                    }}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
