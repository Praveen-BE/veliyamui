export default function maskStyle(url: string): React.CSSProperties {
  return {
    WebkitMaskImage: `url('${url}')`,
    WebkitMaskPosition: "center",
    WebkitMaskRepeat: "no-repeat",
    WebkitMaskSize: "contain",
    maskImage: `url('${url}')`,
    maskPosition: "center",
    maskRepeat: "no-repeat",
    maskSize: "contain",
  };
}
