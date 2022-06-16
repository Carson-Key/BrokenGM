// Components
import ConditionalRender from '../ConditionalRender'
// Helpers
import { generateStatusClasses } from '../../helpers/characternotes'

const BasicInfo = (props) => {
    const { isAdmin, name, position, dob, status } = props

    return (
        <div>
            <h4 className="text-xl font-semibold">Basic Info</h4>
            <ConditionalRender 
                condition={isAdmin}
                returnComponent={
                    <div className="mt-1 mb-4">
                        <ConditionalRender condition={name || name === ""}>
                            <div className="flex flex-wrap mx-2 gap-2">
                                <h5 className="font-semibold">Name:</h5><p>{name}</p>
                            </div>
                        </ConditionalRender>
                        <ConditionalRender condition={position || position === ""}>
                            <div className="flex flex-wrap mx-2 gap-2">
                                <h5 className="font-semibold">Position:</h5><p>{position}</p>
                            </div>
                        </ConditionalRender>
                        <ConditionalRender condition={status || status === ""}>
                            <div className="flex flex-wrap mx-2 gap-2">
                                <h5 className="font-semibold">Status:</h5>
                                <p className={"px-2 rounded " + generateStatusClasses(status)}>{status}</p>
                            </div>
                        </ConditionalRender>
                    </div>
                }
            >
                <div className="mt-1 mb-4">
                    <div className="flex flex-wrap mx-2 gap-2">
                        <h5 className="font-semibold">Name:</h5><p>{name}</p>
                    </div>
                    <div className="flex flex-wrap mx-2 gap-2">
                        <h5 className="font-semibold">Position:</h5><p>{position}</p>
                    </div>
                    <div className="flex flex-wrap mx-2 gap-2">
                        <h5 className="font-semibold">Status:</h5>
                        <p className={"px-2 rounded " + generateStatusClasses(status)}>{status}</p>
                    </div>
                </div>
            </ConditionalRender>
        </div>
	)
}

export default BasicInfo
