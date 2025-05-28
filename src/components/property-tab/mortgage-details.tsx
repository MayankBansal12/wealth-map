import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Building2, Percent, FileText, Banknote } from 'lucide-react'
import { calculateTotalMortgageValue } from '@/lib/calculateValue'
import { Separator } from '@/components/ui/separator'

interface MortgageDetailsProps {
  mortgage: any
}

const getActiveMortgages = (mortgage: any) => {
  if (!mortgage) return []

  const activeMortgages: any[] = []

  Object.keys(mortgage).forEach((key) => {
    if (key.includes('Concurrent') && mortgage[key]?.amount > 0) {
      activeMortgages.push({
        type: key,
        ...mortgage[key],
      })
    }
  })

  return activeMortgages
}

const formatLoanType = (loanTypeCode: string) => {
  const loanTypes: { [key: string]: string } = {
    CNV: 'Conventional',
    FHA: 'FHA',
    VA: 'VA Loan',
    USDA: 'USDA',
    JUMBO: 'Jumbo',
    ARM: 'Adjustable Rate',
    FIXED: 'Fixed Rate',
  }
  return loanTypes[loanTypeCode] || loanTypeCode
}

const formatDeedType = (deedType: string) => {
  const deedTypes: { [key: string]: string } = {
    WD: 'Warranty Deed',
    GD: 'Grant Deed',
    QCD: 'Quit Claim Deed',
    TD: 'Trust Deed',
  }
  return deedTypes[deedType] || deedType
}

export function MortgageDetails({ mortgage }: MortgageDetailsProps) {
  const activeMortgages = getActiveMortgages(mortgage)
  const totalMortgageValue = calculateTotalMortgageValue(mortgage)
  const titleCompany = mortgage?.title?.companyName

  if (activeMortgages.length === 0) {
    return (
      <Card className="h-fit">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Mortgage Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <Banknote className="h-12 w-12 text-muted-foreground/50 mb-3" />
            <div className="text-muted-foreground">No active mortgages found</div>
            <div className="text-sm text-muted-foreground mt-1">Property may be owned outright</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-fit">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Mortgage Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-blue-900">Total Mortgage Amount</h4>
              <p className="text-sm text-blue-700">
                {activeMortgages.length} active{' '}
                {activeMortgages.length === 1 ? 'mortgage' : 'mortgages'}
              </p>
            </div>
            <div className="text-2xl font-bold text-right text-blue-900">
              ${totalMortgageValue.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {activeMortgages.map((mortgageItem, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {mortgageItem?.type.replace('Concurrent', '')} Mortgage
                  </Badge>
                  <span className="font-bold text-lg">
                    ${mortgageItem?.amount.toLocaleString()}
                  </span>
                </div>
                <div className="text-right">
                  <div className="font-medium text-sm">{mortgageItem?.lenderLastName}</div>
                  <div className="text-xs text-muted-foreground">Lender</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Loan Type:</span>
                  <span className="font-medium">{formatLoanType(mortgageItem?.loanTypeCode)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Deed Type:</span>
                  <span className="font-medium">{formatDeedType(mortgageItem?.deedType)}</span>
                </div>

                {mortgageItem?.interestRate && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Interest Rate:</span>
                    <span className="font-medium">{mortgageItem?.interestRate}%</span>
                  </div>
                )}

                {mortgageItem?.term && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Term:</span>
                    <span className="font-medium">
                      {Math.round(Number.parseInt(mortgageItem?.term) / 12)} years
                    </span>
                  </div>
                )}

                {mortgageItem?.date && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Loan Date:</span>
                    <span className="font-medium">
                      {new Date(mortgageItem?.date).toLocaleDateString()}
                    </span>
                  </div>
                )}

                {mortgageItem?.dueDate && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Due Date:</span>
                    <span className="font-medium">
                      {new Date(mortgageItem?.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>

              {(mortgageItem?.interestRateType || mortgageItem?.trustDeedDocumentNumber) && (
                <div className="pt-2 border-t space-y-1">
                  {mortgageItem?.interestRateType && (
                    <div className="flex items-center gap-2 text-xs">
                      <Percent className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Rate Type:</span>
                      <Badge variant="outline" className="text-xs">
                        {mortgageItem?.interestRateType}
                      </Badge>
                    </div>
                  )}
                  {mortgageItem?.trustDeedDocumentNumber && (
                    <div className="flex items-center gap-2 text-xs">
                      <FileText className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Document:</span>
                      <span className="font-mono">{mortgageItem?.trustDeedDocumentNumber}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {titleCompany && (
          <>
            <Separator />
            <div className="flex items-center gap-2 text-sm">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Title Company:</span>
              <span className="font-medium">{titleCompany}</span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
