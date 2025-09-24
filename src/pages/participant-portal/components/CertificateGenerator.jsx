import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';


const CertificateGenerator = ({ userCertificates = [] }) => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const mockCertificates = [
    {
      id: 'cert-001',
      title: 'Satellite Fundamentals',
      type: 'Course Completion',
      issueDate: '2024-09-20',
      completionDate: '2024-09-18',
      grade: 'A+',
      score: 95,
      instructor: 'Dr. Sarah Chen',
      courseHours: 40,
      skills: ['Orbital Mechanics', 'Satellite Design', 'Mission Planning'],
      status: 'issued',
      credentialId: 'QSAT-SF-2024-001247'
    },
    {
      id: 'cert-002',
      title: 'Mission Operations Specialist',
      type: 'Professional Certification',
      issueDate: '2024-08-15',
      completionDate: '2024-08-12',
      grade: 'A',
      score: 88,
      instructor: 'Commander Mike Rodriguez',
      courseHours: 60,
      skills: ['Telemetry Analysis', 'Mission Control', 'Emergency Procedures'],
      status: 'issued',
      credentialId: 'QSAT-MOS-2024-000892'
    },
    {
      id: 'cert-003',
      title: 'CubeSat Engineering Workshop',
      type: 'Workshop Certificate',
      issueDate: null,
      completionDate: null,
      grade: null,
      score: 78,
      instructor: 'Prof. Elena Vasquez',
      courseHours: 80,
      skills: ['Hardware Design', 'Systems Integration', 'Testing Protocols'],
      status: 'in-progress',
      credentialId: null,
      expectedCompletion: '2024-12-15'
    }
  ];

  const certificates = userCertificates?.length > 0 ? userCertificates : mockCertificates;

  const handleGenerateCertificate = async (certificateId) => {
    setIsGenerating(true);
    setSelectedCertificate(certificateId);
    
    // Simulate certificate generation
    setTimeout(() => {
      // In a real app, this would generate and download a PDF
      const link = document.createElement('a');
      link.href = '#'; // Would be actual PDF URL
      link.download = `QSAT_Certificate_${certificateId}.pdf`;
      // link.click(); // Uncomment in real implementation
      
      setIsGenerating(false);
      setSelectedCertificate(null);
    }, 3000);
  };

  const handleShareCertificate = (certificate) => {
    if (navigator.share) {
      navigator.share({
        title: `QSAT Certificate - ${certificate?.title}`,
        text: `I've earned a certificate in ${certificate?.title} from QSAT Event Hub!`,
        url: `https://qsat.diy/certificates/${certificate?.credentialId}`
      });
    } else {
      // Fallback to copying link
      navigator.clipboard?.writeText(`https://qsat.diy/certificates/${certificate?.credentialId}`);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'issued': return 'text-success';
      case 'in-progress': return 'text-accent';
      case 'expired': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'issued': return 'CheckCircle';
      case 'in-progress': return 'Clock';
      case 'expired': return 'XCircle';
      default: return 'Circle';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
          <Icon name="Award" size={20} className="text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">My Certificates</h3>
          <p className="text-sm text-muted-foreground">Download and share your achievements</p>
        </div>
      </div>
      <div className="space-y-6">
        {/* Certificate Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-muted/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-success">
              {certificates?.filter(c => c?.status === 'issued')?.length}
            </div>
            <div className="text-sm text-muted-foreground">Certificates Earned</div>
          </div>
          <div className="bg-muted/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-accent">
              {certificates?.filter(c => c?.status === 'in-progress')?.length}
            </div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </div>
          <div className="bg-muted/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-card-foreground">
              {certificates?.reduce((sum, c) => sum + (c?.courseHours || 0), 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Hours</div>
          </div>
        </div>

        {/* Certificate List */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-card-foreground">Certificate Collection</h4>
          
          {certificates?.map((certificate) => (
            <div key={certificate?.id} className="border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h5 className="text-lg font-semibold text-card-foreground">{certificate?.title}</h5>
                    <div className={`flex items-center space-x-1 ${getStatusColor(certificate?.status)}`}>
                      <Icon name={getStatusIcon(certificate?.status)} size={16} />
                      <span className="text-sm capitalize">{certificate?.status?.replace('-', ' ')}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center space-x-1">
                      <Icon name="BookOpen" size={14} />
                      <span>{certificate?.type}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} />
                      <span>{certificate?.courseHours} hours</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="User" size={14} />
                      <span>{certificate?.instructor}</span>
                    </span>
                  </div>

                  {certificate?.status === 'issued' && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Issue Date</div>
                        <div className="font-medium text-card-foreground">
                          {new Date(certificate.issueDate)?.toLocaleDateString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Grade</div>
                        <div className="font-medium text-card-foreground">{certificate?.grade}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Score</div>
                        <div className="font-medium text-card-foreground">{certificate?.score}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Credential ID</div>
                        <div className="font-mono text-xs text-card-foreground">{certificate?.credentialId}</div>
                      </div>
                    </div>
                  )}

                  {certificate?.status === 'in-progress' && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-card-foreground">{certificate?.score}%</span>
                      </div>
                      <div className="w-full bg-border rounded-full h-2">
                        <div 
                          className="bg-accent rounded-full h-2 transition-all duration-500"
                          style={{ width: `${certificate?.score}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">
                        Expected completion: {new Date(certificate.expectedCompletion)?.toLocaleDateString()}
                      </div>
                    </div>
                  )}

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {certificate?.skills?.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col space-y-2 ml-4">
                  {certificate?.status === 'issued' && (
                    <>
                      <Button
                        variant="default"
                        size="sm"
                        loading={isGenerating && selectedCertificate === certificate?.id}
                        onClick={() => handleGenerateCertificate(certificate?.id)}
                        iconName="Download"
                        iconPosition="left"
                      >
                        {isGenerating && selectedCertificate === certificate?.id ? 'Generating...' : 'Download PDF'}
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShareCertificate(certificate)}
                        iconName="Share"
                        iconPosition="left"
                      >
                        Share
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="ExternalLink"
                        iconPosition="left"
                      >
                        Verify
                      </Button>
                    </>
                  )}
                  
                  {certificate?.status === 'in-progress' && (
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Play"
                      iconPosition="left"
                    >
                      Continue Course
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certificate Preview */}
        {certificates?.filter(c => c?.status === 'issued')?.length > 0 && (
          <div className="bg-muted/30 rounded-lg p-6">
            <h4 className="text-md font-medium text-card-foreground mb-4">Certificate Preview</h4>
            <div className="bg-background border-2 border-dashed border-border rounded-lg p-8 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Award" size={32} className="text-accent" />
                </div>
                <h5 className="text-lg font-bold text-card-foreground mb-2">QSAT Event Hub</h5>
                <p className="text-sm text-muted-foreground mb-4">Certificate of Achievement</p>
                <p className="text-xs text-muted-foreground">
                  This preview shows how your certificates will appear when downloaded as PDF documents.
                  Each certificate includes verification QR codes and digital signatures.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateGenerator;