# 로그일기 Google Play 등록 이미지

아이콘 1장, 그래픽 이미지 1장, 휴대전화 스크린샷 4장을 모두 제작하고 규격과 화면을 검수했습니다.

## 업로드 위치와 파일

일반적인 시각적 애셋의 앱 아이콘에는 `app-icon-512.png`를, 그래픽 이미지에는 `feature-graphic-1024x500.png`를 업로드합니다.

휴대전화 애셋의 휴대전화 스크린샷에는 아래 순서로 업로드합니다.

1. `01-day-timeline-1080x1920.png`
2. `02-quick-compose-1080x1920.png`
3. `03-month-calendar-1080x1920.png`
4. `04-record-search-1080x1920.png`

`preview.jpg`는 전체 확인용입니다. `sources/`는 원본·제작 스크립트 보관용입니다. 이 두 항목은 스토어에 업로드하지 않습니다.

| 파일 | 규격 | 권장 대체 텍스트 |
| --- | --- | --- |
| app-icon-512.png | 512×512, 32비트 PNG, 1,024KB 이하 | 테라코타 바탕에 대괄호와 기록점을 담은 로그일기 아이콘 |
| feature-graphic-1024x500.png | 1024×500, 24비트 PNG, 알파 없음 | 순간을 적고 하루를 남기는 로그일기. 시간과 함께 쌓이는 일상 기록 |
| 01-day-timeline-1080x1920.png | 1080×1920, 24비트 PNG, 알파 없음 | 시간순으로 쌓인 하루의 기록을 보여주는 로그일기 하루 상세 화면 |
| 02-quick-compose-1080x1920.png | 1080×1920, 24비트 PNG, 알파 없음 | 날짜와 시각을 확인하며 산책길의 생각을 적는 기록 작성 화면 |
| 03-month-calendar-1080x1920.png | 1080×1920, 24비트 PNG, 알파 없음 | 기록한 날짜와 기록 개수를 한눈에 보여주는 로그일기 월별 달력 |
| 04-record-search-1080x1920.png | 1080×1920, 24비트 PNG, 알파 없음 | 산책이라는 단어가 포함된 지난 기록을 찾은 검색 결과 화면 |

## 제작과 검증

- 기존 아이콘·로고·IBM Plex Sans KR 폰트를 사용했습니다.
- 배경은 내장 imagegen으로 생성했습니다. 로고·한글·실제 화면의 최종 배치는 별도 렌더러로 제작했습니다.
- 휴대전화 화면은 별도 촬영용 앱의 공개용 샘플 기록을 사용합니다.
- 원본·최종 해상도 및 형식 검증 결과는 `validation.json`을 참고하세요.
- 공식 규격: [Google Play 미리보기 애셋 안내](https://support.google.com/googleplay/android-developer/answer/9866151?hl=ko), [아이콘 디자인 사양](https://developer.android.com/distribute/google-play/resources/icon-design-specifications).
