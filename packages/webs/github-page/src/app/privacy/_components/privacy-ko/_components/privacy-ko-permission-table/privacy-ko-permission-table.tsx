import { DataTable } from "@/components/data-table";

export function PrivacyKoPermissionTable() {
  return (
    <DataTable
      headers={["권한", "용도", "필수 여부"]}
      rows={[
        [
          "알림",
          "알림창에서 바로 일기를 쓰는 「빠른 기록」 알림 표시",
          "선택 (거부해도 앱 사용 가능)",
        ],
        ["백그라운드 실행", "자동 백업 · 빠른 기록 알림 갱신", "선택 (해당 기능을 켠 경우에만)"],
        ["인터넷", "Google 드라이브 백업 · 복원", "선택 (백업을 쓰는 경우에만)"],
      ]}
    />
  );
}
