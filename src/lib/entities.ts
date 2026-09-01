export type Entity = {
  slug: string;
  number: string;
  name: string;
  short: string;
  tagline: string;
  kicker: string;
  description: string;
  synergy: string;
  groupsLabel: string;
  groups: { title: string; items: string[] }[];
  poles?: { name: string; description: string }[];
};

export const entities: Entity[] = [
  {
    slug: "cfgroupe",
    number: "01",
    name: "CFGroupe",
    short: "Groupe",
    tagline: "Cadrage et pilotage",
    kicker: "Le point d'entrée historique",
    description:
      "Expertise historique dans l'accompagnement des banques sur la mise en place d'outils métiers, en AMOA, PMO et MOE, au forfait ou en régie. Cette expertise — forgée dans l'un des environnements les plus exigeants en conformité et complexité organisationnelle — est aujourd'hui étendue à d'autres secteurs à enjeux similaires : santé et éducation.",
    synergy:
      "CFGroupe est le point d'entrée stratégique sur la plupart des missions. Il alimente directement l'exécution du pôle CFSolutions, l'adoption des produits CFSoft dans le secteur bancaire, et le déploiement des solutions CFTech dans les secteurs en diversification.",
    groupsLabel: "Modes d'intervention",
    groups: [
      { title: "Missions", items: ["AMOA", "PMO", "MOE"] },
      { title: "Modalités", items: ["Au forfait", "En régie"] },
      { title: "Secteurs", items: ["Banque", "Santé", "Éducation"] },
    ],
  },
  {
    slug: "cfsolutions",
    number: "02",
    name: "CFSolutions",
    short: "Solutions",
    tagline: "Exécution technique",
    kicker: "Le pôle d'exécution de CFGroupe",
    description:
      "Bras d'exécution polyvalent de CFGroupe : développement sur mesure, intégration, TMA et infogérance, sur web, mobile, data, cloud et cybersécurité, en régie ou au forfait.",
    synergy:
      "CFSolutions absorbe la complexité que le pôle CFGroupe a cadrée en amont, ou répond directement à un besoin client sans passage préalable. C'est le pôle qui rend crédible la promesse de bout en bout de CFGroupe.",
    groupsLabel: "Domaines & modalités",
    groups: [
      {
        title: "Prestations",
        items: ["Développement sur mesure", "Intégration", "TMA", "Infogérance"],
      },
      { title: "Domaines", items: ["Web", "Mobile", "Data", "Cloud", "Cybersécurité"] },
      { title: "Modalités", items: ["Au forfait", "En régie"] },
    ],
  },
  {
    slug: "cfsoft",
    number: "03",
    name: "CFSoft",
    short: "Soft",
    tagline: "Logiciels métiers bancaires",
    kicker: "La suite produits de CFGroupe",
    description:
      "Suite logicielle modulaire pour les marchés financiers : plateforme de bourse en ligne, OMS (order management system), et suite banque d'investissement et crédit corporate. Disponible en SaaS ou licence, déployable en intégration ou cloud. Un client peut démarrer sur un seul produit et étendre vers la suite complète.",
    synergy:
      "Cohérence directe avec l'ADN bancaire de CFGroupe — un client accompagné sur sa transformation digitale peut adopter les produits CFSoft plutôt que redévelopper ces briques via le pôle CFSolutions.",
    groupsLabel: "Produits & déploiement",
    groups: [
      {
        title: "Produits",
        items: [
          "Plateforme de bourse en ligne",
          "OMS — Order Management System",
          "Suite banque d'investissement & crédit corporate",
        ],
      },
      { title: "Formats", items: ["SaaS", "Licence"] },
      { title: "Déploiement", items: ["Intégration", "Cloud"] },
    ],
  },
  {
    slug: "cftech",
    number: "04",
    name: "CFTech",
    short: "Tech",
    tagline: "Solutions sectorielles spécialisées",
    kicker: "La diversification de CFGroupe",
    description:
      "Trois pôles produits, chacun répondant à une problématique métier spécifique et peu couverte par le marché.",
    synergy:
      "CFTech incarne concrètement la diversification sectorielle portée par CFGroupe, en apportant des produits déjà adaptés aux contraintes réglementaires et métier de la santé, de l'éducation et de la finance.",
    groupsLabel: "Trois pôles produits",
    groups: [],
    poles: [
      {
        name: "Healthtech",
        description:
          "Aide à la décision pour l'implémentation de cabinets médicaux, selon des critères personnalisables.",
      },
      {
        name: "Edtech",
        description:
          "Dossier de suivi unique et continu des élèves, du primaire à l'université, traçant les lacunes dans la durée.",
      },
      {
        name: "Fintech",
        description:
          "Gestion sous mandat des ordres de bourse, avec logique de scission ou d'agrégation — un métier de gestion, distinct de l'OMS de CFSoft qui est un outil d'exécution.",
      },
    ],
  },
];

export function getEntity(slug: string) {
  return entities.find((e) => e.slug === slug);
}

export function getAdjacentEntities(slug: string) {
  const index = entities.findIndex((e) => e.slug === slug);
  const prev = entities[(index - 1 + entities.length) % entities.length];
  const next = entities[(index + 1) % entities.length];
  return { prev, next };
}
