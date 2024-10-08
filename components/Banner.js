export default function Banner(params) {
    return(<div id="banner" tabindex="-1" class="flex fixed z-50 justify-between py-3 px-4 w-full bg-gray-50 border border-b border-gray-200 dark:border-gray-700 dark:bg-gray-800">
        <div class="flex items-center mx-auto">
            <p class="text-sm font-medium text-gray-900 md:my-0 dark:text-white">
                <span class="hidden md:inline-flex bg-primary-100 text-primary-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">New</span>
                We have launched Flowbite Blocks including over 120+ website sections!
                <a href="#" class="inline-flex items-center ml-0 text-sm font-medium text-primary-600 md:ml-2 dark:text-primary-500 hover:underline">
                    Check it out
                    <svg class="ml-1 w-4 h-4 text-primary-600 dark:text-primary-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </a>
            </p>
        </div>
        <button data-collapse-toggle="banner" type="button" class="inline-flex justify-center items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
        </button>
    </div>);
};
