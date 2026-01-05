import { getReq } from "@/api";
import { IResponse } from "@/api/types";
import { ResponseStatusCode } from "@/api/types";

interface IRefreshTokenResponse extends IResponse {
    data: {
        accessToken: string;
    }
}

export const refreshToken = async () => {
    const response = await getReq<IRefreshTokenResponse>({
        path: "/getrefreshToken",
        params: {

        }
    });
    return response.data;
}