import * as bs from "../global-styles/Bootstrap.scss";

type BsComponent = "badge" | "text";

type BsIntent = "primary" | "secondary" | "danger" | "warning" | "info" | "success" | "light" | "dark" | "muted";

type BsSpacingType = "margin" | "padding";
type BsSpacingSide = "all" | "top" | "bottom" | "left" | "right" | "x" | "y";
type BsSpacingDimen = 0 | 1 | 2 | 3 | 4 | 5;
type BsSpacingSpec = { [key in BsSpacingType]?: { [key in BsSpacingSide]?: BsSpacingDimen } };

const intentClasses: { [key in BsComponent]: { [key in BsIntent]: string } } = {
  badge: {
    primary: bs.badgePrimary,
    secondary: bs.badgeSecondary,
    danger: bs.badgeDanger,
    warning: bs.badgeWarning,
    info: bs.badgeInfo,
    success: bs.badgeSuccess,
    light: bs.badgeLight,
    dark: bs.badgeDark,
    muted: null,
  },
  text: {
    primary: bs.textPrimary,
    secondary: bs.textSecondary,
    danger: bs.textDanger,
    warning: bs.textWarning,
    info: bs.textInfo,
    success: bs.textSuccess,
    light: bs.textLight,
    dark: bs.textDark,
    muted: bs.textMuted,
  },
};

const spacingClasses: { [key in BsSpacingType]: { [key in BsSpacingSide]: { [key in BsSpacingDimen]: string } } } = {
  margin: {
    all: {
      0: bs.m0,
      1: bs.m1,
      2: bs.m2,
      3: bs.m3,
      4: bs.m4,
      5: bs.m5,
    },
    top: {
      0: bs.mt0,
      1: bs.mt1,
      2: bs.mt2,
      3: bs.mt3,
      4: bs.mt4,
      5: bs.mt5,
    },
    bottom: {
      0: bs.mb0,
      1: bs.mb1,
      2: bs.mb2,
      3: bs.mb3,
      4: bs.mb4,
      5: bs.mb5,
    },
    left: {
      0: bs.ml0,
      1: bs.ml1,
      2: bs.ml2,
      3: bs.ml3,
      4: bs.ml4,
      5: bs.ml5,
    },
    right: {
      0: bs.mr0,
      1: bs.mr1,
      2: bs.mr2,
      3: bs.mr3,
      4: bs.mr4,
      5: bs.mr5,
    },
    x: {
      0: bs.mx0,
      1: bs.mx1,
      2: bs.mx2,
      3: bs.mx3,
      4: bs.mx4,
      5: bs.mx5,
    },
    y: {
      0: bs.my0,
      1: bs.my1,
      2: bs.my2,
      3: bs.my3,
      4: bs.my4,
      5: bs.my5,
    },
  },
  padding: {
    all: {
      0: bs.p0,
      1: bs.p1,
      2: bs.p2,
      3: bs.p3,
      4: bs.p4,
      5: bs.p5,
    },
    top: {
      0: bs.pt0,
      1: bs.pt1,
      2: bs.pt2,
      3: bs.pt3,
      4: bs.pt4,
      5: bs.pt5,
    },
    bottom: {
      0: bs.pb0,
      1: bs.pb1,
      2: bs.pb2,
      3: bs.pb3,
      4: bs.pb4,
      5: bs.pb5,
    },
    left: {
      0: bs.pl0,
      1: bs.pl1,
      2: bs.pl2,
      3: bs.pl3,
      4: bs.pl4,
      5: bs.pl5,
    },
    right: {
      0: bs.pr0,
      1: bs.pr1,
      2: bs.pr2,
      3: bs.pr3,
      4: bs.pr4,
      5: bs.pr5,
    },
    x: {
      0: bs.px0,
      1: bs.px1,
      2: bs.px2,
      3: bs.px3,
      4: bs.px4,
      5: bs.px5,
    },
    y: {
      0: bs.py0,
      1: bs.py1,
      2: bs.py2,
      3: bs.py3,
      4: bs.py4,
      5: bs.py5,
    },
  },
};

function spacingDimenIsSet(dimen?: BsSpacingDimen): boolean {
  return dimen == 0 || dimen == 1 || dimen == 2 || dimen == 3 || dimen == 4 || dimen == 5;
}

function getBootstrapIntentClasses(component: BsComponent, ...intents: BsIntent[]): string[] {
  return intents.map((i) => intentClasses[component][i]);
}

function getBsSpacingClasses(spacing?: BsSpacingSpec): string[] {
  if (!spacing) {
    return [];
  }

  const output: string[] = [];

  for (const spacingType in spacingClasses) {
    if (spacing[spacingType]) {
      for (const spacingSide in spacingClasses[spacingType]) {
        if (spacingDimenIsSet(spacing[spacingType][spacingSide])) {
          const dimen = spacing[spacingType][spacingSide];
          output.push(spacingClasses[spacingType][spacingSide][dimen]);
        }
      }
    }
  }

  return output;
}

export { BsIntent, BsSpacingSpec, getBootstrapIntentClasses, getBsSpacingClasses };
