import { GrAddCircle } from "react-icons/gr";

const AddCharacterRelation = (props) => {
    return (
        <div className="w-full">
            <div className="py-2 text-2xl mx-auto w-fit h-fit">
                <input 
                    className="border rounded-lg border-slate-400 text-center h-9 px-1 py-1 w-40 inline"
                    type="text" 
                    name="Add Character"
                />
                <GrAddCircle className="inline h-9 mx-1 mb-1" />
            </div>
        </div>
    )
}

export default AddCharacterRelation
