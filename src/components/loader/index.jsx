export default function Loader() {
    return (
        <div className="w-full h-screen flex flex-col space-y-4 items-center justify-center absolute">
            <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin " />
            <span className="text-xs">
                Loading...
            </span>
        </div>
    )
}