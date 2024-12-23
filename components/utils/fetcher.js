import config from "../../config";

export function makeUrl(pathname) {
	return `${config.apiUrl}${pathname}`;
}

export async function fetcher({
	url,
	surfix = "",
	method,
	body = null,
	formEncoded = false,
	auth = null,
	headers = {},
	opts = {},
}) {
	const options = {
		credentials: "omit",
		method,
		headers: {
			...headers,
			...(auth
				? { Authorization: `${auth.tokenType || auth.token_type} ${auth.accessToken || auth.access_token}` }
				: {}),
			...(method === "POST" || method === "PUT" ? (formEncoded ? {} : { "Content-Type": "application/json" }) : {}),
		},
		...opts,
	};

	if (body && ["PUT", "POST", "PATCH", "DELETE"].includes(method)) {
		options.body = formEncoded
			? Object.entries(body).reduce((form, [key, value]) => (form.append(key, value), form), new FormData())
			: JSON.stringify(body);
	}

	try {
		const res = await fetch(url + surfix, options);
		const json = res.ok ? await res.json() : await res.json().catch(() => ({}));

		if (res.ok) {
			return { success: true, data: json, headers: res.headers };
		} else {
			console.log("fetcher Error: ", json);
			return {
				success: false,
				errorMessage: json?.detail?.message || res.statusText,
				statusText: res.statusText,
				status: res.status,
				error: json,
				headers: res.headers,
			};
		}
	} catch (err) {
		console.log("fetcher Error: ", err.message);
		return {
			success: false,
			errorMessage: err.message,
			statusText: null,
			status: null,
		};
	}
}

export function createFetcher({ url, method, body = null, surfix = "", auth = null, formEncoded = false }) {
	return async (params = null) => {
		const res = await fetcher({
			url: makeUrl(url),
			method,
			body: body || params,
			surfix,
			auth,
			formEncoded,
		});

		if (res.success) {
			return res.data;
		}

		console.log("createFetcher Error: ", res.error);
		const action = res.headers?.get("X-ACTION") || null;
		throw { message: extractErrorMessage(res), action };
	};
}

function extractErrorMessage(res) {
	const msg = getErrMsg(res);

	if (typeof msg === "string") {
		return msg;
	}

	if (typeof msg === "object") {
		return JSON.stringify(msg);
	}

	return "An unknown error occurred";
}

function getErrMsg(res) {
	if (typeof res === "string") {
		return res;
	}

	if (res instanceof Error) {
		return res?.message;
	}

	if (typeof res.error === "object") {
		return res.error.detail || res.error.message || res.error.error;
	}

	if (typeof res.errorMessage === "string") {
		return res.errorMessage;
	}

	if (typeof res.statusText === "string") {
		return res.statusText;
	}

	return res;
}
