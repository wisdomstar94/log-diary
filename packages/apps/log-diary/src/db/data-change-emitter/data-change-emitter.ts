/** user : 사용자가 기록 · 제목을 바꿈 · sync : 백업을 합치느라 바뀜 (다시 백업하지 않는다) */
export type DataChangeSource = "user" | "sync";

type Listener = (source: DataChangeSource) => void;

const listeners = new Set<Listener>();

export function notifyDataChanged(source: DataChangeSource = "user") {
  for (const listener of listeners) {
    listener(source);
  }
}

export function subscribeDataChanged(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
