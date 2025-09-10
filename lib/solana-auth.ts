// Solana 认证相关的 API 调用

export interface GetNonceResponse {
    code: number;
    message: string;
    data: string;
}

export interface VerifySignatureResponse {
    code: number;
    message: string;
    data?: any;
}

export interface GetNonceDTO {
    address: string;
}

export interface VerifySignatureDTO {
    address: string;
    signature: string;
}

/**
 * 获取 nonce
 */
export async function getNonce(address: string): Promise<GetNonceResponse> {
    const response = await fetch("/api/users/nonce", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ address } as GetNonceDTO),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

/**
 * 验证签名
 */
export async function verifySignature(
    address: string,
    signature: string,
): Promise<VerifySignatureResponse> {
    const response = await fetch("/api/users/verify", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ address, signature } as VerifySignatureDTO),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}
