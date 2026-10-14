import { PrivacyKoInfoTable } from "./_components/privacy-ko-info-table";
import { PrivacyKoPermissionTable } from "./_components/privacy-ko-permission-table";

export function PrivacyKo() {
  return (
    <section id="ko">
      <h2>한국어</h2>

      <h3>1. 총칙</h3>
      <p>
        로그일기(이하 「앱」)는 운영자가 별도의 서버를 운영하지 않는 개인 일기 앱입니다. 이용자가
        작성한 일기는 <strong>이용자의 기기 안에만</strong> 저장되며, 운영자는 이용자의 일기
        내용이나 개인정보를 받아 보거나 보관하지 않습니다.
      </p>
      <p>
        이용자가 Google 드라이브 백업 기능을 직접 켠 경우에만, 일기 데이터가{" "}
        <strong>이용자 본인의 Google 드라이브 계정</strong>에 저장됩니다. 이 경우에도 데이터는
        운영자에게 전송되지 않습니다.
      </p>

      <h3>2. 처리하는 정보와 목적</h3>
      <PrivacyKoInfoTable />
      <ul>
        <li>운영자는 위 정보 중 어느 것도 수집 · 전송 · 열람하지 않습니다.</li>
      </ul>

      <h3>3. 수집하지 않는 정보</h3>
      <p>앱은 아래 정보를 수집하지 않습니다.</p>
      <ul>
        <li>위치 정보</li>
        <li>사진 · 카메라 · 마이크 · 연락처</li>
        <li>광고 식별자(IDFA · 광고 ID)</li>
        <li>이용 행태 분석 정보 · 오류(크래시) 보고</li>
        <li>기기 식별 번호</li>
      </ul>
      <p>앱에는 광고 · 분석 · 오류 수집용 외부 SDK 가 포함되어 있지 않습니다.</p>

      <h3>4. Google 드라이브 백업 (선택 기능)</h3>
      <ul>
        <li>
          이용자가 설정에서 Google 계정을 연결하면, 앱은 drive.appdata 권한만 요청합니다. 이
          권한으로는 <strong>앱이 만든 숨김 폴더에만</strong> 접근할 수 있으며, 이용자의 다른
          드라이브 파일은 읽거나 수정할 수 없습니다.
        </li>
        <li>
          백업 파일은 이용자의 기기와 Google 서버 사이에서 HTTPS 로 직접 전송됩니다. 운영자의 서버를
          거치지 않습니다.
        </li>
        <li>
          앱이 Google API 로부터 받은 정보의 사용 및 다른 앱으로의 전송은{" "}
          <a href="https://developers.google.com/terms/api-services-user-data-policy">
            Google API 서비스 사용자 데이터 정책
          </a>
          (제한적 사용 요구사항 포함)을 준수합니다.
        </li>
      </ul>

      <h3>5. 제3자 제공 및 처리 위탁</h3>
      <p>운영자는 이용자의 개인정보를 제3자에게 제공하거나 처리를 위탁하지 않습니다.</p>
      <p>
        드라이브 백업을 사용하면 백업 파일이 Google LLC 의 서비스에 저장되지만, 이는 이용자 본인의
        Google 계정에 이용자가 직접 저장하는 것입니다. Google 의 정보 처리는{" "}
        <a href="https://policies.google.com/privacy">Google 개인정보처리방침</a>을 따릅니다.
      </p>

      <h3>6. 기기 권한</h3>
      <PrivacyKoPermissionTable />

      <h3>7. 보유 기간 및 파기</h3>
      <ul>
        <li>
          <strong>기기 안의 데이터</strong> : 이용자가 일기를 삭제하거나 앱을 삭제하면 기기에서 함께
          삭제됩니다.
        </li>
        <li>
          <strong>Google 드라이브 백업</strong> : 앱에서 계정 연결을 해제해도 백업 파일은 이용자의
          드라이브에 남습니다. 백업까지 지우려면 아래 방법으로 직접 삭제할 수 있습니다.
          <ul>
            <li>
              Google 드라이브 웹 → 설정 → 앱 관리 → 「로그일기」 → 옵션 → 「숨겨진 앱 데이터 삭제」
            </li>
            <li>
              앱의 드라이브 접근 권한 해제 :{" "}
              <a href="https://myaccount.google.com/connections">
                Google 계정 → 보안 → 서드 파티 앱 및 서비스
              </a>
            </li>
          </ul>
        </li>
        <li>
          <strong>이메일 주소</strong> : 앱에서 계정 연결을 해제하면 기기에 저장된 이메일 주소도 더
          이상 사용되지 않으며, 앱을 삭제하면 함께 삭제됩니다.
        </li>
      </ul>

      <h3>8. 이용자의 권리와 행사 방법</h3>
      <p>
        모든 데이터가 이용자의 기기와 이용자 본인의 Google 계정에 있으므로, 이용자는 운영자에게
        요청하지 않고 직접 권리를 행사할 수 있습니다.
      </p>
      <ul>
        <li>
          <strong>열람 · 수정 · 삭제</strong> : 앱 안에서 일기를 직접 조회 · 수정 · 삭제
        </li>
        <li>
          <strong>내보내기</strong> : 설정 → 내보내기에서 일기를 텍스트 파일로 저장
        </li>
        <li>
          <strong>백업 중단</strong> : 설정 → 백업에서 자동 백업 해제 또는 계정 연결 해제
        </li>
      </ul>
      <p>그 밖의 문의는 아래 개인정보 보호책임자에게 이메일로 보내 주세요.</p>

      <h3>9. 아동의 개인정보</h3>
      <p>
        앱은 아동을 대상으로 하지 않으며, 연령을 포함해 어떤 개인정보도 운영자가 수집하지 않습니다.
      </p>

      <h3>10. 안전성 확보 조치</h3>
      <ul>
        <li>
          일기 데이터는 운영체제가 보호하는 앱 전용 저장 공간에 저장되어 다른 앱이 접근할 수
          없습니다.
        </li>
        <li>Google 드라이브와의 통신은 HTTPS 로 암호화됩니다.</li>
        <li>기기 분실에 대비해 기기 화면 잠금 사용을 권장합니다.</li>
      </ul>

      <h3>11. 개인정보 보호책임자</h3>
      <ul>
        <li>
          <strong>책임자</strong> : wisdomstar94
        </li>
        <li>
          <strong>이메일</strong> :{" "}
          <a href="mailto:wisdomstar94@gmail.com">wisdomstar94@gmail.com</a>
        </li>
      </ul>
      <p>개인정보 침해에 대한 신고나 상담이 필요하면 아래 기관에 문의할 수 있습니다.</p>
      <ul>
        <li>
          개인정보침해신고센터 : (국번없이) 118 ·{" "}
          <a href="https://privacy.kisa.or.kr/">https://privacy.kisa.or.kr</a>
        </li>
        <li>
          개인정보분쟁조정위원회 : 1833-6972 ·{" "}
          <a href="https://www.kopico.go.kr/">https://www.kopico.go.kr</a>
        </li>
      </ul>

      <h3>12. 방침의 변경</h3>
      <p>
        이 방침은 법령 또는 앱 기능 변경에 따라 바뀔 수 있으며, 변경 시 이 페이지에 시행일과 함께
        게시합니다.
      </p>
      <ul>
        <li>
          <strong>시행일</strong> : 2026-10-12
        </li>
      </ul>
    </section>
  );
}
