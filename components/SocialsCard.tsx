import React from 'react'

const SocialsCard = ({links}: {links: {
    svg: React.ReactNode,
    title: string,
    subtitle: string,
    url: string
}[]}) => {
  return (
    <>
        {
            links.map((link, index) => {
                return (
                    <a href={link.url} key={index} target="_blank" rel="noreferrer" className="flex flex-col items-start justify-center gap-2 sm:w-1/3 w-4/5 border-fuchsia-800 border-4 rounded-xl p-4 transition-all hover:bg-fuchsia-800 hover:rounded-3xl">
                        <div className="flex items-center gap-2 w-full">
                            {link.svg}
                            <h2 className="text-lg font-medium">{link.title}</h2>
                        </div>
                        <p className="text-xs text-neutral-400 text-left">{link.subtitle}</p>
                    </a>
                )
            })
        }
    </>
  )
}

export default SocialsCard