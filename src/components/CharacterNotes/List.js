// Packages
import { useState } from 'react'
// Components
import ConditionalRender from '../ConditionalRender'
// Helpers
import { moreLessTextDecider } from '../../helpers/misc'

const List = (props) => {
    const { isAdmin, list, name } = props
    const [expandList, setExpandList] = useState((list.length > 5) ? false : true)
    const listArray = useState(list)[0]

    return (
        <div>
            <h4 className="text-xl font-semibold">{name}</h4>
            <ConditionalRender 
                condition={expandList}
            >
                <ConditionalRender 
                    condition={isAdmin}
                >
                    <div className="flex flex-col w-full px-2 break-words">
                        {listArray.map((element, i) => {
                            return (<p key={i} className="my-2">{element}</p>)
                        })}
                    </div>
                </ConditionalRender>
            </ConditionalRender>
            <button className="flex text-lg text-blue-500 my-2" 
                onClick={() => {setExpandList(!expandList)}
            }>{moreLessTextDecider(expandList)}</button>
        </div>
	)
}

export default List
