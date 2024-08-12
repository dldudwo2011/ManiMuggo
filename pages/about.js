import "../src/app/globals.css"

export default function about(params){
  return(<section class="bg-white dark:bg-gray-900">
  <div class="max-w-screen-xl py-8 lg:py-16 px-4 mx-auto lg:px-6">
      <h2 class="mb-4 text-3xl tracking-tight font-extrabold tracking-tight text-green-400 sm:text-4xl dark:text-white">About our ManiMuggo™</h2>
      <p class="max-w-2xl font-light text-gray-800 sm:text-xl dark:text-gray-400">Stay up to date with new restaurants and exclusive discounts feel free to sign up with your email.</p>
      <dl class="grid gap-8 mt-8 text-green-400 sm:grid-cols-2 lg:gap-20 lg:mt-14 lg:grid-cols-4 dark:text-white">
          <div class="flex flex-col">
              <dt class="mb-2 text-3xl md:text-4xl font-extrabold tracking-tight">2M+</dt>
              <dd class="font-light text-gray-500 dark:text-gray-400">Downloads for our application</dd>
          </div>
          <div class="flex flex-col">
              <dt class="mb-2 text-3xl md:text-4xl font-extrabold">100+</dt>
              <dd class="font-light text-gray-500 dark:text-gray-400">Restaurants listed on our platform</dd>
          </div>
          <div class="flex flex-col">
              <dt class="mb-2 text-3xl md:text-4xl font-extrabold">1 milion</dt>
              <dd class="font-light text-gray-500 dark:text-gray-400">Registered users who trust ManiMuggo </dd>
          </div>
          <div class="flex flex-col">
              <dt class="mb-2 text-3xl md:text-4xl font-extrabold"> less than 0.10%</dt>
              <dd class="font-light text-gray-500 dark:text-gray-400">Lowest reviews</dd>
          </div>
      </dl>
  </div>
  <div class="max-w-screen-2xl px-4 py-8 mx-auto bg-green-700 sm:py-16 lg:px-6">
      <div class="max-w-screen-md mx-auto text-center mb-8 lg:mb-16">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-white dark:text-white">How can we help you?</h2>
          <p class="mb-8 font-light text-white dark:text-gray-400 sm:text-xl">Here are a few of the questions we get the most. If you don't see what's on your mind, reach out to us anytime on phone, chat, or email.</p>
          <label for="email-adress-icon" class="block mb-2 text-sm font-medium text-white sr-only dark:text-gray-300">Your Email</label>
          <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg class="w-6 h-6 text-white dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
              </div>
              <input type="text" id="email-adress-icon" class="block w-full p-4 pl-12 text-white border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type keywords to find answers"></input>
          </div>
          <p class="mt-4 text-sm text-white dark:text-gray-400">You can also browse the topics below to find what you are looking for.</p>
      </div>
      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div>
              <h3 class="mb-4 text-xl font-bold dark:text-white">General</h3>
              <ul role="list" class="space-y-4 text-white dark:text-gray-400">
                  <li>
                      <a href="#" class="hover:underline">How to update</a>
                  </li>
                  <li>
                      <a href="#" class="hover:underline">How to change the language</a>
                  </li>
                  <li>
                      <a href="#" class="hover:underline">About forwarding limits</a>
                  </li>
                  <li>
                      <a href="#" class="hover:underline">How to update Flowbite</a>
                  </li>
              </ul>
          </div>
          <div>
              <h3 class="mb-4 text-xl font-bold dark:text-white">Android</h3>
              <ul role="list" class="space-y-4 text-white dark:text-gray-400">
                  <li>
                      <a href="#" class="hover:underline">Verifying your number</a>
                  </li>
                  <li>
                      <a href="#" class="hover:underline">How to restore your chat history</a>
                  </li>
                  <li>
                      <a href="#" class="hover:underline">How to manage your notifications</a>
                  </li>
                  <li>
                      <a href="#" class="hover:underline">Account & Profile</a>
                  </li>
              </ul>
          </div>
          <div>
              <h3 class="mb-4 text-xl font-bold dark:text-white">Iphone</h3>
              <ul role="list" class="space-y-4 text-white dark:text-gray-400">
                  <li>
                      <a href="#" class="hover:underline">How to restore your chat history</a>
                  </li>
                  <li>
                      <a href="#" class="hover:underline">How to use status</a>
                  </li>
                  <li>
                      <a href="#" class="hover:underline">How to manage your notifications</a>
                  </li>
                  <li>
                      <a href="#" class="hover:underline">Can’t log out</a>
                  </li>
              </ul>
          </div>
      </div>
  </div>
</section>);
};