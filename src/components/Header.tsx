'use client';

import * as React from 'react';
import Link from 'next/link';
import {
    BackpackIcon, BookCheckIcon,
    Calendar1Icon,
    ChevronDown,
    CircleDollarSign,
    CodesandboxIcon,
    ComponentIcon,
    Search
} from 'lucide-react';
import {useMediaQuery} from 'react-responsive';

import {cn} from '@/lib/utils';
import {Button} from '@/components/ui/button';
import {Sheet, SheetContent, SheetTitle, SheetTrigger,} from '@/components/ui/sheet';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {usePathname} from "next/navigation";
import {Link2Icon} from "@radix-ui/react-icons";

const NavItems = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => {
    const pathName = usePathname()
    const linkClassName = 'text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors px-5 py-2'
    return (
        <div ref={ref} className={cn('flex flex-col gap-4', className)} {...props}>
            <Link
                href="/"
                className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors px-5 py-2"
            >
                Trang chủ
            </Link>
            <Link
                href="/ung-dung"
                className={cn(linkClassName, { "font-bold":pathName === '/ung-dung' })}
            >
                Ứng dụng
            </Link>
            <Link
                href="/blog"
                className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors px-5 py-2"
            >
                Blog
            </Link>
            <Link
                href="/blog"
                className={cn(linkClassName, { "font-bold":pathName === '/blog' })}
            >
                Blog
            </Link>
            <Link
                href="/danh-muc"
                className={cn(linkClassName, { "font-bold":pathName === '/danh-muc' })}
            >
                Danh muc
            </Link>
            <Link
                href="/lich-am"
                className={cn(linkClassName, { "font-bold":pathName === '/lich-am' })}
            >
                Xem lịch âm
            </Link>
            <Link
                href="/tim-kiem"
                className={cn(linkClassName, { "font-bold":pathName === '/tim-kiem' })}
            >
                Tìm kiếm
            </Link>
        </div>
    )
});
NavItems.displayName = 'NavItems';

export default function Header() {
    const [isOpen, setIsOpen] = React.useState(false);
    const isDesktop = useMediaQuery({query: '(min-width: 768px)'});
    const linkClassName = 'inline-flex gap-1 items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors px-5 py-2'
    React.useEffect(() => {
        if (isDesktop) {
            setIsOpen(false);
        }
    }, [isDesktop]);
    const pathName = usePathname()
    return (
        <header className="container px-8 mx-auto xl:px-5 max-w-screen-lg py-3 lg:py-5">
            <nav>
                <div className="flex flex-wrap justify-between md:flex-nowrap md:gap-10">
                    <div
                        className="order-1 hidden w-full flex-col items-center justify-start md:order-none md:flex md:w-auto md:flex-1 md:flex-row md:justify-end">
                        <Link
                            href="/ung-dung"
                            className={cn(linkClassName, {"font-bold underline":pathName === '/ung-dung'})}
                        >
                            <CodesandboxIcon size={16}/> Phần mềm
                        </Link>
                        <Link
                            href="/blog"
                            className={cn(linkClassName, {"font-bold underline":pathName === '/blog'})}
                        >
                            <BackpackIcon size={16}/>
                            Blog
                        </Link>


                    </div>
                    <div className="flex w-full items-center justify-between md:w-auto">
                        <Link href="/" className="flex items-center space-x-2">
                              <span className="font-bold text-xl dark:text-white">
                                SPMT
                              </span>
                        </Link>
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="ml-auto rounded-md px-2 py-1 text-gray-500  focus:outline-none dark:text-gray-300 md:hidden"
                                >
                                    <svg
                                        stroke="currentColor"
                                        fill="none"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 8h16M4 16h16"
                                        ></path>
                                    </svg>
                                    <span className="sr-only">Menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="right"
                                className="w-[200px] rounded-tl-lg rounded-bl-lg"
                            >
                                <SheetTitle className="sr-only">Menu</SheetTitle>
                                <NavItems/>
                            </SheetContent>
                        </Sheet>
                    </div>
                    <div
                        className="order-2 hidden w-full flex-col items-center justify-start md:order-none md:flex md:w-auto md:flex-1 md:flex-row">
                        <Link
                            href="/danh-muc"
                            className={cn(linkClassName, {"font-bold underline":pathName === '/danh-muc'})}
                        >
                            <BookCheckIcon size={15}/> Categories
                        </Link>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <div className={cn(linkClassName + " flex gap-2 items-center", {"font-bold underline":pathName === '/lich-am'}) }>
                                    <Link2Icon /> Tiện ích <ChevronDown size={14}/>
                                </div>

                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='w-56'>
                                <DropdownMenuLabel>Cập nhật hàng ngày</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Calendar1Icon/>
                                    <Link
                                        href="/lich-am"

                                    >
                                        Xem lịch âm
                                    </Link>
                                </DropdownMenuItem>

                                {/*<DropdownMenuItem>*/}
                                {/*    <CircleDollarSign/>*/}
                                {/*    <Link*/}
                                {/*        href="/gia-vang"*/}

                                {/*    >*/}
                                {/*        Giá vàng hôm nay*/}
                                {/*    </Link>*/}
                                {/*</DropdownMenuItem>*/}

                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Link
                            href="/tim-kiem"
                            className={cn(linkClassName + " flex items-center gap-1", {"font-bold underline":pathName === '/tim-kiem'})}
                        >
                              <span>
                                <Search size={15}/>
                              </span>
                            Tìm kiếm
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}
