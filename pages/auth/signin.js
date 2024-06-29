import { providers, signIn, csrfToken } from "next-auth/react"

export default function SignIn({ providers, csrfToken }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Sign in to 먹자</h1>
      {Object.values(providers).map((provider) => (
        <div key={provider.name} className="mb-4">
          <button
            onClick={() => signIn(provider.id)}
            className={`bg-${provider.name === "Google" ? "blue-500" : "gray-900"} text-white py-2 px-4 rounded-lg shadow-md hover:bg-${provider.name === "Google" ? "blue-600" : "gray-800"} flex items-center justify-center`}
          >
            <img
              src={`https://img.icons8.com/color/16/000000/${provider.name.toLowerCase()}-logo.png`}
              alt={`${provider.name} Logo`}
              className="mr-2"
            />
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  )
}

SignIn.getInitialProps = async (context) => {
  return {
    providers: await providers(context),
    csrfToken: await csrfToken(context),
  }
}
