'use client'
import {useActionState, useRef} from "react"
import {Button} from "@/components/ui/moving-border"
import {Input} from "@/components/ui/input"
import {toast} from "@/hooks/use-toast"
import {Loader2Icon} from "lucide-react";
import {subcriberEmail} from "@/service/subcriber";
import {ToastAction} from "@/components/ui/toast";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
export default function NewsletterOption() {

    const fireController = useRef<any>()

    const [state, dispatch, isPending] = useActionState<{email : string },FormData>(async(state, payload) => {
        const isSuccess = await subcriberEmail(payload.get('email') as string)
        if(isSuccess){
            if(fireController.current){
                fireController.current?.shoot()
            }
            toast({
                title:"Đăng ký thành công",
                description : "Cảm ơn bạn, bạn sẽ nhận được thông báo khi có tin tức mới nhất",
                action: <ToastAction altText="close">Đóng</ToastAction>,
            })
        }else{
            toast({
                title:"Đăng ký thất bại",
                description : "Có vẻ email đã được đăng ký rồi",
                variant: "destructive",
                action: <ToastAction altText="close">Đóng</ToastAction>,
            })
        }
        return state
    }, {email: ''})


    const onInitHandler = ({ conductor } : any) => {
        fireController.current = conductor;
    };
    return (
        <section className="max-w-screen-lg mx-auto z-10">
            <div className="container mx-auto max-w-screen-lg px-4 py-8 lg:py-6 flex justify-center items-center">
                <div className="w-full max-w-xl text-center">

                    <p className="mb-6 text-sm text-white font-bold">
                        Đăng ký nhận bản tin của chúng tôi để nhận các bài viết mới nhất qua email
                    </p>
                    <form action={dispatch}
                          className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0 w-full max-w-md mx-auto">
                        <Input
                            name="email"
                            type="email"
                            placeholder="Email của bạn"
                            required
                            className="w-full z-10 text-white"
                        />
                        <Button type="submit"
                                className="p-1 border-neutral-200  w-full sm:w-auto" disabled={isPending}>
                            {isPending && <Loader2Icon className="animate-spin"/>}
                            Đăng ký
                        </Button>
                        <Fireworks onInit={onInitHandler}/>
                    </form>
                </div>

            </div>
        </section>
    )
}
