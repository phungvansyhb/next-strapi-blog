import React, {useActionState} from 'react';
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {createComment} from "@/service/postService";
import {Button} from "@/components/ui/button";
import {Loader2Icon, LoaderIcon} from "lucide-react";
import revalidateComment from "@/actions/commentAction";


type CreateComment = {
    authorName: string,
    email: string,
    phone: string,
    content: string
}


function CreateCommentForm({articleId, type = 'post'}: { articleId: number, type?: 'app' | 'post' }) {

    const [_state, dispatch, isPending] = useActionState<CreateComment, FormData>(async (state, payload) => {
        if (!payload.get('content') || !payload.get('authorName') || !articleId) {
            return state
        }
        if (type === 'app') {
            await createComment({
                authorName: payload.get('authorName') as string,
                content: payload.get('content') as string,
                email: payload.get('email') as string,
                phone: payload.get('phone') as string,
                app: {connect: [articleId]}
            })
        } else {
            console.log("run herer")
            await createComment({
                authorName: payload.get('authorName') as string,
                content: payload.get('content') as string,
                email: payload.get('email') as string,
                phone: payload.get('phone') as string,
                article: {connect: [articleId]}
            })
        }

        await revalidateComment()
        return state
    }, {authorName: '', email: '', phone: '', content: ''})
    return (
        <>
            <h3 className="text-lg font-semibold mt-10">Thêm bình luận</h3>
            <form action={dispatch} className='lg:ml-4 text-sm'>
                <div className='grid grid-cols-3 gap-2 my-4 text-sm'>
                    <div className='col-span-3 lg:col-span-1'>
                        <label htmlFor='authorName'>Tên bạn *</label>
                        <Input placeholder="Tên hiển thị" required name='authorName' id='authorName'/>
                    </div>
                    <div className='col-span-1 lg:col-span-1'>
                        <label htmlFor='phone'>Số điện thoại</label>
                        <Input placeholder="Số điện thoại" name='phone' id='phone'/>
                    </div>
                    <div className='col-span-2 lg:col-span-1'>
                        <label htmlFor='email'>Email *</label>
                        <Input placeholder="Nhập email" required name='email' id='email' type='email'/>
                    </div>
                </div>
                <div>
                    <label className='text-sm' htmlFor='content'>Bình luận *</label>
                    <Textarea rows={8} placeholder="Nhập bình luận của bạn..." required name='content'
                              id='content'></Textarea>
                </div>
                <div className='mt-4 text-sm'>
                    <Button disabled={isPending}>{isPending && <Loader2Icon className='animate-spin'/>} Đăng bình
                        luận</Button>
                </div>
            </form>
        </>


    );
}

export default CreateCommentForm;