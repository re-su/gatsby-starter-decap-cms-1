// utils/organizePages.js
export const organizePages = (pages) => {
    const pageMap = {};
    pages.forEach(({ node }) => {
      const slug = node.fields.slug;
      const path = node.frontmatter.path || slug;
      const title = node.frontmatter.title;
  
      const segments = path.split("/").filter(Boolean);
      const parentPath = `/${segments.slice(0, -1).join("/")}` || "/";
      const currentPath = `/${segments.join("/")}`;
  
      if (!pageMap[currentPath]) {
        pageMap[currentPath] = { title, path: currentPath, children: [] };
      }
  
      if (parentPath !== "/" && pageMap[parentPath]) {
        pageMap[parentPath].children.push(pageMap[currentPath]);
      }
    });
  
    return Object.values(pageMap).filter(
      (page) =>
        !pages.some(({ node }) =>
          page.path?.startsWith(node.frontmatter.path) &&
          page.path !== node.frontmatter.path
        )
    );
  };
  