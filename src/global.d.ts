// global.d.ts
declare const vkBridge: {
  send<T>(method: string, params?: Record<string, unknown>): Promise<T>;
};
