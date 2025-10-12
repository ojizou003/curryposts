// 環境変数を安全に読み込むユーティリティ関数

export const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key];
  if (value === undefined || value === '') {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`環境変数 ${key} が設定されていません`);
  }
  return value;
};

// 管理者パスワードを取得する関数
export const getAdminPassword = (): string => {
  return getEnvVar('NEXT_PUBLIC_ADMIN_PASSWORD', 'curry2025');
};

// アプリケーション設定を取得する関数
export const getAppName = (): string => {
  return getEnvVar('NEXT_PUBLIC_APP_NAME');
};

export const getAppDescription = (): string => {
  return getEnvVar('NEXT_PUBLIC_APP_DESCRIPTION');
};