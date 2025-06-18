import { productWorkflow } from "../data/productGoodness ";

export default function ProductProcess() {
    return (
        <section className="mb-10 px-3">
            <div className="max-w-6xl mx-auto bg-white dark:bg-gray-700/20 transition-colors duration-500 py-16 p-6 rounded-2xl">
                <div className="text-center mb-5">
                    <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
                        Bringing Natural & Freshness Back to Your Kitchen
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-lg">
                        Better everyday health begins with the basics. We ensure everything in
                        your kitchen is thoroughly tested for purity and freshness.
                    </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
                    {productWorkflow.map(({ icon, title, description }, i) => (
                        <div
                            key={i * 0.6}
                            className="flex flex-col items-center text-center p-3"
                        >
                            <icon className="text-gray-600 dark:text-white mb-4" sx={{ fontSize: 50 }} />
                            <h3 className="text-[1.1rem] font-semibold text-gray-900 dark:text-white mb-2">
                                {title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}