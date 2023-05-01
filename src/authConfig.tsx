interface MsalConfig {
  auth: {
    clientId: string;
    authority: string;
    redirectUri: string;
  };
  cache: {
    cacheLocation: string;
    storeAuthStateInCookie: boolean;
  };
}

export const msalConfig: MsalConfig = {
  auth: {
    clientId: "your-client-id",
    authority: "https://login.microsoftonline.com/your-tenant-id",
    redirectUri: "http://localhost:3000",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

interface RequestScopes {
  scopes: string[];
}

export const loginRequest: RequestScopes = {
  scopes: ["openid", "profile", "User.Read"],
};
