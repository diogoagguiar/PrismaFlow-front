"use client";

import { Paper, Button } from "@mui/material";
import PFTable, { type ColumnDef } from "@/components/crud/PFTable";
import PFTopToolbar from "@/components/crud/PFTopToolbar";
import { useSales } from "@/modules/sales/hooks/useSales";
import type { SaleListItem } from "@/modules/sales/types/salesTypes";
import { useState } from "react";

// ==============================
// 🔹 Página simplificada de vendas
// ==============================
export default function SalesPage() {
    // Estados locais
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    // Hook de vendas
    const { data, isLoading, isFetching, refetch } = useSales({
        page,
        limit,
        search
    });

    // 🔍 DEBUG - Verifique no console
    console.log('🔍 Dados completos:', data);
    console.log('🔍 Lista de vendas:', data?.data);
    if (data?.data && data.data.length > 0) {
        console.log('🔍 Primeira venda:', data.data[0]);
        console.log('🔍 Campos disponíveis:', Object.keys(data.data[0]));
    }

    // ==============================
    // 🔹 Handlers simples
    // ==============================
    const handleSelectRow = (id: string | number, selected: boolean) => {
        const numericId = Number(id);
        setSelectedIds(prev =>
            selected ? [...prev, numericId] : prev.filter(item => item !== numericId)
        );
    };

    const handleSelectAll = (selected: boolean, ids: (string | number)[]) => {
        const numericIds = ids.map(id => Number(id));
        setSelectedIds(selected ? numericIds : []);
    };

    const handleEdit = (row: SaleListItem) => {
        console.log("Editar venda:", row);
    };

    const handleDelete = (row: SaleListItem) => {
        console.log("Excluir venda:", row);
        if (confirm(`Deseja excluir a venda #${row.id}?`)) {
            // Implementar exclusão aqui
        }
    };

    const handleView = (row: SaleListItem) => {
        console.log("Visualizar venda:", row);
    };

    // ==============================
    // 🔹 Colunas da tabela - VERSÃO DEBUG
    // ==============================
    const columns: ColumnDef<SaleListItem>[] = [
        { key: "id", label: "ID", width: 80 },
        {
            key: "clientName",
            label: "Cliente",
            render: (row) => {
                console.log('🔍 Renderizando cliente:', row.clientName, 'da venda:', row.id);
                return row.clientName || "-";
            }
        },
        {
            key: "total",
            label: "Total",
            render: (row) => {
                const formatted = row.total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                });
                console.log('🔍 Renderizando total:', formatted, 'da venda:', row.id);
                return formatted;
            }
        },
        {
            key: "paymentStatus",
            label: "Status Pagamento",
            render: (row) => {
                const statusConfig: Record<string, { label: string; color: "warning" | "success" | "error" }> = {
                    PENDING: { label: "Pendente", color: "warning" },
                    CONFIRMED: { label: "Confirmado", color: "success" },
                    CANCELED: { label: "Cancelado", color: "error" },
                };
                const config = statusConfig[row.paymentStatus];
                return (
                    <Button
                        variant="outlined"
                        size="small"
                        color={config?.color || "primary"}
                        sx={{ textTransform: 'none', pointerEvents: 'none' }}
                    >
                        {config?.label || row.paymentStatus}
                    </Button>
                );
            },
        },
        {
            key: "createdAt",
            label: "Data",
            render: (row) => new Date(row.createdAt).toLocaleDateString("pt-BR"),
        },
    ];

    // ==============================
    // 🔹 Render
    // ==============================
    return (
        <Paper
            elevation={0}
            sx={{
                borderRadius: 2,
                borderColor: "grey.200",
                backgroundColor: "background.paper",
                p: 3,
            }}
        >
            {/* Top Toolbar */}
            <PFTopToolbar
                title="Vendas"
                onSearch={(value) => setSearch(value)}
                onRefresh={() => refetch()}
                onAdd={() => console.log("Nova venda")}
                addLabel="Nova venda"
                actionsExtra={
                    selectedIds.length > 0 && (
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => {
                                if (confirm(`Excluir ${selectedIds.length} vendas selecionadas?`)) {
                                    console.log("Excluir vendas:", selectedIds);
                                    setSelectedIds([]);
                                }
                            }}
                            sx={{
                                whiteSpace: "nowrap",
                                fontWeight: 500,
                                textTransform: "none",
                                borderWidth: 1.5,
                                "&:hover": { borderWidth: 1.5 },
                            }}
                        >
                            Excluir selecionadas ({selectedIds.length})
                        </Button>
                    )
                }
            />

            {/* Tabela */}
            <PFTable
                columns={columns}
                rows={data?.data || []}
                total={data?.total || 0}
                page={page}
                pageSize={limit}
                loading={isLoading || isFetching}
                onPageChange={(newPage) => setPage(newPage)}
                onPageSizeChange={(newLimit) => setLimit(newLimit)}
                getRowId={(row) => row.id}
                onRowClick={(_, row) => handleView(row)}
                onEdit={(row) => handleEdit(row)}
                onDelete={(row) => handleDelete(row)}
                selectable
                selectedRows={selectedIds}
                onSelectRow={handleSelectRow}
                onSelectAll={handleSelectAll}
            />

            {/* 🔍 DEBUG VISUAL */}
            {data?.data && data.data.length > 0 && (
                <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
                    <h4>🔍 Debug - Primeira venda:</h4>
                    <pre>{JSON.stringify(data.data[0], null, 2)}</pre>
                </div>
            )}
        </Paper>
    );
}