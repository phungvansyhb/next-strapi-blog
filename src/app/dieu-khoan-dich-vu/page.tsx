import {Metadata} from 'next';
import {appInfo, genSiteMetaData} from "@/constants/sitemetaData";

export const metadata: Metadata = genSiteMetaData('Điều khoản và dịch vụ')


export default function ContactPage() {
    return <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-md mx-auto">
            <h1 className="text-2xl font-semibold mb-6">
                Điều khoản và dịch vụ
            </h1>
            <div>
                <p>
                    Bằng cách truy cập trang web tại <b>{appInfo.siteURL}</b>, bạn đồng ý bị ràng buộc bởi các điều
                    khoản dịch vụ
                    này,
                    tất cả các luật và quy định hiện hành và đồng ý rằng bạn chịu trách nhiệm tuân thủ mọi luật pháp địa
                    phương
                    hiện hành. Nếu bạn không đồng ý với bất kỳ điều khoản nào trong số các điều khoản này, bạn bị cấm sử
                    dụng
                    hoặc truy cập trang web này. Các tài liệu có trong trang web này được bảo vệ bởi luật bản quyền và
                    luật
                    nhãn
                    hiệu hiện hành.
                </p>
            </div>
        </div>
    </div>

}
