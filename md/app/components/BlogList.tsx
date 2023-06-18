
export default function BlogList() {
    return (
        <section className="py-10 lg:py-20">
            <div className="container mx-auto">
                <div className="flex flex-wrap justify-center -mx-4">
                    <div className="w-full px-4">
                        <div className="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
                            <span className="block mb-2 text-lg font-semibold text-primary-400">
                                Our Blogs
                            </span>
                            <h2
                                className=" mb-4 text-3xl font-bold sm:text-4xl md:text-[40px]"
                            >
                                Our Recent News
                            </h2>
                            <p className="text-base text-body-color">
                                There are many variations of passages of Lorem Ipsum available but
                                the majority have suffered alteration in some form.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                        <div className="mx-auto mb-10 max-w-[370px]">
                            <div className="mb-8 overflow-hidden rounded">
                                <img
                                    src="/images/blog/image-01.jpg"
                                    alt="image"
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <span
                                    className="inline-block px-4 py-1 mb-5 text-xs font-semibold leading-loose text-center text-white rounded bg-primary-400"
                                >
                                    Dec 22, 2023
                                </span>
                                <h3>
                                    <a
                                        href="#"
                                        className="inline-block mb-4 text-xl font-semibold  hover:text-primary-400 sm:text-2xl lg:text-xl xl:text-2xl"
                                    >
                                        Meet AutoManage, the best AI management tools
                                    </a>
                                </h3>
                                <p className="text-base text-body-color">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting
                                    industry.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                        <div className="mx-auto mb-10 max-w-[370px]">
                            <div className="mb-8 overflow-hidden rounded">
                                <img
                                    src="/images/blog/image-02.jpg"
                                    alt="image"
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <span
                                    className="inline-block px-4 py-1 mb-5 text-xs font-semibold leading-loose text-center text-white rounded bg-primary-400"
                                >
                                    Mar 15, 2023
                                </span>
                                <h3>
                                    <a
                                        href="#"
                                        className="inline-block mb-4 text-xl font-semibold  hover:text-primary-400 sm:text-2xl lg:text-xl xl:text-2xl"
                                    >
                                        How to earn more money as a wellness coach
                                    </a>
                                </h3>
                                <p className="text-base text-body-color">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting
                                    industry.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                        <div className="mx-auto mb-10 max-w-[370px]">
                            <div className="mb-8 overflow-hidden rounded">
                                <img
                                    src="/images/blog/image-03.jpg"
                                    alt="image"
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <span
                                    className="inline-block px-4 py-1 mb-5 text-xs font-semibold leading-loose text-center text-white rounded bg-primary-400"
                                >
                                    Jan 05, 2023
                                </span>
                                <h3>
                                    <a
                                        href="#"
                                        className="inline-block mb-4 text-xl font-semibold  hover:text-primary-400 sm:text-2xl lg:text-xl xl:text-2xl"
                                    >
                                        The no-fuss guide to upselling and cross selling
                                    </a>
                                </h3>
                                <p className="text-base text-body-color">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting
                                    industry.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
