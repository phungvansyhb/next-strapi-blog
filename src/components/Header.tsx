'use client';

import * as React from 'react';
import Link from 'next/link';
import {AArrowDown, Calendar1Icon, ChevronDown, CircleDollarSign, DollarSignIcon, Search} from 'lucide-react';
import {useMediaQuery} from 'react-responsive';

import {cn} from '@/lib/utils';
import {Button} from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import {
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const NavItems = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
    <div ref={ref} className={cn('flex flex-col gap-4', className)} {...props}>
        <Link
            href="/"
            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors px-5 py-2"
        >
            Trang chủ
        </Link>
        <Link
            href="/a-propos"
            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors px-5 py-2"
        >
            Về tác giả
        </Link>

        <Link
            href="/lich-am"
            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors px-5 py-2"
        >
            Xem lịch âm
        </Link>
        <Link
            href="/contact"
            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors px-5 py-2"
        >
            Giá vàng
        </Link>
        <Link
            href="/blog"
            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors px-5 py-2"
        >
            Blog
        </Link>
        <Link
            href="/categorie"
            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors px-5 py-2"
        >
            Categories
        </Link>
        <Link
            href="/search"
            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors px-5 py-2"
        >
            Tìm kiếm
        </Link>
    </div>
));
NavItems.displayName = 'NavItems';

export default function Header() {
    const [isOpen, setIsOpen] = React.useState(false);
    const isDesktop = useMediaQuery({query: '(min-width: 768px)'});
    const linkClassName = 'text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors px-5 py-2'
    React.useEffect(() => {
        if (isDesktop) {
            setIsOpen(false);
        }
    }, [isDesktop]);

    return (
        <header className="container px-8 mx-auto xl:px-5 max-w-screen-lg py-3 lg:py-5">
            <nav>
                <div className="flex flex-wrap justify-between md:flex-nowrap md:gap-10">
                    <div
                        className="order-1 hidden w-full flex-col items-center justify-start md:order-none md:flex md:w-auto md:flex-1 md:flex-row md:justify-end">
                        <Link
                            href="/"
                            className={linkClassName}
                        >
                            Trang chủ
                        </Link>
                        <Link
                            href="/a-propos"
                            className={linkClassName}
                        >
                            Về tác giả
                        </Link>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <div className={linkClassName + " flex gap-2 items-center"}>Tiện ích <ChevronDown size={14}/></div>

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

                                <DropdownMenuItem>
                                    <CircleDollarSign/>
                                    <Link
                                        href="/contact"

                                    >
                                        Giá vàng hôm nay
                                    </Link>
                                </DropdownMenuItem>

                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>
                    <div className="flex w-full items-center justify-between md:w-auto">
                        <Link href="/" className="flex items-center space-x-2">
                              <span className="font-bold text-xl dark:text-white">
                                LOGO
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
                            href="/blog"
                            className={linkClassName}
                        >
                            Blog
                        </Link>
                        <Link
                            href="/categorie"
                            className={linkClassName}
                        >
                            Categories
                        </Link>
                        <Link
                            href="/search"
                            className={linkClassName + " flex items-center gap-1"}
                        >
                              <span>
                                <Search className="h-4 w-4"/>
                              </span>
                            Tìm kiếm
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}
