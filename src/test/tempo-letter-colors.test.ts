/**
 * Vérifie que toutes les pastilles/badges affichant une lettre TEMPO (T/E/M/P/O)
 * dans le projet utilisent bien le mapping `tempoLetterColors` partagé,
 * sans recourir à une couleur en dur (fallback bg-* / text-* statique).
 *
 * Couvre Pourquoi Steero, Fonctionnalités et tout autre fichier qui
 * rendrait une lettre TEMPO en pastille à l'avenir.
 */
import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const SRC_DIR = join(process.cwd(), "src");
const TEMPO_LETTERS = ["T", "E", "M", "P", "O"];

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...walk(full));
    else if (/\.(tsx|ts)$/.test(entry) && !/\.(test|spec)\./.test(entry)) {
      out.push(full);
    }
  }
  return out;
}

interface Pastille {
  file: string;
  line: number;
  letter: string;
  className: string;
  source: "literal-letter" | "letter-variable" | "tempo-letter-component";
  snippet: string;
}

/**
 * Repère les ouvertures de span/div suivies d'une lettre TEMPO littérale,
 * du type :  <span className="...">T</span>
 * ou
 *   <span className="...">
 *     {row.letter}
 *   </span>     (avec mapping dynamique attendu)
 */
function findTempoBadges(file: string, content: string): Pastille[] {
  const results: Pastille[] = [];
  const lines = content.split("\n");

  // Cherche tout <span ... className={...}>X</span> ou <div ...>X</div>
  // où X est une lettre TEMPO seule (avec espaces optionnels).
  const literalRe =
    /<(span|div)\b([^>]*?\bclassName\s*=\s*(?:"([^"]*)"|\{`([^`]*)`\}|\{([^}]*)\}))[^>]*>\s*([TEMPO])\s*<\/\1>/g;

  let m: RegExpExecArray | null;
  while ((m = literalRe.exec(content)) !== null) {
    const className = m[3] ?? m[4] ?? m[5] ?? "";
    const letter = m[6];
    if (!TEMPO_LETTERS.includes(letter)) continue;
    // Position
    const before = content.slice(0, m.index);
    const line = before.split("\n").length;
    results.push({
      file,
      line,
      letter,
      className,
      source: "literal-letter",
      snippet: lines[line - 1]?.trim() ?? "",
    });
  }

  // Cherche les pastilles dynamiques : <span className={...}>{xxx.letter}</span>
  // ou {letter} — typiquement dans les .map((letter, ...) => <span ...>{letter}</span>)
  const dynamicRe =
    /<(span|div)\b([^>]*?\bclassName\s*=\s*(?:"([^"]*)"|\{`([^`]*)`\}|\{([^}]*)\}))[^>]*>\s*\{(?:[A-Za-z_]\w*\.)?(letter|f\.letter|row\.letter)\}\s*<\/\1>/g;

  while ((m = dynamicRe.exec(content)) !== null) {
    const className = m[3] ?? m[4] ?? m[5] ?? "";
    const before = content.slice(0, m.index);
    const line = before.split("\n").length;
    // On vérifiera que la className référence tempoLetterColors
    results.push({
      file,
      line,
      letter: "(dynamic)",
      className,
      source: "letter-variable",
      snippet: lines[line - 1]?.trim() ?? "",
    });
  }

  // Cherche les usages du composant partagé <TempoLetter ... /> qui sont
  // conformes par construction (mapping centralisé + gabarit canonique).
  const componentRe = /<TempoLetter\b[^/>]*\/?>/g;
  while ((m = componentRe.exec(content)) !== null) {
    const before = content.slice(0, m.index);
    const line = before.split("\n").length;
    results.push({
      file,
      line,
      letter: "(component)",
      className: "tempoLetterColors", // marqueur de conformité
      source: "tempo-letter-component",
      snippet: lines[line - 1]?.trim() ?? "",
    });
  }

  return results;
}

const STATIC_COLOR_RE = /\b(bg|text|ring|border)-(?!primary\/10\b)(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone|primary|secondary|accent|muted|destructive|foreground)(-\d{2,3})?\b/;

