"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowDownLeft, ArrowUpRight, CreditCard, Building } from "lucide-react"

export function DepositWithdraw() {
  const [depositAmount, setDepositAmount] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="deposit" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="deposit" className="text-sm">
              <ArrowDownLeft className="h-4 w-4 mr-1" />
              Deposit
            </TabsTrigger>
            <TabsTrigger value="withdraw" className="text-sm">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              Withdraw
            </TabsTrigger>
          </TabsList>

          <TabsContent value="deposit" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="deposit-amount" className="text-sm">
                Amount
              </Label>
              <Input
                id="deposit-amount"
                type="number"
                placeholder="0.00"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Payment Method</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-2" />
                      Bank Transfer
                    </div>
                  </SelectItem>
                  <SelectItem value="card">
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Debit Card
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" size="sm" onClick={() => setDepositAmount("1000")} className="text-xs">
                $1,000
              </Button>
              <Button variant="outline" size="sm" onClick={() => setDepositAmount("5000")} className="text-xs">
                $5,000
              </Button>
              <Button variant="outline" size="sm" onClick={() => setDepositAmount("10000")} className="text-xs">
                $10,000
              </Button>
            </div>

            <Button className="w-full text-sm">Deposit ${depositAmount || "0"}</Button>

            <div className="text-xs text-muted-foreground">
              • Instant deposits with debit card • Bank transfers take 1-3 business days • No fees for deposits over
              $1,000
            </div>
          </TabsContent>

          <TabsContent value="withdraw" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="withdraw-amount" className="text-sm">
                Amount
              </Label>
              <Input
                id="withdraw-amount"
                type="number"
                placeholder="0.00"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="text-sm"
              />
              <div className="text-xs text-muted-foreground">Available: $12,450.25</div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Withdraw To</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-2" />
                      Primary Bank Account
                    </div>
                  </SelectItem>
                  <SelectItem value="savings">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-2" />
                      Savings Account
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" size="sm" onClick={() => setWithdrawAmount("1000")} className="text-xs">
                $1,000
              </Button>
              <Button variant="outline" size="sm" onClick={() => setWithdrawAmount("5000")} className="text-xs">
                $5,000
              </Button>
              <Button variant="outline" size="sm" onClick={() => setWithdrawAmount("12450")} className="text-xs">
                All
              </Button>
            </div>

            <Button className="w-full text-sm">Withdraw ${withdrawAmount || "0"}</Button>

            <div className="text-xs text-muted-foreground">
              • Withdrawals processed within 1-3 business days • No fees for withdrawals over $500 • $2.50 fee for
              smaller withdrawals
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
