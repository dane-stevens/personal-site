module.exports = {
  siteMetadata: {
    title: `Dane Stevens`,
    author: `Dane Stevens`,
    description: `Personal development blog of Dane Stevens`,
    siteUrl: `https://danestevens.dev/`,
    social: {
      twitter: 'Tueriapp'
    }
  },
  plugins: [
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     path: `${__dirname}/content/blog`,
    //     name: `blog`,
    //   },
    // },
    'gatsby-plugin-sitemap',
    {
      resolve: `gatsby-source-rss-feed`,
      options: {
        url: `https://tueri.io/rss.xml`,
        name: `TueriBlog`,
        // Optional
        // Read parser document: https://github.com/bobby-brennan/rss-parser#readme
        // parserOption: {
        //   customFields: {
        //     item: ['itunes:duration']
        //   }
        // }
        plugins: [
          `gatsby-remark-prismjs`
        ]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-141806328-1`,
      },
    },
    // `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Dane Stevens`,
        short_name: `Dane Stevens`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
