import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LayoutDashboard, Bookmark, FileText, Activity } from 'lucide-react'
import { useBookmarkStore } from '@/store/useBookmarkStore'

const MemberDashboardPage = () => {
  const { user } = useAuth()
  const bookmarks = useBookmarkStore((s) => s.bookmarks)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Workspace</h1>
        <p className="text-muted-foreground">Welcome back, {user?.name || 'User'}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Getting Started with WealthMap</CardTitle>
              <CardDescription>Key features and how to use the platform</CardDescription>
            </div>
            <LayoutDashboard className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  WealthMap&apos;s SearchPlace, property data insights and owner wealth estimation
                  are the key features
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Head over to searchplace to search address and find nearby properties</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  Use map to navigate and click in the area for which property needs to be viewed,
                  multiple properties available with a single click on the map
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Save bookmark for property and later view them in bookmarks section</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  View Detail on search results cards opens up a Property Detail page that lets you
                  view property details
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  Property detail include basic info, neighborhood data and indexs, and financial
                  information like property assesment, sales history, owner details and wealth
                  estimate, along with owner contact info (wherever available)
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saved Bookmarks</CardTitle>
              <Bookmark className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bookmarks.length}</div>
              <p className="text-xs text-muted-foreground">Saved properties</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Reports</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">No reports generated</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Activity</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">No recent activity</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your recent actions and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            No recent activity to display
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default MemberDashboardPage
