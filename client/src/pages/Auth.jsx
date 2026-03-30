// 🔐 Auth Page
const Auth = () => {
  const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";
  const loginUrl = `${apiBaseUrl}/auth/login`;

  return (
    <div>
      <h1>Auth</h1>
      <p>Sign in to continue.</p>
      <a href={loginUrl}>Continue with Google</a>
    </div>
  );
};

export default Auth;
