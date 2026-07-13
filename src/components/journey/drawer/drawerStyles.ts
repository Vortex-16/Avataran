// ============================================================
//  drawerStyles — Shared theme-derived class strings for the
//  KandaDrawer and its tab components. Keeps tab files DRY.
//  Extracted from JourneyPage. Behaviour-preserving.
// ============================================================

export interface DrawerStyles {
  isLight: boolean;
  textTitle: string;
  textBody: string;
  textMuted: string;
  textMutedLess: string;
  bgCard: string;
  borderDivider: string;
}

export function getDrawerStyles(isLight: boolean): DrawerStyles {
  return {
    isLight,
    textTitle: isLight ? 'text-[#2b251f]' : 'text-[#f4e8d3]',
    textBody: isLight ? 'text-[#3a3229]/80' : 'text-[#f4e8d3]/70',
    textMuted: isLight ? 'text-[#3a3229]/55' : 'text-[#f4e8d3]/50',
    textMutedLess: isLight ? 'text-[#3a3229]/45' : 'text-[#f4e8d3]/40',
    bgCard: isLight ? 'bg-black/[0.015] border-black/[0.06]' : 'bg-white/[0.02] border-white/[0.05]',
    borderDivider: isLight ? 'border-black/[0.08]' : 'border-white/[0.04]',
  };
}
