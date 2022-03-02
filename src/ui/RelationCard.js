// Components
import Card from './Card'
import CardTitle from './CardTitle'
// Helepr
import { formatCharacterName } from '../helpers/relation'
import { RELATIONINDICATORCLASSES } from '../helpers/objects'
import { defaultAccessArray } from '../helpers/misc'

const RelationCard = (props) => {
    const { name, relation } = props
    const relationKeys = Object.keys(relation).sort()

    return (
        <Card className="h-80 overflow-scroll">
            <CardTitle>
                {name}
            </CardTitle>
            <div className="my-3 mx-4 w-72 divide-y">
                {
                    relationKeys.map((character, i) => {
                        return (
                            <div className="my-3">
                                <p key={i}>{formatCharacterName(character)}</p>
                                <div 
                                    className="rounded-lg h-3 w-full bg-gradient-to-r from-red-500 via-grey-500 to-green-500"
                                >
                                    <div 
                                        className={
                                            "bg-black h-3 w-1 px-0.5 rounded-lg " + 
                                            defaultAccessArray(
                                                RELATIONINDICATORCLASSES, relation[character], "hidden"
                                            )
                                        }
                                    ></div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </Card>
	)
}

export default RelationCard