describe("TEMPO letter badges use shared tempoLetterColors mapping", () => {
  // Exclut le composant partagé qui EST la source de vérité du mapping
  // (sa pastille référence `color` dérivé de tempoLetterColors).
  const SHARED_COMPONENT = join(SRC_DIR, "components", "TempoLetter.tsx");
  const files = walk(SRC_DIR).filter((f) => f !== SHARED_COMPONENT);
  const allBadges: Pastille[] = [];
  for (const f of files) {
    const content = readFileSync(f, "utf8");
    allBadges.push(...findTempoBadges(f, content));
  }

  it("finds at least one TEMPO badge in the codebase", () => {
    expect(allBadges.length).toBeGreaterThan(0);
  });

  it("every dynamic TEMPO badge references tempoLetterColors", () => {
    // Pré-calcule, par fichier, les variables locales qui dérivent de tempoLetterColors
    // (ex: const colorClass = tempoLetterColors[letter] || "...")
    const derivedVarsByFile = new Map<string, Set<string>>();
    for (const f of files) {
      const content = readFileSync(f, "utf8");
      const set = new Set<string>();
      const re =
        /(?:const|let|var)\s+([A-Za-z_]\w*)\s*=\s*[^;\n]*tempoLetterColors\s*\[/g;
      let mm: RegExpExecArray | null;
      while ((mm = re.exec(content)) !== null) set.add(mm[1]);
      derivedVarsByFile.set(f, set);
    }

    const offenders = allBadges
      .filter((b) => b.source === "letter-variable")
      .filter((b) => {
        if (b.className.includes("tempoLetterColors")) return false;
        // Tolérance : interpolation `${var}` où var est dérivée de tempoLetterColors
        const interp = [...b.className.matchAll(/\$\{([A-Za-z_]\w*)\}/g)].map(
          (m) => m[1]
        );
        const derived = derivedVarsByFile.get(b.file) ?? new Set();
        return !interp.some((v) => derived.has(v));
      });

    if (offenders.length > 0) {
      const msg = offenders
        .map(
          (o) =>
            `  • ${o.file.replace(SRC_DIR + "/", "src/")}:${o.line}\n      className: ${o.className}\n      → ${o.snippet}`
        )
        .join("\n");
      throw new Error(
        `Pastilles TEMPO dynamiques sans tempoLetterColors :\n${msg}`
      );
    }
    expect(offenders).toEqual([]);
  });

  it("every literal TEMPO badge (T/E/M/P/O) uses tempoLetterColors and has no hardcoded color fallback", () => {
    const offenders = allBadges
      .filter((b) => b.source === "literal-letter")
      .filter((b) => {
        const cls = b.className;
        const usesMapping = cls.includes("tempoLetterColors");
        if (usesMapping) return false;
        // Sinon, c'est une couleur figée → c'est ce qu'on veut interdire
        return STATIC_COLOR_RE.test(cls);
      });

    if (offenders.length > 0) {
      const msg = offenders
        .map(
          (o) =>
            `  • ${o.file.replace(SRC_DIR + "/", "src/")}:${o.line}  [lettre "${o.letter}"]\n      className: ${o.className}\n      → ${o.snippet}`
        )
        .join("\n");
      throw new Error(
        `Pastilles TEMPO avec couleur en dur (sans tempoLetterColors) :\n${msg}`
      );
    }
    expect(offenders).toEqual([]);
  });

  it("the shared tempoLetterColors mapping is consistent across all files that define it", () => {
    const definitions: { file: string; body: string }[] = [];
    // Inclut le composant partagé (source de vérité) dans le scan.
    const filesForMapping = walk(SRC_DIR);
    for (const f of filesForMapping) {
      const content = readFileSync(f, "utf8");
      const m = content.match(
        /tempoLetterColors\s*:\s*Record<string,\s*string>\s*=\s*\{([\s\S]*?)\}/
      );
      if (m) definitions.push({ file: f, body: m[1] });
    }

    // Le mapping de référence vit désormais dans le composant partagé.
    // Au moins une définition doit exister (idéalement uniquement celle de
    // src/components/TempoLetter.tsx).
    expect(definitions.length).toBeGreaterThan(0);

    // Normalise (espaces/quotes) et compare toutes les définitions entre elles.
    const normalised = definitions.map((d) => ({
      file: d.file,
      body: d.body.replace(/\s+/g, " ").trim(),
    }));
    const reference = normalised[0].body;
    const mismatches = normalised.filter((d) => d.body !== reference);

    if (mismatches.length > 0) {
      const msg = mismatches
        .map(
          (m) =>
            `  • ${m.file.replace(SRC_DIR + "/", "src/")}\n      ${m.body}\n      attendu: ${reference}`
        )
        .join("\n");
      throw new Error(
        `Le mapping tempoLetterColors diverge entre fichiers :\n${msg}`
      );
    }

    // Vérifie aussi que les 5 lettres T/E/M/P/O y figurent toutes
    for (const L of TEMPO_LETTERS) {
      expect(reference).toMatch(new RegExp(`\\b${L}\\s*:`));
    }
  });

  it("TEMPO badges have a harmonised size & shape (rounded-md sm OR rounded-full lg)", () => {
    // Tolère deux gabarits canoniques :
    //   sm : w-7 h-7 rounded-md text-xs
    //   lg : w-11 h-11 rounded-full text-lg ring-4 ring-background
    // Les pastilles utilisant le composant <TempoLetter /> sont, par construction, conformes.
    const allowedSm = ["w-7", "h-7", "rounded-md"];
    const allowedLg = ["w-11", "h-11", "rounded-full"];

    const offenders = allBadges.filter((b) => {
      const cls = b.className;
      // Détecte un gabarit explicite si w-* présent
      const hasW = /\bw-\d+\b/.test(cls);
      const hasH = /\bh-\d+\b/.test(cls);
      if (!hasW && !hasH) return false; // pas de gabarit en dur ⇒ ignore
      const isSm = allowedSm.every((c) => cls.includes(c));
      const isLg = allowedLg.every((c) => cls.includes(c));
      return !(isSm || isLg);
    });

    if (offenders.length > 0) {
      const msg = offenders
        .map(
          (o) =>
            `  • ${o.file.replace(SRC_DIR + "/", "src/")}:${o.line}\n      className: ${o.className}\n      → ${o.snippet}`
        )
        .join("\n");
      throw new Error(
        `Pastilles TEMPO avec gabarit non harmonisé :\n${msg}\n\nUtiliser <TempoLetter size="sm" /> (w-7 h-7 rounded-md) ou <TempoLetter size="lg" /> (w-11 h-11 rounded-full).`
      );
    }
    expect(offenders).toEqual([]);
  });
});
