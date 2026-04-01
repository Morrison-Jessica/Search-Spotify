// 🔐 Auth Page
import { getApiBaseUrl } from "../utils/api";

const Auth = () => {
  // 🧮 api base url
  const apiBaseUrl = getApiBaseUrl();
  // 🔗 login url
  const loginUrl = `${ apiBaseUrl }/auth/login`;

  return (
    <div>
      <h1>Auth</h1>
      <p>Sign in to continue.</p>
      <a href={loginUrl}>Continue with Google</a>
    </div>
  );
};

export default Auth;
