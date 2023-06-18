import { LazyLoadImage } from "react-lazy-load-image-component";

interface Features {
    features: string[];
  }
export default function ProductSpecifications({features}:Features) {
    return (
        <div className="mt-10 bg-white border-t-2">
            <div className="container grid items-center grid-cols-1 px-4 mx-auto gap-y-16 gap-x-8 py-14 sm:px-6 lg:grid-cols-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{"Product Extra Specifications"}</h2>
                    <p className="mt-4 text-gray-500">
                        The walnut wood card tray is precision milled to perfectly fit a stack of Focus cards. The powder coated
                        steel divider separates active cards from new ones, or can be used to archive important task lists.
                    </p>

                    <dl className="grid grid-cols-1 mt-16 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                        {features.map((feature:any) => (
                            <div key={feature.name} className="pt-4 border-t border-gray-200">
                                <dt className="font-medium text-gray-900">{feature.name}</dt>
                                <dd className="mt-2 text-sm text-gray-500">{feature.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
                <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
                    <LazyLoadImage
                        src={"https://picsum.photos/350?random=1"}
                        placeholderSrc="https://picsum.photos/50?random=1"
                        className="bg-gray-100 rounded-lg"
                    />
                    <LazyLoadImage
                        src={"https://picsum.photos/350?random=2"}
                        placeholderSrc="https://picsum.photos/50?random=2"
                        className="bg-gray-100 rounded-lg"
                    />
                    <LazyLoadImage
                        src={"https://picsum.photos/350?random=3"}
                        placeholderSrc="https://picsum.photos/50?random=3"
                        className="bg-gray-100 rounded-lg"
                    />
                    <LazyLoadImage
                        src={"https://picsum.photos/350?random=5"}
                        placeholderSrc="https://picsum.photos/50?random=5"
                        className="bg-gray-100 rounded-lg"
                    />
                </div>
            </div>
        </div>
    )
}
