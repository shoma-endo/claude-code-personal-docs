const ALERT_PATTERN = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\n?/i;

interface MdastNode {
  type: string;
  value?: string;
  children?: MdastNode[];
  data?: { hProperties?: Record<string, unknown> };
}

function traverseBlockquotes(nodes: MdastNode[]) {
  for (const node of nodes) {
    if (node.type === 'blockquote') processBlockquote(node);
    if (node.children) traverseBlockquotes(node.children);
  }
}

function processBlockquote(node: MdastNode) {
  const firstChild = node.children?.[0];
  if (firstChild?.type !== 'paragraph') return;

  const firstInline = firstChild.children?.[0];
  if (firstInline?.type !== 'text' || firstInline.value === undefined) return;

  const match = firstInline.value.match(ALERT_PATTERN);
  if (!match) return;

  node.data ??= {};
  node.data.hProperties ??= {};
  node.data.hProperties.className = [`alert-${match[1].toLowerCase()}`];

  firstInline.value = firstInline.value.slice(match[0].length).trimStart();

  if (firstInline.value === '') firstChild.children?.shift();
  if ((firstChild.children?.length ?? 0) === 0) node.children?.shift();
}

export function remarkAlerts() {
  return (tree: MdastNode) => {
    traverseBlockquotes(tree.children ?? []);
  };
}
