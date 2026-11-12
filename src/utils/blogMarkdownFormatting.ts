// Convert only complete, recognisable text grids. Prose and ordinary code stay intact.
const border = /^\s*\+(?:[-–—=─━]{3,}\+)+\s*$/;
const row = /^\s*\|.*\|\s*$/;
const cellText = (text: string) => text.replace(/\|/g, '\\|');

function convertGrid(lines: string[]): string | null {
  if (lines.length < 3 || !border.test(lines[0]) || !border.test(lines.at(-1)!)) return null;
  const groups: string[][][] = [];
  let current: string[][] = [];
  for (const line of lines) {
    if (border.test(line)) {
      if (current.length) groups.push(current);
      current = [];
    } else if (row.test(line)) {
      const cells = line.trim().slice(1, -1).split('|').map(cell => cell.trim());
      if (!cells.some(Boolean)) return null;
      current.push(cells);
    } else return null;
  }
  const columns = Math.max(...groups.flat().map(cells => cells.length));
  if (!groups.length || columns < 2 || columns > 12) return null;
  let caption = '';
  if (groups[0].every(cells => cells.length === 1)) {
    caption = groups.shift()!.map(cells => cells[0]).join(' ') + '\n\n';
  }
  if (!groups.length || groups.some(group => group.some(cells => cells.length !== columns))) return null;
  // Border-separated groups represent rows; wrapped lines belong to the same cells.
  const rows = groups.map(group => Array.from({ length: columns }, (_, index) => cellText(group.map(cells => cells[index]).filter(Boolean).join(' '))));
  // A text grid has no explicit column headings. Do not invent any or promote data to headings.
  const header = `| ${Array(columns).fill('').join(' | ')} |`;
  const separator = `| ${Array(columns).fill('---').join(' | ')} |`;
  return caption + [header, separator, ...rows.map(cells => `| ${cells.join(' | ')} |`)].join('\n');
}

export function normalizeBlogMarkdown(markdown: string): string {
  const lines = markdown.split(/\r?\n/);
  const result: string[] = [];
  for (let index = 0; index < lines.length; index++) {
    const fence = lines[index].match(/^ {0,3}(`{3,}|~{3,})([^`~]*)$/);
    if (fence) {
      const end = lines.findIndex((line, candidate) => candidate > index && new RegExp(`^ {0,3}${fence[1][0]}{${fence[1].length},}\\s*$`).test(line));
      if (end < 0) { result.push(...lines.slice(index)); break; }
      const body = lines.slice(index + 1, end);
      const trimmed = body.join('\n').trim().split('\n');
      const converted = /^(?:text|plaintext|ascii)?$/i.test(fence[2].trim()) ? convertGrid(trimmed) : null;
      result.push(converted === null ? lines.slice(index, end + 1).join('\n') : converted);
      index = end;
      continue;
    }
    if (border.test(lines[index])) {
      let end = index + 1;
      while (end < lines.length && (border.test(lines[end]) || row.test(lines[end]))) end++;
      const converted = convertGrid(lines.slice(index, end));
      if (converted !== null) { result.push(converted); index = end - 1; continue; }
    }
    result.push(lines[index]);
  }
  return result.join('\n');
}
