function getBrowserID() {
  let id = localStorage.getItem("browser_device_id");
  if (!id) {
    id = crypto.randomUUID?.() || Math.random().toString(36).slice(2);
    localStorage.setItem("browser_device_id", id);
  }
  return id;
}



// Masked IP (first 3 parts only)
// async function getIPSegment() {
//   try {
//     const res = await fetch("https://api64.ipify.org?format=json");
//     const ip = (await res.json()).ip;
//     return ip.split(".").slice(0, 3).join(".");
//   } catch {
//     return "no-ip";
//   }
// }



async function getIPSegment() {
  try {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 1000); // ⬅ timeout

    const res = await fetch("https://api64.ipify.org?format=json", {
      signal: controller.signal,
    });

    const { ip } = await res.json();
    return ip?.split(".").slice(0, 3).join(".") || "no-ip";
  } catch {
    return "no-ip";
  }
}

// Hardware fingerprint
async function getHardwareFingerprint() {
  const components = [];

  components.push(navigator.platform);
  components.push(navigator.userAgentData?.platform || navigator.platform);
  components.push(navigator.hardwareConcurrency);
  components.push(navigator.deviceMemory || "mem-x");
  components.push(screen.width + "x" + screen.height);
  components.push(window.devicePixelRatio);
  components.push(Intl.DateTimeFormat().resolvedOptions().timeZone);
components.push(screen.colorDepth);
components.push(navigator.maxTouchPoints || 0);
components.push(screen.availWidth + "x" + screen.availHeight);

  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl");
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = gl.getParameter(info.UNMASKED_RENDERER_WEBGL);
    components.push(renderer);
  } catch {
    components.push("webgl-blocked");
  }

  const raw = components.join("::");
  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(raw)
  );

  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

// FINAL fingerprint generator
export default async function generateDeviceFingerprint() {
  const browserID = getBrowserID();
  const hw = await getHardwareFingerprint();
  const ipSeg = await getIPSegment();

  const fullRaw = [browserID, hw, ipSeg].join("::");

  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(fullRaw)
  );

  const finalFP = Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");

return {
  finalFP,
  browserID,
  hw,
  ipSeg,

  os: navigator.platform,
  tz: Intl.DateTimeFormat().resolvedOptions().timeZone,

  screen: `${screen.width}x${screen.height}`,
  availScreen: `${screen.availWidth}x${screen.availHeight}`,
  colorDepth: screen.colorDepth,
  pixelRatio: window.devicePixelRatio,
  cores: navigator.hardwareConcurrency,
  mem: navigator.deviceMemory || "x",
  touch: navigator.maxTouchPoints || 0,
};

}
