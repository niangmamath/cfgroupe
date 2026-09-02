import type { SiteContent } from "./content-types";

export const defaultContent: SiteContent = {
  hero: {
    titleMain: "Notre rigueur,",
    titleAccent: "votre transformation.",
    subtitle:
      "Banque, santé ou éducation — CFConsulting vous accompagne du cadrage à l'exécution.",
    ctaPrimaryLabel: "Découvrir nos pôles",
    ctaSecondaryLabel: "Discutons de votre projet",
    backgroundImage: null,
    backgroundVideo: null,
  },
  polesSection: {
    kicker: "Nos pôles",
    title: "Quatre expertises, une même exigence",
  },
  filConducteur: {
    kicker: "Le fil conducteur",
    quote:
      "La diversification sectorielle de CFConsulting ne part pas de zéro — elle capitalise sur un savoir-faire éprouvé.",
    caseALabel: "Un client bancaire",
    caseAText:
      "Accompagné dès le cadrage, il peut être orienté vers nos produits CFSoft, avec le pôle CFSolutions en support d'intégration.",
    caseBLabel: "Un client santé ou éducation",
    caseBText:
      "Entrant par CFTech, il bénéficie du même niveau de rigueur méthodologique que nous appliquons historiquement à la banque.",
  },
  contact: {
    kicker: "Contact",
    title: "Discutons de votre projet",
    subtitle: "Échangeons sur vos besoins et concrétisons votre transformation.",
    email: "abderrahmane.elbaghdadi@cfconsulting.ma",
    phone: "+212 6 14 38 46 07",
  },
  footer: {
    tagline:
      "Toute la chaîne de valeur digitale, de la stratégie à l'exécution, à travers quatre pôles complémentaires.",
    copyrightName: "CFConsulting",
  },
  entities: [
    {
      slug: "cfconsulting",
      number: "01",
      name: "CFConsulting",
      short: "Consulting",
      tagline: "Cadrage et pilotage",
      kicker: "Le point d'entrée historique",
      description:
        "Expertise historique dans l'accompagnement des banques sur la mise en place d'outils métiers, en AMOA, PMO et MOE, au forfait ou en régie. Cette expertise — forgée dans l'un des environnements les plus exigeants en conformité et complexité organisationnelle — est aujourd'hui étendue à d'autres secteurs à enjeux similaires : santé et éducation.",
      synergy:
        "CFConsulting est le point d'entrée stratégique sur la plupart des missions. Il alimente directement l'exécution du pôle CFSolutions, l'adoption des produits CFSoft dans le secteur bancaire, et le déploiement des solutions CFTech dans les secteurs en diversification.",
      groupsLabel: "Modes d'intervention",
      groups: [
        {
          title: "Missions",
          items: [
            {
              label: "AMOA",
              description:
                "Assistance à maîtrise d'ouvrage : cadrage des besoins et pilotage du projet côté client.",
            },
            {
              label: "PMO",
              description:
                "Project Management Office : coordination, planification et suivi transverse des projets.",
            },
            {
              label: "MOE",
              description:
                "Maîtrise d'œuvre : conception et réalisation technique de la solution retenue.",
            },
          ],
        },
        {
          title: "Modalités",
          items: [
            {
              label: "Au forfait",
              description:
                "Engagement sur un périmètre, un délai et un budget fixés dès le départ.",
            },
            {
              label: "En régie",
              description:
                "Mise à disposition de compétences facturées au temps passé, pilotage assuré par le client.",
            },
          ],
        },
        {
          title: "Secteurs",
          items: [
            {
              label: "Banque",
              description:
                "Cœur historique de notre expertise, forgée dans un environnement réglementaire exigeant.",
            },
            {
              label: "Santé",
              description:
                "Accompagnement des établissements et professionnels de santé dans leur transformation.",
            },
            {
              label: "Éducation",
              description:
                "Établissements scolaires et supérieurs, du primaire à l'université.",
            },
          ],
        },
      ],
    },
    {
      slug: "cfsolutions",
      number: "02",
      name: "CFSolutions",
      short: "Solutions",
      tagline: "Exécution technique",
      kicker: "Le pôle d'exécution de CFConsulting",
      description:
        "Bras d'exécution polyvalent de CFConsulting : développement sur mesure, intégration, TMA et infogérance, sur web, mobile, data, cloud et cybersécurité, en régie ou au forfait.",
      synergy:
        "CFSolutions absorbe la complexité que le pôle CFConsulting a cadrée en amont, ou répond directement à un besoin client sans passage préalable. C'est le pôle qui rend crédible la promesse de bout en bout de CFConsulting.",
      groupsLabel: "Domaines & modalités",
      groups: [
        {
          title: "Prestations",
          items: [
            {
              label: "Développement sur mesure",
              description:
                "Conception d'applications adaptées précisément à vos besoins métier.",
            },
            {
              label: "Intégration",
              description:
                "Connexion et interopérabilité entre vos systèmes existants.",
            },
            {
              label: "TMA",
              description:
                "Tierce maintenance applicative : maintien en conditions opérationnelles de vos applications.",
            },
            {
              label: "Infogérance",
              description:
                "Prise en charge complète de l'exploitation de votre infrastructure IT.",
            },
          ],
        },
        {
          title: "Domaines",
          items: [
            {
              label: "Web",
              description:
                "Applications et plateformes web, du site vitrine à l'outil métier complexe.",
            },
            {
              label: "Mobile",
              description: "Applications natives et cross-platform iOS et Android.",
            },
            {
              label: "Data",
              description: "Architecture, traitement et valorisation de la donnée.",
            },
            {
              label: "Cloud",
              description: "Migration et exploitation d'infrastructures cloud natives.",
            },
            {
              label: "Cybersécurité",
              description: "Sécurisation des systèmes, des données et des accès.",
            },
          ],
        },
        {
          title: "Modalités",
          items: [
            {
              label: "Au forfait",
              description:
                "Engagement sur un périmètre, un délai et un budget fixés dès le départ.",
            },
            {
              label: "En régie",
              description:
                "Mise à disposition de compétences facturées au temps passé.",
            },
          ],
        },
      ],
    },
    {
      slug: "cfsoft",
      number: "03",
      name: "CFSoft",
      short: "Soft",
      tagline: "Logiciels métiers bancaires",
      kicker: "La suite produits de CFConsulting",
      description:
        "Suite logicielle modulaire pour les marchés financiers : plateforme de bourse en ligne, OMS (order management system), et suite banque d'investissement et crédit corporate. Disponible en SaaS ou licence, déployable en intégration ou cloud. Un client peut démarrer sur un seul produit et étendre vers la suite complète.",
      synergy:
        "Cohérence directe avec l'ADN bancaire de CFConsulting — un client accompagné sur sa transformation digitale peut adopter les produits CFSoft plutôt que redévelopper ces briques via le pôle CFSolutions.",
      groupsLabel: "Produits & déploiement",
      groups: [
        {
          title: "Produits",
          items: [
            {
              label: "Plateforme de bourse en ligne",
              description: "Accès direct aux marchés pour la négociation de titres.",
            },
            {
              label: "OMS — Order Management System",
              description: "Gestion et routage des ordres de bourse en temps réel.",
            },
            {
              label: "Suite banque d'investissement & crédit corporate",
              description:
                "Outils dédiés au financement des entreprises et aux opérations de marché.",
            },
          ],
        },
        {
          title: "Formats",
          items: [
            {
              label: "SaaS",
              description:
                "Solution hébergée, accessible par abonnement, sans infrastructure à gérer.",
            },
            {
              label: "Licence",
              description:
                "Déploiement sur votre propre infrastructure, sous licence d'exploitation.",
            },
          ],
        },
        {
          title: "Déploiement",
          items: [
            {
              label: "Intégration",
              description: "Installation au sein de votre système d'information existant.",
            },
            {
              label: "Cloud",
              description: "Hébergement et exploitation sur infrastructure cloud.",
            },
          ],
        },
      ],
    },
    {
      slug: "cftech",
      number: "04",
      name: "CFTech",
      short: "Tech",
      tagline: "Solutions sectorielles spécialisées",
      kicker: "La diversification de CFConsulting",
      description:
        "Trois pôles produits, chacun répondant à une problématique métier spécifique et peu couverte par le marché.",
      synergy:
        "CFTech incarne concrètement la diversification sectorielle portée par CFConsulting, en apportant des produits déjà adaptés aux contraintes réglementaires et métier de la santé, de l'éducation et de la finance.",
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
  ],
};
