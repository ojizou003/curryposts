import { CreatePostRequest, UpdatePostRequest, PREFECTURES } from '@/types';

export function validateCreatePostRequest(data: any): data is CreatePostRequest {
  return (
    data &&
    typeof data.embedCode === 'string' &&
    data.embedCode.trim().length > 0 &&
    typeof data.prefecture === 'string' &&
    data.prefecture.trim().length > 0
  );
}

export function validateUpdatePostRequest(data: any): data is UpdatePostRequest {
  if (!data || typeof data !== 'object') {
    return false;
  }

  if (data.embedCode !== undefined) {
    if (typeof data.embedCode !== 'string' || data.embedCode.trim().length === 0) {
      return false;
    }
  }

  if (data.prefecture !== undefined) {
    if (typeof data.prefecture !== 'string' || data.prefecture.trim().length === 0) {
      return false;
    }
  }

  return true;
}

export function isValidPrefecture(prefecture: string): boolean {
  // 「すべて」はフィルター用のみで、投稿としては許可しない
  return PREFECTURES.includes(prefecture as any) && prefecture !== 'すべて';
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