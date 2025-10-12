'use client';

import { useState, useEffect } from 'react';
import { getAdminPassword } from '@/lib/env';

// 認証状態の型定義
interface AuthState {
  isAuthenticated: boolean;
  loginTime: number;
  expiresAt: number;
}

const SESSION_KEY = 'admin_auth';
const SESSION_DURATION = 60 * 60 * 1000; // 1時間（ミリ秒）

export function useAdminAuth() {
  const [authState, setAuthState] = useState<AuthState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // 初期化時にセッションストレージから認証状態を読み込む
  useEffect(() => {
    checkAuthState();
  }, []);

  // 認証状態を確認する関数
  const checkAuthState = () => {
    try {
      const storedAuth = sessionStorage.getItem(SESSION_KEY);
      if (storedAuth) {
        const parsedAuth: AuthState = JSON.parse(storedAuth);

        // セッションが有効期限内かチェック
        if (parsedAuth.expiresAt > Date.now()) {
          setAuthState(parsedAuth);
        } else {
          // セッション切れなので削除
          sessionStorage.removeItem(SESSION_KEY);
          setAuthState(null);
        }
      }
    } catch (error) {
      console.error('認証状態の読み込みに失敗しました:', error);
      sessionStorage.removeItem(SESSION_KEY);
      setAuthState(null);
    } finally {
      setIsLoading(false);
    }
  };

  // ログイン関数
  const login = async (password: string): Promise<boolean> => {
    setError('');

    try {
      const correctPassword = getAdminPassword();

      if (password === correctPassword) {
        const newAuthState: AuthState = {
          isAuthenticated: true,
          loginTime: Date.now(),
          expiresAt: Date.now() + SESSION_DURATION,
        };

        // セッションストレージに保存
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(newAuthState));
        setAuthState(newAuthState);
        return true;
      } else {
        setError('パスワードが正しくありません');
        return false;
      }
    } catch (error) {
      console.error('ログイン処理に失敗しました:', error);
      setError('ログイン処理に失敗しました');
      return false;
    }
  };

  // ログアウト関数
  const logout = () => {
    try {
      sessionStorage.removeItem(SESSION_KEY);
      setAuthState(null);
      setError('');
    } catch (error) {
      console.error('ログアウト処理に失敗しました:', error);
    }
  };

  // 認証状態を返す
  const isAuthenticated = authState?.isAuthenticated ?? false;
  const timeRemaining = authState ? Math.max(0, authState.expiresAt - Date.now()) : 0;

  return {
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    checkAuthState,
    timeRemaining,
  };
}