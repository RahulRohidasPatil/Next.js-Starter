"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Fragment } from "react"
import { Separator } from "./ui/separator"
import { SidebarTrigger } from "./ui/sidebar"
import { ModeToggle } from "./mode-toggle"

export default function SiteHeader() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)
  const lastIndex = segments.length - 1
  const hasSegments = segments.length > 0

  function buildHref(index: number) {
    return `/${segments.slice(0, index + 1).join("/")}`
  }

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <SidebarTrigger className="-ml-1" type="button" />
      <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-4"
      />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className={cn(hasSegments && "hidden md:block")}>
            {hasSegments ? (
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage>Home</BreadcrumbPage>
            )}
          </BreadcrumbItem>
          {segments.map((segment, index) => {
            const isLast = index === lastIndex
            return (
              <Fragment key={segment}>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem
                  className={cn("capitalize", !isLast && "hidden md:block")}
                >
                  {isLast ? (
                    <BreadcrumbPage>{segment}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={buildHref(index)}>{segment}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
      <ModeToggle />
    </header>
  )
}
