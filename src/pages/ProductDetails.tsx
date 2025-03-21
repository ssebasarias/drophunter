
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Heart, 
  TrendingUp, 
  DollarSign,
  Star,
  Truck,
  Clock,
  Share2,
  Users,
  MapPin,
  Target,
  BarChart
} from "lucide-react";
import Navbar from "@/components/navigation/Navbar";
import Sidebar from "@/components/navigation/Sidebar";
import { Button } from "@/components/ui/button";
import Chip from "@/components/ui/Chip";
import { toast } from "@/components/ui/use-toast";
import { products, userData } from "@/lib/data";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area
} from "recharts";

// Helper function to generate recommendation data based on product category
const getRecommendationData = (category: string) => {
  const recommendations = {
    electronics: {
      demographics: {
        age: '18-35',
        gender: 'Balanced (55% male, 45% female)',
        interests: 'Technology, Gaming, Social Media',
        socioeconomic: 'Middle to Upper-middle class'
      },
      geographic: {
        regions: ['Urban centers', 'College towns', 'Tech hubs'],
        countries: ['United States', 'Japan', 'South Korea', 'Germany', 'United Kingdom'],
        cities: ['San Francisco', 'Tokyo', 'Seoul', 'Berlin', 'London']
      },
      marketingTips: [
        'Emphasize technological innovation and features',
        'Use social media platforms for targeted advertising',
        'Partner with tech influencers for product demonstrations',
        'Focus on sleek, modern aesthetics in marketing materials'
      ]
    },
    fashion: {
      demographics: {
        age: '18-45',
        gender: 'Female-leaning (70% female, 30% male)',
        interests: 'Fashion, Social Media, Beauty, Lifestyle',
        socioeconomic: 'Middle to Upper class'
      },
      geographic: {
        regions: ['Urban areas', 'Fashion-forward cities'],
        countries: ['United States', 'France', 'Italy', 'United Kingdom', 'Australia'],
        cities: ['New York', 'Paris', 'Milan', 'London', 'Sydney']
      },
      marketingTips: [
        'Focus on style, quality, and aesthetic appeal',
        'Use Instagram and Pinterest for visual marketing',
        'Partner with fashion influencers and bloggers',
        'Emphasize sustainability and ethical production'
      ]
    },
    home: {
      demographics: {
        age: '25-55',
        gender: 'Balanced (55% female, 45% male)',
        interests: 'Home Decor, DIY, Interior Design, Sustainability',
        socioeconomic: 'Middle to Upper-middle class'
      },
      geographic: {
        regions: ['Suburban areas', 'Growing metropolitan regions'],
        countries: ['United States', 'Canada', 'United Kingdom', 'Germany', 'Australia'],
        cities: ['Los Angeles', 'Toronto', 'London', 'Berlin', 'Melbourne']
      },
      marketingTips: [
        'Showcase products in styled home environments',
        'Use Pinterest and home decor blogs for promotion',
        'Emphasize quality, durability, and aesthetic appeal',
        'Create content around home organization and styling tips'
      ]
    },
    beauty: {
      demographics: {
        age: '18-45',
        gender: 'Female-dominant (85% female, 15% male)',
        interests: 'Skincare, Makeup, Self-care, Wellness',
        socioeconomic: 'Middle to Upper class'
      },
      geographic: {
        regions: ['Urban centers', 'Fashion-forward cities'],
        countries: ['United States', 'South Korea', 'Japan', 'France', 'United Kingdom'],
        cities: ['New York', 'Seoul', 'Tokyo', 'Paris', 'London']
      },
      marketingTips: [
        'Focus on benefits, ingredients, and results',
        'Use before/after content and demonstrations',
        'Partner with beauty influencers for reviews',
        'Emphasize self-care and wellness aspects'
      ]
    },
    sports: {
      demographics: {
        age: '18-40',
        gender: 'Male-leaning (60% male, 40% female)',
        interests: 'Fitness, Outdoor Activities, Health, Athletics',
        socioeconomic: 'Middle class'
      },
      geographic: {
        regions: ['Urban areas', 'College towns', 'Outdoor recreation hubs'],
        countries: ['United States', 'Canada', 'Australia', 'Germany', 'United Kingdom'],
        cities: ['Denver', 'Vancouver', 'Sydney', 'Munich', 'Manchester']
      },
      marketingTips: [
        'Emphasize performance, durability, and functionality',
        'Use action shots and videos of products in use',
        'Partner with athletes and fitness influencers',
        'Focus on health benefits and active lifestyle'
      ]
    }
  };
  
  return recommendations[category as keyof typeof recommendations] || recommendations.electronics;
};

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState(products.find(p => p.id === id));
  const [isFavorite, setIsFavorite] = useState(userData.favorites.includes(id || ""));
  
  useEffect(() => {
    // If product not found, get it from products array
    if (!product && id) {
      const foundProduct = products.find(p => p.id === id);
      setProduct(foundProduct);
    }
    
    // Check if product is in favorites
    setIsFavorite(userData.favorites.includes(id || ""));
  }, [id, product]);
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: product?.name,
      duration: 2000,
    });
  };
  
  if (!product) {
    return (
      <>
        <Navbar />
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-medium mb-4">Product not found</h1>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </>
    );
  }
  
  const {
    name,
    category,
    price,
    cost,
    sales,
    rating,
    growth,
    image,
    description,
    performance,
    tags
  } = product;
  
  const profit = price - cost;
  const margin = Math.round((profit / price) * 100);
  
  // Get recommendation data based on product category
  const recommendationData = getRecommendationData(category);
  
  // Enhanced performance data with moving average
  const enhancedPerformanceData = performance.map((item, index) => {
    // Calculate 3-month moving average if possible
    let trendValue = item.sales;
    if (index >= 2) {
      trendValue = Math.round((performance[index].sales + performance[index-1].sales + performance[index-2].sales) / 3);
    }
    
    return {
      ...item,
      trendLine: trendValue
    };
  });

  // Get colors for the chart
  const chartPrimaryColor = "#8B5CF6";
  const chartSecondaryColor = "#D946EF";
  const gradientStart = "#8B5CF680";
  const gradientEnd = "#8B5CF610";
  
  return (
    <>
      <Helmet>
        <title>{name} - DropHunter</title>
      </Helmet>
      
      <Navbar />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1">
          <div className="container py-8">
            <div className="mb-8">
              <Button
                variant="ghost"
                className="mb-4"
                asChild
              >
                <Link to="/dashboard">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Link>
              </Button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                <div className="relative rounded-lg overflow-hidden border aspect-square md:aspect-auto md:h-full">
                  <img 
                    src={image} 
                    alt={name}
                    className="h-full w-full object-cover"
                  />
                  
                  {tags && tags.length > 0 && (
                    <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                      {tags.map(tag => (
                        <Chip
                          key={tag}
                          label={tag.charAt(0).toUpperCase() + tag.slice(1).replace('-', ' ')}
                          variant={tag === "trending" || tag === "high-margin" ? "primary" : "outline"}
                          size="md"
                          className={tag !== "trending" && tag !== "high-margin" ? "bg-background/80" : ""}
                        />
                      ))}
                    </div>
                  )}
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Chip
                      label={category.charAt(0).toUpperCase() + category.slice(1)}
                      variant="secondary"
                      size="sm"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={toggleFavorite}
                      className="h-9 w-9 rounded-full"
                    >
                      <Heart className={`h-4 w-4 ${isFavorite ? "fill-destructive text-destructive" : ""}`} />
                    </Button>
                  </div>
                  
                  <h1 className="text-3xl font-medium mb-4">{name}</h1>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-primary text-primary" />
                      <span className="font-medium">{rating.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-5 w-5 text-muted-foreground" />
                      <span>{sales.toLocaleString()} sales</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-5 w-5 text-muted-foreground" />
                      <span>Profit: <span className="font-medium">${profit.toFixed(2)}</span></span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-muted-foreground mb-4">{description}</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col p-4 rounded-lg bg-secondary/50">
                        <span className="text-sm text-muted-foreground mb-1">Cost Price</span>
                        <span className="text-xl font-medium">${cost.toFixed(2)}</span>
                      </div>
                      <div className="flex flex-col p-4 rounded-lg bg-secondary/50">
                        <span className="text-sm text-muted-foreground mb-1">Selling Price</span>
                        <span className="text-xl font-medium">${price.toFixed(2)}</span>
                      </div>
                      <div className="flex flex-col p-4 rounded-lg bg-secondary/50">
                        <span className="text-sm text-muted-foreground mb-1">Profit Margin</span>
                        <span className="text-xl font-medium">{margin}%</span>
                      </div>
                      <div className="flex flex-col p-4 rounded-lg bg-secondary/50">
                        <span className="text-sm text-muted-foreground mb-1">Growth Rate</span>
                        <span className={`text-xl font-medium ${growth > 0 ? "text-green-500" : "text-red-500"}`}>
                          {growth > 0 ? "+" : ""}{growth}%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <Truck className="h-5 w-5 text-muted-foreground" />
                      <span>Estimated shipping time: 12-20 days</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <span>Processing time: 1-3 business days</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button className="flex-1">Add to Store</Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 mb-8">
              <h2 className="text-2xl font-medium mb-6">Sales Performance</h2>
              
              <div className="h-80 rounded-lg border p-6 bg-background shadow-sm">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={enhancedPerformanceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" opacity={0.4} />
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={gradientStart} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={gradientEnd} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="month" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#888', fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#888', fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{ 
                        borderRadius: '8px', 
                        border: '1px solid #f0f0f0',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        backgroundColor: 'rgba(255, 255, 255, 0.97)'
                      }}
                      formatter={(value: number, name: string) => [
                        `${value} sales`, 
                        name === 'sales' ? 'Monthly Sales' : 'Trend Line'
                      ]}
                      labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="sales"
                      stroke={chartPrimaryColor}
                      fillOpacity={1}
                      fill="url(#colorSales)"
                    />
                    <Line
                      type="monotone"
                      dataKey="trendLine"
                      stroke={chartSecondaryColor}
                      strokeWidth={2}
                      dot={{ r: 0 }}
                      strokeDasharray="5 5"
                    />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke={chartPrimaryColor}
                      strokeWidth={3}
                      dot={{ r: 5, strokeWidth: 2, stroke: chartPrimaryColor, fill: "#fff" }}
                      activeDot={{ r: 7, strokeWidth: 0, fill: chartPrimaryColor }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* New Target Audience Recommendations Section */}
            <div className="mt-12 mb-8">
              <h2 className="text-2xl font-medium mb-6">Target Audience Recommendations</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Demographic Card */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <Users className="h-5 w-5 mr-2 text-primary" />
                      Demographic Recommendations
                    </CardTitle>
                    <CardDescription>
                      Ideal customer profile for {name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center border-b pb-3">
                        <div className="w-24 font-medium text-sm">Age Range:</div>
                        <div className="flex-1">{recommendationData.demographics.age}</div>
                      </div>
                      <div className="flex items-center border-b pb-3">
                        <div className="w-24 font-medium text-sm">Gender:</div>
                        <div className="flex-1">{recommendationData.demographics.gender}</div>
                      </div>
                      <div className="flex items-center border-b pb-3">
                        <div className="w-24 font-medium text-sm">Interests:</div>
                        <div className="flex-1">{recommendationData.demographics.interests}</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-24 font-medium text-sm">Income:</div>
                        <div className="flex-1">{recommendationData.demographics.socioeconomic}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Geographic Card */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-primary" />
                      Geographic Recommendations
                    </CardTitle>
                    <CardDescription>
                      Key markets with highest demand
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Top Regions:</h4>
                        <div className="flex flex-wrap gap-2">
                          {recommendationData.geographic.regions.map((region, i) => (
                            <Chip 
                              key={i} 
                              label={region} 
                              variant="outline"
                              size="sm"
                            />
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-2">Top Countries:</h4>
                        <div className="flex flex-wrap gap-2">
                          {recommendationData.geographic.countries.slice(0, 3).map((country, i) => (
                            <Chip 
                              key={i} 
                              label={country} 
                              variant="primary"
                              size="sm"
                            />
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-2">Top Cities:</h4>
                        <div className="flex flex-wrap gap-2">
                          {recommendationData.geographic.cities.slice(0, 3).map((city, i) => (
                            <Chip 
                              key={i} 
                              label={city}
                              variant="secondary"
                              size="sm"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Marketing Strategy Card */}
                <Card className="md:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <Target className="h-5 w-5 mr-2 text-primary" />
                      Marketing Strategy Recommendations
                    </CardTitle>
                    <CardDescription>
                      Best practices for reaching your target audience
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3 flex items-center">
                          <BarChart className="h-4 w-4 mr-2 text-primary" />
                          Key Marketing Tips
                        </h4>
                        <ul className="space-y-2 list-disc pl-5">
                          {recommendationData.marketingTips.map((tip, i) => (
                            <li key={i} className="text-muted-foreground">{tip}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-secondary/20 p-4 rounded-lg">
                        <h4 className="font-medium mb-3">Product-Specific Insights</h4>
                        <p className="text-muted-foreground mb-3">
                          This {category} product has shown strong appeal among {recommendationData.demographics.age} year-olds 
                          with interests in {recommendationData.demographics.interests.split(',')[0]}.
                        </p>
                        <p className="text-muted-foreground">
                          Focus your marketing efforts in {recommendationData.geographic.countries[0]} and 
                          {recommendationData.geographic.countries[1]}, especially in urban areas with 
                          {recommendationData.demographics.socioeconomic.toLowerCase()} populations.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProductDetails;
