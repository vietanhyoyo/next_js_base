import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidUrl(url: string) {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch (err) {
    return false;
  }
}

/**
 * Removes the color attribute from all inline styles in the given HTML string.
 * @param html - The input HTML string.
 * @returns The processed HTML string with color attributes removed.
 */
export function removeColorAttribute(html: string): string {
  // Kiểm tra nếu đang chạy trong môi trường trình duyệt
  if (typeof window === "undefined") {
    throw new Error("This function requires a browser environment with a DOM.");
  }

  // Tạo một phần tử DOM tạm thời
  const tempDiv: HTMLDivElement = document.createElement("div");
  tempDiv.innerHTML = html;

  // Lấy tất cả các phần tử trong đối tượng DOM tạm thời
  const elements: NodeListOf<Element> = tempDiv.querySelectorAll("*");

  // Duyệt qua từng phần tử
  elements.forEach((element: Element) => {
    if (element instanceof HTMLElement) {
      if (element.style.color) {
        element.style.removeProperty("color");
      }

      // Xóa thuộc tính style nếu nó trống
      if (element.style.length === 0) {
        element.removeAttribute("style");
      }
    }
  });

  // Trả về HTML đã được xử lý
  return tempDiv.innerHTML;
}
