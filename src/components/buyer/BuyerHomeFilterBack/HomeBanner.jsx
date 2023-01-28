import React, { useState, memo } from 'react'
import MoreFilter from './MoreFilter'
import Banner from './banner'

const HomeBanner = (props) => {
    const [showMore, setShowMore] = useState(false)
    const changeShowMore = () => {
        setShowMore(!showMore)
    }

    return (showMore ? <MoreFilter {...props} changeShowMore={changeShowMore} /> : <Banner {...props} changeShowMore={changeShowMore} />)
}
export default memo(HomeBanner)