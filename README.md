# File with heading

This is a [Next.js](https://nextjs.org/) project with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Web Technologies

- React - React 是一個陳述式、高效且具有彈性的 JavaScript 函式庫
  - React-scroll - 瀏覽器,滾動效果及設定調整
  - React-helmet - 简介 React Helmet是一个动态管理文档的head部分的组件
  - React Hook - 是一種在 React 函式元件中使用的特殊函式，可用於管理元件的狀態、生命週期和其他行為

- React-redux - Redux 是個全域的狀態管理工具
  - Redux Toolkit - 能更有效率撰寫Redux 的一個library，它提供了一些API 讓你更方便的建立Store、Actions 和Reducers
  - Redux Saga - 資料流，例如非同步獲取數據，訪問瀏覽器緩存
  - Redux-persist - 持久化資料儲存
- Next.js - SEO及圖片優化
  - next/link - Link 實作換頁
  - next/router - 導頁
  - next/image - 解決圖片載入效能的問題
- Typescript - 比 Javascript 可讀性更高、更容易重構，增加團隊開發效率
- Tailwindcss - Utility-First CSS框架
  - Sass - Sass 是CSS Preprocessor（CSS 預處理器）的一種; 讓CSS 設計過程能夠更加便利、有結構、更簡潔、更彈性; 完成SASS / SCSS 檔後需編譯為CSS 檔
  - Styled-components - 是一個CSS-In-JS 的函式庫，使你可以在JSX 中撰寫CSS code，更方便的是他可以接到component 的props 值來動態改變css 樣式
- Headless Ui - 由Tailwindcss 團隊開發的Headless 元件庫，目的希望 Tailwindcss 使用者能夠在使用元件庫的同時，還能夠繼續沿用相同的樣式寫法，特色是遵循 WAI-ARIA 標準，具有accessibility
- Chakra Ui - 可完全客製化調整樣式的Headless 元件庫，用 TypeScript 編寫，特色是遵循 WAI-ARIA 標準，具有accessibility
- Heroicons - 由Tailwind CSS 團隊開發的Heroicons icon 框架
- Formik / Yup - 表單的驗證
- Axios - 串接API使用，基於 promise 的 HTTP 庫，可以用在瀏覽器和 node.js 中
- Async Await - 串接API使用，是ES7提出的基於Promise的解決異步的最終方案
- Json Server / Jsonwebtoken - 可以透過 JSON 格式，快速 generate 產生 DEMO 用的 API

## Getting Started

1. npm install rimraf -g
1. rimraf node_modules
1. del package-lock.json
1. npm cache clean --force
1. npm install

1. npm run dev
1. json-server -p 8000 --watch ./db.json
1. npm run compile-sass--watch

## TailwindCSS

Default config 設定檔:
<https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js>
