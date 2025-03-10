/** @type {import('next-sitemap').IConfig} */
const {appInfo} = require("./src/constants/sitemetaData");
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL|| appInfo.siteURL ,
    generateRobotsTxt: true, // (optional)
}