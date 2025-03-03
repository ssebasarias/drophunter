
import React, { useState } from "react";
import { 
  Globe, 
  Users, 
  TrendingUp,
  PieChart,
  BarChart
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Demographic data
const demographicData = [
  { name: "18-24", value: 15, color: "#8884d8" },
  { name: "25-34", value: 35, color: "#83a6ed" },
  { name: "35-44", value: 25, color: "#8dd1e1" },
  { name: "45-54", value: 15, color: "#82ca9d" },
  { name: "55+", value: 10, color: "#ffc658" },
];

// Geographic data
const geographicData = [
  { name: "North America", sales: 4300, growth: 23 },
  { name: "Europe", sales: 3200, growth: 15 },
  { name: "Asia", sales: 2800, growth: 32 },
  { name: "Australia", sales: 1500, growth: 12 },
  { name: "South America", sales: 1200, growth: 28 },
  { name: "Africa", sales: 800, growth: 40 },
];

// Best selling products by region
const regionalProducts = [
  { region: "North America", products: ["Wireless Earbuds Pro", "Smart Watch Series 5", "LED Ring Light"] },
  { region: "Europe", products: ["Eco-friendly Water Bottle", "Minimalist Ceramic Vase", "Skincare Serum Set"] },
  { region: "Asia", products: ["Smart Watch Series 5", "Skincare Serum Set", "Compact Drone with HD Camera"] },
  { region: "Australia", products: ["Eco-friendly Water Bottle", "Minimalist Desk Organizer", "Wireless Earbuds Pro"] },
  { region: "South America", products: ["LED Ring Light", "Smart Watch Series 5", "Wireless Earbuds Pro"] },
  { region: "Africa", products: ["Compact Drone with HD Camera", "LED Ring Light", "Smart Watch Series 5"] },
];

// Demographic recommendations
const demographicRecommendations = [
  { 
    demographic: "18-24", 
    suggestions: [
      "Focus on trendy tech gadgets and affordable accessories",
      "Utilize TikTok and Instagram for marketing",
      "Emphasize mobile-first shopping experiences"
    ]
  },
  { 
    demographic: "25-34", 
    suggestions: [
      "Target eco-friendly and sustainable products",
      "Highlight home office and productivity tools",
      "Leverage influencer marketing on Instagram and YouTube"
    ]
  },
  { 
    demographic: "35-44", 
    suggestions: [
      "Promote home and garden improvement products",
      "Focus on quality and durability in messaging",
      "Utilize Facebook and email marketing campaigns"
    ]
  },
  { 
    demographic: "45-54", 
    suggestions: [
      "Feature health and wellness products",
      "Emphasize value and longevity in product descriptions",
      "Use more traditional digital marketing approaches"
    ]
  },
  { 
    demographic: "55+", 
    suggestions: [
      "Highlight ease-of-use and practical applications",
      "Focus on comfort and convenience products",
      "Utilize email marketing and Facebook ads"
    ]
  },
];

const SalesSuggestions = () => {
  const [selectedDemographic, setSelectedDemographic] = useState("18-24");
  const [selectedRegion, setSelectedRegion] = useState("North America");

  return (
    <div className="space-y-6">
      <Tabs defaultValue="demographic" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="demographic">
            <Users className="h-4 w-4 mr-2" />
            Demographic
          </TabsTrigger>
          <TabsTrigger value="geographic">
            <Globe className="h-4 w-4 mr-2" />
            Geographic
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="demographic" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-1 md:col-span-2 lg:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Age Demographics
                </CardTitle>
                <CardDescription>
                  Customer distribution by age
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={demographicData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {demographicData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Demographic Insights
                </CardTitle>
                <CardDescription>
                  Sales strategies based on age groups
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {demographicData.map((demo) => (
                      <Button
                        key={demo.name}
                        variant={selectedDemographic === demo.name ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedDemographic(demo.name)}
                      >
                        {demo.name}
                      </Button>
                    ))}
                  </div>
                  
                  {demographicRecommendations
                    .filter(rec => rec.demographic === selectedDemographic)
                    .map((rec, idx) => (
                      <div key={idx} className="space-y-2">
                        <h4 className="font-medium">Recommendations for {rec.demographic} age group:</h4>
                        <ul className="space-y-2 pl-5 list-disc">
                          {rec.suggestions.map((suggestion, i) => (
                            <li key={i} className="text-muted-foreground">{suggestion}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="geographic" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Sales by Region
                </CardTitle>
                <CardDescription>
                  Product sales distribution by geography
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={geographicData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="sales" fill="#8884d8" name="Sales" />
                      <Bar dataKey="growth" fill="#82ca9d" name="Growth %" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Regional Product Insights
                </CardTitle>
                <CardDescription>
                  Best selling products by region
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {geographicData.map((geo) => (
                      <Button
                        key={geo.name}
                        variant={selectedRegion === geo.name ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedRegion(geo.name)}
                      >
                        {geo.name}
                      </Button>
                    ))}
                  </div>
                  
                  {regionalProducts
                    .filter(reg => reg.region === selectedRegion)
                    .map((reg, idx) => (
                      <div key={idx} className="space-y-2">
                        <h4 className="font-medium">Top products in {reg.region}:</h4>
                        <ol className="space-y-2 pl-5 list-decimal">
                          {reg.products.map((product, i) => (
                            <li key={i} className="text-muted-foreground">{product}</li>
                          ))}
                        </ol>
                        <div className="mt-4 pt-4 border-t">
                          <h4 className="font-medium">Marketing Suggestions:</h4>
                          <ul className="space-y-2 pl-5 list-disc mt-2">
                            <li className="text-muted-foreground">
                              Focus Facebook and Instagram ads on {reg.region} with {reg.products[0]} as the hero product
                            </li>
                            <li className="text-muted-foreground">
                              Create region-specific landing pages highlighting cultural relevance
                            </li>
                            <li className="text-muted-foreground">
                              Consider local partnerships and influencers to boost regional sales
                            </li>
                          </ul>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SalesSuggestions;
