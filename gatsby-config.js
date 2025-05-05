module.exports = {
  siteMetadata: {
    title: "Fragaria - szkoła językowa Lubsko",
    description:
      "Fragaria to szkoła językowa w Lubsku, która oferuje profesjonalne kursy języka angielskiego, dostosowane do różnych poziomów zaawansowania.",
    author: "Fragaria School",
    siteUrl: "https://www.fragariaschool.pl",
    keywords: ["angielski", "kursy językowe", "szkoła językowa", 
      "nauka języka", "Lubsko", "Żary", "korepetycje", "korepetycje angielski",
    "korepetycje Lubsko"]
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-sass",
      options: {
        sassOptions: {
          indentedSyntax: true,
        },
      },
    },
    // {
    //   resolve: "gatsby-plugin-react-svg",
    //   options: {
    //     rule: {
    //       include: /src\/img\/svg/, // Ensure this matches your actual SVG folder
    //     },
    //   },
    // },
    {
      // Keep this as the first gatsby-source-filesystem plugin for Gatsby image support
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/static/img`,
        name: "uploads",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/img`,
        name: "images",
      },
    },
    `gatsby-plugin-image`,
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          "gatsby-remark-relative-images",
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 2048,
            },
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: {
              destinationDir: "static",
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-decap-cms",
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: "gatsby-plugin-purgecss",
      options: {
        develop: true, // Activates purging in npm run develop
        purgeOnly: ["/bulma-style.sass"], // Applies purging only on the Bulma CSS file
        printRejected: true,
      },
    },
    "gatsby-plugin-netlify", // Make sure to keep it last in the array
  ],
};