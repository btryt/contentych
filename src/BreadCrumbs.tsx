import React from "react"
import { Link } from "react-router-dom"
interface BreadCrumbsProps {
  tree: [
    {
      id: number
      parent_id: number | null
      title: string
      level: number
    }
  ]
  parent: {
    parent_id: number
    title: string
  }
}


const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ tree, parent }) => {
  return (
    <div className="text-white">
      {parent.parent_id !== null ? (
        tree
          .sort((a, b) => b.level - a.level)
          .map((el) => <span className={`border-b-2 text-md border-white hover:text-blue-300 transition-colors ${el.level == 1 && "text-red-300"}`} key={el.id}><Link to={`/topic/${el.id}`}>{el.title}/</Link></span>)
      ) : (
        <span className="border-b-2 hover:text-blue-300 text-md transition-colors"><Link to={`/home`}>{parent.title}/</Link></span>
      )}
    </div>
  )
}

export default React.memo(BreadCrumbs)
