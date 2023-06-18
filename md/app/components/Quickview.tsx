import { Fragment, useEffect, useState } from 'react'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'
import { Link } from '@remix-run/react'
import SizeGuide from './SizeGuide'
import SelectColor from './product/SelectColor'
import { getProductBySlug } from '~/api/products'
import SelectSize from './product/SelectSize'
import AddToCartSimple from './AddToCartSimple'
import Loader from './Loader'


interface QuickviewProps {
  openQuick: any;
  openModal: any;
  product: any;
  // other props...
}

interface ProductData {
  name: string;
  attributes?: {
    pa_color?: string[] | Record<string, string>;
    // add other attribute types here if needed
  };
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Quickview({ openQuick, openModal, product }: QuickviewProps) {

  // const nearestNumberRating = Math.round(product.rating)
  const nearestNumberRating = 2
  // const [selectedColor, setSelectedColor] = useState(product2.colors[0])
  // const [selectedSize, setSelectedSize] = useState(product2.sizes[2])

  const [selectedSize, setSelectedSize] = useState(product.attributes?.pa_size[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.attributes?.pa_color[0] || '');


  // let variation:any = [];
  // let variationSalePrice = 0;
  const [productData, setProductData] = useState({});
  useEffect(() => {
    const fetchProduct = async () => {
      const productData = await getProductBySlug(product.slug);
      setProductData(productData);
    };
    fetchProduct();

    // console.log('variation inside',variation)
    // console.log('variation',variation)
  }, [product.slug]);
  
  let variation = productData?.variations?.find((variation: any) =>
  variation.attributes.attribute_pa_size === selectedSize &&
  variation.attributes.attribute_pa_color === selectedColor
);
let variationPrice = variation ? variation.price : null;
let variationSalePrice = variation ? variation.sale_price : null;
  // console.log('product',product)
  // console.log('product productData',productData)
  // console.log('variationSalePrice',variationSalePrice)
  // console.log('variation',variation)
  // console.log('selectedSize',selectedSize)
  // console.log('selectedColor',selectedColor)
  return (
    <div className="overview">
      <Transition show={openQuick} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={openModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 hidden transition-opacity bg-gray-500 bg-opacity-75 md:block" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-stretch justify-center min-h-full text-center md:items-center md:px-2 lg:px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                enterTo="opacity-100 translate-y-0 md:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              >
                <Dialog.Panel className="flex w-full text-base text-left transition transform md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                  <div className="relative flex items-center w-full px-4 pb-8 overflow-hidden bg-white shadow-2xl pt-14 sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                    <button
                      type="button"
                      className="absolute text-gray-400 right-4 top-4 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                      onClick={openModal}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                    </button>

                    <div className="grid items-start w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                      <div className="overflow-hidden bg-gray-100 rounded-lg aspect-h-3 aspect-w-2 sm:col-span-4 lg:col-span-5">
                        <img src={product.main_image} alt={product.title} className="object-cover object-center" />
                      </div>
                      <div className="sm:col-span-8 lg:col-span-7">
                        <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{product.title}</h2>
                        <h3 className="text-xl font-bold text-gray-900 sm:pr-12">{product.category}</h3>

                        <section aria-labelledby="information-heading" className="mt-2">
                          <h3 id="information-heading" className="sr-only">
                            Product information
                          </h3>

                          <p className="text-2xl text-gray-900">{product.price}</p>

                          {/* Reviews */}
                          <div className="mt-6">
                            <h3 className="sr-only">Reviews</h3>
                            <div className="flex items-center">
                              <div className="flex items-center">
                                {Array(5).fill(0).map((_, idx) => (
                                  <svg key={idx} className={`h-5 w-5 flex-shrink-0 ${idx < nearestNumberRating ? "text-gray-900" : "text-gray-200"}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
                                  </svg>
                                ))}
                              </div>
                              <p className="sr-only">{nearestNumberRating} out of 5 stars</p>
                            </div>
                          </div>
                        </section>

                        <section aria-labelledby="options-heading" className="mt-10">
                          <h3 id="options-heading" className="sr-only">
                            Product options
                          </h3>
                          
                          {/* Colors */}
                          {productData?.attributes?.pa_color ? (
                            <SelectColor
                              colors={productData.attributes?.pa_color || []}
                              selectedColor={selectedColor}
                              onSelectedColorChange={setSelectedColor}

                            />
                          ) : (<Loader/>)}

                          {/* Sizes */}
                          {productData?.attributes?.pa_size ? (
                            <SelectSize
                              sizes={productData.attributes?.pa_size || []}
                              selectedSize={selectedSize}
                              onSelectedSizeChange={setSelectedSize}
                            />
                          ) : <Loader/>}

                          <AddToCartSimple
                            className='flex items-center justify-center w-full px-8 py-3 mt-6 text-base font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
                            product={
                              {
                                id: productData.id,
                                thumbnail: productData.main_img,
                                size: selectedSize,
                                color: selectedColor,
                                slug: productData.slug,
                                price: variationSalePrice,
                              }
                            }
                            disabled={variationSalePrice===null}
                          />
                          <Link to={`/products/${productData.slug}`}
                            className="flex justify-center w-auto m-auto mt-6 text-base font-medium text-primary-600 hover:text-primary-900 focus:outline-none"
                          >
                            View Product
                          </Link>
                        </section>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
