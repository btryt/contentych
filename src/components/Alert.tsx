import React, { ReactNode } from "react"

interface AlertProps{
    ok?:boolean
    children:ReactNode
}

const Alert: React.FC<AlertProps> = ({
  ok = false,
  children,
}) => {
  return (
    <>
      {ok ? (
        <div className=" m-2 p-2 rounded-md bg-green-400">
            {children}
        </div>
      ) : (
        <div className="m-2 p-2 rounded-md bg-red-600 text-white">
            {children}
        </div>
      )}
    </>
  )
}

export default Alert
