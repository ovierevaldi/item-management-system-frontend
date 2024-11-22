import LoginForm from "../components/LoginForm";

const AuthPage = () => {
    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                    Welcome
                </h2>
                <LoginForm/>
            </div>
        </div>
    )   
}

export default AuthPage;