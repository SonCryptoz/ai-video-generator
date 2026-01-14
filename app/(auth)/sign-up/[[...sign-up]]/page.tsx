import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

import CinematicBackground from "@/components/ui/cinematic-bg";

const SignInPage = async () => {
    const { userId } = await auth();
    if (userId) redirect("/");

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 overflow-hidden">
            {/* LEFT SIDE – IMAGE + BRANDING */}
            <div className="relative hidden md:flex items-center justify-center bg-linear-to-br from-primary/10 via-accent/10 to-secondary/10 backdrop-blur-xl">
                <CinematicBackground />

                <Image
                    src="/login_image.png"
                    alt="Illustration"
                    width={650}
                    height={650}
                    className="max-w-[70%] drop-shadow-2xl animate-fade-in"
                    priority
                />

                <div className="absolute inset-0 bg-white/5 pointer-events-none" />

                <div className="absolute bottom-10 text-center px-10">
                    <Link href="/">
                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-secondary">
                            AI PicMotion Lab
                        </h2>
                    </Link>
                    <p className="text-base-content/60 mt-2">
                        Turn your ideas into short videos powered by AI.
                    </p>
                </div>
            </div>

            {/* RIGHT SIDE – PARTICLES + CLERK FORM */}
            <div className="relative flex items-center justify-center h-screen px-6">
                {/* GLASS CONTAINER */}
                <div
                    className="
                        relative z-10 
                        p-8 w-auto
                        rounded-2xl
                        bg-base-100/60 
                        backdrop-blur-xl 
                        border border-white/20 
                        shadow-[0_8px_40px_rgba(0,0,0,0.2)]
                        animate-fade-up
                    "
                >
                    <SignUp
                        appearance={{
                            elements: {
                                rootBox: "w-full",
                                card: "shadow-none bg-transparent",
                                formButtonPrimary:
                                    "btn btn-primary w-full rounded-full",
                                headerTitle: "text-2xl font-bold text-primary",
                                headerSubtitle: "text-base-content/60",
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
