import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export const ServicesDropdown = () => {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger
                        className=""
                        onClick={() => scrollToSection("services")}
                    >
                        Services     <ChevronDown
                            className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
                            aria-hidden="true"
                        />
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-black text-white">
                        <ul className="grid gap-2 md:w-[400px] lg:w-[600px] lg:grid-cols-[.75fr_1fr] py-4 ">
                            <li className="row-span-4">
                                <NavigationMenuLink asChild>
                                    <div
                                        className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"

                                    >
                                        <img
                                            src={"/cs-logo.png"}

                                            className="w-40 h-40 object-fill md:object-cover"
                                        />
                                        <div className="mb-2 text-lg font-medium sm:mt-4 hover:text-[#bb8d03]">Brand Identity / Logo Design</div>
                                        <a href="/logo-design" className="hover:text-[#bb8d03]">Logo Design</a>
                                        <a href="/logo-design" className="hover:text-[#bb8d03]">Cooperate Profile Design</a>
                                        <a href="/business-card" className="hover:text-[#bb8d03]">Business Card Design</a>
                                        <a href="/letter-head" className="hover:text-[#bb8d03]">Letter Head Design</a>
                                        <a href="/email-signature-design" className="hover:text-[#bb8d03]">Email Signature Design</a>
                                    </div>
                                </NavigationMenuLink>
                            </li>

                            <ListItem href="" title="Web Development" className="hover:text-[#bb8d03]">
                                <Link href="/web-development" passHref>
                                    <li className="hover:underline hover:underline-offset-4 hover:text-[#bb8d03] cursor-pointer">
                                        Business Website
                                    </li>
                                </Link>
                                <Link href="/e-commerce-websites" passHref>
                                    <li className="hover:underline hover:underline-offset-4 hover:text-[#bb8d03] cursor-pointer">
                                        E-commerce Website
                                    </li>
                                </Link>
                                <Link href="/custom-web-development" passHref>
                                    <li className="hover:underline hover:underline-offset-4 hover:text-[#bb8d03] cursor-pointer">
                                        Custom Website
                                    </li>
                                </Link>
                            </ListItem>
                            <ListItem href="/social-media" title="Social Media Service" className="hover:text-[#bb8d03]">
                                <Link href="/social-media" passHref>
                                    <li className="hover:underline hover:underline-offset-4 hover:text-[#bb8d03] cursor-pointer">
                                        Social Media Design
                                    </li>
                                </Link>
                                <Link href="/social-media-management" passHref>
                                    <li className="hover:underline hover:underline-offset-4 hover:text-[#bb8d03] cursor-pointer">
                                        Social Media Managment
                                    </li>
                                </Link>
                                <Link href="/social-media-growth" passHref>
                                    <li className="hover:underline hover:underline-offset-4 hover:text-[#bb8d03] cursor-pointer">
                                        Social Media Growth
                                    </li>
                                </Link>
                            </ListItem>
                            <ListItem href="/label-design" title="Packaging & Label Design" className="hover:text-[#bb8d03]">
                                <li className="hover:underline hover:underline-offset-4 hover:text-[#bb8d03]">Packaging Design</li>
                                <li className="hover:underline hover:underline-offset-4 hover:text-[#bb8d03]">Label Design</li>
                                <li className="hover:underline hover:underline-offset-4 hover:text-[#bb8d03]">Sticker Design</li>
                            </ListItem>
                            <ListItem href="/leaflet-design" title="Leaflet,Flyer & Poster Design" className="hover:text-[#bb8d03]">
                                <li className="hover:underline hover:underline-offset-4 hover:text-[#bb8d03]">Leaflets Design</li>
                                <li className="hover:underline hover:underline-offset-4 hover:text-[#bb8d03]">Flyers Design</li>
                                <li className="hover:underline hover:underline-offset-4 hover:text-[#bb8d03]">Poster Design</li>
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};

function ListItem({
    title,
    children,
    href,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link href={href}>
                    <div className="text-sm leading-none font-medium mb-2">{title}</div>
                    <p className="grid grid-cols-2 text-muted-foreground  text-sm leading-snug">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}
