import React from 'react'
import {Link} from 'react-router-dom'

const NavBar = () => {
    const menu = [
        {id:1, title:"CAM d'une image", to:'/'},
        {id:2, title:'Test de précision des approches CAM', to:'/cam-test'},
        {id:3, title:'Former un nouveau CNN', to:'/new-cnn'},
    ]
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {
                menu.map((item)=>{
                    return (
                        <li key={item.id}>
                            <Link to={item.to}  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500">{item.title}</Link>
                        </li>
                    )
                })
            }
            </ul>
            </div>
        </div>
    </nav>

  )
}

export default NavBar