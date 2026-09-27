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
    <div className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <h1 className="max-w-3xl font-heading text-5xl font-normal tracking-tight md:text-6xl">
        Experience
      </h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Technical work, teaching, and the Chinese Drama Society.
      </p>
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
