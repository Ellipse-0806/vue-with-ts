import axios, { AxiosInstance, AxiosResponse } from "axios";

export class ApiClient
{
    private client: AxiosInstance;

    constructor(
        base_url: string = import.meta.env.VITE_APP_URL,
        header:{[key: string]: string} = {"Content-type": "application/json"}
    )
    {
        this.client = axios.create({
            // APIのURI
            baseURL: base_url,
            // リクエストヘッダ
            headers: header,
            // タイムアウト
            timeout: 3000,
        });
    }

    public async get<T>(
        url: string,
        params: Object
    ): Promise<T>
    {
        try
        {
            const convert_params: {[key: string]: string} = this.convert(params);
            const response: AxiosResponse<T> = await this.client.get(
                url,
                {params: convert_params}
            );
            return response.data;
        }
        catch (error: unknown)
        {
            if (error instanceof Error)
            {
                /** エラーログ */
                alert("取得に失敗しました。\n" + error.message);
            }
            throw error;
        }
    }
    public async post<T>(
        url: string,
        params: Object
    ): Promise<T>
    {
        try
        {
            const convert_params: {[key: string]: string} = this.convert(params);
            const response: AxiosResponse<T> = await this.client.post(
                url,
                convert_params
            );
            return response.data;
        }
        catch (error: unknown)
        {
            if (error instanceof Error)
            {
                /** エラーログ */
                alert("送信に失敗しました。\n" + error.message);
            }
            throw error;
        }
    }

    private convert(obj: Object): {[key: string]: string} {
        const res: {[key: string]: string} = {};
        try
        {
            for (const key in obj)
            {
                if (obj[key] === null || obj[key] === undefined)
                {
                    res[key] = "";
                }
                else if (typeof obj[key] === 'object')
                {
                    res[key] = JSON.stringify(obj[key]);
                }
                else
                {
                    res[key] = obj[key].toString();
                }
            }
        }
        catch (error: unknown)
        {
            console.error('An error occurred during conversion:', obj);
        }
        return res;
    }
}
