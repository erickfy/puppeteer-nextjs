"use client"

import * as React from "react"
import {
    CaretSortIcon,
    ChevronDownIcon,
    DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { TTableSearchPage } from "../users/page"
import { USER_ROLE } from "@prisma/client"

type Props = {
    data: TTableSearchPage[]
}
export default function UserTable({ data }: Props) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    /**
     * DOCS:
     * https://react.dev/reference/react/useTransition#examples
     * https://ui.shadcn.com/docs/components/data-table
     */

    const [isPending, startTransition] = React.useTransition()

    const router = useRouter()

    const searchColumns: ColumnDef<TTableSearchPage>[] = React.useMemo(() =>
        [
            {
                accessorKey: "image",
                header: () => <div className="text-right">Avatar</div>,
                cell: ({ row }) => {
                    const src = row.getValue("image") as string
                    const username = row.getValue('username') as string
                    return (
                        <Avatar className="cursor-pointer" >
                            <AvatarImage src={src || '/user-empty.webp'} alt={`${username} image`} />
                            <AvatarFallback >
                                {`${username.charAt(0)}${username.charAt(1)}`}
                            </AvatarFallback>
                        </Avatar>)
                },
            },
            {
                accessorKey: "username",
                header: ({ column }) => {
                    return (
                        <Button
                            variant="ghost"
                            className="text-right justify-end"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            Usuario
                            <CaretSortIcon className="ml-2 h-4 w-4" />
                        </Button>
                    )
                },
                cell: ({ row }) => <div className="lowercase">{row.getValue("username")}</div>,
            },
            {
                accessorKey: "fullNames",
                header: ({ column }) => (
                    <Button
                        variant="ghost"
                        className="text-right pr-0"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Usuario
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>),
                cell: ({ row }) => {
                    return <div className="text-right font-medium">{row.getValue("fullNames")}</div>
                },
            },
            {
                accessorKey: "role",
                header: ({ column }) => (
                    <Button
                        variant="ghost"
                        className="text-right pr-0"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Rol
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>),
                cell: ({ row }) => {
                    const role = row.getValue("role") === USER_ROLE.ADMIN ? 'Admin' : 'Usuario'
                    return <div className="text-right font-medium">{role}</div>
                },
            },
            {
                accessorKey: "active",
                header: ({ column }) => (
                    <Button
                        variant="ghost"
                        className="text-right pr-0"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Activo
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>),
                cell: ({ row }) => {
                    const role = row.getValue("active") as boolean
                    return <div className="text-right font-medium">{role ?
                        <Badge>Activo</Badge> :
                        <Badge variant={"destructive"}>Inactivo</Badge>
                    }</div>
                },
            },
            {
                accessorKey: "instagramHistory",
                header: () => <div className="text-right">Scrappings de Instagram</div>,
                cell: ({ row }) => {
                    const instagram = (row.getValue('instagramHistory') as { list: string[] })?.list.length ?? 0
                    return <div className="text-right font-medium">{instagram}</div>
                },
            },
            {
                accessorKey: "amazonHistory",
                header: () => <div className="text-right">Scrappings de Amazon</div>,
                cell: ({ row }) => {
                    const amazon = (row.getValue('amazonHistory') as { list: string[] })?.list.length ?? 0
                    return <div className="text-right font-medium">{amazon}</div>
                },
            },
            {
                accessorKey: "bookStoreHistory",
                header: () => <div className="text-right">Scrappings de Libros</div>,
                cell: ({ row }) => {
                    const bookStore = (row.getValue('bookStoreHistory') as { list: string[] })?.list.length ?? 0
                    return <div className="text-right font-medium">{bookStore}</div>
                },
            },
            {
                accessorKey: "mercadoLibreHistory",
                header: () => <div className="text-right">Scrappings de MercadoLibre</div>,
                cell: ({ row }) => {
                    const mercadoLibre = (row.getValue('mercadoLibreHistory') as { list: string[] })?.list.length ?? 0
                    return <div className="text-right font-medium">{mercadoLibre}</div>
                },
            },
            {
                id: "actions",
                enableHiding: false,
                cell: ({ row }) => {
                    const currentUser = row.original

                    return (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <DotsHorizontalIcon className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem
                                    onClick={() => {
                                        // navigator.clipboard.writeText(currentUser.username)
                                        startTransition(async () => {
                                            toast.promise(
                                                fetch('/api/user',
                                                    {
                                                method: 'POST', body: JSON.stringify({
                                                    userId: currentUser.id,
                                                    active: currentUser.active
                                                })
                                            }),
                                                {
                                                    loading: `Dando de ${currentUser.active ? 'Baja' : 'Alta'}`,
                                                    success: (request) => {
                                                        if (request.ok) {
                                                            router.refresh();
                                                            return `Usuario ${currentUser.username} dado de ${currentUser ? 'Baja' : 'Alta'}`
                                                        }
                                                    },
                                                    error: `Ha ocurrido un error inesperado`
                                                })
                                        })
                                    }}
                                >
                                    Dar de {currentUser.active ? 'Baja' : 'Alta'} al usuario
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )
                },
            },
        ], [isPending])


    const table = useReactTable({
        data,
        columns: searchColumns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    id="username-filter"
                    placeholder="Filtrar usuarios"
                    value={(table.getColumn("username")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("username")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Mostrar <ChevronDownIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={searchColumns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredRowModel().rows.length} filas(s) totales.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
