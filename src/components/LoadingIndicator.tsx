export function LoadingIndicator() {
  return (
    <div className="text-gray-900 body-font w-full bg-white/20 my-4 p-4 border-white/20 border">
      <div className="container mx-auto">
        <div className="flex justify-start align-middle items-center">
          <div className="p-4 ">
            <h2 className="title-font font-medium sm:text-2xl text-3xl">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                >
                </circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                >
                </path>
              </svg>
            </h2>
          </div>
          <div className="p-4 ">
            <h2 className="title-font font-medium sm:text-2xl text-3xl">
              Requesting tokens
            </h2>
            <p className="leading-relaxed">This can take some time...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
