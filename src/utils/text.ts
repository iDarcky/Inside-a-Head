const WORDS_PER_MINUTE = 220;

export function wordCountFromPortableText(blocks: any[]): number {
  if (!Array.isArray(blocks)) return 0;
  let count = 0;
  for (const block of blocks) {
    if (block?._type === 'block' && Array.isArray(block.children)) {
      for (const child of block.children) {
        if (typeof child?.text === 'string') {
          count += child.text.trim().split(/\s+/).filter(Boolean).length;
        }
      }
    }
  }
  return count;
}

export function readingTimeFromPortableText(blocks: any[], explicit?: number): number {
  if (typeof explicit === 'number' && explicit > 0) return explicit;
  const words = wordCountFromPortableText(blocks);
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export function plainTextFromPortableText(blocks: any[], maxChars = 280): string {
  if (!Array.isArray(blocks)) return '';
  const parts: string[] = [];
  for (const block of blocks) {
    if (block?._type === 'block' && Array.isArray(block.children)) {
      for (const child of block.children) {
        if (typeof child?.text === 'string') parts.push(child.text);
      }
      parts.push(' ');
    }
  }
  const text = parts.join('').replace(/\s+/g, ' ').trim();
  return text.length > maxChars ? text.slice(0, maxChars - 1).trim() + '…' : text;
}
