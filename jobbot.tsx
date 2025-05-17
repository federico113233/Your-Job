import { useState } from 'react'
import { Button } from "/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "/components/ui/card"
import { Input } from "/components/ui/input"
import { Label } from "/components/ui/label"
import { Mail, User, Settings, Bell, ArrowRight, Upload } from "lucide-react"

type ApplicationStatus = 'applied' | 'interview' | 'rejected' | 'offer' | 'needs-info'
type JobApplication = {
  id: string
  title: string
  company: string
  status: ApplicationStatus
  date: string
  requiresAttention: boolean
}

export default function JobApplicationAgent() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'profile' | 'settings'>('dashboard')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [linkedInUrl, setLinkedInUrl] = useState('')
  const [applications, setApplications] = useState<JobApplication[]>([
    {
      id: '1',
      title: 'Frontend Developer',
      company: 'TechCorp',
      status: 'applied',
      date: '2023-06-15',
      requiresAttention: false
    },
    {
      id: '2',
      title: 'UX Designer',
      company: 'DesignHub',
      status: 'interview',
      date: '2023-06-10',
      requiresAttention: true
    },
    {
      id: '3',
      title: 'Full Stack Engineer',
      company: 'WebSolutions',
      status: 'needs-info',
      date: '2023-06-05',
      requiresAttention: true
    },
    {
      id: '4',
      title: 'Product Manager',
      company: 'InnovateCo',
      status: 'rejected',
      date: '2023-05-28',
      requiresAttention: false
    }
  ])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoggedIn(true)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0])
    }
  }

  const startApplicationProcess = () => {
    // In a real app, this would trigger the AI agent
    alert('AI agent started processing your applications!')
  }

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case 'applied': return 'bg-blue-100 text-blue-800'
      case 'interview': return 'bg-purple-100 text-purple-800'
      case 'offer': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      case 'needs-info': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Welcome to JobBot</CardTitle>
              <CardDescription>Your AI-powered job application assistant</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="mb-4">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login / Register
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">JobBot AI</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell className="h-5 w-5 text-gray-500" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Settings className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'dashboard' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <User className="mr-3 h-5 w-5" />
                    Dashboard
                  </button>
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'profile' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Mail className="mr-3 h-5 w-5" />
                    Profile Setup
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'dashboard' && (
              <>
                <div className="mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Application Status</CardTitle>
                      <CardDescription>Overview of your job applications</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-lg shadow border">
                          <h3 className="text-sm font-medium text-gray-500">Total Applications</h3>
                          <p className="text-2xl font-bold">24</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow border">
                          <h3 className="text-sm font-medium text-gray-500">Interviews</h3>
                          <p className="text-2xl font-bold">5</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow border">
                          <h3 className="text-sm font-medium text-gray-500">Offers</h3>
                          <p className="text-2xl font-bold">2</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow border">
                          <h3 className="text-sm font-medium text-gray-500">Needs Attention</h3>
                          <p className="text-2xl font-bold">3</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Recent Applications</h3>
                        {applications.map((app) => (
                          <Card key={app.id} className={app.requiresAttention ? 'border-l-4 border-yellow-500' : ''}>
                            <CardHeader className="flex flex-row justify-between items-start space-y-0 pb-2">
                              <div>
                                <CardTitle className="text-lg">{app.title}</CardTitle>
                                <CardDescription>{app.company}</CardDescription>
                              </div>
                              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(app.status)}`}>
                                {app.status.replace('-', ' ')}
                              </span>
                            </CardHeader>
                            <CardContent>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Applied: {app.date}</span>
                                {app.requiresAttention && (
                                  <Button variant="outline" size="sm">
                                    Provide Info
                                  </Button>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}

            {activeTab === 'profile' && (
              <Card>
                <CardHeader>
                  <CardTitle>Profile Setup</CardTitle>
                  <CardDescription>Provide information for the AI agent to apply for jobs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="resume">Upload Your Resume</Label>
                      <div className="mt-2 flex items-center gap-4">
                        <label className="w-full">
                          <div className="flex flex-col items-center">
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 w-full text-center cursor-pointer hover:bg-gray-50">
                              <Upload className="mx-auto h-8 w-8 text-gray-400" />
                              <p className="mt-2 text-sm text-gray-600">
                                {resumeFile ? resumeFile.name : 'Click to upload resume'}
                              </p>
                            </div>
                            <Input
                              id="resume"
                              type="file"
                              className="sr-only"
                              onChange={handleFileUpload}
                              accept=".pdf,.doc,.docx"
                            />
                          </div>
                        </label>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="linkedin">LinkedIn Profile URL</Label>
                      <Input
                        id="linkedin"
                        type="url"
                        value={linkedInUrl}
                        onChange={(e) => setLinkedInUrl(e.target.value)}
                        placeholder="https://linkedin.com/in/your-profile"
                        className="mt-2"
                      />
                    </div>

                    <div className="pt-4">
                      <Button onClick={startApplicationProcess} className="w-full">
                        Start Job Application Process <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
