export default function Loading(){
    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <h1 className="text-3xl font-bold">Gazi Yapay Zeka</h1>
            <div className="flex flex-col justify-center items-center gap-4">
                <div className="animate-pulse bg-fuchsia-800 rounded-full w-1/3 h-20"></div>
                <div className="animate-pulse bg-fuchsia-800 rounded-full w-1/3 h-20"></div>
                <div className="animate-pulse bg-fuchsia-800 rounded-full w-1/3 h-20"></div>
                <div className="animate-pulse bg-fuchsia-800 rounded-full w-1/3 h-20"></div>
                <div className="animate-pulse bg-fuchsia-800 rounded-full w-1/3 h-20"></div>
            </div>
        </div>
    )
}