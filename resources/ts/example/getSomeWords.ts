import { ref } from "vue";
import { ApiClient } from "@/services/apiClient";
import { ApiResponse } from "@/types/api";
import { SomeWords } from "@/types/example/someWords";

export const getSomeWords = async(params: Object) => {
    const api = new ApiClient();
    const response = ref<ApiResponse<SomeWords>>();
    response.value = await api.get<ApiResponse<SomeWords>>("/api/word", params);
    return response.value.response;
}
