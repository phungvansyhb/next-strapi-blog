'use client'
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {BookMarkedIcon, Check, SearchIcon, UserPenIcon} from "lucide-react";
import React, {useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {cn} from "@/lib/utils";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import qs from 'qs'
type Options = { value: string, label: string }

// const authors = [
//     {label: 'Phùng Văn Sỹ', value: '1'},
//     {label: 'Nguyễn Mai trang', value: '2'}
// ]
//
// const categories = [
//     {label: 'bài viết ẩm thực', value: 'bai-viet-am-thuc'},
//     {label: 'bài viết văn hóa', value: 'bai-viet-van-hoa'}
// ]

export default function PostSearchBar({categories = [] , authors = []}: { categories: Options[], authors: Options[] }) {
    const searchParams = useSearchParams()

    const [title, setTitle] = useState(searchParams.get('title')||'')
    const [author, setAuthor] = useState<Options | null>( searchParams.get('author') ? authors?.find(a=>a.value === searchParams.get('author'))! : null )
    const [open, setOpen] = React.useState(false)
    const [cate, setCate] = useState<Options | null>(searchParams.get('category') ? categories?.find(c=>c.value === searchParams.get('category'))! : null)
    const [openCate, setOpenCate] = useState(false)

    const router= useRouter()
    const pathName = usePathname()
    function onSearch(){
        const searchParams = qs.stringify({
            title : title||null,
            author: author?.value,
            category : cate?.value
        },{ skipNulls: true , encode : false })
        router.push(encodeURI(pathName+`?${searchParams}`) , {scroll : false})
    }

    return (
        <div className='flex flex-wrap gap-4 mb-8 justify-between'>
            <div className='flex-grow flex flex-wrap gap-4 items-end'>
                <h3 className='text-slate-400 hidden lg:block'>Tìm kiếm</h3>
                <Input className='w-full md:w-[200px]' placeholder='Tìm theo tên bài viết' defaultValue={title} onChange={e=>setTitle(e.target.value) } />
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full md:w-[200px] justify-start" >
                            <UserPenIcon size={14} /> {author ? <>{author.label} </> : <>Tác giả</>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0" side="bottom" align="start">
                        <Command>
                            <CommandInput placeholder="Tác giả..."/>
                            <CommandList>
                                <CommandEmpty>Không tìm thâý kêt quả </CommandEmpty>
                                <CommandGroup>
                                    {authors.map((a) => (
                                        <CommandItem
                                            key={a.value}
                                            value={a.value}
                                            onSelect={(value) => {
                                                setAuthor(
                                                   value === author?.value
                                                       ? null
                                                       : authors.find((priority) => priority.value === value)!
                                                )
                                                setOpen(false)
                                            }}
                                        >
                                            {a.label}
                                            <Check
                                                className={cn(
                                                    "ml-auto",
                                                    author?.value === a.value ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
                <Popover open={openCate} onOpenChange={setOpenCate}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full md:w-[200px] justify-start" >
                            <BookMarkedIcon size={14} />{cate ? <>{cate.label} </> : <> Danh mục</>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0" side="bottom" align="start">
                        <Command>
                            <CommandInput placeholder="Danh mục..."/>
                            <CommandList>
                                <CommandEmpty>Không tìm thấy kết quả</CommandEmpty>
                                <CommandGroup>
                                    {categories.map((a) => (
                                        <CommandItem
                                            key={a.value}
                                            value={a.value}
                                            onSelect={(value) => {
                                                setCate(
                                                    value === cate?.value
                                                        ? null
                                                        : categories.find((priority) => priority.value === value)!
                                                )
                                                setOpenCate(false)
                                            }}
                                        >
                                            {a.label}
                                            <Check
                                                className={cn(
                                                    "ml-auto",
                                                    cate?.value === a.value ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
            <Button onClick={onSearch}>Tìm kiếm <SearchIcon/></Button>
        </div>
    )
}