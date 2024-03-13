module.exports = {
  plugins: [
    "tailwindcss",
    // "precss", // 使用類似 SASS 的功能，例如：變數
    "autoprefixer", // 加入 CSS 前綴字，處理瀏覽器相容性的問題
    "postcss-import", // 清除多餘的 CSS
    [
      "@fullhuman/postcss-purgecss",
      {
        content: [
          "./pages/**/*.{js,jsx,ts,tsx}",
          "./components/**/*.{js,jsx,ts,tsx}",
        ],
        defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: ["html", "body"],
      },
    ],

  ],
};