import type { Block, Segment } from "./memos";

function hasText(segments: Segment[]) {
  return segments.some((s) => (typeof s === "string" ? s : s.b).trim() !== "");
}

function isBold(el: HTMLElement) {
  const weight = el.style.fontWeight;
  return el.tagName === "B" || el.tagName === "STRONG" || weight === "bold" || Number(weight) >= 600;
}

function segmentsOf(nodes: Node[]) {
  const out: Segment[] = [];
  const push = (s: Segment) => {
    const last = out[out.length - 1];
    if (typeof s === "string" && typeof last === "string") out[out.length - 1] = last + s;
    else out.push(s);
  };
  for (const node of nodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      push(node.textContent ?? "");
    } else if (node instanceof HTMLElement) {
      const text = node.textContent ?? "";
      if (text) push(isBold(node) ? { b: text } : text);
    }
  }
  return out;
}

// 편집 영역의 HTML을 저장용 블록으로 바꾼다 (제목=h2, 소제목=h3, 목록, 굵게).
export function htmlToBlocks(root: HTMLElement): Block[] {
  const blocks: Block[] = [];
  let inline: Node[] = [];

  const flush = () => {
    const text = segmentsOf(inline);
    inline = [];
    if (hasText(text)) blocks.push({ type: "p", text });
  };

  const walk = (parent: Node) => {
    for (const node of Array.from(parent.childNodes)) {
      const tag = node instanceof HTMLElement ? node.tagName : "";
      if (tag === "H2" || tag === "H3") {
        flush();
        const text = node.textContent?.trim();
        if (text) blocks.push({ type: tag === "H2" ? "h2" : "h3", text });
      } else if (tag === "UL" || tag === "OL") {
        flush();
        const items = Array.from((node as HTMLElement).querySelectorAll("li"))
          .map((li) => li.textContent?.trim() ?? "")
          .filter(Boolean);
        if (items.length) blocks.push({ type: "list", items });
      } else if (tag === "DIV" || tag === "P") {
        flush();
        // 서식을 바꾸면 블록 안에 블록이 들어갈 수 있어 안쪽까지 훑는다.
        if ((node as HTMLElement).querySelector("h2, h3, ul, ol, div, p")) {
          walk(node);
        } else {
          const text = segmentsOf(Array.from(node.childNodes));
          if (hasText(text)) blocks.push({ type: "p", text });
        }
      } else {
        inline.push(node);
      }
    }
  };

  walk(root);
  flush();
  return blocks;
}

// 저장해 둔 블록을 편집 영역에 다시 채운다 (임시 저장 복원용).
export function writeBlocks(root: HTMLElement, blocks: Block[]) {
  root.replaceChildren();
  for (const block of blocks) {
    if (block.type === "h2" || block.type === "h3") {
      const el = document.createElement(block.type);
      el.textContent = block.text;
      root.append(el);
    } else if (block.type === "list") {
      const ul = document.createElement("ul");
      for (const item of block.items) {
        const li = document.createElement("li");
        li.textContent = item;
        ul.append(li);
      }
      root.append(ul);
    } else {
      const p = document.createElement("p");
      for (const s of block.text) {
        if (typeof s === "string") {
          p.append(s);
        } else {
          const b = document.createElement("b");
          b.textContent = s.b;
          p.append(b);
        }
      }
      root.append(p);
    }
  }
}
