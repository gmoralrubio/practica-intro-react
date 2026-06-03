export const Header: React.FC = () => {
  return (
    <div className="bg-primary w-full shadow-sm max-lg:collapse">
      <input
        id="navbar-1-toggle"
        className="peer hidden"
        type="checkbox"
      />
      <label
        htmlFor="navbar-1-toggle"
        className="fixed inset-0 hidden max-lg:peer-checked:block"
      ></label>
      <div className="collapse-title navbar px-4">
        <div className="navbar-start">
          <label
            htmlFor="navbar-1-toggle"
            className="btn btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <h2 className="text-xl">daisyUI</h2>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <button>Item 1</button>
            </li>
            <li>
              <details>
                <summary>Parent</summary>
                <ul className="bg-base-100 z-1 w-40 p-2">
                  <li>
                    <button>Submenu 1</button>
                  </li>
                  <li>
                    <button>Submenu 2</button>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <button>Item 3</button>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-64 lg:w-auto"
          />
        </div>
      </div>

      <div className="collapse-content z-1 lg:hidden">
        <ul className="menu">
          <li>
            <button>Item 1</button>
          </li>
          <li>
            <button>Parent</button>
            <ul>
              <li>
                <button>Submenu 1</button>
              </li>
              <li>
                <button>Submenu 2</button>
              </li>
            </ul>
          </li>
          <li>
            <button>Item 3</button>
          </li>
        </ul>
      </div>
    </div>
  )
}
