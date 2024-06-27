export default function Subscribe() {
    return (
        <div className="max-w-xs md:max-w-2xl py-4 px-4 mx-auto">
            <h3 className="text-4xl font-bold text-center">Stay in Touch</h3>
            <p className="text-lg my-4">Stay ahead of the curve! Sign up for our newsletter and receive the latest updates, news, and exclusive offers delivered straight to your inbox.</p>
            <form className="md:flex md:gap-2 md:justify-around text-lg">
                <label htmlFor="email" hidden>Email address</label>
                <input id="email" type="text" placeholder="Email address" className="w-full mb-2 py-2 md:py-0 md:my-0 md:w-auto pl-4 border-solid border-blue-700 border-2 rounded-lg focus:bg-blue-50 focus:outline-none"/>
                <label htmlFor="name" hidden>Full name</label>
                <input id="name" type="text" placeholder="Full name" className="w-full mb-2 py-2 md:py-0 md:my-0 md:w-auto pl-4 border-solid border-blue-700 focus:bg-blue-50 focus:outline-none border-2 rounded-lg"/>
                <input type="submit" value="Subscribe" className="w-full bg-blue-700 py-2 px-2 text-white rounded-lg cursor-pointer"/>
            </form>
        </div>
    );
}