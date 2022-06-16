// Packages
import { useState } from 'react'
// Components
import ConditionalRender from '../ConditionalRender'
// Helpers
import { moreLessTextDecider } from '../../helpers/misc'

const NamedList = (props) => {
    const { isAdmin, name, list } = props
    const [expandNamedList, setExpandNamedList] = useState((list.length > 5) ? false : true)
    const namedListArray = useState(list)[0]

    return (
        <div>
            <h4 className="text-xl font-semibold">{name}</h4>
            <ConditionalRender 
                condition={expandNamedList}
            >
                <ConditionalRender 
                    condition={isAdmin}
                    returnComponent={
                        namedListArray.map((element, i) => {
                            return (
                                <div className="mt-1" key={i}>
                                    <div className="flex flex-wrap mx-2 gap-2">
                                        <h5 className="font-semibold">{element.name}:</h5>
                                        <p>{element.content}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                >
                    {
                        namedListArray.map((element, i) => {
                            return (
                                <div className="mt-1" key={i}>
                                    <div className="flex flex-wrap gap-2">
                                        <h5 className="font-semibold">{element.name}:</h5>
                                        <p>{element.content}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </ConditionalRender>
            </ConditionalRender>
            <button className="flex text-lg text-blue-500 my-2" 
                onClick={() => {setExpandNamedList(!expandNamedList)}
            }>{moreLessTextDecider(expandNamedList)}</button>
        </div>
	)
}

export default NamedList
