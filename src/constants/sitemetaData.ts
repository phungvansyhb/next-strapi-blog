import { Metadata } from 'next';

export function genSiteMetaData(pageName : string): Metadata{
  return {
    title: pageName+ '- Web tiện ích',
    description: 'Website chuyên tin tức nổi bật, chia sẻ phần mềm hay, các tool tiện ích.\n Xem ngày, giờ hoàng đạo.\n Xem tỷ giá ngoại tệ, giá vàng',
    keywords: 'software, tiện ích, blog, xem ngày hoàng đạo',
    viewport: 'width=device-width, initial-scale=1',
    robots: 'index, follow',
    openGraph: {
      title: pageName+ '- Web tiện ích',
      description: 'Website chuyên tin tức nổi bật, chia sẻ phần mềm hay, các tool tiện ích.\n Xem ngày, giờ hoàng đạo.\n Xem tỷ giá ngoại tệ, giá vàng',
      images: 'https://example.com/image.jpg',
      type: 'website',
      url: 'https://example.com',
    },
    twitter: {
      card: 'summary_large_image',
      images: 'https://example.com/image.jpg',
      title: pageName+ '- Web tiện ích',
      description: 'Website chuyên tin tức nổi bật, chia sẻ phần mềm hay, các tool tiện ích.\n Xem ngày, giờ hoàng đạo.\n Xem tỷ giá ngoại tệ, giá vàng',
    },
  }
};

export const appInfo ={
  email : 'phungvansyhb@gmail.com',
  facebook : '',
  zalo : ''
}