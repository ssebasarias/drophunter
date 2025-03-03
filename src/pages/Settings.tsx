
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { 
  Settings as SettingsIcon, 
  Globe, 
  Users, 
  Bell, 
  User, 
  ShieldCheck, 
  Send
} from "lucide-react";
import Navbar from "@/components/navigation/Navbar";
import Sidebar from "@/components/navigation/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { userData } from "@/lib/data";
import SalesSuggestions from "@/components/settings/SalesSuggestions";

const Settings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  
  return (
    <>
      <Helmet>
        <title>Settings - DropHunter</title>
      </Helmet>
      
      <Navbar />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1">
          <div className="container py-8">
            <div className="flex items-center gap-2 mb-8">
              <SettingsIcon className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-medium tracking-tight">Settings</h1>
            </div>
            
            <Tabs defaultValue="profile" className="space-y-4">
              <TabsList>
                <TabsTrigger value="profile">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="notifications">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="sales-suggestions">
                  <Send className="h-4 w-4 mr-2" />
                  Sales Suggestions
                </TabsTrigger>
                <TabsTrigger value="security">
                  <ShieldCheck className="h-4 w-4 mr-2" />
                  Security
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Manage your account details and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center">
                      <div className="flex-shrink-0">
                        <img 
                          src={userData.avatar} 
                          alt="Profile" 
                          className="h-20 w-20 rounded-full object-cover" 
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{userData.name}</h3>
                        <p className="text-sm text-muted-foreground">{userData.email}</p>
                        <div className="mt-2 space-x-2">
                          <Button variant="outline" size="sm">Change Photo</Button>
                          <Button variant="outline" size="sm">Edit Profile</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>
                      Manage how you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="notifications">All Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable or disable all notifications
                        </p>
                      </div>
                      <Switch 
                        id="notifications" 
                        checked={notificationsEnabled}
                        onCheckedChange={setNotificationsEnabled}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch 
                        id="email-notifications" 
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                        disabled={!notificationsEnabled}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="sales-suggestions" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Sales Suggestions</CardTitle>
                    <CardDescription>
                      View demographic and geographic sales suggestions for your products
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SalesSuggestions />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Manage your account security
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">Password</h3>
                      <p className="text-sm text-muted-foreground">
                        Last changed 30 days ago
                      </p>
                      <Button variant="outline" size="sm">Change Password</Button>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                      <Button variant="outline" size="sm">Enable 2FA</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </>
  );
};

export default Settings;
