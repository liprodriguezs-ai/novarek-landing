// Analytics consent. The Google tag script is only injected after the visitor accepts;
// before that, events just queue in window.dataLayer and never leave the browser.
export const CONSENT_KEY = "novarek-consent";
export const GA_ID = "G-2RWQQR8ZKN";

export type Consent = "granted" | "denied";

declare global {
	interface Window {
		dataLayer?: unknown[];
		/** Set by Layout only in production builds; absent in dev and staging. */
		__novarekAnalytics?: boolean;
	}
}

export function readConsent(): Consent | null {
	try {
		const value = localStorage.getItem(CONSENT_KEY);
		return value === "granted" || value === "denied" ? value : null;
	} catch {
		return null;
	}
}

function gtag(..._args: unknown[]) {
	window.dataLayer = window.dataLayer || [];
	// gtag() pushes the `arguments` object, not an array; GA ignores array pushes.
	// eslint-disable-next-line prefer-rest-params
	window.dataLayer.push(arguments);
}

function loadAnalytics() {
	if (!window.__novarekAnalytics || document.getElementById("ga-script")) return;
	gtag("consent", "update", { analytics_storage: "granted" });
	const script = document.createElement("script");
	script.id = "ga-script";
	script.async = true;
	script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
	document.head.appendChild(script);
}

/** Stops measurement and removes the Google Analytics cookies set on this site. */
function revokeAnalytics() {
	gtag("consent", "update", { analytics_storage: "denied" });
	(window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = true;
	const domain = location.hostname.replace(/^www\./, "");
	document.cookie.split(";").forEach((cookie) => {
		const name = cookie.split("=")[0].trim();
		if (name === "_ga" || name.startsWith("_ga_")) {
			for (const scope of ["", `; domain=${domain}`, `; domain=.${domain}`]) {
				document.cookie = `${name}=; Max-Age=0; path=/${scope}`;
			}
		}
	});
}

export function applyConsent(value: Consent) {
	if (value === "granted") {
		(window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = false;
		loadAnalytics();
	} else {
		revokeAnalytics();
	}
}
