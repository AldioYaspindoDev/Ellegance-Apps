"use client"
import { useState } from "react"
import { useRouter } from "next/router"

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const HandleLogin = async (e) => {
        (e).preventDefault();
        setLoading(false);
        try {
            const response = await fetch("http://localhost:5000/user/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(
                    email,
                    password,
                ),
            });

            const data = await response.json();
            alert("Selamat anda Berhasil Login");

            if(!response.ok) throw new Error(data.message);

             router.push("/")
        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return(
        <>

            <form
                onSubmit={HandleLogin}
            >  

            <div>
            <label>
                Masukan Email Anda
            </label>

            <input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="masukan email anda"
                />
            </div>

            <div>
                <label>
                    Masukan Password anda
                </label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="masukan password anda"
                />
            </div>

            <button
                type="submit"
            > 
            {loading ? "loading..." : "daftar"}
            </button>


            </form>

        </>
    )

}