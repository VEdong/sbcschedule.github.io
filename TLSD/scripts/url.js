import { today } from "./date.js";

export function initUrl() {
  let selectedView = getUrlView();
  let selectedDate = getUrlDate();

  // 更新 URL 查詢參數
  function updateUrl(params) {
    const url = new URL(window.location);

    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }

    history.replaceState(null, "", url);
  }

  // 監聽 view-change 事件
  document.addEventListener("view-change", (event) => {
    selectedView = event.detail.view;
    updateUrl({ view: selectedView, date: selectedDate.toISOString() });
  });

  // 監聽 date-change 事件
  document.addEventListener("date-change", (event) => {
    selectedDate = event.detail.date;
    updateUrl({ view: selectedView, date: selectedDate.toISOString() });
  });
}

// 從 URL 中獲取 view 參數，若不存在則返回 "month"
export function getUrlView() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("view") || "month";
}

// 從 URL 中獲取 date 參數，若不存在或格式無效則返回當前日期
export function getUrlDate() {
  const urlParams = new URLSearchParams(window.location.search);
  const date = urlParams.get("date");

  // 檢查日期格式是否合法
  const parsedDate = date ? new Date(date) : null;
  return parsedDate && !isNaN(parsedDate) ? parsedDate : today();
}
