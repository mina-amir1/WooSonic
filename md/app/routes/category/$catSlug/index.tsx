// import { json, LoaderFunction } from "@remix-run/cloudflare"
import { json, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getCategoryProducts, getFilterProducts } from "~/models/category.server";
import React, { useEffect, useState } from "react";
import { v4 } from 'uuid';
import Breadcrumbs from "~/components/Breadcrumbs";
import { ProductWidget } from "~/components/product/ProductWidget";
import { ProductWidgetWithVariation } from "~/components/product/ProductWidgetWithVariation";
import { API_ENDPOINT, Site_Title } from "~/config";
import { useTranslation } from "react-i18next";
import ShopListTop from "~/components/ShopListTop";
import Filters from "~/components/Filters";
import Loader from "~/components/Loader";



function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const meta: MetaFunction = ({ params }: any) => {
  return {
    title: `Category Page | ${params.catSlug} - ${Site_Title}`
  }
}


export const loader = async ({ params }: any) => {
  const categorySlug = params.catSlug;
  const pageNumber = 1;
  const perPage = 20;
  let products = [];

  try {
    products = await getCategoryProducts(categorySlug, pageNumber, perPage);
  } catch (e) {
    console.log('error', e);
  }

  return json({
    products,
    categorySlug,
  });
};

export default function CategorySlug() {
  const { products: initialProducts, categorySlug } = useLoaderData();
  const { t } = useTranslation();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [grid, setGrid] = useState(false);
  const cat = 'Category';
  const breadcrumbs = {
    pages: [
      { name: 'Home', href: '/' },
      { name: 'Woman', href: '#' },
      { name: 'Parent Category', href: '#' },
      { name: cat, href: '#' }
    ]
  }
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMoreEnabled, setIsLoadMoreEnabled] = useState(true);

  const [products, setProducts] = useState(initialProducts);
  const [pageNumber, setPageNumber] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000000);
  let [selectedCategories, setSelectedCategories] = useState([categorySlug]);
  const [selectedSortOption, setSelectedSortOption] = useState({
    criteria: "date",
    arrangement: "DESC",
  });

  const handleSortOptionChange = (option: any) => {
    setSelectedSortOption(option);
    setIsLoading(true);
    setPageNumber(1);
    setIsLoadMoreEnabled(true);
    setTimeout(() => {
      console.log('after set', pageNumber)
      fetchProducts(false, selectedCategories, option, 1);
    }, 500);
  };
  useEffect(() => {
    setProducts(initialProducts);
    setIsLoading(false);
    setIsLoadMoreEnabled(true);
    setPageNumber(1);
    setSelectedCategories([categorySlug]);
  }, [initialProducts]);

  const fetchProducts = async (appendData = false, selectedCategories: any, selectedSortOption: any, setNumber: number) => {
    const { criteria, arrangement } = selectedSortOption;
    setIsLoading(true);
    try {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: selectedCategories,
          price_range: [minPrice, maxPrice],
          products_per_page: 20,
          page: setNumber ? setNumber : pageNumber,
          sort: {
            criteria,
            arrangement,
          },
        }),
      };

      const response = await fetch(
        `${API_ENDPOINT}/filter.php`,
        options
      );
      const newData = await response.json();

      setProducts((prevProducts: any[]) => {
        if (appendData && prevProducts) {
          console.log('IF appendData')
          return [...prevProducts, ...newData as any[]];
        } else {
          console.log('IF ELSE appendData')
          return newData as any[];
        }
      });
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setIsLoading(false);
    }
  };
  const handleLoadMore = async () => {
    const { criteria, arrangement } = selectedSortOption;
    setIsLoading(true);
    try {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: selectedCategories,
          price_range: [minPrice, maxPrice],
          products_per_page: 20,
          page: pageNumber + 1,
          sort: {
            criteria,
            arrangement,
          },
        }),
      };

      const response = await fetch(
        `${API_ENDPOINT}/filter.php`,
        options
      );
      const newData = await response.json();
      if (Array.isArray(newData)) {
        setProducts((prevProducts) => [...prevProducts, ...newData]);
        if (newData.length < 20) {
          setIsLoadMoreEnabled(false);
        }
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      } else {
        // Handle the case when newData is not an array (e.g., error response)
        console.error('Invalid response format:', newData);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading more products:', error);
    }
  };

  return (
    <div className="bg-white" key={categorySlug}>
      <main className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className='pt-5 '>
          {/* <ShopListTop grid={grid} setGrid={setGrid} setMobileFiltersOpen={setMobileFiltersOpen} /> */}
          <ShopListTop grid={grid} setGrid={setGrid} setMobileFiltersOpen={setMobileFiltersOpen} handleSortOptionChange={handleSortOptionChange} />

          <Breadcrumbs breadcrumbs={breadcrumbs.pages} className="pb-4 border-b border-gray-200" />
          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              <Filters />

              {/* Product grid */}
              <div className="relative z-10 lg:col-span-3">
                <div className={classNames(
                  grid ? 'sm:grid-cols-1 lg:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-4',
                  'grid grid-cols-1 gap-y-10 gap-x-6 xl:gap-x-8 mt-6 relative'
                )}
                >

                  {isLoading ? (
                    <div className="absolute inset-0 z-20 flex items-start justify-center pt-20 bg-gray-200 bg-opacity-75">
                      <Loader />
                    </div>
                  ) : ('')}
                  {products && products.map((productData: any) => (
                    <React.Fragment key={v4()}>
                      <ProductWidget product={productData} />
                    </React.Fragment>
                  ))}
                </div>
                {isLoadMoreEnabled &&
                  <div className="flex items-center justify-center mt-10 loadmore">
                    <button onClick={handleLoadMore} date-num={pageNumber} type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded text-sm px-5 py-2.5 text-center mr-2 inline-flex items-center justify-center whitespace-nowrap">
                      {!isLoading ? (
                        'Load More'
                      ) : (
                        <>
                          <Loader extraclass={'w-4 h-4 mr-2'} />
                          Loading...
                        </>
                      )}
                    </button>
                  </div>
                }
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
