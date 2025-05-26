import { Link, useLocation } from 'react-router-dom'

const BREADCRUMB_SKIP = ['company', 'member']

const Breadcrumb = () => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter(Boolean)
  pathnames.filter((p, i) => i !== 0 || !BREADCRUMB_SKIP.includes(p))

  let displayPath = pathnames
  if (pathnames.length > 0 && BREADCRUMB_SKIP.includes(pathnames[0])) {
    displayPath = pathnames.slice(1)
  }

  return (
    <nav className="text-sm mb-4" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {displayPath.map((value, idx) => {
          const to =
            '/' +
            pathnames
              .slice(0, pathnames[0] && BREADCRUMB_SKIP.includes(pathnames[0]) ? idx + 1 : idx + 1)
              .join('/')
          const isLast = idx === displayPath.length - 1
          return (
            <li key={to} className="flex items-center">
              {!isLast ? (
                <Link to={to} className="text-muted-foreground hover:underline capitalize">
                  {value.replace(/-/g, ' ')}
                </Link>
              ) : (
                <span className="text-foreground font-medium capitalize">
                  {value.replace(/-/g, ' ')}
                </span>
              )}
              {!isLast && <span className="mx-2">&gt;</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumb
