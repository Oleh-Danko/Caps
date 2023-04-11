import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => {
  let items = [...Array(8)]
  return items.map((el, i) => el =
    <ContentLoader 
      key={i}
      speed={6}
      width={210}
      height={260}
      viewBox="0 0 210 260"
      backgroundColor="#f3f3f3"
      foregroundColor="#ffffff"
      {...props}
    >
      <rect x="0" y="0" rx="10" ry="10" width="150" height="90" /> 
      <rect x="0" y="101" rx="3" ry="3" width="150" height="15" /> 
      <rect x="0" y="121" rx="3" ry="3" width="93" height="15" /> 
      <rect x="0" y="165" rx="5" ry="5" width="80" height="24" /> 
      <rect x="117" y="158" rx="5" ry="5" width="32" height="32" />
    </ContentLoader>
  )
}

export default Skeleton