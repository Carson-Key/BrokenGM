// Packages
import { useState } from 'react'
// Components
import ConditionalRender from '../ConditionalRender'
// Helpers
import { moreLessTextDecider } from '../../helpers/misc'

const Block = (props) => {
    const { isAdmin, content, name } = props
    const [expandBlock, setExpandBlock] = useState(false)

    return (
        <div>
            <h4 className="text-xl font-semibold">{name}</h4>
            <ConditionalRender 
                condition={expandBlock}
            >
                <ConditionalRender 
                    condition={isAdmin}
                    returnComponent={<p>{content}</p>}
                >
                    <p>{content}</p>
                </ConditionalRender>
            </ConditionalRender>
            <button className="flex text-lg text-blue-500 my-2" 
                onClick={() => {setExpandBlock(!expandBlock)}
            }>{moreLessTextDecider(expandBlock)}</button>
        </div>
	)
}

export default Block
