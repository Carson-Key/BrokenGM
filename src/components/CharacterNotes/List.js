// Packages
import { useState } from 'react'
// Components
import ConditionalRender from '../ConditionalRender'
// Helpers
import { moreLessTextDecider } from '../../helpers/misc'

const List = (props) => {
    const { isAdmin, list, name } = props
    const [expandList, setExpandList] = useState(false)
    const listArray = useState(Object.keys(list))[0]

    return (
        <div>
            <h4 className="text-xl font-semibold">{name}</h4>
            <ConditionalRender 
                condition={expandList}
            >
                <ConditionalRender 
                    condition={isAdmin}
                >
                    <ul className="mx-2">
                        {listArray.map((listIndex, i) => {
                            const listElement = list[listIndex]
                            return (<li key={i} className="my-2">{listElement}</li>)
                        })}
                    </ul>
                </ConditionalRender>
            </ConditionalRender>
            <button className="flex text-lg text-blue-500 my-2" 
                onClick={() => {setExpandList(!expandList)}
            }>{moreLessTextDecider(expandList)}</button>
        </div>
	)
}

export default List
