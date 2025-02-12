import { Metadata } from 'next';

export function genSiteMetaData(pageName : string): Metadata{
  return {
    metadataBase: new URL(appInfo.siteURL),
    title: pageName+ ` | ${appInfo.siteName}`,
    description: 'Website chuyên tin tức nổi bật, chia sẻ phần mềm hay, các tool tiện ích.\n Xem ngày, giờ hoàng đạo.\n Xem tỷ giá ngoại tệ, giá vàng',
    keywords: 'software, tiện ích, blog, xem ngày hoàng đạo',
    robots: 'index, follow',
    generator : 'Next.js 15.1.7',
    applicationName : appInfo.siteName,
    alternates: {
      canonical: './',
    },
    openGraph: {
      title: pageName+ ` | ${appInfo.siteName}`,
      description: 'Website chuyên tin tức nổi bật, chia sẻ phần mềm hay, các tool tiện ích.\n Xem ngày, giờ hoàng đạo.\n Xem tỷ giá ngoại tệ, giá vàng',
      images: 'https://example.com/image.jpg',
      type: 'website',
      url: 'https://example.com',
    },
    twitter: {
      card: 'summary_large_image',
      images: 'https://example.com/image.jpg',
      title: pageName+ ` | ${appInfo.siteName}`,
      description: 'Website chuyên tin tức nổi bật, chia sẻ phần mềm hay, các tool tiện ích.\n Xem ngày, giờ hoàng đạo.\n Xem tỷ giá ngoại tệ, giá vàng',
    },
  }
};

export const appInfo ={
  email : 'phungvansyhb@gmail.com',
  facebook : '',
  siteName : 'Web tiện ích',
  siteURL : process.env.NEXT_PUBLIC_SITE_URL || 'https://webtienich.com'
}