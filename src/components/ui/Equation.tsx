import katex from 'katex';
import { useMemo } from 'react';

/**
 * Renders a LaTeX chemical/mathematical expression with KaTeX.
 * Always left-to-right, even inside Arabic paragraphs (ARCHITECTURE_DECISIONS D12).
 * Only approved content may be passed here.
 */
export function Equation({ tex, display = false, label }: { tex: string; display?: boolean; label?: string }) {
  const html = useMemo(() => katex.renderToString(tex, { displayMode: display, throwOnError: false, output: 'htmlAndMathml' }), [tex, display]);
  return <span className="equation" dir="ltr" aria-label={label} dangerouslySetInnerHTML={{ __html: html }} />;
}
