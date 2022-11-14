import React from "react"
import { Link } from "react-router-dom"

type TreeProp = {
  id:number, 
  parent_id: number | null,
  title: string,
  level: number,
}

type CurrentSectionProp = {
  parent_id: number | null,
  title: string
}

interface BreadCrumbsProps {
  tree: TreeProp[]
  current: CurrentSectionProp 
}


const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ tree, current }) => {
  return (
    <div className="text-white">
      {current.parent_id !== null ? (
        tree
          .sort((a, b) => b.level - a.level)
          .map((el) => <span className={`border-b-2 text-md border-white hover:text-blue-300 transition-colors ${el.level == 1 && "text-red-300"}`} key={el.id}><Link to={`/topic/${el.id}`}>{el.title}/</Link></span>)
      ) : (
        <span className="border-b-2 hover:text-blue-300 text-md transition-colors"><Link to={`/home`}>{current.title}/</Link></span>
      )}
    </div>
  )
}

export default React.memo(BreadCrumbs)
