import React, { useEffect, useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  X,
} from "lucide-react";
import defaultProfilePic from "../assets/defaultprofilepic_icon.png";
import { supabaseHelpers } from "../lib/supabaseClient.ts";
import {
  Alumni,
  AlumniHackInvolvement,
  AlumniJobExperience,
  transformSupabaseAlumniHackInvolvement,
  transformSupabaseAlumniJobExperience,
} from "../types/member.ts";
import "../styles/ProfileDetailsModal.css";

interface ProfileDetailsModalProps {
  alumni: Alumni | null;
  isOpen: boolean;
  onClose: () => void;
}

interface GroupedHackInvolvement {
  id: string;
  roles: string[];
  projects: string[];
  startTerm?: string | null;
  startYear?: number | null;
  endTerm?: string | null;
  endYear?: number | null;
  description?: string | null;
}

const normalizeValues = (values?: string[] | null): string[] =>
  (values || []).map((value) => value.trim()).filter((value) => value.length > 0);

const parseDescriptionToBullets = (description?: string | null): string[] => {
  if (!description) return [];

  const rows = description
    .split(/\r?\n|\u2022/)
    .map((row) => row.trim())
    .filter((row) => row.length > 0);

  return rows;
};

const formatTermYear = (term?: string | null, year?: number | null): string => {
  if (term && year) return `${term} ${year}`;
  if (term) return term;
  if (year) return year.toString();
  return "";
};

const formatTermRange = (
  startTerm?: string | null,
  startYear?: number | null,
  endTerm?: string | null,
  endYear?: number | null
): string => {
  const start = formatTermYear(startTerm, startYear);
  const end = formatTermYear(endTerm, endYear);
  if (start && end) return `${start} - ${end}`;
  return start || end;
};

const formatYearRange = (
  startMonth?: string | null,
  startYear?: number | null,
  endMonth?: string | null,
  endYear?: number | null
): string => {
  const start =
    startMonth && startYear
      ? `${startMonth} ${startYear}`
      : startYear
        ? `${startYear}`
        : "";
  const end =
    endMonth && endYear
      ? `${endMonth} ${endYear}`
      : endYear
        ? `${endYear}`
        : "";

  if (start && end) return `${start} - ${end}`;
  return start || end;
};

const linkLabel = (url: string): string =>
  url.replace(/^https?:\/\/(www\.)?/i, "").replace(/\/$/, "");

