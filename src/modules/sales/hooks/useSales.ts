// hooks/useSales.ts - VERSÃO CORRIGIDA
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
<<<<<<< HEAD
import { useNotification } from "@/context/NotificationContext";
import api from "@/services/config/api";
import type {
  CreateSalePayload,
  UpdateSalePayload,
  SaleFilters,
  SaleListItem,
  Sale
} from "@/modules/sales/types/salesTypes";
import type { ApiResponse, PaginatedResponse } from "@/types/apiResponse";

interface UseSalesParams extends SaleFilters {
  page?: number;
  limit?: number;
  search?: string;
}

// hooks/useSales.ts - APENAS A FUNÇÃO useSales CORRIGIDA
export function useSales(params: UseSalesParams = {}) {
  const { page = 1, limit = 10, search = "", ...filters } = params;
=======
import type { ApiResponse, PaginatedResponse } from "@/utils/apiResponse";
import api from "@/utils/axios";
import type {
  CreateSalePayload,
  UpdateSalePayload,
  Sale,
} from "../types/salesTypes";

const SALES_ENDPOINT = "/sales";

// ==============================
// 🔹 LISTAR VENDAS (paginado + filtro opcional)
// ==============================
export function useGetSales(
  page: number = 1,
  limit: number = 10,
  clientId?: number
) {
  return useQuery<PaginatedResponse<Sale>>({
    queryKey: ["sales", page, clientId],
    queryFn: async (): Promise<PaginatedResponse<Sale>> => {
      const params: Record<string, string | number> = {
        page,
        limit,
      };
>>>>>>> 35a42a095a750ac9760015a5c5142babccbf5848

  return useQuery({
    queryKey: ["sales", { page, limit, search, ...filters }],
    queryFn: async () => {
      const queryParams = new URLSearchParams();

      queryParams.append('page', page.toString());
      queryParams.append('limit', limit.toString());

      if (search) queryParams.append('search', search);
      if (filters.clientId) queryParams.append('clientId', filters.clientId.toString());
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.paymentStatus) queryParams.append('paymentStatus', filters.paymentStatus);
      if (filters.startDate) queryParams.append('startDate', filters.startDate);
      if (filters.endDate) queryParams.append('endDate', filters.endDate);
      if (filters.branchId) queryParams.append('branchId', filters.branchId);

      const response = await api.get<ApiResponse<PaginatedResponse<SaleListItem>>>(
        `/api/sales?${queryParams.toString()}`
      );

      if (!response.data.data) {
        throw new Error("Resposta da API não contém dados");
      }

<<<<<<< HEAD
      const apiData = response.data.data;
=======
      const { data } = await api.get<PaginatedResponse<Sale>>(SALES_ENDPOINT, {
        params,
      });
>>>>>>> 35a42a095a750ac9760015a5c5142babccbf5848

      // 🔥 CORREÇÃO: Retornar a estrutura que seu hook espera
      // Mas sem usar o tipo PaginatedResponse para não conflitar
      return {
        data: apiData.content,          // Array de vendas
        total: apiData.totalElements,   // Total de elementos
        page: apiData.currentPage,      // Página atual
        limit: apiData.limit,           // Limite por página
        totalPages: apiData.totalPages  // Total de páginas
      };
    },
  });
}

<<<<<<< HEAD
export function useSaleOperations() {
=======
// ==============================
// 🔹 BUSCAR VENDA POR ID (detalhes)
// ==============================
export function useGetSaleById(id: number | null) {
  return useQuery<ApiResponse<Sale>>({
    queryKey: ["sale", id],
    queryFn: async () => {
      const { data } = await api.get(`${SALES_ENDPOINT}/${id}`);
      return data;
    },
    enabled: !!id,
  });
}

// ==============================
// 🔹 CRIAR NOVA VENDA
// ==============================
export function useCreateSale() {
>>>>>>> 35a42a095a750ac9760015a5c5142babccbf5848
  const queryClient = useQueryClient();
  const { addNotification } = useNotification();

  const deleteMutation = useMutation<ApiResponse<void>, Error, number>({
    mutationFn: async (saleId: number) => {
      const response = await api.delete<ApiResponse<void>>(`/api/sales/${saleId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      addNotification("Venda excluída com sucesso!", "success");
    },
    onError: (error: Error) => {
      addNotification(`Erro ao excluir venda: ${error.message}`, "error");
    },
  });

  const createMutation = useMutation<ApiResponse<Sale>, Error, CreateSalePayload>({
    mutationFn: async (payload: CreateSalePayload) => {
      const response = await api.post<ApiResponse<Sale>>("/sales", payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      addNotification("Venda criada com sucesso!", "success");
    },
    onError: (error: Error) => {
      addNotification(`Erro ao criar venda: ${error.message}`, "error");
    },
  });

  const updateMutation = useMutation<ApiResponse<Sale>, Error, UpdateSalePayload>({
    mutationFn: async (payload: UpdateSalePayload) => {
      const response = await api.put<ApiResponse<Sale>>(`/sales/${payload.id}`, payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      addNotification("Venda atualizada com sucesso!", "success");
    },
    onError: (error: Error) => {
      addNotification(`Erro ao atualizar venda: ${error.message}`, "error");
    },
  });

  return {
    deleteSale: {
      mutateAsync: deleteMutation.mutateAsync,
      isPending: deleteMutation.isPending,
    },
    createSale: {
      mutateAsync: createMutation.mutateAsync,
      isPending: createMutation.isPending,
    },
    updateSale: {
      mutateAsync: updateMutation.mutateAsync,
      isPending: updateMutation.isPending,
    },
  };
}