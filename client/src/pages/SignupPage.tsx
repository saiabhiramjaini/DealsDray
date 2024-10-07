import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { AuthNavbar } from "@/components/ui/AuthNavbar"

export const SignupPage = () => {
    return (
        <div>
            <AuthNavbar/>
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
                <form className="space-y-4">
                    <div>
                        <Label htmlFor="username">Username</Label>
                        <Input
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            className="mt-1"
                        />
                    </div>
                    <Button className="w-full mt-4">Signup</Button>
                </form>
            </div>
        </div>
        </div>
    );
}