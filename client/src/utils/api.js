// 🧰🌐 - frontend API helpers

// 🧮 build api base url (always /api/v1/app)
const getApiBaseUrl = () => {
    // 🧾 read base from env (fallback to local server)
    const rawBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
    // 🧽 trim trailing slash
    const cleanBase = rawBaseUrl.replace( /\/$/, "" );
    // ✅ already pointing at /api/v1/app
    if ( cleanBase.includes( "/api/v1/app" ) ) {
        return cleanBase;
    }
    // ➕ add /app if base already includes /api/v1
    if ( cleanBase.includes( "/api/v1" ) ) {
        return `${ cleanBase }/app`;
    }
    // ➕ add /v1/app if base ends at /api
    if ( cleanBase.endsWith( "/api" ) ) {
        return `${ cleanBase }/v1/app`;
    }
    // ➕ default to /api/v1/app
    return `${ cleanBase }/api/v1/app`;
};

// 🌐 fetch helper (cookies + json)
const apiFetch = async ( path, options = {} ) => {
    // 🧭 full url
    const url = `${ getApiBaseUrl() }${ path }`;

    // 🧩 default options
    const defaults = {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
    };

    // 🧪 merge options
    const merged = {
        ...defaults,
        ...options,
        headers: {
            ...defaults.headers,
            ...( options.headers || {} ),
        },
    };

    // 🚀 run request
    const res = await fetch( url, merged );

    // 📦 read json safely
    let data = null;
    try {
        data = await res.json();
    } catch ( err ) {
        data = null;
    }

    return { res, data };
};

export {
    getApiBaseUrl,
    apiFetch,
};
