import {Metadata} from 'next';
import {appInfo, genSiteMetaData} from "@/constants/sitemetaData";

export const metadata: Metadata = genSiteMetaData('Điều khoản và dịch vụ')


export default function ContactPage() {
    return <div className="py-12 px-4 sm:px-6 lg:px-8">
        <article className="max-w-screen-md mx-auto leading-8">
            <h1 className="text-4xl text-center font-semibold mb-6">
                Điều khoản và dịch vụ
            </h1>
            <section>
                <p>
                    Bằng cách truy cập trang web tại <b>{appInfo.siteURL}</b>, bạn đồng ý bị ràng buộc bởi các điều
                    khoản dịch vụ này, tất cả các luật và quy định hiện hành và đồng ý rằng bạn chịu trách nhiệm tuân
                    thủ mọi luật pháp địa
                    phương hiện hành. Nếu bạn không đồng ý với bất kỳ điều khoản nào trong số các điều khoản này, bạn bị
                    cấm sử
                    dụng hoặc truy cập trang web này. Các tài liệu có trong trang web này được bảo vệ bởi luật bản quyền
                    và
                    luật nhãn hiệu hiện hành.
                </p>
            </section>
            <h2 className="text-2xl  font-semibold my-6">
                Khả năng thực thi của Điều khoản
            </h2>
            <p>
                Các Điều khoản này sẽ được áp dụng mỗi khi bạn truy cập Trang web của chúng tôi hoặc sử dụng Dịch vụ của
                chúng tôi.
                Điều khoản có sẵn trên trang sau: <a
                href={`${process.env.NEXT_PUBLIC_SITE_URL}/dieu-khoan-dich-vu`} className='underline'><b>{process.env.NEXT_PUBLIC_SITE_URL}/dieu-khoan-dich-vu</b></a>
            </p>
            <h2 className="text-2xl  font-semibold my-6">
                Các dịch vụ của chúng tôi
            </h2>
            <section className='ml-4'>
                <div>
                    <h3 className="text-xl font-semibold my-3 underline"><a href={`${process.env.NEXT_PUBLIC_SITE_URL}/blog`}>Blog</a> </h3>
                    Các bài viết được đăng tải hàng ngày trên website của chúng tôi
                </div>
                <div>
                    <h3 className="text-xl font-semibold my-3 underline"><a href={`${process.env.NEXT_PUBLIC_SITE_URL}/ung-dung`}>Phần
                        mềm</a></h3>
                    Các phần mềm được cập nhật liên tục trên website của chúng tôi
                </div>
            </section>

            <h2 className="text-2xl  font-semibold my-6">
                Chính sách bảo mật
            </h2>
            <p>
                Chúng tôi không yêu cầu bạn cung cấp bất kỳ thông tin xác thức nào!
            </p>
            <h2 className="text-2xl  font-semibold my-6">
                Hoạt động trái phép
            </h2>
            <p>
                Khi sử dụng Dịch vụ của chúng tôi, bạn đồng ý không: phỉ báng, lạm dụng, quấy rối, theo dõi, đe dọa hoặc vi phạm các quyền hợp pháp (chẳng hạn như quyền riêng tư và công khai) của người khác,
                sử dụng ngôn ngữ phân biệt chủng tộc, dân tộc hoặc xúc phạm trong các bình luận. Nghiêm cấm sao chép nội dung dưới mọi hình thức
            </p>
        </article>
    </div>

}
