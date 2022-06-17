// Packages
import { useState } from 'react'
// Components
import ConditionalRender from '../ConditionalRender'
// Helpers
import { moreLessTextDecider } from '../../helpers/misc'

const Footer = (props) => {
    const { setCardExpandedClass, isAdmin } = props
    const [expandCard, setExpandCard] = useState(false)

    return (
        <div className="border-t-2 border-secondary mt-auto flex justify-between">
            <ConditionalRender condition={isAdmin}>
                <div className="mx-1 my-1">
                    <h6>Add:</h6>
                    <button className="mr-1 border rounded px-2 bg-green-300 text-white">List</button>
                    <button className="mr-1 border rounded px-2 bg-green-300 text-white">Named List</button>
                    <button className="mr-1 border rounded px-2 bg-green-300 text-white">Text Block</button>
                </div>
            </ConditionalRender>
            <button className="flex text-lg text-blue-500 my-2 mx-4" 
                onClick={() => {
                    setExpandCard(!expandCard)
                    setCardExpandedClass(
                        prev => (
                        (prev === " h-80") ? 
                            " h-160 md:h-168 md:w-162" : 
                            " h-80"
                        )
                    )
                }
            }>{moreLessTextDecider(expandCard)}</button>
        </div>
	)
}

export default Footer
