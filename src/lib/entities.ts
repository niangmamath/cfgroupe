import type { Entity } from "./content-types";

export type { Entity };

export function getEntity(entities: Entity[], slug: string) {
  return entities.find((e) => e.slug === slug);
}

export function getAdjacentEntities(entities: Entity[], slug: string) {
  const index = entities.findIndex((e) => e.slug === slug);
  const prev = entities[(index - 1 + entities.length) % entities.length];
  const next = entities[(index + 1) % entities.length];
  return { prev, next };
}
