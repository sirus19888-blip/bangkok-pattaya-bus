'use client'

import Script from 'next/script'

type Props = {
  origin: string
  destination: string
  slug: string
}

export function Go12Widget({ origin, destination, slug }: Props) {
  return (
    <div className="md:hidden overflow-hidden rounded-2xl border border-[#eadcc7] bg-white shadow-sm">
      <div
        id="one2go-widget"
        data-one2go="15791301"
        data-color="black"
        data-language="en"
        data-width="100%"
        data-height="320"
        data-border="1"
        data-origin={origin}
        data-destination={destination}
        data-domain="12go.asia"
      />
      <Script
        id={`12go-widget-${slug}`}
        src="//cdn0.trainbusferry.com/tools/form/en/?id=15791301&domain=12go.asia"
        strategy="afterInteractive"
      />
    </div>
  )
}
