export default function LoginForm() {
    return (
      <form className="flex items-center flex-col gap-x-8 text-lg">
        <legend
        className="font-bold text-blue-700"
        >Login To Your Account:
        </legend>
        <input
          id="email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Enter Email Address"
          required
          className="w-full m-2 px-2 pl-4 max-w-md border-solid border-blue-700 border-2 rounded-lg focus:bg-blue-50 focus:outline-none"
        />
        <input
          id="password"
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="Password"
          required
          className="w-full mb-2 px-2 pl-4 max-w-md border-solid border-blue-700 focus:bg-blue-50 focus:outline-none border-2 rounded-lg"
        />
        <button
          className="w-full max-w-md py-1 px-2 bg-blue-700 text-white rounded-lg cursor-pointer"
          type="submit"
        >
          Login
        </button>
      </form>
    );
}
