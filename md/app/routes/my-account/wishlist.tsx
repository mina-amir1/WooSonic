import { Link } from "@remix-run/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import WishListProducts from "~/components/AddWishList";
import { Site_Title } from "~/config";
import { FormatCurrency } from "~/utils/FormatCurrency";

export const meta = () => {
  return {
    title: `My Wishtlist | ${Site_Title}`
  }
}

export default function wishlist() {
  const fakeProducts = [
    {
      id: 45417,
      name: 'SKIRT',
      slug: 'skirt-7',
      price: '16450',
      sale_price: '',
      main_image: 'https://www.lecollezioni-eg.com/wp-content/uploads/2022/12/thumb-73HAE813NS173-purple.jpg'
    },
    {
      id: 46215,
      name: 'SKIRT',
      slug: 'skirt-6',
      price: '15500',
      sale_price: '',
      main_image: 'https://www.lecollezioni-eg.com/wp-content/uploads/2022/12/thumb-I2PAC0170891266-beige.jpg'
    },
    {
      id: 46255,
      name: 'SKIRT',
      slug: 'skirt-5',
      price: '19550',
      sale_price: '',
      main_image: 'https://www.lecollezioni-eg.com/wp-content/uploads/2022/12/thumb-I2PC0515072S5Y2-color.jpg'
    },
    {
      id: 46406,
      name: 'SKIRT',
      slug: 'skirt-4',
      price: '18450',
      sale_price: '',
      main_image: 'https://www.lecollezioni-eg.com/wp-content/uploads/2022/12/thumb-73HAE8A5NS166-purple.jpg'
    },
    {
      id: 43745,
      name: 'SKIRT',
      slug: 'skirt',
      price: '19950',
      sale_price: '',
      main_image: 'https://www.lecollezioni-eg.com/wp-content/uploads/2022/09/thumb-XF0LB191KB39-black.jpg'
    },
    {
      id: 41502,
      name: 'SKIRT',
      slug: 'skirt-9',
      price: '12750',
      sale_price: '',
      main_image: 'https://www.lecollezioni-eg.com/wp-content/uploads/2022/05/gall-72HAE812NS115GM4-color-1.jpg'
    },
    {
      id: 36165,
      name: 'SKIRT',
      slug: 'skirt-23',
      price: '7000',
      sale_price: '',
      main_image: 'https://www.lecollezioni-eg.com/wp-content/uploads/2021/08/thumb-CFWGE6500T089A0007-wht-bla.jpg',
    },
    {
      id: 33979,
      name: 'SKIRT',
      slug: 'skirt-22',
      price: '9800',
      sale_price: '',
      main_image: 'https://www.lecollezioni-eg.com/wp-content/uploads/2021/08/thumb-I2PC0915174S4K1-pink.jpg',
    }
  ]
  return (
    <div>
      <WishListProducts />
      <div className="flex items-center justify-between py-5 pb-5 border-b-2 border-gray-200 border-solid">
        <h1 className="text-3xl">My Wishtlist</h1>
      </div>
      <div className="flex flex-row flex-wrap pt-2 -mx-2">
        {fakeProducts.map(product => (
          <div className="w-full sm:w-1/2 md:w-1/3">
            <div className="relative px-2 pb-5">
              <div className="relative z-10 w-full overflow-hidden bg-gray-200 rounded-md min-h-80 group-hover:opacity-75 ">
                <div className="block aspect-w-4 aspect-h-3 lg:h-80">
                  <LazyLoadImage
                    alt={product.name}
                    // effect="blur"
                    src={product.main_image ? product.main_image : product.thumbnail}
                    wrapperClassName="z-1"
                    className="self-center object-cover object-center w-full h-full m-auto lg:h-full lg:w-full"
                  />
                </div>
              </div>
              <div className="mt-4">
                <h2 className="text-sm text-gray-700">
                  <Link to={`/products/${product.slug}`} prefetch="intent">
                    <span aria-hidden="true" className="absolute inset-0 z-1" />
                    {product.name}
                  </Link>
                </h2>
                <span className="text-sm font-medium text-gray-900">{FormatCurrency(product.price)}</span>
              </div>
              <button className="absolute z-10 top-3 right-5">
                <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.2349 2.20135C15.836 1.80591 15.3623 1.49223 14.841 1.27821C14.3197 1.0642 13.761 0.954041 13.1967 0.954041C12.6324 0.954041 12.0737 1.0642 11.5524 1.27821C11.0311 1.49223 10.5574 1.80591 10.1585 2.20135L9.33065 3.02162L8.50277 2.20135C7.69699 1.40297 6.60413 0.954454 5.46459 0.954454C4.32506 0.954454 3.23219 1.40297 2.42642 2.20135C1.62065 2.99972 1.16797 4.08254 1.16797 5.2116C1.16797 6.34067 1.62065 7.42349 2.42642 8.22187L3.2543 9.04214L9.33065 15.0627L15.407 9.04214L16.2349 8.22187C16.634 7.82662 16.9506 7.35734 17.1666 6.84083C17.3826 6.32431 17.4937 5.7707 17.4937 5.2116C17.4937 4.65251 17.3826 4.0989 17.1666 3.58238C16.9506 3.06587 16.634 2.59659 16.2349 2.20135V2.20135Z" fill="#D45959" stroke="#D45959" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        ))}
        <div className="w-full">
          <p className="text-[#929292] mb-5 text-lg">There’s no items in your wishlist</p>
          <a href="/" className="inline-flex justify-center px-10 py-2 text-sm font-semibold text-white rounded-lg bg-slate-900 hover:bg-slate-700">Shop Now</a>
        </div>
      </div>
    </div>
  )
}