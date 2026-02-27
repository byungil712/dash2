# 대시보드 UI를 활용한 날씨앱과 간단한 미니게임

## 사이트 주소
- https://byungil712.github.io/dash2/

## 주요 기능
- 실시간 날찌 조회 (현재 위치또는 원하는 나라를 검색또는 나라 버튼)
- 3시간 단위의 날씨예보 대시보드 UI를 활용한 날씨앱과 간단한 미니게임

### 날씨 관련
- 실시간 날찌 조회 (현재 위치또는 원하는 나라를 검색또는 나라 버튼)
- 3시간 단위의 날씨 예보
- 5일간의 주간 날씨 예보
- 지도 클릭으로 원하는 나라의 날씨 확인

### 미니게임
- 가위바위보 / AI대전
- 미로게임
- 틱택토 / AI대전
- 숫자 맞추기 (0 - 10) 추측 게임

### 기타
- 라이트모드 / 다크모드 변경
- 반응형 디자인

## 기술 스택
- React
- Redux
- JavaScript
- CSS3
- OpenWeatherMap Api
- React Leaflet
- Font Awesome

## 프로젝트 구조
```
dash/
│
├── 📁 public/
│   ├── 📁 img/
│   └── favicon.ico
│       
└── 📁 src/
    ├── 📁 WeatherApp/
    │   ├── 📁 Component/
    │   │   ├── Box.jsx
    │   │   ├── DashMiniGame.jsx
    │   │   ├── DashWeather.jsx
    │   │   ├── Map.jsx
    │   │   ├── Maze.jsx
    │   │   ├── Number.jsx
    │   │   ├── TicTacToe.jsx
    │   │   ├── WeatherBox.jsx
    │   │   └── WeatherBox2.jsx
    │   │
    │   ├── 📁 Script/
    │   │   ├── gamesSlice.js
    │   │   ├── mazeSlice.js
    │   │   ├── modeSlice.js
    │   │   ├── numberSlice.js
    │   │   ├── ticTacToeSlice.js
    │   │   ├── slice.js
    │   │   └── store.js
    │   │
    │   ├── App.jsx
    │   ├── app.css
    │   ├── mode.css
    │   └── game.css
    │
    └── main.jsx
```
