"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const HandleRegister = async (e) => {
        (e).preventDefault();
        setLoading(true);

        try {
            const response = await fetch("http://localhost:5000/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            })
            const data = await response.json();

            if(!response.ok) throw new Error(data.message);

            alert("Pendaftaran berhasil")
            router.push("/Login")
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return(
        <>
        <form onSubmit={HandleRegister}> 
            <div>
                <label>
                    Masukan nama anda
                </label>
                <input 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Masukan Nama Anda"
                />
            </div>

            <div>
                <label>
                    Masukan email anda
                </label>
                <input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Masukan Email Anda"
                />
            </div>

            <div>
                <label>
                    Masukan password anda
                </label>
                <input 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukan Password Anda"
                />
            </div>

            <button type="submit">
                {loading ? "loading..." : "Daftar"}
            </button>
        </form>
        </>
    );
}