const ProfileDetailsModal: React.FC<ProfileDetailsModalProps> = ({
  alumni,
  isOpen,
  onClose,
}) => {
  const [jobExperiences, setJobExperiences] = useState<AlumniJobExperience[]>([]);
  const [hackInvolvements, setHackInvolvements] = useState<
    AlumniHackInvolvement[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !alumni?.id) return;

    let cancelled = false;

    const loadProfileDetails = async () => {
      setLoading(true);
      setError(null);
      setJobExperiences([]);
      setHackInvolvements([]);

      try {
        const [jobRows, involvementRows] = await Promise.all([
          supabaseHelpers.getAlumniJobExperiences(alumni.id),
          supabaseHelpers.getAlumniHackInvolvements(alumni.id),
        ]);

        if (cancelled) return;

        setJobExperiences(
          jobRows.map((row) => transformSupabaseAlumniJobExperience(row))
        );
        setHackInvolvements(
          involvementRows.map((row) => transformSupabaseAlumniHackInvolvement(row))
        );
      } catch (err) {
        if (cancelled) return;
        setError(
          err instanceof Error ? err.message : "Failed to load profile details."
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadProfileDetails();

    return () => {
      cancelled = true;
    };
  }, [alumni?.id, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const currentOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = currentOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscapeKey);
    return () => window.removeEventListener("keydown", handleEscapeKey);
  }, [isOpen, onClose]);

  const groupedHackInvolvements = useMemo<GroupedHackInvolvement[]>(() => {
    const grouped = new Map<string, GroupedHackInvolvement>();

    hackInvolvements.forEach((item) => {
      const key = [
        item.startTerm || "",
        item.startYear || "",
        item.endTerm || "",
        item.endYear || "",
        item.description || "",
      ].join("|");

      const existing = grouped.get(key);
      if (existing) {
        if (item.role && !existing.roles.includes(item.role)) {
          existing.roles.push(item.role);
        }
        (item.projects || []).forEach((project) => {
          if (project && !existing.projects.includes(project)) {
            existing.projects.push(project);
          }
        });
        return;
      }

      grouped.set(key, {
        id: item.id,
        roles: item.role ? [item.role] : [],
        projects: normalizeValues(item.projects),
        startTerm: item.startTerm,
        startYear: item.startYear,
        endTerm: item.endTerm,
        endYear: item.endYear,
        description: item.description,
      });
    });

    return Array.from(grouped.values());
  }, [hackInvolvements]);

  if (!isOpen || !alumni) return null;

  const displayName = alumni.name?.trim() || "Unknown Alumni";
  const emails = normalizeValues(alumni.emails);
  const skills = normalizeValues(alumni.skills);
  const interests = normalizeValues(alumni.interests);
  const profileImage = alumni.profileUrl || defaultProfilePic;
  const educationLine = [alumni.major, alumni.graduationYear && `Class of ${alumni.graduationYear}`]
    .filter(Boolean)
    .join(" | ");

  const latestJob = jobExperiences[0];
  const headline =
    (latestJob && [latestJob.company, latestJob.title].filter(Boolean).join(" ")) ||
    "Hack4Impact Alumni";

  return (
    <div
      className="profile-modal-overlay"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="profile-modal-container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="profile-modal-close"
          onClick={onClose}
          aria-label="Close profile details"
        >
          <X size={20} />
        </button>

        <header className="profile-modal-header">
          <div className="profile-modal-avatar">
            <img
              src={profileImage}
              onError={(event) => {
                event.currentTarget.src = defaultProfilePic;
              }}
              alt={`${displayName} profile`}
            />
          </div>

          <div className="profile-modal-summary">
            <h2 id="profile-modal-title">{displayName}</h2>

            <div className="profile-modal-meta">
              <span className="profile-modal-meta-item">
                <BriefcaseBusiness size={16} />
                {headline}
              </span>
              {alumni.location && (
                <span className="profile-modal-meta-item">
                  <MapPin size={16} />
                  {alumni.location}
                </span>
              )}
            </div>

            {educationLine && (
              <p className="profile-modal-education">{educationLine}</p>
            )}
          </div>
        </header>

        {loading && (
          <div className="profile-modal-state">Loading profile details...</div>
        )}

        {error && !loading && (
          <div className="profile-modal-state profile-modal-error">{error}</div>
        )}

        {!loading && !error && (
          <div className="profile-modal-grid">
            <section className="profile-modal-column">
              <h3 className="profile-modal-section-title">Contact Information</h3>
              <ul className="profile-modal-contact-list">
                {emails.map((email) => (
                  <li key={email} className="profile-modal-contact-item">
                    <Mail size={16} />
                    <a href={`mailto:${email}`}>{email}</a>
                  </li>
                ))}

                {alumni.linkedinUrl && (
                  <li className="profile-modal-contact-item">
                    <Linkedin size={16} />
                    <a
                      href={alumni.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {linkLabel(alumni.linkedinUrl)}
                    </a>
                  </li>
                )}

                {alumni.phone && (
                  <li className="profile-modal-contact-item">
                    <Phone size={16} />
                    <a href={`tel:${alumni.phone}`}>{alumni.phone}</a>
                  </li>
                )}

                {emails.length === 0 && !alumni.linkedinUrl && !alumni.phone && (
                  <li className="profile-modal-empty">No contact info provided.</li>
                )}
              </ul>

              <h3 className="profile-modal-section-title">Skills</h3>
              <div className="profile-modal-chips">
                {skills.length > 0 ? (
                  skills.map((skill) => (
                    <span key={skill} className="profile-modal-chip">
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="profile-modal-empty">No skills listed yet.</span>
                )}
              </div>

              <h3 className="profile-modal-section-title">Interests</h3>
              <div className="profile-modal-chips">
                {interests.length > 0 ? (
                  interests.map((interest) => (
                    <span key={interest} className="profile-modal-chip">
                      {interest}
                    </span>
                  ))
                ) : (
                  <span className="profile-modal-empty">
                    No interests listed yet.
                  </span>
                )}
              </div>
            </section>

            <section className="profile-modal-column">
              <h3 className="profile-modal-section-title">
                Hack4Impact Involvement
              </h3>

              {groupedHackInvolvements.length > 0 ? (
                groupedHackInvolvements.map((involvement) => {
                  const termRange = formatTermRange(
                    involvement.startTerm,
                    involvement.startYear,
                    involvement.endTerm,
                    involvement.endYear
                  );
                  const bullets = parseDescriptionToBullets(
                    involvement.description
                  );

                  return (
                    <article key={involvement.id} className="profile-modal-entry">
                      <h4 className="profile-modal-entry-title">
                        {involvement.roles.join(", ") || "Contributor"}
                        {termRange ? ` | ${termRange}` : ""}
                      </h4>

                      {involvement.projects.length > 0 && (
                        <div className="profile-modal-chips">
                          {involvement.projects.map((project) => (
                            <span key={project} className="profile-modal-chip">
                              {project}
                            </span>
                          ))}
                        </div>
                      )}

                      {bullets.length > 0 && (
                        <ul className="profile-modal-bullets">
                          {bullets.map((bullet, index) => (
                            <li key={`${involvement.id}-${index}`}>{bullet}</li>
                          ))}
                        </ul>
                      )}
                    </article>
                  );
                })
              ) : (
                <p className="profile-modal-empty">
                  No Hack4Impact involvement shared yet.
                </p>
              )}

              <h3 className="profile-modal-section-title">Favorite Hack Memory</h3>
              <p className="profile-modal-memory">
                {alumni.bio?.trim() || "No memory shared yet."}
              </p>
            </section>

            <section className="profile-modal-column">
              <h3 className="profile-modal-section-title">Job Experience</h3>

              {jobExperiences.length > 0 ? (
                jobExperiences.map((job) => {
                  const dateRange = formatYearRange(
                    job.startMonth,
                    job.startYear,
                    job.endMonth,
                    job.endYear
                  );
                  const bullets = parseDescriptionToBullets(job.description);

                  return (
                    <article key={job.id} className="profile-modal-entry">
                      <h4 className="profile-modal-entry-title">{job.company}</h4>
                      <div className="profile-modal-entry-meta">
                        {job.title && (
                          <span className="profile-modal-chip profile-modal-chip-dense">
                            {job.title}
                          </span>
                        )}
                        {job.employmentType && (
                          <span className="profile-modal-chip profile-modal-chip-dense">
                            {job.employmentType}
                          </span>
                        )}
                        {dateRange && (
                          <span className="profile-modal-chip profile-modal-chip-dense">
                            {dateRange}
                          </span>
                        )}
                      </div>

                      {job.location && (
                        <p className="profile-modal-entry-location">
                          <MapPin size={14} />
                          {job.location}
                        </p>
                      )}

                      {bullets.length > 0 && (
                        <ul className="profile-modal-bullets">
                          {bullets.map((bullet, index) => (
                            <li key={`${job.id}-${index}`}>{bullet}</li>
                          ))}
                        </ul>
                      )}
                    </article>
                  );
                })
              ) : (
                <p className="profile-modal-empty">No job experiences shared yet.</p>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDetailsModal;
