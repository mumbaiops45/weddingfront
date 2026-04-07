'use client'  

import { useUser } from '../../../hooks/user.hook'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Dashboard', href: 'dashboard', icon: '📊' },
  { name: 'Leads', href: 'leads', icon: '👥' },
  { name: 'Booking', href: 'booking', icon: '📅' },
  { name: 'Packages', href: 'packages', icon: '📦' },
  { name: 'Payment', href: 'payments', icon: '💰' },
  { name: 'Events', href: 'events', icon: '🎉' },
  { name: 'Vendor', href: 'vendors', icon: '🏢' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const { logout, loading, user } = useUser()
  const pathname = usePathname()

  return (  
    <>
      <div className="absolute fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-700">
            <h1 className="text-black text-xl font-bold">Wedding Planner</h1>
          </div>
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname.includes(item.href)
                return (
                  <li key={item.name}>
                    <Link 
                      href={item.href}
                      className={classNames(
                        isActive
                          ? 'bg-gray-200 text-black '
                          : 'text-black  hover:bg-gray-100',
                        'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors'
                      )}
                    >
                      <span className="text-xl">{item.icon}</span>
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="p-4 border-t border-gray-700">
            {!user ? (
              <div className="space-y-2">
                <Link
                  href="login"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium  text-black  hover:bg-gray-100 transition-colors"
                >
                  <span>🔐</span>
                  Login
                </Link>
                <Link
                  href="signup"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium  text-black  hover:bg-gray-100 transition-colors"
                >
                  <span>📝</span>
                  Signup
                </Link>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 px-3 py-2 mb-2">
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="h-10 w-10 rounded-full bg-gray-800 outline outline-1 outline-white/10"
                  />
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{user.name}</p>
                    <p className="text-gray-400 text-xs">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={logout}
                  disabled={loading}
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-red-400 hover:bg-white/5 hover:text-red-300 transition-colors w-full"
                >
                  <span>🚪</span>
                  {loading ? "Logging out..." : "Logout"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

    
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          id="mobileMenuBtn"
          className="p-2 rounded-md bg-gray-800 text-white"
          onClick={() => {
            const menu = document.getElementById('mobileMenu')
            menu.classList.toggle('hidden')
          }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      
      <div id="mobileMenu" className="fixed inset-0 bg-gray-800 z-40 hidden lg:hidden">
        <div className="p-4">
          <button
            className="absolute top-4 right-4 p-2 text-white"
            onClick={() => {
              document.getElementById('mobileMenu').classList.add('hidden')
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="mt-16">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 rounded-md px-3 py-3 text-gray-300 hover:bg-white/5 hover:text-white text-base font-medium"
                onClick={() => {
                  document.getElementById('mobileMenu').classList.add('hidden')
                }}
              >
                <span className="text-xl">{item.icon}</span>
                {item.name}
              </Link>
            ))}
            {!user ? (
              <>
                <Link href="login" className="flex items-center gap-3 rounded-md px-3 py-3 text-gray-300 hover:bg-white/5 hover:text-white text-base font-medium">
                  <span>🔐</span> Login
                </Link>
                <Link href="signup" className="flex items-center gap-3 rounded-md px-3 py-3 text-gray-300 hover:bg-white/5 hover:text-white text-base font-medium">
                  <span>📝</span> Signup
                </Link>
              </>
            ) : (
              <button onClick={logout} className="flex items-center gap-3 rounded-md px-3 py-3 text-red-400 hover:bg-white/5 hover:text-red-300 text-base font-medium w-full">
                <span>🚪</span> Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}