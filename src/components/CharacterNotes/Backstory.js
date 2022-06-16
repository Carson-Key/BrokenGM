// Packages
import { useState } from 'react'
// Components
import ConditionalRender from '../ConditionalRender'
// Helpers
import { moreLessTextDecider } from '../../helpers/misc'

const Backstory = (props) => {
    const { isAdmin, backstory } = props
    const [expandBackstory, setExpandBackstory] = useState(false)

    return (
        <div>
            <h4 className="text-xl font-semibold">Backstory</h4>
            <ConditionalRender 
                condition={expandBackstory}
            >
                <ConditionalRender 
                    condition={isAdmin}
                    returnComponent={<p>{backstory}</p>}
                >
                    <p>{backstory}</p>
                </ConditionalRender>
            </ConditionalRender>
            <button className="flex text-lg text-blue-500 my-2" 
                onClick={() => {setExpandBackstory(!expandBackstory)}
            }>{moreLessTextDecider(expandBackstory)}</button>
        </div>
	)
}

export default Backstory
