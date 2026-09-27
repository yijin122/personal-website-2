import type { Metadata } from "next"
import {
  ConflictBars,
  RagNote,
  RegistrarSketch,
} from "@/components/experience-visuals"
import {
  leadershipRoles,
  teachingRoles,
  technicalRoles,
  type Role,
} from "@/lib/content"

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Technical roles, teaching, and leadership: Carmauto, Computime, HKUST, Cornell ORIE, and the Chinese Drama Society.",
}

export default function ExperiencePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-12 md:px-8 md:py-16">
      <p className="font-mono text-[11px] tracking-[0.18em] text-primary uppercase">
        Experience
      </p>
      <h1 className="mt-3 max-w-3xl font-heading text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.92] tracking-tight">
        The record, in the order it was written.
      </h1>
      <RoleList title="Technical" roles={technicalRoles} />
      <RoleList title="Teaching" roles={teachingRoles} />
      <RoleList title="Leadership" roles={leadershipRoles} />
    </div>
  )
}

function RoleList({ title, roles }: { title: string; roles: Role[] }) {
  return (
    <section className="mt-14">
      <h2 className="font-heading text-3xl tracking-tight md:text-4xl">{title}</h2>
      <div className="mt-4">
        {roles.map((role) => (
          <article
            key={role.id}
            id={role.id}
            className="scroll-mt-24 grid gap-4 border-t border-foreground/15 py-8 md:grid-cols-12"
          >
            <div className="md:col-span-4">
              <h3 className="font-heading text-2xl leading-tight tracking-tight">
                {role.title}
              </h3>
              <p className="mt-2 text-sm">{role.org}</p>
              <p className="mt-1 font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
                {role.meta}
                <br />
                {role.dates}
              </p>
            </div>
            <div className="md:col-span-8">
              <ul className="space-y-3">
                {role.bullets.map((bullet) => (
                  <li key={bullet} className="text-sm leading-relaxed md:text-base">
                    {bullet}
                  </li>
                ))}
              </ul>
              {role.id === "scheduling" ? (
                <>
                  <ConflictBars />
                  <RegistrarSketch />
                </>
              ) : null}
              {role.id === "rag" ? <RagNote /> : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
