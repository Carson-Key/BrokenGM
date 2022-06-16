// Packages
import { useState } from 'react'
// Helpers
import { moreLessTextDecider } from '../../helpers/misc'

const Footer = (props) => {
    const { setCardExpandedClass } = props
    const [expandCard, setExpandCard] = useState(false)

    return (
        <div className="border-t-2 border-secondary mt-auto flex justify-end">
            <button className="flex text-lg text-blue-500 my-2 mx-4" 
                onClick={() => {
                    setExpandCard(!expandCard)
                    setCardExpandedClass(
                        prev => (
                        (prev === " h-80") ? 
                            " h-1/2 w-1/2" : 
                            " h-80"
                        )
                    )
                }
            }>{moreLessTextDecider(expandCard)}</button>
        </div>
	)
}

export default Footer
