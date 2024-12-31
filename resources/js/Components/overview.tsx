"use client"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/Components/ui/chart"


export function Overview({ data }: { data: { [key: string]: number | string }[] }) {
    const chartConfig = {
        total: {
            label: "Total Produk",
            color: "#4A6CF7",
        },
    } satisfies ChartConfig
    return (
        <Card>
            <CardHeader>
                <CardTitle>Jumlah Produk Tahun {new Date().getFullYear()}</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            top: 20,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="total" fill="#4A6CF7" radius={8}>
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

