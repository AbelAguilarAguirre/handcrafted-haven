export default function LoginForm() {
    return (
            <form className="flex flex-col gap-x-8 text-lg flex" >
                <legend>Login To Your Account:</legend>
                <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter Email Address"
                    required
                    className="w-full mb-2 px-2 md:py-0 pl-4 md:my-0 md:w-96 border-solid border-blue-700 border-2 rounded-lg focus:bg-blue-50 focus:outline-none"
                />
                <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="password"
                    required
                    className="w-full mb-2 px-2 md:py-0 pl-4 md:my-0 md:w-96 border-solid border-blue-700 focus:bg-blue-50 focus:outline-none border-2 rounded-lg"
                />
                <button className="w-full md:w-96 py-2 px-2 bg-blue-700 text-white rounded-lg cursor-pointer" type="submit">Login</button>
            </form>
    );
}
