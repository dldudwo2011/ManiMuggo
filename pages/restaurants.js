import Head from 'next/head';
import Image from 'next/image';
import "../src/app/globals.css"

export default function Home() {
  return (
    <div>
      <section class="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-16">
  <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
    <div class="mb-4 items-center justify-between border-gray-200 pb-4 text-gray-900 dark:border-gray-700 md:mb-8 md:flex md:border-b md:pb-8">
      <h2 class="text-center text-xl font-semibold text-gray-900 dark:text-white sm:mb-0 sm:text-2xl">Top categories</h2>
      <a href="#" class="hidden items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto md:flex lg:flex">
        View more categories
        <svg class="-me-2 ms-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
        </svg>
      </a>
    </div>

    <div class="flex justify-evenly mb-8">
      <div>
      <a href="#" class="hover group text-center">
        <div class="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 group-hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white group-hover:dark:bg-gray-700">
          <svg class="h-6 w-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1M5 12h14M5 12a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1m-2 3h.01M14 15h.01M17 9h.01M14 9h.01" />
          </svg>
        </div>
        <p class="text-lg font-semibold text-gray-900 group-hover:underline dark:text-white">Korean</p>
      </a>
      </div>
      <div>
      <a href="#" class="hover group text-center">
        <div class="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 group-hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white group-hover:dark:bg-gray-700">
          <svg class="h-6 w-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z" />
          </svg>
        </div>
        <p class="text-lg font-semibold text-gray-900 group-hover:underline dark:text-white">Chinese</p>
      </a>
      </div>
      <div>
      <a href="#" class="hover group text-center">
        <div class="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 group-hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white group-hover:dark:bg-gray-700">
          <svg class="h-6 w-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 16H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v1M9 12H4m8 8V9h8v11h-8Zm0 0H9m8-4a1 1 0 1 0-2 0 1 1 0 0 0 2 0Z" />
          </svg>
        </div>
        <p class="text-lg font-semibold text-gray-900 group-hover:underline dark:text-white">Japanese</p>
      </a>
      </div>
      <div>
      <a href="#" class="hover group text-center">
        <div class="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 group-hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white group-hover:dark:bg-gray-700">
          <svg class="h-6 w-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.079 6.839a3 3 0 0 0-4.255.1M13 20h1.083A3.916 3.916 0 0 0 18 16.083V9A6 6 0 1 0 6 9v7m7 4v-1a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1Zm-7-4v-6H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1Zm12-6h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1v-6Z" />
          </svg>
        </div>
        <p class="text-lg font-semibold text-gray-900 group-hover:underline dark:text-white">Fast Food</p>
      </a>
      </div>
      <div>
      <a href="#" class="hover group text-center">
        <div class="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 group-hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white group-hover:dark:bg-gray-700">
          <svg class="h-6 w-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v5m-3 0h6M4 11h16M5 15h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1Z" />
          </svg>
        </div>
        <p class="text-lg font-semibold text-gray-900 group-hover:underline dark:text-white">Mexican</p>
      </a>
      </div>
      <div>
      <a href="#" class="hover group text-center">
        <div class="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 group-hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white group-hover:dark:bg-gray-700">
          <svg class="h-6 w-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.872 9.687 20 6.56 17.44 4 4 17.44 6.56 20 16.873 9.687Zm0 0-2.56-2.56M6 7v2m0 0v2m0-2H4m2 0h2m7 7v2m0 0v2m0-2h-2m2 0h2M8 4h.01v.01H8V4Zm2 2h.01v.01H10V6Zm2-2h.01v.01H12V4Zm8 8h.01v.01H20V12Zm-2 2h.01v.01H18V14Zm2 2h.01v.01H20V16Z" />
          </svg>
        </div>
        <p class="text-lg font-semibold text-gray-900 group-hover:underline dark:text-white">Bubble Tea</p>
      </a>
      </div>
      <div>
      <a href="#" class="hover group text-center">
        <div class="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 group-hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white group-hover:dark:bg-gray-700">
          <svg class="h-6 w-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 9h.01M8.99 9H9m12 3a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM6.6 13a5.5 5.5 0 0 0 10.81 0H6.6Z" />
          </svg>
        </div>
        <p class="text-lg font-semibold text-gray-900 group-hover:underline dark:text-white">Vietnamese</p>
      </a>
      </div>
      <div>
      <a href="#" class="hover group text-center">
        <div class="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 group-hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white group-hover:dark:bg-gray-700">
          <svg class="h-6 w-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 12c.263 0 .524-.06.767-.175a2 2 0 0 0 .65-.491c.186-.21.333-.46.433-.734.1-.274.15-.568.15-.864a2.4 2.4 0 0 0 .586 1.591c.375.422.884.659 1.414.659.53 0 1.04-.237 1.414-.659A2.4 2.4 0 0 0 12 9.736a2.4 2.4 0 0 0 .586 1.591c.375.422.884.659 1.414.659.53 0 1.04-.237 1.414-.659A2.4 2.4 0 0 0 16 9.736c0 .295.052.588.152.861s.248.521.434.73a2 2 0 0 0 .649.488 1.809 1.809 0 0 0 1.53 0 2.03 2.03 0 0 0 .65-.488c.185-.209.332-.457.433-.73.1-.273.152-.566.152-.861 0-.974-1.108-3.85-1.618-5.121A.983.983 0 0 0 17.466 4H6.456a.986.986 0 0 0-.93.645C5.045 5.962 4 8.905 4 9.736c.023.59.241 1.148.611 1.567.37.418.865.667 1.389.697Zm0 0c.328 0 .651-.091.94-.266A2.1 2.1 0 0 0 7.66 11h.681a2.1 2.1 0 0 0 .718.734c.29.175.613.266.942.266.328 0 .651-.091.94-.266.29-.174.537-.427.719-.734h.681a2.1 2.1 0 0 0 .719.734c.289.175.612.266.94.266.329 0 .652-.091.942-.266.29-.174.536-.427.718-.734h.681c.183.307.43.56.719.734.29.174.613.266.941.266a1.819 1.819 0 0 0 1.06-.351M6 12a1.766 1.766 0 0 1-1.163-.476M5 12v7a1 1 0 0 0 1 1h2v-5h3v5h7a1 1 0 0 0 1-1v-7m-5 3v2h2v-2h-2Z"
            />
          </svg>
        </div>
        <p class="text-lg font-semibold text-gray-900 group-hover:underline dark:text-white">Thai</p>
      </a>
      </div>
      </div>
      <div class="flex justify-evenly">
      <a href="#" class="hover group text-center">
        <div class="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 group-hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white group-hover:dark:bg-gray-700">
          <svg class="h-6 w-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
          </svg>
        </div>
        <p class="text-lg font-semibold text-gray-900 group-hover:underline dark:text-white">Grocery</p>
      </a>
      <a href="#" class="hover group text-center">
        <div class="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 group-hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white group-hover:dark:bg-gray-700">
          <svg class="h-6 w-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
          </svg>
        </div>
        <p class="text-lg font-semibold text-gray-900 group-hover:underline dark:text-white">Pizza</p>
      </a>
      <a href="#" class="hover group text-center">
        <div class="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 group-hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white group-hover:dark:bg-gray-700">
          <svg class="h-6 w-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
          </svg>
        </div>
        <p class="text-lg font-semibold text-gray-900 group-hover:underline dark:text-white">Liquor</p>
      </a>
      <a href="#" class="hover group text-center">
        <div class="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 group-hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white group-hover:dark:bg-gray-700">
          <svg class="h-6 w-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" />
          </svg>
        </div>
        <p class="text-lg font-semibold text-gray-900 group-hover:underline dark:text-white">Coffee</p>
      </a>
      <a href="#" class="hover group text-center">
        <div class="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 group-hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white group-hover:dark:bg-gray-700">
          <svg class="h-6 w-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M4 18V8a1 1 0 0 1 1-1h1.5l1.707-1.707A1 1 0 0 1 8.914 5h6.172a1 1 0 0 1 .707.293L17.5 7H19a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z" />
            <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </div>
        <p class="text-lg font-semibold text-gray-900 group-hover:underline dark:text-white">Salad</p>
      </a>
      <a href="#" class="hover group text-center">
        <div class="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 group-hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white group-hover:dark:bg-gray-700">
          <svg class="h-6 w-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 7 2 2 4-4m-5-9v4h4V3h-4Z" />
          </svg>
        </div>
        <p class="text-lg font-semibold text-gray-900 group-hover:underline dark:text-white">Taiwanese</p>
      </a>
      <a href="#" class="hover group text-center">
        <div class="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 group-hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white group-hover:dark:bg-gray-700">
          <svg class="h-6 w-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
            <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </div>
        <p class="text-lg font-semibold text-gray-900 group-hover:underline dark:text-white">Seafood</p>
      </a>
      <a href="#" class="hover group text-center">
        <div class="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 group-hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white group-hover:dark:bg-gray-700">
          <svg class="h-6 w-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 15h12M6 6h12m-6 12h.01M7 21h10a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1Z" />
          </svg>
        </div>
        <p class="text-lg font-semibold text-gray-900 group-hover:underline dark:text-white">Desserts</p>
      </a>
    </div>

    <a href="#" class="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 md:hidden">
      View more categories
      <svg class="-me-2 ms-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
      </svg>
    </a>
  </div>
</section>

        <section className="container mx-auto px-4 py-8">
          <div className="flex justify-center space-x-8 mb-8">
            <button className="bg-white px-4 py-2 rounded shadow">Incredible Discount</button>
            <button className="bg-white px-4 py-2 rounded shadow">Gastronomy</button>
            <button className="bg-white px-4 py-2 rounded shadow">The closest</button>
            <button className="bg-white px-4 py-2 rounded shadow">Price</button>
            <button className="bg-white px-4 py-2 rounded shadow">Sort</button>
            <button className="bg-white px-4 py-2 rounded shadow">Offers</button>
            <button className="bg-white px-4 py-2 rounded shadow">Delivery time</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded shadow overflow-hidden">
              <Image src="/restaurant1.jpg" alt="Tansen Izakaya" width={500} height={300} />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Tansen Izakaya</h3>
                <p className="text-sm text-gray-600">4.9 • 44-54min • delivery $2.99 • per capita $25 • Japanese</p>
                <div className="mt-2">
                  <span className="bg-red-500 text-white px-2 py-1 rounded">10% on everything</span>
                  <span className="bg-pink-500 text-white px-2 py-1 rounded ml-2">$10 discount $25 beginner coupon</span>
                </div>
              </div>
            </div>
            {/* Repeat similar blocks for other restaurants */}
          </div>
        </section>
    </div>
  );
}
