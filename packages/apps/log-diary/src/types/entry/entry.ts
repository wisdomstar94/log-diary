export type EntryLocation = {
  latitude: number;
  longitude: number;
  /** 좌표를 주소로 바꾸지 못했으면 null */
  placeName: string | null;
};

export type Entry = {
  id: string;
  /** 'YYYY-MM-DD' (기기 로컬 날짜) */
  date: string;
  /** 'HH:mm' */
  time: string;
  content: string;
  location: EntryLocation | null;
  createdAt: number;
  updatedAt: number;
};

/** 제목을 지우면 빈 문자열로 남겨, 지운 것도 수정 시각으로 합칠 수 있게 한다 */
export type DayTitle = {
  date: string;
  title: string;
  updatedAt: number;
};

/** 앱에서 지운 기록. 백업과 합칠 때 다른 기기 · 백업에서도 이 기록을 뺀다 */
export type DeletedEntry = {
  id: string;
  deletedAt: number;
};

export type AttachmentKind = "image";

/** 첨부는 고치지 않고 추가 · 삭제만 한다. 파일 내용은 백업 JSON 이 아니라 드라이브 파일로 따로 둔다 */
export type Attachment = {
  id: string;
  entryId: string;
  kind: AttachmentKind;
  mimeType: string;
  width: number | null;
  height: number | null;
  byteSize: number | null;
  sortOrder: number;
  /** 드라이브에 아직 올리지 않았으면 null */
  remoteFileId: string | null;
  createdAt: number;
};

export type DeletedAttachment = {
  id: string;
  deletedAt: number;
};
