# 로그일기 Apple App Store 등록 이미지

## 목차

- [등록용 파일](#등록용-파일)
- [스크린샷 순서](#스크린샷-순서)
- [제작하지 않은 기기 및 미디어](#제작하지-않은-기기-및-미디어)
- [미리보기와 원본](#미리보기와-원본)
- [재생성과 검증](#재생성과-검증)
- [공식 규격](#공식-규격)

## 등록용 파일

한국어 등록용 PNG 11장을 준비했다. 모든 크기는 **가로 × 세로**이며, RGB PNG로 알파 채널과 투명도가 없다.

| App Store Connect 항목 | 업로드할 파일 | 크기 | 수량 |
| --- | --- | --- | --- |
| 헤더 및 검색 결과 - 헤더 | `header-3840x1646.png` | 3840px × 1646px | 1장 |
| 헤더 및 검색 결과 - 검색 결과 | `search-results-3840x2560.png` | 3840px × 2560px | 1장 |
| 앱 미리보기 및 스크린샷 - Dynamic Island 지원 iPhone (중형 디스플레이) | `iphone-medium/` 안의 `01`~`04` PNG | 각 1206px × 2622px | 4장 |
| 앱 미리보기 및 스크린샷 - iPad 33.0cm 디스플레이 | `ipad-13/` 안의 `01`~`04` PNG | 각 2064px × 2752px | 4장 |
| 앱 아이콘 | `app-icon-1024.png` | 1024px × 1024px | 1장 |

헤더·검색 결과 이미지는 선택 등록용이다. 앱 아이콘은 스크린샷 입력란에 업로드하지 않으며, 앱 빌드에 포함된 아이콘이 App Store Connect로 전달된다. 여기에 둔 파일은 기존 아이콘의 등록 규격 보관본이다.

## 스크린샷 순서

iPhone과 iPad 각각 해당 폴더에서 아래 순서로 업로드한다. ‘앱 미리보기’는 동영상 항목이므로 PNG는 ‘앱 스크린샷’에 올린다.

| 순서 | 파일명 | 내용 |
| --- | --- | --- |
| 1 | `01-day-timeline.png` | 시간순으로 쌓인 하루의 기록 |
| 2 | `02-quick-compose.png` | 시각과 함께 생각을 남기는 빠른 기록 |
| 3 | `03-month-calendar.png` | 기록한 날과 기록 수를 보여주는 월별 달력 |
| 4 | `04-record-search.png` | ‘산책’이 포함된 지난 기록 검색 |

## 제작하지 않은 기기 및 미디어

- **iPhone Duo:** 설치된 시뮬레이터는 iOS 18.5이며 Duo 기기 프로필과 런타임이 없다. 실제 Duo 화면을 촬영할 수 없어 이번 결과에는 포함하지 않았다. 기존 iPhone 화면을 늘려 Duo용으로 표시하지 않았다.
- **Apple Watch:** 앱 설정과 Xcode 프로젝트에서 Watch 앱 타깃이 확인되지 않아 포함하지 않았다. Watch 탭이 표시된다는 것만으로 Watch 스크린샷 제출이 필요하다고 판단하지 않는다.
- **앱 미리보기 동영상:** 이번 정지 이미지 제작 범위에 포함하지 않았다.

## 미리보기와 원본

- [전체 미리보기](preview.jpg)는 검토용이며 업로드하지 않는다. 각 기능마다 iPhone 이미지와 iPad 이미지를 별도 행으로 배치했다.
- `sources/iphone/`, `sources/ipad/`는 기기에서 촬영한 원본 8장이다. 업로드에는 위 등록용 폴더의 완성 이미지를 사용한다.
- `sources/capture-info.json`에 기기, 런타임, 라우트, 촬영 조건을 기록했다.
- `sources/sample-data.sql`은 공개용 가상 기록 34개이다. 사용자 개인 일기는 사용하지 않았다.
- `sources/capture-only.patch`는 분리된 임시 프로젝트에만 적용한 샘플 데이터·입력 초기값·자동 포커스 변경이다. 운영 앱에 적용하지 않는다.
- `sources/paper-background.png`는 기존 Google Play 제작 자료에서 재사용했다. 로고·아이콘·한글 폰트도 저장소의 기존 자료를 사용했다.

화면은 iPhone 16 Pro 및 iPad Pro 13-inch (M4)의 Expo Go 57.0.9에서 앱의 실제 React Native 화면을 실행해 촬영했다. 빠른 기록에는 공개용 본문과 12:40을, 검색에는 ‘산책’을 미리 입력했다. 키보드는 가리지 않도록 자동 포커스를 껐고, 개발 메뉴·개발 버튼은 최종 원본에서 제외했다. iOS 작성 시트 및 iPad 작성 모달은 실제 플랫폼 동작을 유지했다.

## 재생성과 검증

저장소 루트에서 Pillow가 설치된 Python으로 실행한다. 기존 로고·아이콘과 `node_modules/@expo-google-fonts/ibm-plex-sans-kr` 폰트, 보관된 촬영 원본을 사용한다.

```bash
python3 resources/apple-app-store/sources/render-store-assets.py
```

이 명령은 등록용 PNG 11장, `preview.jpg`, `validation.json`을 다시 만든다. `validation.json`에는 각 파일의 크기·형식·색상 모드·알파 유무·파일 용량을 기록한다.

이미지 크기와 파일 형식은 제작 스크립트의 검증을 통과했다. 전체 미리보기 및 원본으로 글자 잘림, 개발 도구 노출, 화면 비율을 육안 검수했다. App Store Connect 실제 업로드 및 심사는 실행하지 않았다.

## 공식 규격

2026-10-13 사용자 제공 App Store Connect 캡처 4장과 아래 공식 문서를 기준으로 제작했다.

- [기기별 스크린샷 규격](https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications)
- [헤더 및 검색 결과 이미지 규격](https://developer.apple.com/help/app-store-connect/reference/app-information/creative-assets-specifications)
- [등록 이미지 관리 및 선택 등록 안내](https://developer.apple.com/help/app-store-connect/manage-app-information/manage-your-app-store-assets)
- [앱 아이콘 등록](https://developer.apple.com/help/app-store-connect/manage-app-information/add-an-app-icon)
- [스토어 이미지 제작 지침](https://developer.apple.com/app-store/asset-best-practices/)
