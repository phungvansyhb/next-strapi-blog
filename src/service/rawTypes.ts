const rawPostData = {
    "id": 6,
    "documentId": "qqkvirmtgzm8lqvvkrw51xpj",
    "title": "Tử vi 12 con giáp hôm nay ngày 9/2/2025: Sửu tích cực, Ngọ thuận lợi",
    "description": "Sửu hãy tiếp tục cố gắng, Ngọ hãy tự tin hành động.",
    "slug": "tu-vi-12-con-giap-hom-nay-ngay-9-2-2025-suu-tich-cuc-ngo-thuan-loi",
    "publishedAt": "2025-02-10T07:01:58.836Z",
    "cover": {
        "id": 4,
        "documentId": "mkp89pzunqf9um9mo4ugk9qp",
        "name": "post1.jfif",
        "alternativeText": null,
        "caption": null,
        "width": 197,
        "height": 180,
        "formats": {
            "thumbnail": {
                "name": "thumbnail_post1.jfif",
                "hash": "thumbnail_post1_12be4d56e7",
                "ext": ".jfif",
                "mime": "image/jpeg",
                "path": null,
                "width": 171,
                "height": 156,
                "size": 7.39,
                "sizeInBytes": 7390,
                "url": "/uploads/thumbnail_post1_12be4d56e7.jfif"
            }
        },
        "hash": "post1_12be4d56e7",
        "ext": ".jfif",
        "mime": "image/jpeg",
        "size": 9.6,
        "url": "/uploads/post1_12be4d56e7.jfif",
        "previewUrl": null,
        "provider": "local",
        "provider_metadata": null,
        "createdAt": "2025-02-10T03:08:12.758Z",
        "updatedAt": "2025-02-10T03:08:12.758Z",
        "publishedAt": "2025-02-10T03:08:12.759Z"
    },
    "category": {
        "id": 3,
        "documentId": "kas43bivsewy3zullrucljcr",
        "name": "Tử vi",
        "slug": "tu-vi",
        "description": "Tử vi",
        "createdAt": "2025-02-10T03:05:26.148Z",
        "updatedAt": "2025-02-10T03:05:26.148Z",
        "publishedAt": "2025-02-10T03:05:26.144Z"
    },
    "author": {
        "id": 1,
        "documentId": "mlksrlx00xw09u287n357f76",
        "name": "Phùng Văn Sỹ",
        "email": "phungvansyhb@gmail.com",
        "createdAt": "2025-02-10T07:00:15.631Z",
        "updatedAt": "2025-02-10T07:00:15.631Z",
        "publishedAt": "2025-02-10T07:00:15.619Z",
        "avatar": {
            "id": 4,
            "documentId": "mkp89pzunqf9um9mo4ugk9qp",
            "name": "post1.jfif",
            "alternativeText": null,
            "caption": null,
            "width": 197,
            "height": 180,
            "formats": {
                "thumbnail": {
                    "name": "thumbnail_post1.jfif",
                    "hash": "thumbnail_post1_12be4d56e7",
                    "ext": ".jfif",
                    "mime": "image/jpeg",
                    "path": null,
                    "width": 171,
                    "height": 156,
                    "size": 7.39,
                    "sizeInBytes": 7390,
                    "url": "/uploads/thumbnail_post1_12be4d56e7.jfif"
                }
            },
            "hash": "post1_12be4d56e7",
            "ext": ".jfif",
            "mime": "image/jpeg",
            "size": 9.6,
            "url": "/uploads/post1_12be4d56e7.jfif",
            "previewUrl": null,
            "provider": "local",
            "provider_metadata": null,
            "createdAt": "2025-02-10T03:08:12.758Z",
            "updatedAt": "2025-02-10T03:08:12.758Z",
            "publishedAt": "2025-02-10T03:08:12.759Z"
        },
    }
}
export type RawPost = typeof rawPostData

export type Pagination = {
    page: number, pageSize: number, pageCount: number, total: number
}

export type RawArticle = RawPost & { body: string }