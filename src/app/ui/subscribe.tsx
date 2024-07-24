export default function Subscribe() {
    return (
        <div className="container pt-16 pb-4 px-8 mx-auto text-center">
            <h3 className="text-3xl font-bold">Stay in Touch</h3>
            <p className="mt-4 text-gray-600">Stay ahead of the curve! Sign up for our newsletter and receive the latest updates, news, and exclusive offers delivered straight to your inbox.</p>
            <form className="py-8 max-w-2xl mx-auto md:flex md:justify-around text-lg">
                <label htmlFor="email" className='sr-only'>Email address</label>
                <input id="email" type="text" placeholder="Email address" className="w-full mb-2 py-2 md:py-0 pl-4 md:my-0 md:w-auto border-solid border-blue-700 border-2 rounded-lg focus:bg-blue-50 focus:outline-none"/>
                <label htmlFor="name" className='sr-only'>Full name</label>
                <input id="name" type="text" placeholder="Full name" className="w-full mb-2 py-2 md:py-0 pl-4 md:my-0 md:w-auto border-solid border-blue-700 focus:bg-blue-50 focus:outline-none border-2 rounded-lg"/>
                <input type="submit" value="Subscribe" className="w-full md:w-auto py-2 px-2 bg-blue-700 text-white rounded-lg cursor-pointer"/>
            </form>
        </div>
    );
}