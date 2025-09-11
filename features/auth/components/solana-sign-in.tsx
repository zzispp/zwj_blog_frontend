"use client";

import React, { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import bs58 from "bs58";

import { Button } from "@/components/ui/button";
import { showErrorToast, showSuccessToast } from "@/components/toast";
import { PATHS } from "@/constants";
import { getNonce, verifySignature } from "@/lib/solana-auth";
import { useAuth } from "@/lib/auth-context";

// 动态导入钱包按钮，避免 SSR 问题
const WalletMultiButton = dynamic(
    async () =>
        (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    {
        ssr: false,
        loading: () => (
            <Button className="w-full" disabled>
                加载钱包...
            </Button>
        ),
    }
);

interface SolanaSignInProps {
    isPending: boolean;
    startTransition: React.TransitionStartFunction;
}

export function SolanaSignIn({ isPending, startTransition }: SolanaSignInProps) {
    const { publicKey, signMessage, connected } = useWallet();
    const { login } = useAuth();
    const router = useRouter();
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSolanaSignIn = async () => {
        if (!connected || !publicKey || !signMessage) {
            showErrorToast("请先连接 Solana 钱包");
            return;
        }

        startTransition(async () => {
            setIsAuthenticating(true);

            try {
                // 1. 获取 nonce
                const address = publicKey.toBase58();
                const nonceResponse = await getNonce(address);

                if (nonceResponse.code !== 200) {
                    throw new Error(nonceResponse.message || "获取 nonce 失败");
                }

                const nonce = nonceResponse.data;

                // 2. 构造签名消息
                const message = `nonce:${nonce}`;
                const messageBytes = new TextEncoder().encode(message);

                // 3. 请求用户签名
                const signature = await signMessage(messageBytes);
                const signatureBase58 = bs58.encode(signature);

                // 4. 验证签名
                const verifyResponse = await verifySignature(address, signatureBase58);

                if (verifyResponse.code !== 200) {
                    throw new Error(verifyResponse.message || "签名验证失败");
                }

                // 5. 登录成功，设置用户状态
                login(address, verifyResponse.data.token);
                showSuccessToast("登录成功");
                router.replace(PATHS.ADMIN_HOME);

            } catch (error) {
                console.error("Solana 认证失败:", error);
                showErrorToast(
                    error instanceof Error ? error.message : "认证过程中发生错误"
                );
            } finally {
                setIsAuthenticating(false);
            }
        });
    };

    if (!mounted) {
        return (
            <div className="grid w-full gap-4">
                <Button className="w-full" disabled>
                    加载中...
                </Button>
            </div>
        );
    }

    return (
        <div className="grid w-full gap-4">
            {/* 钱包连接按钮 */}
            <div className="w-full flex justify-center">
                <WalletMultiButton className="!w-full !bg-primary !text-primary-foreground hover:!bg-primary/90 !justify-center !text-center !flex !items-center" />
            </div>

            {/* 签名登录按钮 */}
            {connected && (
                <Button
                    onClick={handleSolanaSignIn}
                    disabled={isPending || isAuthenticating || !connected}
                    className="w-full"
                >
                    {isAuthenticating ? "正在验证..." : "签名并验证"}
                </Button>
            )}

            {connected && publicKey && (
                <p className="text-xs text-muted-foreground break-all">
                    已连接钱包: {publicKey.toBase58()}
                </p>
            )}
        </div>
    );
}
