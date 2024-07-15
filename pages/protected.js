import { useSession } from "next-auth"
import { useEffect } from "react"
import { useRouter } from "next/router"

export default function ProtectedPage() {
  const [session, loading] = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !session) {
      router.push("/auth/signin")
    }
  }, [loading, session])

  if (loading || !session) {
    return <div>Loading...</div>
  }

  return <div>Protected content for authenticated users only</div>
}