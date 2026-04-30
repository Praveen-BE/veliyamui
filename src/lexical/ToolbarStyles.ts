// ToolbarStyles.ts
export const btnBase =
  "group flex cursor-pointer items-center justify-center rounded-md border-0 p-1.5 transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500";
export const btnInactive =
  "bg-transparent text-zinc-700 enabled:hover:bg-zinc-200 "; //dark:text-zinc-200 dark:enabled:hover:bg-zinc-700
export const btnActive = "bg-blue-500 text-white enabled:hover:bg-blue-600 "; // dark:bg-blue-600 dark:enabled:hover:bg-blue-700
export const iconBase =
  "flex h-[18px] w-[18px] shrink-0 bg-current group-hover:opacity-100";

// export const maskStyle = (url: string) => ({
//   WebkitMaskImage: `url(${url})`,
//   maskImage: `url(${url})`,
//   WebkitMaskRepeat: "no-repeat",
//   maskRepeat: "no-repeat",
//   WebkitMaskPosition: "center",
//   maskPosition: "center",
// });
