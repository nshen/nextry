import { signIn } from "@/auth"

export default function SignIn() {
    return (
        <form
            action={async () => {
                "use server"
                await signIn("google");
                // await signIn("github", { redirectTo: "/dashboard" })
            }}
        >
            <button type="submit">Signin with Google</button>
        </form>
    )
} 
