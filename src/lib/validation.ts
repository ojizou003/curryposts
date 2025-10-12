import { CreatePostRequest, UpdatePostRequest, PREFECTURES } from '@/types';

export function validateCreatePostRequest(data: unknown): data is CreatePostRequest {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const obj = data as Record<string, unknown>;
  return (
    typeof obj.embedCode === 'string' &&
    obj.embedCode.trim().length > 0 &&
    typeof obj.prefecture === 'string' &&
    obj.prefecture.trim().length > 0
  );
}

export function validateUpdatePostRequest(data: unknown): data is UpdatePostRequest {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const obj = data as Record<string, unknown>;

  if (obj.embedCode !== undefined) {
    if (typeof obj.embedCode !== 'string' || obj.embedCode.trim().length === 0) {
      return false;
    }
  }

  if (obj.prefecture !== undefined) {
    if (typeof obj.prefecture !== 'string' || obj.prefecture.trim().length === 0) {
      return false;
    }
  }

  return true;
}

export function isValidPrefecture(prefecture: string): boolean {
  // 「すべて」はフィルター用のみで、投稿としては許可しない
  return PREFECTURES.includes(prefecture as typeof PREFECTURES[number]) && prefecture !== 'すべて';
}

export function sanitizeEmbedCode(embedCode: string): string {
  // 基本的のサニタイズ
  return embedCode
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // scriptタグを削除
    .replace(/on\w+="[^"]*"/gi, '') // イベントハンドラを削除
    .replace(/javascript:/gi, '') // javascript:プロトコルを削除
    .replace(/data:/gi, ''); // data:プロトコルを削除
}

export function validatePostContent(embedCode: string): string[] {
  const errors: string[] = [];

  if (!embedCode || embedCode.trim().length === 0) {
    errors.push('埋め込みコードを入力してください');
    return errors;
  }

  // HTMLタグのチェック
  if (!/<[^>]+>/.test(embedCode)) {
    errors.push('有効な埋め込みコードを入力してください');
  }

  // プラットフォームのチェック
  const isTwitter = embedCode.includes('twitter-tweet') || embedCode.includes('platform.twitter.com');

  if (!isTwitter) {
    errors.push('X（Twitter）の埋め込みコードを入力してください');
  }

  return errors;
}