const DIRECTIVE_PATTERN = /^:::([a-z][a-z0-9-]*)\s*$/;

interface MdastNode {
  type: string;
  value?: string;
  children?: MdastNode[];
  data?: { hProperties?: Record<string, unknown> };
}

function traverse(nodes: MdastNode[]) {
  for (const node of nodes) {
    if (node.type === 'paragraph') processParagraph(node);
    if (node.children) traverse(node.children);
  }
}

function processParagraph(node: MdastNode) {
  if (!node.children || node.children.length !== 1) return;
  const child = node.children[0];
  if (child.type !== 'text' || child.value === undefined) return;

  const match = child.value.match(DIRECTIVE_PATTERN);
  if (!match) return;

  node.data ??= {};
  node.data.hProperties ??= {};
  node.data.hProperties.className = [`directive-${match[1]}`];
  node.children = [];
}

export function remarkDirectives() {
  return (tree: MdastNode) => {
    traverse(tree.children ?? []);
  };
}
