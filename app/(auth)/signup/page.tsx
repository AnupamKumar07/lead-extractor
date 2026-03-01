import { Navbar } from "@/components/Navbar";
import { AuthForm } from "@/components/AuthForm";

export default function SignupPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center dark:bg-[#0b0f17]">
            <div className="absolute top-0 w-full">
                <Navbar />
            </div>
            <div className="py-12 px-4 sm:px-6 lg:px-8 mt-16">
                <AuthForm type="signup" />
            </div>
        </div>
    );
}
