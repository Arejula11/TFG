function parseGraphNodes(dotString) {
  const lines = dotString.split('\n');
  const nodes = new Set();

  for (const line of lines) {
    const trimmed = line.trim();

    // Skip irrelevant or edge lines
    if (
      trimmed === '' ||
      trimmed.includes('->') ||
      trimmed.startsWith('digraph') ||
      trimmed.startsWith('rankdir') ||
      trimmed.startsWith('node ') ||
      trimmed.startsWith('edge ') ||
      trimmed === '}'
    ) {
      continue;
    }

    // Clean and add node name
    const cleanLine = trimmed.replace(/(^"|"$)/g, '').trim();
    if (cleanLine) {
      nodes.add(cleanLine);
    }
  }

  return Array.from(nodes);
}

export {parseGraphNodes}




