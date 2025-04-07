// utils/organizePages.js
export const organizePages = (pages) => {
  const pageMap = {};

  // Step 1: Organize the pages into a nested structure
  pages.forEach(({ node }) => {
    const slug = node.fields.slug;
    const path = node.frontmatter.path || slug;
    const title = node.frontmatter.title;
    const showInNav = node.frontmatter.nav === true || node.frontmatter.nav === null;
    const navigationPriority = node.frontmatter.navigationpriority || 0; // Default to 0 if not present

    const segments = path.split("/").filter(Boolean);
    const parentPath = `/${segments.slice(0, -1).join("/")}` || "/";
    const currentPath = `/${segments.join("/")}`;

    if (parentPath === '/' && pageMap[currentPath] && showInNav) {
      pageMap[currentPath] = { title, path: currentPath, children: pageMap[currentPath].children, navigationPriority };
    } else if (parentPath === '/' && showInNav) {
      pageMap[currentPath] = { title, path: currentPath, children: [], navigationPriority };
    }

    if (parentPath !== "/" && pageMap[parentPath] && showInNav) {
      pageMap[parentPath].children.push({ title, path: currentPath, children: [], navigationPriority });
    } else if (parentPath !== "/" && !pageMap[parentPath] && showInNav) {
      pageMap[parentPath] = { title, path: parentPath, children: [], navigationPriority };
      pageMap[parentPath].children.push({ title, path: currentPath, children: [], navigationPriority });
    }
  });

  // Step 2: Sort the pages and their children by navigationpriority
  const sortedPages = Object.values(pageMap)
    .filter(
      (page) =>
        !pages.some(({ node }) =>
          page.path?.startsWith(node.frontmatter.path) &&
          page.path !== node.frontmatter.path
        )
    )
    .map((page) => ({
      ...page,
      children: page.children.sort((a, b) => a.navigationPriority - b.navigationPriority), // Sort children
    }))
    .sort((a, b) => a.navigationPriority - b.navigationPriority); // Sort top-level pages

  return sortedPages;
};
