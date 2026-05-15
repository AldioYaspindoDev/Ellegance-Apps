import Navbar from "../components/navbar";
import Footer from "../components/footer";
import NavbarProfile from "../components/navbarProfile/navbarProfile";

export default function AccountSettingsPage() {
    return (
        <main className="min-h-screen bg-white flex flex-col">
            <Navbar />
            <div className="pt-32 pb-20 px-10 grid grid-cols-1 lg:grid-cols-4 gap-12">

            <div className="flex-1">

            <NavbarProfile />
            </div>
            <h1 className="title-xl text-neutral-900">Account Settings</h1>
            </div>
            <Footer />
        </main>
    );
}